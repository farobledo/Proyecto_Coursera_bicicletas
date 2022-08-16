var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuarioControllerApi');

// GET /api/usuario

router.get('/', usuarioController.usuarios_list);
router.post('/create', usuarioController.usuarios_create);
router.post('/reservar', usuarioController.usuarios_reservar);


module.exports = router;