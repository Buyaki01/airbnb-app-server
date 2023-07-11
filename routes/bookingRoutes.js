const express = require('express')
const router = express.Router()
const bookingsController = require('../controllers/bookingsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
  .get(bookingsController.getAllBookings)
  
router.use(verifyJWT)

router.route('/mybookings')
  .get(bookingsController.getAllBookingsByOwner)

router.route('/new')
  .post(bookingsController.createNewBooking)

router.route('/:id')
  .get(bookingsController.getSpecificBooking)

module.exports = router