import { currentUser } from "@clerk/nextjs/server";
import { getProjectDetail, getSessionReplayIds, getProjectActionIds, getProjectInsights } from "@/lib/utils";
import { ActionId } from "@/types";  
import ReplaysComp from "@/components/replays/ReplaysComp";

interface SessionMeta {
  sessionId: string;
  timestamp: number;
  url: string;
  gcs_path?: string;
}

interface PageProps {
  params: Promise<{ projectid: string }>;
}

export default async function SessionReplaysPage({ params }: PageProps) {
  const { projectid: projectId } = await params;
  const user = await currentUser();
  
  if (!user) {
    return <ReplaysComp projectId={projectId} />;
  }

  try {
    const [projectDetail, sessionsData, actionIdsData, insightsData] = await Promise.all([
      getProjectDetail(projectId).catch(() => null),
      getSessionReplayIds(projectId).catch(() => []),
      getProjectActionIds(projectId).catch(() => []),
      getProjectInsights(projectId).catch(() => [])
    ]);

    const filteredActionIds = actionIdsData.filter((actionId: ActionId) => {
      const actionIdString = actionId.id;
      return !actionIdString.startsWith('input') && 
             !actionIdString.startsWith('clicked_input') && 
             !actionIdString.includes('element') && 
             !actionIdString.startsWith('scrolled');
    });

    return (
      <ReplaysComp 
        projectId={projectId}
        initialProjectDetail={projectDetail}
        initialSessions={Array.isArray(sessionsData) ? sessionsData as SessionMeta[] : []}
        initialActionIds={filteredActionIds}
        initialGeneralInsights={insightsData}
      />
    );
  } catch (error) {
    console.error('Error fetching replays data:', error);
    return <ReplaysComp projectId={projectId} />;
  }
} 