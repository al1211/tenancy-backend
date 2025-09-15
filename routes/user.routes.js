import express from "express"
import { login } from "../controllers/auth.controller.js";


const   userrouter=express.Router();

userrouter.post("/login",login)

export default userrouter