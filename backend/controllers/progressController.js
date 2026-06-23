const db = require('../config/db');

// @route   POST /api/v1/progress/complete
// @desc    Completar un reto y guardar la puntuación y URL de voz
// @access  Public (Para simplificar, idealmente requiere auth)
exports.completeChallenge = async (req, res) => {
  try {
    const { user_id, challenge_id, score, voice_record_url } = req.body;

    if (!user_id || !challenge_id) {
      return res.status(400).json({ error: true, message: 'Faltan campos obligatorios: user_id y challenge_id' });
    }

    // Verificar si ya existe el progreso y actualizar, o insertar nuevo
    const [existing] = await db.execute(
      'SELECT id FROM user_progress WHERE user_id = ? AND challenge_id = ?',
      [user_id, challenge_id]
    );

    if (existing.length > 0) {
      // Actualizar progreso existente
      await db.execute(
        'UPDATE user_progress SET score = ?, voice_record_url = ?, status = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
        [score || 0, voice_record_url || null, 'completed', existing[0].id]
      );
    } else {
      // Insertar nuevo
      await db.execute(
        'INSERT INTO user_progress (user_id, challenge_id, score, voice_record_url, status, completed_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [user_id, challenge_id, score || 0, voice_record_url || null, 'completed']
      );
    }

    res.status(200).json({ error: false, message: 'Progreso guardado correctamente.' });
  } catch (error) {
    console.error('Error al guardar progreso:', error);
    res.status(500).json({ error: true, message: 'Error interno del servidor al guardar progreso.' });
  }
};

// @route   GET /api/v1/progress/my-journey
// @desc    Obtener el historial de retos completados de un usuario
// @access  Public
exports.getMyJourney = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: true, message: 'user_id es requerido en la URL (?user_id=1)' });
    }

    const query = `
      SELECT up.*, c.title, c.category, c.difficulty 
      FROM user_progress up
      JOIN challenges c ON up.challenge_id = c.id
      WHERE up.user_id = ?
      ORDER BY up.completed_at ASC
    `;

    const [journey] = await db.execute(query, [user_id]);

    res.status(200).json({
      error: false,
      count: journey.length,
      data: journey
    });
  } catch (error) {
    console.error('Error obteniendo el journey:', error);
    res.status(500).json({ error: true, message: 'Error interno del servidor al obtener progreso.' });
  }
};
