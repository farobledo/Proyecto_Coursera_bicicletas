var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenidos a Proyecto_Coursera' });
});

router.get('/bicicletas', function(req, res, next) {
  res.render('bicicletas/index', { title: 'Bicicletas' });
});

module.exports = router;
