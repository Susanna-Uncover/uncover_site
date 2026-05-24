import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIZ_WIDTH = 1366;
const VIZ_HEIGHT = 795;
const VIZ_URL =
  "https://public.tableau.com/views/TelcoMonthlyChurnAnalysis-One-PageSummary/ChurnAnalysis-Telco?:language=en-GB&:embed=true&:showVizHome=no&:toolbar=yes&:display_count=n&:origin=viz_share_link";

const TelcoChurnAnalysis = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = wrapperRef.current?.offsetWidth ?? VIZ_WIDTH;
      setScale(Math.min(1, w / VIZ_WIDTH));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">Tableau</p>
          <h1 className="font-display text-4xl font-bold mb-6">Telco Monthly Churn Analysis</h1>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">
            This Telco Monthly Churn Analysis was designed to identify the biggest retention risks across customer tenure, contract type, and service bundle. It highlights where churn is most concentrated, which segments generate the most revenue at risk, and where protective services could make the greatest difference.
          </p>
          <p className="mb-8">
            <a
              href="https://public.tableau.com/views/TelcoMonthlyChurnAnalysis-One-PageSummary/ChurnAnalysis-Telco?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm font-medium"
            >
              View full dashboard on Tableau Public →
            </a>
          </p>
          <div
            ref={wrapperRef}
            className="w-full rounded-2xl overflow-hidden border border-border bg-secondary/30"
            style={{ height: VIZ_HEIGHT * scale }}
          >
            <iframe
              src={VIZ_URL}
              title="Telco Monthly Churn Analysis"
              width={VIZ_WIDTH}
              height={VIZ_HEIGHT}
              style={{
                border: 0,
                width: VIZ_WIDTH,
                height: VIZ_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
              allowFullScreen
            />
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="font-display text-2xl font-bold mb-4">Key findings</h2>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              <li className="pl-4 border-l-2 border-primary/30">
                <span className="text-primary font-semibold">Critical Window:</span> The first 12 months are the most critical retention window, with churn at 48% for customers in the 0–12 month tenure band, then steadily declining as tenure increases.
              </li>
              <li className="pl-4 border-l-2 border-primary/30">
                <span className="text-primary font-semibold">Highest-Risk Contract:</span> Month-to-month customers are the highest-risk contract group, with churn at 43% and the largest revenue at risk at $121K.
              </li>
              <li className="pl-4 border-l-2 border-primary/30">
                <span className="text-primary font-semibold">Service Gaps:</span> Customers without protective services are concentrated in the highest-risk segments, especially fibre optic users with no bundle.
              </li>
              <li className="pl-4 border-l-2 border-primary/30">
                <span className="text-primary font-semibold">Revenue Leakage:</span> Churned customers generally cost more than retained customers across contract types, suggesting a clear revenue leakage tied to weaker customer stickiness.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TelcoChurnAnalysis;
