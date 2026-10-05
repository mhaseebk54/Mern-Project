import { getllm } from "../config/llmmodel.js";

export const chatAgent = async (state) => {
    const llm =await getllm("chat")
    const systemprompt = `You are a helpful assistant that provides information and answers questions based on the user's input. Please respond in a clear and concise manner. User query:`;
    const response = await llm.invoke([
        {
"role": "system",
"content": systemprompt
    },
{
"role": "human",
"content": state.prompt
}
]);
    return {...state,
        aiResponse:response.content}
}