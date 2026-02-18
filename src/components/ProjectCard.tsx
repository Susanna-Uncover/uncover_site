import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  slug: string;
  basePath: string;
}

const ProjectCard = ({ title, slug, basePath }: ProjectCardProps) => (
  <Link
    to={`${basePath}/${slug}`}
    className="group block aspect-square rounded-2xl bg-secondary/50 border border-border hover:border-primary/40 transition-all duration-300 flex items-center justify-center"
  >
    <div className="text-center p-6">
      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">Coming Soon</p>
    </div>
  </Link>
);

export default ProjectCard;
