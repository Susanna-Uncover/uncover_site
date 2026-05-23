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
        </div>
      </section>
    </Layout>
  );
};

export default TelcoChurnAnalysis;
