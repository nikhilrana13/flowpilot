import express from "express"
import { Login, Logout, SignUp } from "../controllers/authController.js"
import { body } from "express-validator"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { CreateWorkspace, GetMyWorkspaces, GetWorkSpaceDetails } from "../controllers/workspaceController.js"

const router = express.Router()

// routes 
router.post("/create",isAuthenticated,CreateWorkspace)
router.get("/my",isAuthenticated,GetMyWorkspaces)
router.get("/:id",isAuthenticated,GetWorkSpaceDetails)


export default router 