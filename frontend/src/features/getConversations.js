import api from "../../utilis/axios"

export const getConversations =async () =>{
    try{
        const {data}=await api.get("/api/chat/get-conversations")
        return data
    }
    catch(error){
        console.log(error)
        return []
    }
}

// export const getConversations = async () => {
//     try{
//         const {data} = await api.get("/api/chat/get-conversations")
//         return data.conversations ?? []   // unwrap
//     }
//     catch(error){
//         console.log(error)
//         return []
//     }
// }