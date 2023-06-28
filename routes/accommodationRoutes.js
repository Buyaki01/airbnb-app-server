const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .post()
  .put()
  .delete()

router.route('/:id')
  .get(accommodationsController.getAccommodation)

module.exports = router
