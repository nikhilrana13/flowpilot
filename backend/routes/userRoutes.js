import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { OnBoardingUser } from "../controllers/userController.js"
const router = express.Router()


// routes
router.patch("/onboarding",isAuthenticated,OnBoardingUser)

export default router