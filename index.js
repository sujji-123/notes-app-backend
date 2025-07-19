import express from "express"
import cors from 'cors'
import connectToDB from "./db/db.js"
import authrouter from './routes/auth.js'
import noterouter from "./routes/note.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authrouter)
app.use('/api/note', noterouter)

// eslint-disable-next-line no-undef
app.listen( process.env.PORT || 6000 , () =>{
    connectToDB()
    console.log("Server is running")
})