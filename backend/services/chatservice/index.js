import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/chatRoute.js'


dotenv.config()

const port = process.env.PORT

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world from Chat Service")
})

// app.router('/',router)
app.use('/chats',router)

app.listen(port ,()=>{
    console.log(`Chat started on ${port}`)
    connectDB()
})