const express = require('express');
const router = express.Router();
const { login, current } = require('../controllers/sessionController');
const { currentStrategy } = require('../middlewares/authMiddleware');

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para validar usuario logueado
router.get('/current', currentStrategy, current);

module.exports = router;
