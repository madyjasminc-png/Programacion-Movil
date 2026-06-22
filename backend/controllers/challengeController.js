const db = require('../config/db');

// @route   GET /api/v1/challenges
// @desc    Obtener lista de retos (opcional: filtrar por categoría)
// @access  Public
exports.getChallenges = async (req, res) => {
  try {
    const { category } = req.query;

    let query = 'SELECT * FROM challenges ORDER BY created_at DESC';
    let params = [];

    // Filtrar si el usuario envía una categoría en la URL (?category=reading)
    if (category) {
      query = 'SELECT * FROM challenges WHERE category = ? ORDER BY created_at DESC';
      params = [category];
    }

    const [challenges] = await db.execute(query, params);

    res.status(200).json({
      error: false,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    console.error('Error obteniendo retos:', error);
    res.status(500).json({ error: true, message: 'Error interno del servidor al obtener retos.' });
  }
};
