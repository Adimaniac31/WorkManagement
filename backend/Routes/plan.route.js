import express from "express";
import {createPlan} from '../Controllers/plan.controller.js'
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post("/create-plan/:userId",verifyToken,createPlan);

export default router;