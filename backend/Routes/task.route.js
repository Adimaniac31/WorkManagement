import express from "express";
import {createTask,deleteTask,updateTask,getTodaysTasks,getUserTasks,getUserAllDailyTasks,getUserAllWeeklyTasks} from '../Controllers/task.controller.js'
import verifyToken from '../utils/verifyToken.js';
import { authUser } from "../utils/authUser.js";

const router = express.Router();

router.post("/create-task/:userId",verifyToken,authUser,createTask);
router.delete("/delete-task/:userId/:taskId",verifyToken,authUser,deleteTask);
router.post("/update-task/:userId/:taskId",verifyToken,authUser,updateTask);
router.get("/todays-tasks/:userId", verifyToken, authUser, getTodaysTasks);
router.get("/get-tasks/:userId/:planId", verifyToken, authUser, getUserTasks);
router.get('/get-daily-tasks/:userId', getUserAllDailyTasks);
router.get('/get-week-tasks/:userId', getUserAllWeeklyTasks);

export default router;