import express from 'express';
import {
    deleteUser,
    getAllUser,
    getUser,
    updateUser
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// // Authorize User
// router.get('/checkauth', verifyToken, (req, res, next) => {
//     res.send('Hello user, you are logged in')
// })

// // Authorize logged in user
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('Hello user, you are logged in and logged')
// })

// // Authorize Admin
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Hello user, you are logged in and admin logged in')
// })

// Update User
router.put('/:id', verifyUser, updateUser)

// Delete User
router.delete('/:id', verifyUser, deleteUser)

// Get User
router.get('/:id', verifyUser, getUser)

//Get all Users
router.get('/', verifyAdmin, getAllUser)

export default router;