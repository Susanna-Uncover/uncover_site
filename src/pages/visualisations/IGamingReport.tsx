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
        <h1 className="font-display text-4xl font-bold mb-6">iGaming Performance Report</h1>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          An iGaming performance report built in Power BI, exploring player activity, revenue trends and product engagement. Use the arrows to scroll through the pages.
        </p>
        <p className="mb-8">
          <a
            href={PDF_URL}
            download
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
          >
            <Download size={14} />
            Download full PDF
          </a>
        </p>
        <Carousel opts={{ loop: true }} className="px-12">
          <CarouselContent>
            {pages.map((src, i) => (
              <CarouselItem key={i}>
                <div className="w-full rounded-2xl overflow-hidden border border-border bg-secondary/30">
                  <img
                    src={src}
                    alt={`iGaming Performance Report — page ${i + 1}`}
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
      </div>
    </section>
  </Layout>
);

export default IGamingReport;
