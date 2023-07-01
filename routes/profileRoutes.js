const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(profileController.getInfoForLoggedInUser)

module.exports = router