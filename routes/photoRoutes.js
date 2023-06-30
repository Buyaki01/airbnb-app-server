const express = require('express')
const router = express.Router()
const photosController = require('../controllers/photosController')

router.route('/')
  .post(photosController.uploadPhotoFromDevice)

router.route('/link')
  .post(photosController.uploadPhotoByLink)

module.exports = router