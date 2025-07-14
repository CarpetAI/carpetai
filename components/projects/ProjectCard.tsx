import Link from "next/link";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/replays/${project.id}`}
      className="flex flex-col justify-between aspect-[4/3] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-shadow group dark:bg-[#23272f] dark:border-gray-800"
    >
      <div className="flex-1 flex flex-col justify-center items-start">
        <div className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors dark:text-white">{project.name}</div>
      </div>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Created: {new Date(project.createdAt * 1000).toLocaleDateString()}</div>
    </Link>
  );
} 