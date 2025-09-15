import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import { inviteUser, upgradeTenant } from "../controllers/tenant.controller.js";


const tenantrouter = express.Router();

tenantrouter.post("/:slug/upgrade", protect, restrictTo("Admin"), upgradeTenant); // Admin only
tenantrouter.post("/invite", protect, restrictTo("Admin"), inviteUser); // Admin invites (tenant comes from req.user)
export default tenantrouter;
