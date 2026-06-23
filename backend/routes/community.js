const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Rutas de Comunidad
router.get('/', communityController.getCommunityUsers);
router.post('/connect', communityController.connectUsers);

module.exports = router;
