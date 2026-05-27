import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import page1 from "@/assets/igaming/page-1.jpg";
import page2 from "@/assets/igaming/page-2.jpg";

const PDF_URL = `${import.meta.env.BASE_URL}igaming-report.pdf`;
const pages = [page1, page2];

const IGamingReport = () => (
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
        <h1 className="font-display text-4xl font-bold mb-6">iGaming Player Base Analytics Report</h1>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          This Player Base Analytics Report was designed to assess commercial performance and player quality across the acquisition channels. It shows which channels drive the most value, how effectively registrations convert into first-time depositors, and how player value is distributed across segments.
        </p>
        <p className="mb-8">
          <a
            href={PDF_URL}
            download
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
          >
            <Download size={14} />
            Download full PDF →
          </a>
        </p>
        <Carousel opts={{ loop: true }} className="px-12">
          <CarouselContent>
            {pages.map((src, i) => (
              <CarouselItem key={i}>
                <div className="w-full rounded-2xl overflow-hidden border border-border bg-secondary/30">
                  <img
                    src={src}
                    alt={`iGaming Player Base Analytics Report — page ${i + 1}`}
                    className="w-full h-auto block"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  Page {i + 1} of {pages.length}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="mt-10 max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-4">Key findings</h2>
          <ul className="space-y-4 text-muted-foreground leading-relaxed">
            <li className="pl-4 border-l-2 border-primary/30">
              <span className="text-primary font-semibold">Channel Value Concentration:</span> Brand and Organic channels generate the highest Total NGR, making them the strongest commercial acquisition sources.
            </li>
            <li className="pl-4 border-l-2 border-primary/30">
              <span className="text-primary font-semibold">Healthy Conversion Performance:</span> The registration-to-conversion trend remains closely aligned over time, supported by an FTD Conversion Rate of 82%.
            </li>
            <li className="pl-4 border-l-2 border-primary/30">
              <span className="text-primary font-semibold">High-Value Segment Dependence:</span> NGR is heavily concentrated in Champion and Loyal segments, indicating that a relatively small portion of the player base drives a disproportionate share of value.
            </li>
            <li className="pl-4 border-l-2 border-primary/30">
              <span className="text-primary font-semibold">Lower-Band Deposit Weighting:</span> The deposit profile skews toward lower FTD bands, particularly £1–20, though a notable £250+ segment remains important from a value perspective.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </Layout>
);

export default IGamingReport;
