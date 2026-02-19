import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  { title: "Cleaning Goodreads Data in SQL", slug: "goodreads-sql" },
  { title: "Project 2", slug: "portfolio-2" },
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
            <ProjectCard key={p.slug} title={p.title} slug={p.slug} basePath="/portfolio" />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
