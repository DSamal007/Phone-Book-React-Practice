const express = require('express')
const router = express.Router()




const contactsController = require('../app/controllers/contactsController')

const usersController = require('../app/controllers/UsersController')

const { authenticateUser } = require('../app/middlewares/authentication')


router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)



router.get('/contacts', authenticateUser, contactsController.list)
router.get('/contacts/count', authenticateUser, contactsController.count)
router.get('/contacts/:id', authenticateUser, contactsController.show)
router.post('/contacts', authenticateUser, contactsController.create)
router.put('/contacts/:id', authenticateUser, contactsController.update)
router.delete('/contacts/:id', authenticateUser, contactsController.destroy)



module.exports = router
