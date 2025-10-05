import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetail from "./pages/ProjectDetail";
import Assets from "./pages/Assets";
import NewAsset from "./pages/NewAsset";
import AssetDetail from "./pages/AssetDetail";
import ThreadDetail from "./pages/ThreadDetail";
import QCCResult from "./pages/QCCResult";
import Queue from "./pages/Queue";
import Rules from "./pages/Rules";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ComplianceHome from "./pages/ComplianceHome";
import ComplianceInbox from "./pages/ComplianceInbox";
import CaseReview from "./pages/CaseReview";
import ExchangeTracker from "./pages/ExchangeTracker";
import ComplianceProjects from "./pages/ComplianceProjects";
import ProjectTracker from "./pages/ProjectTracker";
import ComplianceReports from "./pages/ComplianceReports";
import ComplianceSettings from "./pages/ComplianceSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/new", element: <NewProject /> },
  { path: "/projects/:id", element: <ProjectDetail /> },
  { path: "/projects/:projectId/assets/:assetId", element: <AssetDetail /> },
  { path: "/projects/:projectId/assets/:assetId/threads/:threadId", element: <ThreadDetail /> },
  { path: "/projects/:projectId/assets/:assetId/threads/:threadId/iterations/:iterationId", element: <ThreadDetail /> },
  { path: "/assets", element: <Assets /> },
  { path: "/assets/new", element: <NewAsset /> },
  { path: "/assets/:id", element: <AssetDetail /> },
  { path: "/qcc/results", element: <QCCResult /> },
  { path: "/queue", element: <Queue /> },
  { path: "/compliance", element: <ComplianceHome /> },
  { path: "/compliance/inbox", element: <ComplianceInbox /> },
  { path: "/compliance/cases/:caseId", element: <CaseReview /> },
  { path: "/compliance/exchange", element: <ExchangeTracker /> },
  { path: "/compliance/projects", element: <ComplianceProjects /> },
  { path: "/compliance/projects/:pid", element: <ProjectTracker /> },
  { path: "/compliance/reports", element: <ComplianceReports /> },
  { path: "/compliance/settings", element: <ComplianceSettings /> },
  { path: "/rules", element: <Rules /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
