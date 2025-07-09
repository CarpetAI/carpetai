import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { z } from "zod";
import { getRagAnswer, getActionIdMetrics } from '../../../lib/utils';
import { ActionId } from "@/types";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, tools, actionIds, projectId } = await req.json();

  const actionIdsString = actionIds.map((action: ActionId ) => action.id).join(", ");

  const system = `
 You are an AI assistant that analyzes user session replay data to answer questions about user behavior.
Your task is to analyze session replay data and provide clear, evidence-based answers about what users were doing, their goals, and any issues they encountered.

Available Action IDs: ${actionIdsString}

IMPORTANT: When users ask questions about specific actions or behaviors, you should use the getRelavantReplayData tool with the appropriate actionId to retrieve the relevant session replay logs. This will give you the most accurate and up-to-date information about user behavior.
The data returned will include context events organized by session, showing the user's journey and actions leading up to and following the target action.

For questions about metrics, performance data, or quantitative analysis of user actions, use the getActionIdMetrics tool to retrieve statistical information about specific action IDs.

You can and should use both tools sequentially when appropriate - for example, first get metrics to understand the quantitative performance, then get replay data to understand the qualitative user behavior and context.

Guidelines:
1. Use getRelavantReplayData for detailed session replay logs and qualitative analysis
2. Use getActionIdMetrics for quantitative metrics, statistics, and performance data
3. Use both tools sequentially when appropriate - metrics first, then replay data for comprehensive analysis
4. Analyze context events to understand the full user journey around target actions
5. Pay attention to timestamps to understand sequence and timing of user actions
6. Identify patterns in user behavior across multiple sessions
7. Look for user frustrations (repeated clicks, scrolling) or successful interactions
8. Consider element types and action strings to understand user interactions
9. Provide specific, actionable insights based on evidence
10. Be clear about what users were doing, when, and why
11. If data is insufficient, acknowledge limitations
12. For complex questions, combine quantitative metrics with qualitative replay data
13. Be concise but thorough in analysis
  `;

  const result = streamText({
    maxSteps: 10,
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
      getActionIdMetrics: {
        description: "Retrieve metrics for a specific action ID",
        parameters: z.object({
          actionId: z.string(),
        }),
        execute: async ({ actionId }) => {
          const metrics = await getActionIdMetrics(actionIds, actionId);
          return metrics;
        },
      },  
    },
  });

  return result.toDataStreamResponse();
}
