import redis from "../../share/redis/redis.js"
export const authmiddleware =async (req,res,next)=>{
    try{
const sessionId = req.cookies?.session
if(!sessionId){
    return res.status(401).json({message:"UnAuthorized"})
}
const session = await redis.get(`session:${sessionId}`)
if(!session){
    return res.status(401).json({message:"Session Expired"})
}
req.user = JSON.parse(session)
next()
    }catch(error){
        console.error(error)
        res.status(500).json({message:`UnAuthorized Error ${error}`})
    }

}

export default authmiddleware