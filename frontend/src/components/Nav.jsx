
import { MessageSquare } from 'lucide-react';
import { useSelector } from "react-redux"


function Nav() {
    const {selectedConversation} = useSelector((state)=>state.conversation)
    const {messages} = useSelector((state)=>state.message)
  return (
    <>
    {selectedConversation &&   <div className="h-14 flex items-center px-5 gap-2.5 border-b border-white/[0.06] bg-[#0d0f14]">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-500/10 border
         border-indigo-500/20 ">
        <MessageSquare size={13} className='text-indigo-400'/>
        </div>
      <div className="text-[14px] font-semibold text-slate-100 tracking-tight">
    {selectedConversation?.title || "New Chat"}
    </div>
    <div className="text-[10px] font-medium text-slate-600 bg-white/[0.04] border
    border-white/[0.06] px-2 py-0.5 rounded-full tracking-tight">
    {messages?.length} Messages
        
    </div>
    </div> }

    </>
   
  )
}

export default Nav
