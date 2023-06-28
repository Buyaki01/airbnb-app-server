const express = require('express')
const router = express.Router()
const photosController = require('../controllers/photosController')

router.route('/')
  .post(photosController.uploadPhotoByLink)

module.exports = router