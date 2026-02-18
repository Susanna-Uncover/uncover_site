import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectInfo {
  title: string;
  backPath: string;
  backLabel: string;
}

const projectMap: Record<string, ProjectInfo> = {
  "portfolio-1": { title: "Project 1", backPath: "/portfolio", backLabel: "Portfolio" },
  "portfolio-2": { title: "Project 2", backPath: "/portfolio", backLabel: "Portfolio" },
  "portfolio-3": { title: "Project 3", backPath: "/portfolio", backLabel: "Portfolio" },
  "portfolio-4": { title: "Project 4", backPath: "/portfolio", backLabel: "Portfolio" },
  "portfolio-5": { title: "Project 5", backPath: "/portfolio", backLabel: "Portfolio" },
  "portfolio-6": { title: "Project 6", backPath: "/portfolio", backLabel: "Portfolio" },
  "visualisation-1": { title: "Visualisation 1", backPath: "/visualisations", backLabel: "Visualisations" },
  "visualisation-2": { title: "Visualisation 2", backPath: "/visualisations", backLabel: "Visualisations" },
  "visualisation-3": { title: "Visualisation 3", backPath: "/visualisations", backLabel: "Visualisations" },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectMap[slug] : null;

  if (!project) {
    return (
      <Layout>
        <section className="section-padding min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Project not found.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding pt-28 min-h-[70vh]">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to={project.backPath}>
              <ArrowLeft size={16} className="mr-2" />
              Back to {project.backLabel}
            </Link>
          </Button>
          <h1 className="font-display text-4xl font-bold mb-4">{project.title}</h1>
          <div className="aspect-video rounded-2xl bg-secondary/50 border border-border flex items-center justify-center mb-8">
            <p className="text-muted-foreground text-lg">Coming Soon</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Details for this project will be added soon.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
