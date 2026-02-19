import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { BookOpen, Car } from "lucide-react";

const projects = [
  { title: "Cleaning Goodreads Data for Top Sci-Fi Recommendations", slug: "goodreads-sql", tag: "SQL", icon: BookOpen },
  { title: "Exploring and Visualising the Seattle Collision Data", slug: "seattle-collisions", tag: "SQL, Tableau", icon: Car },
  { title: "Project 3", slug: "portfolio-3" },
  { title: "Project 4", slug: "portfolio-4" },
  { title: "Project 5", slug: "portfolio-5" },
  { title: "Project 6", slug: "portfolio-6" },
];

const Portfolio = () => (
  <Layout>
    <section className="section-padding pt-28 min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Portfolio</p>
        <h1 className="font-display text-4xl font-bold mb-10">My Projects</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} title={p.title} slug={p.slug} basePath="/portfolio" tag={p.tag} icon={p.icon} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
