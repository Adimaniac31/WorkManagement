import express from "express";
import {createTask} from '../Controllers/task.controller.js'
import verifyToken from '../utils/verifyToken.js';
import { authUser } from "../utils/authUser.js";

const router = express.Router();

router.post("/create-task/:userId",verifyToken,authUser,createTask);

export default router;