import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { ExecuteWebhook, ExecuteWorkflow, GetExecutionDetails, GetExecutions } from "../controllers/executionController.js"
const router = express.Router()


// routes 
router.get("/:id/execute",isAuthenticated,ExecuteWorkflow)
router.get("/all",isAuthenticated,GetExecutions)
router.get("/:id",isAuthenticated,GetExecutionDetails)


export default router