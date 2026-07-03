import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import dotenv from "dotenv" 
import {configure } from './config/db.js'
import authRoute from "./routes/authRoutes.js"
import workSpaceRoute from "./routes/workspaceRoutes.js"
import userRoute from "./routes/userRoutes.js"
import workflowRoute from "./routes/workflowRoutes.js"
import webhookRoute from "./routes/webhookRoutes.js"
import executionRoute from "./routes/ExecutionRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 5000 
const app = express()


// middlewares 
app.use(cors({
    origin:process.env.NEXT_FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())



// routes 
app.use("/api/auth",authRoute)
app.use("/api/workspaces",workSpaceRoute)
app.use("/api/workflow",workflowRoute)
app.use("/api/execution",executionRoute)
app.use("/api/webhooks",webhookRoute)
app.use("/api/user",userRoute)



// connect to db 
configure()

// run server 

app.listen(PORT,(()=>{
    console.log(`server is running on ${PORT}`)
}))



