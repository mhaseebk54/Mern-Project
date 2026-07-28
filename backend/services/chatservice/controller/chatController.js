import { redirectDocument } from "react-router-dom"
import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"


export const createConversation = async (req,res) =>{
try{

 const userId= req.header["x-user-id"]
 console.log("userId" ,userId)
 const conversation = await Conversation.create({userId})
 return res.status(200).json(conversation)
}
catch (error) {
return res.status(500).json({message:`Create Conversation Error ${error}`})
}
}


export const getConversations = async (req,res) =>{
try{

 const userId= req.header["x-user-id"]
 console.log("userId" ,userId)
 const conversations = await Conversation.find({userId}).sort({updatedAt:-1})
 return res.status(200).json(conversations)
}
catch (error) {
return res.status(500).json({message:`Get Conversation Error ${error}`})
}
}


export const updateConversation = async (req,res) =>{
try{

    const {Id,title} = req.body;
 const conversations = await Conversation.findByIDAndUpdate(Id,{title})
 return res.status(200).json(conversations)
}
catch (error) {
return res.status(500).json({message:`Update Conversation Error ${error}`})
}
}






export const saveMessage = async (req,res) =>{
    try{
  const {conversationId,role,content} = req.body;
  const message = Message.create(
    {
      conversationId,
      role,
      content
    }
  )
   return res.status(200).json(message)

    }
    catch (error){

return res.status(500).json({message:`Create Message Error ${error}`})
    }
}


export const getMessages = async (req,res) =>{
    try{
  const messages = Message.find(
    {
      conversationId : req.params.conversationId
    }
  ).sort({createdAt:-1})
   return res.status(200).json(messages)

    }
    catch (error){

return res.status(500).json({message:`Get Messages Error ${error}`})
    }
}