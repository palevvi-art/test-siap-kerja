import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TestSelection from "./pages/TestSelection";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import PatternTest from "./pages/tests/PatternTest";
import WorkingMemoryTest from "./pages/tests/WorkingMemoryTest";
import ProcessingSpeedTest from "./pages/tests/ProcessingSpeedTest";
import KraepelinTest from "./pages/tests/KraepelinTest";
import VisualAccuracyTest from "./pages/tests/VisualAccuracyTest";
import SustainedFocusTest from "./pages/tests/SustainedFocusTest";
import QuickMathTest from "./pages/tests/QuickMathTest";
import NumberAccuracyTest from "./pages/tests/NumberAccuracyTest";
import EnduranceTest from "./pages/tests/EnduranceTest";
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
          <Route path="/tes" element={<TestSelection />} />
          <Route path="/tes/pengenalan-pola" element={<PatternTest />} />
          <Route path="/tes/daya-ingat" element={<WorkingMemoryTest />} />
          <Route path="/tes/kecepatan-pemrosesan" element={<ProcessingSpeedTest />} />
          <Route path="/tes/kraepelin" element={<KraepelinTest />} />
          <Route path="/tes/ketelitian-visual" element={<VisualAccuracyTest />} />
          <Route path="/tes/fokus-berkelanjutan" element={<SustainedFocusTest />} />
          <Route path="/tes/hitung-cepat" element={<QuickMathTest />} />
          <Route path="/tes/ketelitian-angka" element={<NumberAccuracyTest />} />
          <Route path="/tes/ketahanan-tugas" element={<EnduranceTest />} />
          <Route path="/hasil/:id" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
