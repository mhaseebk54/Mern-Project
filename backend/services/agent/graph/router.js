import { getllm } from "../config/llmmodel";

 export const router = async (state) => {
    const llm =getllm("router");
    const prompt = `You are a router agent that receives a user query and decides which agent is best suited to handle the request. The available agents are: chat, coding, search, pdf, ppt, imagegen. Based on the user's query, return the name of the most appropriate agent as a single word. If the query is ambiguous or does not clearly match any agent, return "chat" as the default agent. User query: "${state.query}"`;
    const response = await llm.invoke(prompt);
    console.log("Router response:", response.content)
    return {
        ...state,
        agent: response.content.text.trim().toLowerCase()
    }
}