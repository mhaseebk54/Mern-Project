import MessageList from "./MessageList"
import Nav from "./Nav"
import ChatInput from "./ChatInput"
import { useEffect } from "react"
import getMessages from "../features/getMessages"
import { setMessage } from "../redux/MessagesSlice"
import { useSelector,useDispatch } from "react-redux"

function ChatArea() {

    const {selectedConversation} = useSelector((state)=>state.conversation)
    const dispatch = useDispatch()
     useEffect(()=>{
    const getMesg=async ()=>{
      if(selectedConversation){
        const data = await getMessages(selectedConversation?._id)
        dispatch(setMessage(data))
      }
    }
    getMesg()
  },[selectedConversation])



  return (
    <div className="flex-1 flex flex-col ">
      <Nav />
      <MessageList />
      <ChatInput />


    </div>
  )
}

export default ChatArea