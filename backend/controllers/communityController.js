const db = require('../config/db');

// @route   GET /api/v1/community
// @desc    Obtener lista de usuarios para descubrir en la comunidad
// @access  Public
exports.getCommunityUsers = async (req, res) => {
  try {
    const { user_id } = req.query; // Usuario actual, para no devolverse a si mismo

    let query = 'SELECT id, name, level, created_at FROM users';
    let params = [];

    if (user_id) {
      query += ' WHERE id != ?';
      params.push(user_id);
    }

    query += ' ORDER BY level DESC LIMIT 50'; // Mostrar top 50 exploradores

    const [users] = await db.execute(query, params);

    res.status(200).json({
      error: false,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error obteniendo comunidad:', error);
    res.status(500).json({ error: true, message: 'Error interno al obtener la comunidad.' });
  }
};

// @route   POST /api/v1/community/connect
// @desc    Enviar o aceptar una solicitud de conexión entre usuarios
// @access  Public
exports.connectUsers = async (req, res) => {
  try {
    const { user_id_1, user_id_2, action } = req.body; 

    if (!user_id_1 || !user_id_2) {
      return res.status(400).json({ error: true, message: 'Faltan user_id_1 y user_id_2' });
    }

    if (action === 'accept') {
      await db.execute(
        'UPDATE community_connections SET status = ? WHERE user_id_1 = ? AND user_id_2 = ?',
        ['accepted', user_id_1, user_id_2]
      );
      res.status(200).json({ error: false, message: 'Conexión aceptada.' });
    } else {
      // Por defecto envia solicitud
      await db.execute(
        'INSERT INTO community_connections (user_id_1, user_id_2, status) VALUES (?, ?, ?)',
        [user_id_1, user_id_2, 'pending']
      );
      res.status(200).json({ error: false, message: 'Solicitud de conexión enviada.' });
    }

  } catch (error) {
    console.error('Error conectando usuarios:', error);
    res.status(500).json({ error: true, message: 'Error interno al procesar conexión.' });
  }
};
