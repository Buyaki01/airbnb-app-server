const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .post(accommodationsController.createNewAccommodation)
  
  .delete()

router.route('/:id')
  .get(accommodationsController.getSpecificAccommodation)
  .patch(accommodationsController.updateAccommodation)

router.route('/owner')
  .get(accommodationsController.getAllAccommodationsForOwner)

module.exports = router
