const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', login);

function login(req, res) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      response.success(req, res, token, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Información invalida', 400)
    });
}

module.exports = router;