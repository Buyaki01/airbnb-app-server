const express = require('express')
const router = express.Router()
const bookingsController = require('../controllers/bookingsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(bookingsController.getAllBookings)
  .post(bookingsController.createNewBooking)

router.route('/mybookings')
  .get(bookingsController.getAllBookingsByOwner)

router.route('/:bookingId')
  .get(bookingsController.getSpecificBooking)

module.exports = router