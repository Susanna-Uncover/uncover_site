import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Visualisations from "./pages/Visualisations";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import GoodreadsSQL from "./pages/portfolio/GoodreadsSQL";
import SeattleCollisions from "./pages/portfolio/SeattleCollisions";
import ParfumoScraping from "./pages/portfolio/ParfumoScraping";
import KMeansClustering from "./pages/portfolio/KMeansClustering";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/visualisations" element={<Visualisations />} />
          <Route path="/portfolio/goodreads-sql" element={<GoodreadsSQL />} />
          <Route path="/portfolio/seattle-collisions" element={<SeattleCollisions />} />
          <Route path="/portfolio/parfumo-scraping" element={<ParfumoScraping />} />
          <Route path="/portfolio/kmeans-clustering" element={<KMeansClustering />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/visualisations/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
