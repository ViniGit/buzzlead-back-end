const express = require('express');
const CepController = require('./controllers/CepController')

var router = express.Router();

const cepController = new CepController();

router.post('/cep', cepController.create);

module.exports = router;