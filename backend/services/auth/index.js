import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'

dotenv.config()

const port = process.env.PORT

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world from auth")
})

app.use('/auth',authRoutes)

app.listen(port ,()=>{
    console.log(`SERVER started on ${port}`)
    connectDB()
})