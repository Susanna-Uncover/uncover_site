import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDF_URL = `${import.meta.env.BASE_URL}igaming-report.pdf`;

const IGamingReport = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) setWidth(wrapperRef.current.offsetWidth);
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
          <div
            ref={wrapperRef}
            className="w-full rounded-2xl overflow-hidden border border-border bg-secondary/30 p-4"
          >
            <Document
              file={PDF_URL}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={<p className="text-muted-foreground p-8 text-center">Loading PDF…</p>}
              error={<p className="text-muted-foreground p-8 text-center">Failed to load PDF.</p>}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <div key={i} className="mb-4 flex justify-center">
                  <Page
                    pageNumber={i + 1}
                    width={Math.max(320, width - 32)}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              ))}
            </Document>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IGamingReport;
