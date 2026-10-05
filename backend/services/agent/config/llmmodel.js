import "dotenv/config"
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"


const groq = new ChatGroq({
  model: "llama-3.1-70b-versatile",
  temperature: 0,
  maxRetries: 3,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0,
  maxRetries: 3,
});


export const getllm = async (agent) => {
    switch(agent) {
        case "chat" :
        return groq
        case "coding":
             return gemini
        case "search":
            return groq
        case "pdf":
            return gemini
        case "ppt":
            return gemini
        case "imagegen":
            return gemini
        default:
            return groq
    };

}   