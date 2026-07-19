import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "projects",
  description:
    "Things I've built — security tooling, web apps and network automation. Curated from github.com/amdjadmoh.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6">
      <PageHeader
        command="ls -la ~/projects"
        title="projects"
        description="Security tooling, full-stack apps and network automation — everything links back to the source on GitHub. Filter by domain."
      />
      <ProjectsExplorer />
    </div>
  );
}
