const express = require('express')
const router = express.Router()
const bookingsController = require('../controllers/bookingsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(bookingsController.getAllBookings)
  .get(bookingsController.getAllBookingsByOwner)
  .post(bookingsController.createNewBooking)
  .get(bookingsController.getSpecificBooking)

module.exports = router