"use client";

import React, { useState } from "react";
import { createProject } from "../../lib/utils";
import { useUser } from "@clerk/nextjs";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import CreateProjectDialog from "./CreateProjectDialog";
import ProjectsGrid from "./ProjectsGrid";
import EmptyState from "./EmptyState";

interface ProjectsCompProps {
  initialProjects: Project[];
}

export default function ProjectsComp({ initialProjects }: ProjectsCompProps) {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleCreateProject = async (projectName: string) => {
    if (!user) return;
    
    setCreating(true);
    try {
      const result = await createProject(projectName, user.id);
      router.push(`/replays/${result.project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-[#18181b]">
      <Header />
      <main className="px-4 pt-12 pb-12">
        <div className="max-w-6xl w-full mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">Your Projects</h1>
          <div className="flex justify-center mb-8">
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              + Create New Project
            </Button>
          </div>
          <CreateProjectDialog
            open={showCreateForm}
            onOpenChange={setShowCreateForm}
            onCreateProject={handleCreateProject}
            creating={creating}
          />
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <ProjectsGrid projects={projects} />
          )}
        </div>
      </main>
    </div>
  );
} 