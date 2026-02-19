import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ProjectCardProps {
  title: string;
  slug: string;
  basePath: string;
  tag?: string;
  icon?: LucideIcon;
}

const ProjectCard = ({ title, slug, basePath, tag, icon: Icon }: ProjectCardProps) => (
  <Link
    to={`${basePath}/${slug}`}
    className="group block aspect-square rounded-2xl bg-secondary/50 border border-border hover:border-primary/40 transition-all duration-300 flex items-center justify-center"
  >
    <div className="text-center p-6">
      {Icon && (
        <Icon size={28} className="mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      {tag ? (
        <p className="text-primary text-sm font-medium">{tag}</p>
      ) : (
        <p className="text-muted-foreground text-sm">Coming Soon</p>
      )}
    </div>
  </Link>
);

export default ProjectCard;
