import {PanelLeftIcon, PenSquare,Plus,MessageSquare,User,Coins, LogOut, PanelRight}  from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getConversations } from "../features/getConversations"
import { addConversation, setConversation, setSelectedConversation } from "../redux/conversationSlice.js"
import { createConversation } from "../features/createConversation.js"
import { useSelector } from "react-redux"
import logOut from "../features/logOut.js"
import { setUserdata } from "../redux/userSlice.js"

function SideBar() {
   const [collapsed,setCollapsed] = useState(false)
   const [imageError,setImageError] = useState(false)
   const dispatch = useDispatch()
   const {conversation,selectedConversation} = useSelector((state)=>state.conversation)
   const {userData} = useSelector((state)=>state.user)
   useEffect(()=>{
   const getConv = async ()=>{
      const data = await getConversations()
      dispatch(setConversation(data))
    }
    getConv() 
   },[userData?._id])
   const handleCreateConversation =async ()=>{
    const data = await createConversation()
    dispatch(addConversation(data))
   }


    if(collapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r
      border-white/[0.06] py-4 gap-1 shrink-0">
        <button className="flex items-center justify-center w-9 h-9 rounded-r-xl text-slate-500
        hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1
        " onClick={()=>setCollapsed(false)}>
        <PanelRight/>
        </button>

        <button className="flex items-center justify-center w-9 h-9 rounded-r-xl text-slate-500
        hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
        onClick={handleCreateConversation}>
          <Plus size={17}/>
        </button>
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5">  
          {conversation.map((item,index)=>{
          const isSelected =selectedConversation?._id == item?._id
          return(
            <div 
            onClick={()=>dispatch(setSelectedConversation(item))} 
            className={`flex items-center gap-2.5 px-3 py-2.5 mb-0.5
            rounded-[10px] border transition-colors duration-150
            ${isSelected ? "bg-indigo-500/10 border-indigo-500/[0.18]"
               :  "bg-transparent border-transparent"}`}>

              <div className={`flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
              ${isSelected ? "bg-indigo-500/10 text-indigo-500" : "bg-transparent text-slate-500"}
              hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150`}>
                  <MessageSquare size={13}/>
                </div>
              
            </div>
          )
 
})}
        </div>



      <div className="relative shrink-0">
      {
        (userData?.avatar && !imageError ) 
        ?
        <img src={userData?.avatar} alt={"image"} className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25" onError={()=>setImageError(true)}/>
        :
         <div className='w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/[0.06]'> 
         <User size={15} className="text-slate-400"/> 
         </div>
       }
        </div>

        

      </div>
    )
  }


  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
        <div className="flex flex-col h-full">
    <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
     <div className="hideen lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
     hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent
     border-none cursor-pointer" onClick={()=>setCollapsed(true)}>
    <PanelLeftIcon/>
     </div>
     <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
    CortexAI
     </span>
     <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border
     border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
    free
     </span>
     <button className="hideen lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
     hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent
     border-none cursor-pointer" onClick={handleCreateConversation}>
      <PenSquare size={14}/>
     </button>
        </div>



      <div className="px-4 pt-4 pb-1">
      <button className="w-full item items-center justify-center gap-2 text-sm font-medium text-white
      bg-linear-to-br from-indigo-500 to-violet-700 rounded-b-lg px-3 py-2 border-none cursor-pointer
      hover:opacity-90 transition-opacity duration-150" onClick={handleCreateConversation}>
        <Plus size={15}/>
        New Chat
      </button>
      </div>


      {conversation.length == 0 ? 
      <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase text-slate-600 tracking-wide">
        No conversations yet. Start a new chat!
      </div>
      :
      (
        <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase text-slate-600 tracking-wide">
      Recent Conversations
        </div>
      )}

      
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">  
          {conversation.map((item,index)=>{
          const isSelected =selectedConversation?._id == item?._id
          return(
            <div 
            onClick={()=>dispatch(setSelectedConversation(item))} 
            className={`flex items-center gap-2.5 px-3 py-2.5 mb-0.5
            rounded-[10px] border transition-colors duration-150
            ${isSelected ? "bg-indigo-500/10 border-indigo-500/[0.18]"
               :  "bg-transparent border-transparent"}`}>

              <div className={`flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
              ${isSelected ? "bg-indigo-500/10 text-indigo-500" : "bg-transparent text-slate-500"}
              hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150`}>
                  <MessageSquare size={13}/>
                </div>
              
              
                <span className={`text-[13px] font-medium truncate ${isSelected ? "text-slate-100" : "text-slate-300"}`}>{item.title || "New Chat"}</span>

            </div>
          )
 
})}
        </div>

        <div className="mx-2.5 h-px border-b border-white/[0.06]"/>

    <div className="px-3.5 py-3.5">
    { userData ?
    (<div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5  bg-white/[0.05] transition-colors duration-150 hover:bg-white/[0.08]">
      <div className="relative shrink-0">
      {
        (userData?.avatar && !imageError ) 
        ?
        <img src={userData?.avatar} alt={"image"} className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25" onError={()=>setImageError(true)}/>
        :
         <div className='w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/[0.06]'> 
         <User size={15} className="text-slate-400"/> 
         </div>
       }
        </div>
        <div className="flex-1 min-w-0 ">
          <p className="text-[13.5px] font-semibold text-slate-100 truncate"> {userData?.name || "User"} </p>
          <p className="text-[11px] text-slate-600 mt-px">{"Free Plan"}</p>
        </div>

        <div className="flex gap-1">
         <button className="flex items-center justify-center w-7 h-7 rounded-[7px]
           bg-transparent border-none text-yellow-600 
          cursor-pointer hover:bg-white/[0.05] hover:text-slate-400 transition-all duration-150">
            <Coins size={16}/>
          </button>
         <button className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
          hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent
          border-none cursor-pointer" onClick={()=>{
          logOut();
          dispatch(setUserdata(null))
          }}>
            <LogOut size={16}/>
          </button>
        </div>
    </div>) 
    : 
    <button className="w-full item items-center justify-center gap-2 text-sm font-medium text-white
    bg-linear-to-br from-indigo-500 to-violet-700 rounded-b-lg px-3 py-2 border-none cursor-pointer
    hover:opacity-90 transition-opacity duration-150">
      Login
    </button>

    }
    </div>      

       </div>
       </div>
  )



}

export default SideBar
