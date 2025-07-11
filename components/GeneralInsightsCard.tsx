import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export interface GeneralInsight {
  id: string;
  title: string;
  description: string;
}

interface GeneralInsightsCardProps {
  insights: GeneralInsight[];
  onTalkToChat: (insight: GeneralInsight) => void;
}

export const GeneralInsightsCard: React.FC<GeneralInsightsCardProps> = ({ insights, onTalkToChat }) => {
  if (!insights || insights.length === 0) return null;
  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-blue-900">AI Insights: <span className="font-normal text-blue-800">What to build next</span></h2>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div>
              <div className="text-blue-900 font-semibold text-base flex items-center gap-2">
                <span>💡</span>
                <span>{insight.title}</span>
              </div>
              <div className="text-blue-800 mt-1 text-sm">{insight.description}</div>
            </div>
            <Button
              variant="outline"
              className="ml-4 whitespace-nowrap"
              onClick={() => onTalkToChat(insight)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Talk to Chat
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}; 