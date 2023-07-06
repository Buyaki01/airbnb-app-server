const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .delete()
  .post(accommodationsController.createNewAccommodation)
  .get(accommodationsController.getAllAccommodationsForOwner)
  .patch(accommodationsController.updateAccommodation)
  .get(accommodationsController.getSpecificAccommodation)

module.exports = router
