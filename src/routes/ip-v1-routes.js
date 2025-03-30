const express = require('express')
const api = express.Router()
const ipController = require('../controllers/ipController')
const { validateBody } = require('../validators/bodyValidator')

api.post('/exec/', [validateBody, ipController.exec])

module.exports = api