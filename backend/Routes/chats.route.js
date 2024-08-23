import express from 'express';
import { chat, resetConversation } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/chat', chat);
router.post('/reset', resetConversation);

export default router;

