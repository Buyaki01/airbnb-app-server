const express = require('express')
const router = express.Router()
const accommodationsController = require('../controllers/accommodationsController')

router.route('/')
  .get(accommodationsController.getAllAccommodations)
  .delete()

router.route('/new')
  .post(accommodationsController.createNewAccommodation)

router.route('/myaccommodations')
  .get(accommodationsController.getAllAccommodationsForOwner)

router.route('/:id')
  .get(accommodationsController.getSpecificAccommodation)
  .patch(accommodationsController.updateAccommodation)

module.exports = router
