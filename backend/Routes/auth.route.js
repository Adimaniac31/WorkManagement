import express from "express";
import {signIn, signUp,signOut,deleteUser} from '../Controllers/auth.controller.js'
import verifyToken from "../utils/verifyToken.js";
import { authUser } from "../utils/authUser.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.delete("/delete-user/:userId", verifyToken,authUser,deleteUser);
export default router;