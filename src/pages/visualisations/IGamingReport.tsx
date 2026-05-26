import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PDF_URL = `${import.meta.env.BASE_URL}igaming-report.pdf`;

const IGamingReport = () => {
  return (
    <Layout>
      <section className="section-padding pt-28 min-h-[70vh]">
        <div className="max-w-6xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/visualisations">
              <ArrowLeft size={16} className="mr-2" />
              Back to Visualisations
            </Link>
          </Button>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Power BI</p>
          <h1 className="font-display text-4xl font-bold mb-6">iGaming Performance Report</h1>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">
            An iGaming performance report built in Power BI, exploring player activity, revenue trends and product engagement. Embedded below as a PDF export of the interactive dashboard.
          </p>
          <p className="mb-8">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm font-medium"
            >
              Open full PDF in new tab →
            </a>
          </p>
          <div className="w-full rounded-2xl overflow-hidden border border-border bg-secondary/30">
            <iframe
              src={PDF_URL}
              title="iGaming Performance Report"
              className="w-full"
              style={{ height: "80vh", border: 0 }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IGamingReport;
