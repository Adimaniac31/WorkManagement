import express from "express";
import {createPlan, deletePlan} from '../Controllers/plan.controller.js'
import verifyToken from '../utils/verifyToken.js';
import { authUser } from "../utils/authUser.js";

const router = express.Router();

router.post("/create-plan/:userId",verifyToken,authUser,createPlan);
router.delete("/delete-plan/:userId/:planId",verifyToken,authUser,deletePlan);

export default router;