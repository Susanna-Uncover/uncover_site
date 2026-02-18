import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <div className="group bg-card border border-border rounded-lg p-6 hover:bg-card-hover hover-lift cursor-default">
    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon size={20} className="text-primary" />
    </div>
    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default ServiceCard;
