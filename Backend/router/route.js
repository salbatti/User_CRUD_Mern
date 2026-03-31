const express = require('express')
const userController = require('../controllers/userController')

const route = express.Router()

route.post('/api/addUser',userController.addUser)
route.get('/api/getUser/',userController.getUser)
route.put('/api/updateUser/:id',userController.updateUser)
route.delete('/api/deleteUser/:id',userController.deleteUser)


module.exports = route