const express = require('express')

const config = require('../config')
const router = require('./network')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.use('/', router)

app.listen(config.cacheService.port, () => {
  console.log('Servicio de cache redis escuchando en el puerto ', config.cacheService.port);
})