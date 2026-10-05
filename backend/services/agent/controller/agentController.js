import axios from "axios"
import { graph } from "../graph/graph.js"

export const agentController = async (req,res) =>{
    try{
        const {prompt,conversationId} = req.body 
        if (conversationId) {
            await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{conversationId,role:"user",content:prompt})
        }
        
        const result = await graph.invoke({
            prompt,conversationId
        })
        const response = result?.aiResponse || "I'm sorry, I couldn't generate a response."
        return res.status(200).json(response)
  
    }


    catch(error){
        console.error("Agent Controller Error:", error)
        return res.status(500).json({message:`Agent Error ${error.message || error}`})
    }
}