"use client";

import React, { useRef, useState } from "react";
import { getSessionReplayEvents } from "../../lib/utils";
import { MyRuntimeProvider } from "@/components/assistant-ui/MyRuntimeProvider";
import { Thread } from "@/components/assistant-ui/thread";
import Link from "next/link";
import OnboardingDocs from "@/components/OnboardingDocs";
import { Button } from "@/components/ui/button";
import { ProjectDetail, ActionId } from "@/types";
import { ActionIdsChart } from "@/components/ActionIdsChart";
import { GeneralInsightsCard, GeneralInsight } from "@/components/GeneralInsightsCard";
import Header from "@/components/common/Header";

interface eventWithTime {
  type: number;
  data: unknown;
  timestamp: number;
  [key: string]: unknown;
}

interface SessionMeta {
  sessionId: string;
  timestamp: number;
  url: string;
  gcs_path?: string;
}

interface ReplaysCompProps {
  projectId: string;
  initialProjectDetail?: ProjectDetail | null;
  initialSessions?: SessionMeta[];
  initialActionIds?: ActionId[];
  initialGeneralInsights?: GeneralInsight[];
}

export default function ReplaysComp({ 
  projectId, 
  initialProjectDetail = null, 
  initialSessions = [], 
  initialActionIds = [], 
  initialGeneralInsights = [] 
}: ReplaysCompProps) {
  const [sessions, setSessions] = useState<SessionMeta[]>(initialSessions);
  const [selectedSession, setSelectedSession] = useState<SessionMeta | null>(null);
  const [events, setEvents] = useState<eventWithTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(initialProjectDetail);
  const [actionIds, setActionIds] = useState<ActionId[]>(initialActionIds);
  const [generalInsights, setGeneralInsights] = useState<GeneralInsight[]>(initialGeneralInsights);

  const chatSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSelectSession = async (session: SessionMeta) => {
    setSelectedSession(session);
    setLoading(true);
    setEvents([]);
    const events = await getSessionReplayEvents(session.sessionId);
    setEvents(events as eventWithTime[]);
    setLoading(false);
  };

  const handleTalkToChat = (insight: GeneralInsight) => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('Pasting to chat:', insight.title + ' ' + insight.description);
  };

  const handleRefreshSessions = async () => {
    setSessionsLoading(true);
    try {
      const { getSessionReplayIds } = await import("../../lib/utils");
      const data = await getSessionReplayIds(projectId);
      setSessions(Array.isArray(data) ? data as SessionMeta[] : []);
    } catch (error) {
      console.error('Failed to refresh sessions:', error);
    } finally {
      setSessionsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f9fb]">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-6">
        {projectDetail && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium flex items-center gap-1">
                ← Back to Projects
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{projectDetail.name}</h1>
            <p className="text-gray-600">Session Replays</p>
          </div>
        )}
        <GeneralInsightsCard insights={generalInsights} onTalkToChat={handleTalkToChat} />
        <ActionIdsChart actionIds={actionIds} />
        {sessionsLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">Loading sessions...</div>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-gray-900">You have no sessions</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshSessions}
                className="p-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Button>
            </div>
            <OnboardingDocs projectId={projectId} />
          </div>
        ) : (
          <>
        <div className="flex flex-col lg:flex-row gap-6 overflow-hidden h-[calc(100vh-160px)]">
          <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col mb-4 lg:mb-0 overflow-y-auto max-h-full">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-base font-semibold">Sessions</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {sessions.length === 0 && (
                <div className="text-gray-500 text-sm text-center py-8">No sessions found.</div>
              )}
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className={`p-3 rounded-lg cursor-pointer text-sm border transition-all mb-2 ${
                    selectedSession?.sessionId === session.sessionId 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSelectSession(session)}
                >
                  <div className="font-medium mb-1 truncate">{session.sessionId}</div>
                  <div className="text-gray-600 text-xs mb-1">
                    {new Date(session.timestamp * 1000).toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-xs truncate">{session.url}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center overflow-hidden">
            <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center justify-start">
              <h2 className="text-base font-semibold mb-2">
                {selectedSession ? `Replay: ${selectedSession.sessionId}` : 'Session Replay'}
              </h2>
              <div className="flex-1 w-full flex flex-col items-center justify-center overflow-hidden">
                {selectedSession ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    {loading && <div>Loading replay...</div>}
                    {!loading && events.length > 0 && (
                      <>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css" />
                        <div className="flex justify-center items-center w-full h-full">
                          <RRWebPlayer events={events} />
                        </div>
                      </>
                    )}
                    {!loading && events.length === 0 && (
                      <div>No events found for this session.</div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center mt-20">
                    <div className="text-lg mb-2">Select a session</div>
                    <div className="text-sm">Choose a session from the list to view its replay</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-y-auto max-h-full">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-base font-semibold">AI Assistant</h2>
            </div>
            <div className="flex-1 overflow-hidden" ref={chatSectionRef}>
              <MyRuntimeProvider projectId={projectId} actionIds={actionIds}>
                <Thread />
              </MyRuntimeProvider>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

function RRWebPlayer({ events }: { events: eventWithTime[] }) {
  const [mounted, setMounted] = React.useState(false);
  const playerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      // cleanup
    };
  }, []);

  React.useEffect(() => {
    if (!mounted || !playerRef.current || !events.length) return;
    
    const currentPlayerRef = playerRef.current;
    currentPlayerRef.innerHTML = "";
    
    const createPlayer = async () => {
      try {
        const mod = await import("rrweb-player");
        new mod.default({
          target: currentPlayerRef as unknown as HTMLElement,
          props: {
            events,
            width: 1024,
            height: 576,
            maxScale: 1,
            autoPlay: true,
            speed: 1,
            speedOption: [1, 2, 4, 8],
            showController: true,
            inactiveColor: '#D4D4D4',
          },
        });
      } catch (error) {
        console.error("Failed to create rrweb player:", error);
      }
    };
    createPlayer();
    return () => {
      if (currentPlayerRef) {
        currentPlayerRef.innerHTML = "";
      }
    };
  }, [events, mounted]);

  if (!mounted) return null;
  return (
    <div
      ref={playerRef}
      className="w-full max-w-[1024px] max-h-[576px] flex justify-center items-center"
      style={{ aspectRatio: '16/9', minHeight: 320 }}
    />
  );
} 