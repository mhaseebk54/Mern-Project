import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'



dotenv.config()

const port = process.env.PORT

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world from Agent Service")
})

app.listen(port ,()=>{
    console.log(`Chat started on ${port}`)
    connectDB()
})