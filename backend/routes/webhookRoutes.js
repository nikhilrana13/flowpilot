import express from "express"
import { ExecuteWebhook } from "../controllers/executionController.js"
const router = express.Router()


// routes 
router.get("/:webhookId",ExecuteWebhook)

export default router
