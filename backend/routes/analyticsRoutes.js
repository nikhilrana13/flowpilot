import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { DashboardStats } from '../controllers/analyticsController.js'
const router = express.Router()



// routes 
router.get("/dashboard/stats",isAuthenticated,DashboardStats)


export default router