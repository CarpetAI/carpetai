import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { z } from "zod";
import { getRagAnswer } from '../../../lib/utils';

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, tools, actionIds, projectId } = await req.json();

  const system = `
 You are an AI assistant that analyzes user session replay data to answer questions about user behavior.
Your task is to analyze session replay data and provide clear, evidence-based answers about what users were doing, their goals, and any issues they encountered.

Available Action IDs: ${JSON.stringify(actionIds || [])}

IMPORTANT: When users ask questions about specific actions or behaviors, you should use the getRelavantReplayData tool with the appropriate actionId to retrieve the relevant session replay logs. This will give you the most accurate and up-to-date information about user behavior.

The data returned will include context events organized by session, showing the user's journey and actions leading up to and following the target action.

Guidelines:
1. Use action IDs to retrieve relevant logs when analyzing specific user actions or behaviors
2. Analyze the context events to understand the full user journey around the target action
3. Pay attention to timestamps to understand the sequence and timing of user actions
4. Identify patterns in user behavior across multiple sessions if present
5. Look for user frustrations (repeated clicks, scrolling, etc.) or successful interactions
6. Consider the element types and action strings to understand what users were interacting with
7. Provide specific, actionable insights based on the evidence
8. Be clear about what the user was doing, when, and why
9. If the data doesn't contain enough information, acknowledge this
10. Use the timing information to understand the user's journey and flow
11. For pattern analysis, look for common behaviors, issues, or trends across sessions
12. Be concise but thorough in your analysis
13. Always use the getRelavantReplayData tool when you need to access session replay data
14. When analyzing the data, consider the user's intent and goals based on their actions
  `;

  const result = streamText({
    maxSteps: 5,
    model: openai("gpt-4.1"),
    messages,
    toolCallStreaming: true,
    system,
    tools: {
      ...frontendTools(tools),
      getRelavantReplayData: {
        description: "Retrieve relevant replay data for a specific action ID",
        parameters: z.object({
          actionId: z.string(),
        }),
        execute: async ({ actionId }) => {
          const answer = await getRagAnswer(actionId, projectId);
          return answer.context_events_by_session;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
