import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { BarChart3, Search, PieChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import susannaBw from "@/assets/susanna-bw.jpg";


const services = [
  {
    icon: Search,
    title: "Market Research",
    description:
      "Traditional and modern research methods to uncover consumer insights, market trends, and competitive intelligence.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Turning raw data into actionable insights through statistical analysis, modelling, and strategic interpretation.",
  },
  {
    icon: PieChart,
    title: "Data Visualisation",
    description:
      "Compelling visual stories from complex datasets — dashboards, interactive charts, and presentation-ready graphics.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding flex flex-col justify-center min-h-[80vh]">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="max-w-3xl flex-1">
            <p className="text-primary font-medium text-sm mb-4 tracking-widest uppercase">
              Insight Consultant &amp; Data Analyst
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              Hello, I'm{" "}
              <span className="text-gradient">Susanna</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              I help organisations make smarter decisions through data analytics,
              market research, and compelling data visualisation. Independent
              researcher turning complexity into clarity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/portfolio">
                  View My Work <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <img
            src={susannaBw}
            alt="Susanna Tatevosyan"
            className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover shrink-0 border border-border"
          />
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
            What I Do
          </p>
          <h2 className="font-display text-3xl font-bold mb-10">Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
