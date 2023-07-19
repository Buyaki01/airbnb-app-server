const express = require('express')
const router = express.Router()
const bookingsController = require('../controllers/bookingsController')

router.route('/')
  .get(bookingsController.getAllBookingsByOwner)
  .post(bookingsController.createNewBooking)
  .get(bookingsController.getSpecificBooking)
  
module.exports = router