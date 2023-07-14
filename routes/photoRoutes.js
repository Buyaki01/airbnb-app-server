const express = require('express')
const router = express.Router()
const photosController = require('../controllers/photosController') 

router.route('/photo')
  .post(photosController.uploadPhotoFromDevice)

router.route('/photo/link')
  .post(photosController.uploadPhotoByLink)

module.exports = router