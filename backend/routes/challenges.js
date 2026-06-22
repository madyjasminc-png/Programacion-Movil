const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

// Rutas de Retos / Challenges
router.get('/', challengeController.getChallenges);

module.exports = router;
