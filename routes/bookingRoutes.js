const express = require('express')
const router = express.Router()
const bookingsController = require('../controllers/bookingsController')

router.route('/mybookings')
  .get(bookingsController.allBookingsByOwner)

router.route('/new')
  .post(bookingsController.createNewBooking)

module.exports = router