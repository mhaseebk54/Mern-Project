import { StateGraph, START, END } from '@langchain/langgraph';
import { agentState } from './state.js';
import { router } from './router.js';
import { chatAgent } from '../agents/chatAgent.js';
import { searchAgent } from '../agents/searchAgent.js';
import { imagegenAgent } from '../agents/imagegenAgent.js';
import { codingAgent } from '../agents/codingAgent.js';
import { pdfAgent } from '../agents/pdfAgent.js';
import { pptAgent } from '../agents/pptAgent.js';

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("imagegen", imagegenAgent);

workflow.addEdge(START, "router");

workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":     return "chat";
      case "search":   return "search";
      case "coding":   return "coding";
      case "pdf":      return "pdf";
      case "ppt":      return "ppt";
      case "imagegen": return "imagegen";
      default:         return "chat";
    }
  },
  {
    chat: "chat",
    search: "search",
    coding: "coding",
    pdf: "pdf",
    ppt: "ppt",
    imagegen: "imagegen",
  }
);

workflow.addEdge("search", "chat");
workflow.addEdge("chat", END);
workflow.addEdge("coding", END);
workflow.addEdge("pdf", END);
workflow.addEdge("ppt", END);
workflow.addEdge("imagegen", END);

export const graph = workflow.compile();