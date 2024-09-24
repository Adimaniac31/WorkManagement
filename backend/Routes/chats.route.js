import express from 'express';
import { chat, resetConversation } from '../Controllers/chat.controller.js';

const router = express.Router();

router.post('/chat', chat);
router.post('/reset', resetConversation);

export default router;

