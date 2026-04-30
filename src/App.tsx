import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const TestSelection = lazy(() => import("./pages/TestSelection"));
const TestIntro = lazy(() => import("./pages/TestIntro"));
const TestRunner = lazy(() => import("./pages/TestRunner"));
const Results = lazy(() => import("./pages/Results"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StandaloneKoranDigital = lazy(() => import("./pages/StandaloneKoranDigital"));
const StandaloneMbti = lazy(() => import("./pages/StandaloneMbti"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="w-full max-w-sm rounded-lg border border-border bg-card px-5 py-4 text-center">
      <p className="text-sm font-semibold text-foreground">Memuat halaman</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Menyiapkan sesi tes dan konten yang Anda butuhkan.
      </p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tes" element={<TestSelection />} />
            <Route path="/tes/:testId" element={<TestIntro />} />
            <Route path="/tes/:testId/mulai" element={<TestRunner />} />
            <Route path="/eksplorasi/koran-digital" element={<StandaloneKoranDigital />} />
            <Route path="/eksplorasi/mbti" element={<StandaloneMbti />} />
            <Route path="/hasil/:id" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
