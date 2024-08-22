import express from 'express';
import { chat, reset } from '../Controllers/chat.controller.js';

const router = express.Router();

router.post('/chat', chat);
router.post('/reset', reset);

export default router;
