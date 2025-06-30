"use client";

import React, { useEffect, useState } from "react";
import { getUserProjects, createProject } from "../../lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProjectsPage() {
  const { user, isLoaded } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;
    getUserProjects(user.id).then((data) => {
      setProjects(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, [isLoaded, user, router]);

  const handleCreateProject = async () => {
    if (!projectName.trim() || !user) return;
    
    setCreating(true);
    try {
      const result = await createProject(projectName.trim(), user.id);
      router.push(`/replays/${result.project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-[#18181b]">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#18181b]">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">C</div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CartpetAI</span>
        </Link>
      </header>
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
          {showCreateForm && (
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">Project Name</Label>
                    <div className="mt-2">
                    <Input
                      id="projectName"
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter project name..."
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                    />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleCreateProject}
                      disabled={!projectName.trim() || creating}
                      className="flex-1"
                    >
                      {creating ? 'Creating...' : 'Create Project'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowCreateForm(false);
                        setProjectName("");
                      }}
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {loading ? (
            <div className="text-blue-600 text-center font-semibold">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>No projects yet. Click &quot;Create New Project&quot; above to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.name}
                  href={`/replays/${project.id}`}
                  className="flex flex-col justify-between aspect-[4/3] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-shadow group dark:bg-[#23272f] dark:border-gray-800"
                >
                  <div className="flex-1 flex flex-col justify-center items-start">
                    <div className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors dark:text-white">{project.name}</div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Created: {new Date(project.createdAt * 1000).toLocaleDateString()}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 