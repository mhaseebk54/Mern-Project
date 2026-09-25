import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
// import router from './routes/agentRoute.js'



dotenv.config()

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use("/", router)

app.get('/',(req,res)=>{
    res.send("hello world from Agent Service")
})

app.listen(port ,()=>{
    console.log(`Chat started on ${port}`)
    connectDB()
})