import { Paperclip, Mic, Send } from "lucide-react";
import { useState } from "react";
import sendMessage from "../features/sendMessage";
import { useSelector } from "react-redux"

function ChatInput() {
  const [value, setValue] = useState("")
   const {selectedConversation} = useSelector((state)=>state.conversation)
  const handleSendMessage =async () => {
    const payload = {
      prompt :value.trim()
      ,conversationId : selectedConversation?.id  
    }
    const data = await sendMessage(payload)
    console.log(data)
  }
  return (
    <div className="w-full overflow-hidden  px-3 md:px-5 border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 border-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3">
      <textarea className="w-full resize-none bg-transparent outline-none text-[14px] 
      text-slate-200 placeholder:text-slate-600 leading-relaxed
      [scrollbar-width:none] [&::-webkit-scrollbar:hidden] disabled:opacity-50" 
       placeholder="Ask me anything..." rows={3}
       value={value.trim()}
       onChange={(e) => setValue(e.target.value)}               
      />
      <div className="flex items-center justify-between ">
      <div className="flex items-center gap-1">
      <button className="flex items-center justify-center w-8 h-8 p-2 rounded-lg text-slate-600
       hover:text-slate-400 hover:bg-white/[0.05] border border-transparent
       hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
        <Paperclip size={16}/>
        </button>
        <button className="flex items-center justify-center w-8 h-8 p-2 rounded-lg text-slate-600
         hover:text-slate-400 hover:bg-white/[0.05] border border-transparent
         hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
        <Mic size={16}/>
        </button>

      </div>

     <button 
     disabled={!value}
     onClick={handleSendMessage}
     className= {`flex items-center justify-center w-8 h-8 p-2 rounded-lg cursor-pointer
      transtiton-all duration-150 ${value.trim() ?"bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white":
        "bg-white/[0.05] text-slate-600 cursor-not-allowed"}`}>
      <Send size={15}/>
      </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
