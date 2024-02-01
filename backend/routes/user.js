const express = require('express')
const router = express.Router()
const passport= require('passport')
const userController = require('../controllers/userController')
const {updateUserByemail,signupUser,loginUser,updateProfil,getUsersByEmail,getTechHelp,getUserById,getUsers,createUser, deleteUser,updateUser} =  require('../controllers/userController')
//login route
router.post('/login',loginUser)
//signup route
router.post('/signup',signupUser)

//get users
router.get('/list',getUsers)
//get usersby email
router.get('/email/:email',getUsersByEmail)
router.patch('/email/:email',updateUserByemail)

//get usersby id
router.get('/id/:id',getUserById)
// POST user
router.post('/add', createUser)
// DELETE user
router.delete('/:id', deleteUser)
// UPDATE user
router.patch('/:id', updateUser)
//UPDATE Profil
router.patch('/:id', updateProfil)

//client number

//technicien number
router.get('/profile/:userId', userController.getUserById);




module.exports = router