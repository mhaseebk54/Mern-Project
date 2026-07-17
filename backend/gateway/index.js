import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authmiddleware from './middleware/auth-middle.js'
import getCurrentUser from './controllers/user-controller.js'

dotenv.config()
    
const port = process.env.PORT

const app = express()
app.use(cors(
    {
        origin:process.env.FRONTEND_SERVICE_URL,
        credentials:true
    }
))
app.use(cookieParser())

app.use("/auth", proxy(process.env.AUTH_SERVICE_URL, {
  proxyReqPathResolver: (req) => {
    return '/api/auth' + req.url;
  }
}))

app.get('/api/me',authmiddleware,getCurrentUser)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port ,()=>{
    console.log(`SERVER started on ${port}`)
})