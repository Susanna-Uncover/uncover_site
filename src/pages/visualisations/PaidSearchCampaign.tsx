import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaidSearchCampaign = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = `
      <div class='tableauPlaceholder' id='viz1779457378617' style='position: relative; width: 100%;'>
        <object class='tableauViz' style='display:none;'>
          <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
          <param name='embed_code_version' value='3' />
          <param name='path' value='shared&#47;H4G5B88DX' />
          <param name='toolbar' value='yes' />
          <param name='static_image' value='https://public.tableau.com/static/images/H4/H4G5B88DX/1.png' />
          <param name='animate_transition' value='yes' />
          <param name='display_static_image' value='yes' />
          <param name='display_spinner' value='yes' />
          <param name='display_overlay' value='yes' />
          <param name='display_count' value='yes' />
          <param name='language' value='en-GB' />
        </object>
      </div>
    `;

    const divElement = container.querySelector<HTMLDivElement>("#viz1779457378617");
    const vizElement = divElement?.getElementsByTagName("object")[0];
    if (vizElement && divElement) {
      const width = divElement.offsetWidth;
      vizElement.style.width = width + "px";
      vizElement.style.height = Math.round(width * (795 / 1366)) + "px";
    }

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement?.parentNode?.insertBefore(scriptElement, vizElement);

    return () => {
      if (container) container.innerHTML = "";
    };
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
          <h1 className="font-display text-4xl font-bold mb-6">Paid Search Campaign Evaluation</h1>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            An interactive Tableau dashboard evaluating the performance of a paid search campaign across
            key metrics including impressions, clicks, conversions, and return on ad spend.
          </p>
          <div ref={containerRef} className="w-full rounded-2xl overflow-hidden border border-border bg-secondary/30" />
        </div>
      </section>
    </Layout>
  );
};

export default PaidSearchCampaign;
