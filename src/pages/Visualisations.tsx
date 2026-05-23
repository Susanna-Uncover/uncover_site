import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { BarChart3, TrendingDown } from "lucide-react";

const visualisations = [
  { title: "Paid Search Campaign Evaluation", slug: "paid-search-campaign", tag: "Tableau", icon: BarChart3 },
  { title: "Telco Monthly Churn Analysis", slug: "telco-churn-analysis", tag: "Tableau", icon: TrendingDown },
  { title: "Visualisation 3", slug: "visualisation-3" },
];

const Visualisations = () => (
  <Layout>
    <section className="section-padding pt-28 min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Visualisations</p>
        <h1 className="font-display text-4xl font-bold mb-10">Data Visualisations</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {visualisations.map((v) => (
            <ProjectCard key={v.slug} title={v.title} slug={v.slug} basePath="/visualisations" tag={v.tag} icon={v.icon} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Visualisations;
