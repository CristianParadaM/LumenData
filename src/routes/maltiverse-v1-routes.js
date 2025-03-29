const express = require('express')
const { validateBody } = require('../validators/bodyValidator')
const maltiverseController = require('../controllers/maltiverseController')
const api = express.Router()

api.post('/exec/', [validateBody, maltiverseController.exec])

module.exports = api