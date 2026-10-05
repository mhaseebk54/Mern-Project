import { useSelector } from "react-redux"
import MessageBubble from "./MessageBubble"

function MessageList() {
    const {selectedConversation} = useSelector((state)=>state.conversation)
    const {messages} = useSelector((state)=>state.message)
  return (
 <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5
 [scrollbar-width:none] [&::-webkit-scrollbar:hidden]">

  {messages?.length==0 || !selectedConversation ? (
    <div className='h-full flex flex-col items-center justify-center gap-4 text-center'>
      <div className='flex flex-col gap-1.5'>
        <h1 className="text-[20px] font-semibold text-slate-200 tracking-tight"> Chatex AI </h1>
        <p className="text-[15px] font-semibold text-slate-400 tracking-tight">How can I help you?</p>
        <p className="text-[13px] text-slate-600 max-w-[260px] leading-relaxed">Ask me anything about code ideas images and more </p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center items-center mt-1">
        {["Explain Redis","Build A Dashboard","Build a Website"].map((s)=>(
         <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-slate-100 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200">
           {s}
         </button>
        ))}
      </div>
    </div>  
  ):
  <div> 
    {messages?.map((msg,i)=>(
      <div>
        <MessageBubble role={msg.role} content={msg.content} key={i}/>
      </div>  
    ))}
     </div>

  }
      
    </div>
  )
}

export default MessageList
