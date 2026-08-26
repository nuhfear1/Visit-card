import ProjectsView from "@/components/ProjectsView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("fr", "projects", "/projects");

export default function ProjectsPage() {
  return <ProjectsView />;
}
