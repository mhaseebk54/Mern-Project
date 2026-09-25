import api from "../../utilis/axios"

export const createConversation =async () =>{
    try{
        const {data}=await api.get("/api/chat/create-conversation")
        return data
    }
    catch(error){
        console.log(error)
        return []
    }
}


// export const createConversation = async () => {
//     try{
//         const {data} = await api.get("/api/chat/create-conversation")
//         return data.conversation ?? data   // adjust based on what you logged
//     }
//     catch(error){
//         console.log(error)
//         return null   // not [] — this should be a single object, not an array
//     }
// }