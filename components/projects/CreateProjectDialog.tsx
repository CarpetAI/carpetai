"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (projectName: string) => Promise<void>;
  creating: boolean;
}

export default function CreateProjectDialog({ 
  open, 
  onOpenChange, 
  onCreateProject, 
  creating 
}: CreateProjectDialogProps) {
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = async () => {
    if (!projectName.trim()) return;
    
    await onCreateProject(projectName.trim());
    setProjectName("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setProjectName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onClick={handleCancel}
              disabled={creating}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 