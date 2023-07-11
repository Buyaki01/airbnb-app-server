const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .delete()

router.route('/')
  .post(verifyJWT, accommodationsController.createNewAccommodation)

router.route('/')
  .get(verifyJWT, accommodationsController.getAllAccommodationsForOwner)
  
router.route('/')
  .get(accommodationsController.getSpecificAccommodation)
  .patch(verifyJWT, accommodationsController.updateAccommodation)

module.exports = router
