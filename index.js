import express from "express"
import cors from 'cors'
import connectToDB from "./db/db.js"
import authrouter from './routes/auth.js'
import noterouter from "./routes/note.js"
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authrouter)
app.use('/api/note', noterouter)

app.listen(5000 , () =>{
    connectToDB()
    console.log("Server is running")
})