import express from "express";
import {createTask} from '../Controllers/task.controller.js'
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post("/create-task/:userId",verifyToken,createTask);

export default router;