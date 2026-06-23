const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Rutas de Progreso / Journey
router.post('/complete', progressController.completeChallenge);
router.get('/my-journey', progressController.getMyJourney);

module.exports = router;
