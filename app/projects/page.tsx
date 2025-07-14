import { currentUser } from "@clerk/nextjs/server";
import { getUserProjects } from "@/lib/utils";
import ProjectsComp from "@/components/projects/ProjectsComp";
import { Project } from "@/types";

export default async function ProjectsPage() {
  const user = await currentUser();
  const projects: Project[] = user ? await getUserProjects(user.id) : [];
  
  return <ProjectsComp initialProjects={projects} />;
} 