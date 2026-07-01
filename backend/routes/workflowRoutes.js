import express from "express"
import { CreateWorkflow, DeleteWorkflow, EachWorkflowDetails, GetUserWorkflows, PublishedWorkflow, UpdateWorkflow } from "../controllers/workflowController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
const router = express.Router()



// routes 
router.post("/create",isAuthenticated,CreateWorkflow)
router.get("/all",isAuthenticated,GetUserWorkflows)
router.get("/:id/details",isAuthenticated,EachWorkflowDetails)
router.put("/update/:id",isAuthenticated,UpdateWorkflow)
router.delete("/delete/:id",isAuthenticated,DeleteWorkflow)
router.get("/published",isAuthenticated,PublishedWorkflow)

export default router 