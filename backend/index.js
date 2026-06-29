import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import dotenv from "dotenv" 
import {configure } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 4000 
const app = express()


// middlewares 
app.use(cors())
app.use(express.json())
app.use(cookieParser())



// routes 




// connect to db 
configure()

// run server 

app.listen(PORT,(()=>{
    console.log(`server is running on ${PORT}`)
}))



