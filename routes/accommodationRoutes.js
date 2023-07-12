const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .delete()
  .post(verifyJWT, accommodationsController.createNewAccommodation)
  .get(verifyJWT, accommodationsController.getAllAccommodationsForOwner)
  .get(accommodationsController.getSpecificAccommodation)
  .patch(verifyJWT, accommodationsController.updateAccommodation)

module.exports = router
