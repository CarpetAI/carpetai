"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProjectDetail } from "@/lib/utils";
import { ProjectDetail } from "@/types";

const frameworks = [
  {
    key: "react",
    label: "React",
    steps: [
      {
        title: "Install for React",
        description: "Add the session recorder to your React app.",
        code: `npm install @carpetai/rrweb-recorder rrweb`,
        extra: `import { SessionRecorder } from '@carpetai/rrweb-recorder';\n\nfunction App() {\n  return (\n    <div>\n      <h1>My App</h1>\n      <SessionRecorder \n        apiKey=\"your-carpetai-api-key\"\n      />\n    </div>\n  );\n}`,
      },
    ],
  },
  {
    key: "nextjs",
    label: "Next.js",
    steps: [
      {
        title: "Install for Next.js",
        description: "Add the session recorder to your Next.js app.",
        code: `npm install @carpetai/rrweb-recorder-nextjs @carpetai/rrweb-recorder`,
        extra: `// app/layout.tsx\nimport { SessionRecorder } from '@carpetai/rrweb-recorder-nextjs';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang=\"en\">\n      <body>\n        {children}\n        <SessionRecorder apiKey={process.env.NEXT_PUBLIC_CARPETAI_API_KEY} />\n      </body>\n    </html>\n  );\n}`,
      },
    ],
  },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}

function CodeBlockWithCopy({ code, onCopy, copied }: { code: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="relative mb-2">
      <pre className="rounded-lg bg-muted dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
        <code lang="javascript">{code}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        onClick={onCopy}
        className="absolute top-2 right-2 dark:bg-[#23272f] dark:text-white"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}

function CopyPromptCard({ apiKey }: { apiKey: string | undefined }) {
  const [copied, setCopied] = useState(false);
  const react = frameworks.find(f => f.key === "react");
  const nextjs = frameworks.find(f => f.key === "nextjs");
  const prompt = `Carpet is an AI-powered session replay and analytics tool for web apps. It helps teams understand user behavior by recording sessions and providing actionable insights.\n\nAsk the user for their Carpet API key.\n\n---\n\n## React Installation\n\n1. Install the package:\n\n${react?.steps[0].code}\n\n2. Add the session recorder to your app as shown below:\n\n${react?.steps[0].extra}\n\n---\n\n## Next.js Installation\n\n1. Install the package:\n\n${nextjs?.steps[0].code}\n\n2. Add the session recorder to your app as shown below:\n\n${nextjs?.steps[0].extra}\n\n---\n\nGitHub: https://github.com/CarpetAI/carpetai-rrwebrecorder`;

  return (
    <div className="mb-8">
      <div className="rounded-2xl border border-gray-200 bg-[#fcfcf7] p-6 flex items-center gap-6 shadow-sm relative">
        <div className="absolute left-4 top-4 opacity-10 pointer-events-none select-none" style={{fontSize: 80, lineHeight: 1}}>
          <span role="img" aria-label="carpet"></span>
        </div>
        <div className="flex-1 z-10">
          <div className="text-lg font-semibold mb-1">Copy install prompt for Carpet</div>
          <div className="text-gray-600 text-base mb-2">Share this prompt with an AI agent to get started faster.</div>
        </div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="z-10 px-6 py-2 text-base font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          {copied ? "Copied!" : "Copy prompt"}
        </Button>
      </div>
    </div>
  );
}

interface OnboardingDocsProps {
  projectId: string;
}

export default function OnboardingDocs({ projectId }: OnboardingDocsProps) {
  const [selectedFramework, setSelectedFramework] = useState("react");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedExtraIdx, setCopiedExtraIdx] = useState<number | null>(null);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      getProjectDetail(projectId)
        .then((detail) => {
          setProjectDetail(detail);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch project detail:', error);
          setLoading(false);
        });
    }
  }, [projectId]);

  const framework = frameworks.find(f => f.key === selectedFramework);

  return (
    <div className="max-w-2xl mx-auto my-8">
      <CopyPromptCard apiKey={projectDetail?.publicApiKey} />
      <Card className="p-6 dark:bg-[#23272f] dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">API Quickstart</h1>
        {/* API Key Section */}
        <SectionHeader title="Your API Key" subtitle="Use this key to connect your app to CartpetAI." />
        <Card className="mb-6 dark:bg-[#23272f] dark:border-gray-800">
          <CardContent>
            <div className="flex items-center gap-2">
              <pre className="rounded-lg bg-muted dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 p-4 font-mono text-sm mb-2 overflow-x-auto whitespace-pre-wrap select-all">
                <code>{loading ? 'Loading...' : projectDetail?.publicApiKey || 'N/A'}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (projectDetail?.publicApiKey) {
                    navigator.clipboard.writeText(projectDetail.publicApiKey);
                    setCopiedApiKey(true);
                    setTimeout(() => setCopiedApiKey(false), 1200);
                  }
                }}
                className="dark:bg-[#23272f] dark:text-white"
              >
                {copiedApiKey ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Framework Toggle Tabs */}
        <div className="flex gap-2 mb-6">
          {frameworks.map((fw) => (
            <button
              key={fw.key}
              className={`px-4 py-2 rounded-t font-medium border-b-2 transition-colors duration-150 ${selectedFramework === fw.key ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600'}`}
              onClick={() => setSelectedFramework(fw.key)}
            >
              {fw.label}
            </button>
          ))}
        </div>
        {/* Onboarding Steps for Selected Framework */}
        {framework && framework.steps.map((step, i) => (
          <div key={i} className="mb-6">
            <SectionHeader title={step.title} subtitle={step.description} />
            <CodeBlockWithCopy
              code={step.code}
              onCopy={() => {
                navigator.clipboard.writeText(step.code);
                setCopiedIdx(i);
                setTimeout(() => setCopiedIdx(null), 1200);
              }}
              copied={copiedIdx === i}
            />
            {step.extra && (
              <CodeBlockWithCopy
                code={step.extra}
                onCopy={() => {
                  navigator.clipboard.writeText(step.extra);
                  setCopiedExtraIdx(i);
                  setTimeout(() => setCopiedExtraIdx(null), 1200);
                }}
                copied={copiedExtraIdx === i}
              />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
} 