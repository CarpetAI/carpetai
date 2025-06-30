import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { z } from "zod";
import { getRagAnswer } from '../../../lib/utils';

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, tools } = await req.json();

  const system = `
 You are an AI assistant that analyzes user session replay data to answer questions about user behavior.
Your task is to analyze session replay data and provide clear, evidence-based answers about what users were doing, their goals, and any issues they encountered.

Guidelines:
1. Focus on the most relevant chunks (higher relevance scores)
2. If multiple sessions are present, identify patterns across sessions
3. For cross-session analysis, note which session each behavior occurred in
4. Provide specific, actionable insights based on the evidence
5. Be clear about what the user was doing, when, and why
6. If the data doesn't contain enough information, acknowledge this
7. Use the timing information to understand the user's journey
8. Identify patterns, frustrations, or successful interactions
9. For pattern analysis, look for common behaviors, issues, or trends across sessions
10. Be concise but thorough in your analysis
  `;

  const result = streamText({
    maxSteps: 5,
    model: openai("gpt-4.1"),
    messages,
    toolCallStreaming: true,
    system,
    tools: {
      ...frontendTools(tools),
      answerToReplayQuestion: {
        description: "Use session replay data to answer a question about user behavior",
        parameters: z.object({
          question: z.string(),
        }),
        execute: async ({ question }) => {
          const answer = await getRagAnswer(question);

          return answer;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
