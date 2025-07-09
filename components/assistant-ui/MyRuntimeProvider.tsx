"use client";

import { ActionId } from "@/types";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export function MyRuntimeProvider({
  children,
  projectId,
  actionIds,  
}: Readonly<{
  children: React.ReactNode;
  projectId?: string;
  actionIds?: ActionId[];
}>) {


  const runtime = useChatRuntime({
    api: "/api/chat",
    body: {
      actionIds: actionIds,
      projectId: projectId,
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}