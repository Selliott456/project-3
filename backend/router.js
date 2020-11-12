
const express = require('express')
const router = express.Router()
const userController = require('./controllers/user')



router.route('/signup')
.post(userController.createUser)


module.exports = router