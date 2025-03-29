const express = require('express')
const { validateBody } = require('../validators/bodyValidator')
const virusTotalController = require('../controllers/virusTotalController')
const api = express.Router()

api.post('/exec/', [validateBody, virusTotalController.exec])

module.exports = api