const express = require('express')
const { validateBody } = require('../validators/bodyValidator')
const threatBookController = require('../controllers/threatBookController')
const api = express.Router()

api.post('/exec/', [validateBody, threatBookController.exec])

module.exports = api