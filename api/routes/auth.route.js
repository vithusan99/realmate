import express from 'express';
import { login, signup, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/signin',login)
router.post('/google',google)

export default router;