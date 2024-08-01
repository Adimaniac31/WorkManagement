import express from "express";
import {createTask,deleteTask} from '../Controllers/task.controller.js'
import verifyToken from '../utils/verifyToken.js';
import { authUser } from "../utils/authUser.js";

const router = express.Router();

router.post("/create-task/:userId",verifyToken,authUser,createTask);
router.delete("/delete-task/:userId/:taskId",verifyToken,authUser,deleteTask);

export default router;