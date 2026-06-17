const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// @route   POST /api/v1/auth/register
// @desc    Registrar un nuevo estudiante
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: true, message: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el correo ya existe
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: true, message: 'El correo electrónico ya está registrado.' });
    }

    // Encriptar la contraseña (hash)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en MySQL
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    // Generar Token JWT
    const token = jwt.sign(
      { id: result.insertId, name, level: 1 },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // El token expira en 7 días
    );

    res.status(201).json({
      error: false,
      message: 'Usuario registrado exitosamente.',
      token,
      user: { id: result.insertId, name, email, level: 1 }
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: true, message: 'Error interno del servidor.' });
  }
};

// @route   POST /api/v1/auth/login
// @desc    Iniciar sesión de un estudiante
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: true, message: 'Correo y contraseña son obligatorios.' });
    }

    // Buscar si el usuario existe
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: true, message: 'Credenciales inválidas.' });
    }

    const user = users[0];

    // Verificar si la contraseña ingresada coincide con el hash en MySQL
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: true, message: 'Credenciales inválidas.' });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, level: user.level },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      error: false,
      message: 'Inicio de sesión exitoso.',
      token,
      user: { id: user.id, name: user.name, email: user.email, level: user.level }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: true, message: 'Error interno del servidor.' });
  }
};
