const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

router.route('/')
  .get(registerController.getUsers)

router.route('/')
  .post(registerController.createNewUser)

module.exports = router