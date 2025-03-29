const express = require('express')
const api = express.Router()
const abusepdbController = require('../controllers/abusepdbController')
const { validateBody } = require('../validators/bodyValidator')

api.post('/exec/', [validateBody, abusepdbController.exec])

module.exports = api