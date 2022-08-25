var express = require('express');
var router = express.Router();
const usuariosController = require('../../controllers/usuariosController');

router.get('/', usuariosController.list);
router.get('/create', usuariosController.create_get);
router.post('/create', usuariosController.create);
router.get('/:id/update', usuariosController.update_get);
router.post('/:id/update', usuariosController.update);
router.get('/:id/delete', usuariosController.delete);

module.exports = router;