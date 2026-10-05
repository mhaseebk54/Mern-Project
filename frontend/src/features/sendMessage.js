import api from "../../utilis/axios"

async function sendMessage(payload) {
 try{
const {data} = await api.post("/api/agent/chat",payload)
return data
 }
  catch(err){
    console.error("Error sending message:", err)
    return null
  }
}

export default sendMessage
