import express from "express"
import { Login, Logout, SignUp } from "../controllers/authController.js"
import { body } from "express-validator"

const router = express.Router()

// routes 
router.post("/signup",[
    body("workemail").notEmpty().withMessage("Workemail is Required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password must be at least 6 characters long"),
    body("fullname").notEmpty().trim().escape().withMessage("fullname is required")
],SignUp)

router.post("/login",[
    body("workemail").notEmpty().withMessage("Workemail is Required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password must be at least 6 characters long"),
],Login)

router.get("/logout",Logout)

export default router