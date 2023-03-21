import express from 'express';
import { login, register } from '../controllers/auth.js';

const router = express.Router();

// Create new user
router.post('/register', register);

// Login user
router.post('/login', login);

export default router;