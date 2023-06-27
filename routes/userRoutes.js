const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
  .get()
  .post(usersController.createNewUser)
  .put()
  .delete()

module.exports = router