const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .delete()

router.route('new')
  .post(accommodationsController.createNewAccommodation)

router.route('/:id')
  .get(accommodationsController.getSpecificAccommodation)
  .patch(verifyJWT, accommodationsController.updateAccommodation)

router.route('/myaccommodations')
  .get(verifyJWT, accommodationsController.getAllAccommodationsForOwner)

module.exports = router
