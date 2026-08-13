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
import analyticsRoute from "./routes/analyticsRoutes.js"
import { initializeSocket } from './config/socket.js'
import http from "http"

dotenv.config()

const PORT = process.env.PORT || 5000 
const app = express()


const apiCors = cors({
  origin: process.env.NEXT_FRONTEND_URL,
  credentials: true,
});
// Public webhook CORS
const webhookCors = cors({
  origin: true,
  methods: ["POST", "OPTIONS"],
});



// middlewares 
app.use(express.json())
app.use(cookieParser())

// create io socket server 
const server = http.createServer(app)
initializeSocket(server)


// routes 
app.use("/api/auth",apiCors,authRoute)
app.use("/api/workspaces",apiCors,workSpaceRoute)
app.use("/api/workflow",apiCors,workflowRoute)
app.use("/api/execution",apiCors,executionRoute)
app.use("/api/user",apiCors,userRoute)
app.use("/api/analytics",apiCors,analyticsRoute)


app.use("/api/webhooks",webhookCors,webhookRoute)



// connect to db 
configure()

// run server 

server.listen(PORT,(()=>{
    console.log(`server is running on ${PORT}`)
}))


