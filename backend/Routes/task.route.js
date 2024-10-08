import express from "express";
import {createTask,deleteTask,updateTask,updateTodaysTasks,getTodaysTasks,getUserTasks,getUserAllDailyTasks,getUserAllWeeklyTasks} from '../Controllers/task.controller.js'
import verifyToken from '../utils/verifyToken.js';
import { authUser } from "../utils/authUser.js";

const router = express.Router();

router.post("/create-task/:userId",verifyToken,authUser,createTask);
router.delete("/delete-task/:userId/:taskId",verifyToken,authUser,deleteTask);
router.post("/update-todays-tasks/:userId/:taskId",verifyToken,authUser,updateTodaysTasks);
router.post("/update-task/:userId/:taskId",verifyToken,authUser,updateTask);
router.get("/get-todays-tasks/:userId", verifyToken, authUser, getTodaysTasks);
router.get("/get-tasks/:userId/:planId", verifyToken, authUser, getUserTasks);
router.get('/get-daily-tasks/:userId', verifyToken,authUser,getUserAllDailyTasks);
router.get('/get-week-tasks/:userId', verifyToken,authUser,getUserAllWeeklyTasks);

export default router;