import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TaskBar } from "@/components/TaskBar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ImageViewer } from "@/components/ImageViewer";
import { RichTextEditor } from "@/components/RichTextEditor";
import { ThreadSettingsSidebar } from "@/components/ThreadSettingsSidebar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUnsavedGuard } from "@/hooks/use-unsaved-guard";
import { 
  RotateCcw, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  ExternalLink,
  Settings,
  PanelRightClose,
  PanelRightOpen
} from "lucide-react";

const mockRuleResults = [
  {
    pack: "SEBI MF Guidelines",
    rules: [
      {
        id: "MF_STD_WARNING_TEXT",
        status: "fail",
        severity: "major",
        reason: "Standard MF warning text is missing at 0:15",
        suggestedFix: "Add standard warning text overlay",
        citations: [{ source: "SEBI MF Guidelines", clause: "Standard Warning", url: "#" }],
      },
    ],
  },
  {
    pack: "ASCI Code",
    rules: [
      {
        id: "ASCI_NO_MISLEADING",
        status: "warning",
        severity: "minor",
        reason: "Potential misleading visual at 0:08",
        suggestedFix: "Add disclaimer overlay",
        citations: [{ source: "ASCI Code", clause: "Misleading Claims", url: "#" }],
      },
    ],
  },
];

export default function ThreadDetail() {
  const { projectId, assetId, threadId } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [assetType] = useState<"TEXT" | "IMAGE" | "VIDEO">("VIDEO");
  const [checkRunning, setCheckRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Mock tasks for TaskBar - always visible for demo
  const mockTasks = [
    {
      id: "check-1",
      threadTitle: "Instagram Reel v3",
      iteration: "v3",
      status: checkRunning ? ("running" as const) : ("complete" as const),
      progress: checkRunning ? 45 : 100,
    },
  ];

  useUnsavedGuard({ when: hasUnsavedChanges });

  const handleRunCheck = () => {
    setCheckRunning(true);
    toast({
      title: "Check started",
      description: "Running compliance checks on v3...",
    });
    
    setTimeout(() => {
      setCheckRunning(false);
      toast({
        title: "Check complete",
        description: "Found 1 fail, 1 warning",
      });
    }, 3000);
  };

  const handleApplyFix = (ruleId: string) => {
    toast({
      title: "Fix will create new check",
      description: "Applying fixes will create v4 for re-verification",
    });
  };

  return (
    <Layout>
      <TaskBar tasks={mockTasks} />
      <div className="h-full flex flex-col">
        {/* Top Navigation Bar */}
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="h-6 w-px bg-border shrink-0" />
            <BackButton isDirty={hasUnsavedChanges} />
            <Breadcrumbs items={[
              { label: 'Projects', href: '/projects' },
              { label: 'JSW Q4 2024', href: `/projects/${projectId}` },
              { label: 'Instagram Reel', href: `/projects/${projectId}/assets/${assetId}` },
              { label: 'v3', href: '#' }
            ]} />
          </div>
        </div>

        {/* Dynamic Action Bar */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPreviewOpen(!previewOpen)}
            >
              {previewOpen ? "Hide" : "Show"} Preview
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <Settings className="w-4 h-4" />
              {settingsOpen ? "Hide" : "Show"} Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleRunCheck} disabled={checkRunning}>
              <RotateCcw className="w-4 h-4" />
              {checkRunning ? "Checking..." : "Re-run"}
            </Button>
            <Button size="sm">
              <Send className="w-4 h-4" />
              Approve
            </Button>
          </div>
        </div>

        {/* 2-Pane Layout: Results + Settings (Preview collapsible) */}
        <div className="flex-1 flex gap-0 overflow-hidden">
          {/* Collapsible Preview */}
          {previewOpen && (
            <div className="w-96 border-r border-border/50 bg-black/50 flex flex-col overflow-hidden shrink-0">
              {assetType === "VIDEO" && (
                <VideoPlayer
                  markers={[
                    { time: 8, type: 'warning', label: 'Misleading visual' },
                    { time: 15, type: 'issue', label: 'Missing warning text' },
                  ]}
                />
              )}
              {assetType === "IMAGE" && (
                <ImageViewer 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800"
                  alt="Sample creative asset"
                  overlays={[]} 
                />
              )}
              {assetType === "TEXT" && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <RichTextEditor 
                    value="Sample text content for compliance review..."
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Rule Results */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-light tracking-tight mb-4">Results</h2>
                <div className="flex items-center gap-2 mb-6">
                  <StatusBadge status="warning" count={1} />
                  <StatusBadge status="fail" count={1} />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPreviewOpen(!previewOpen)}
              >
                {previewOpen ? "Hide" : "Show"} Preview
              </Button>
            </div>

            {/* Rule Packs */}
            <div className="space-y-3">
              {mockRuleResults.map((pack, packIdx) => (
                <div key={packIdx} className="rounded-xl border border-border/50 bg-card/50 p-4">
                  <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {pack.pack}
                  </h3>
                  <div className="space-y-3">
                    {pack.rules.map((rule) => {
                      const StatusIcon = 
                        rule.status === "pass" ? CheckCircle2 :
                        rule.status === "warning" ? AlertTriangle : XCircle;
                      
                      const statusColor = 
                        rule.status === "pass" ? "text-success" :
                        rule.status === "warning" ? "text-warning" : "text-destructive";

                      return (
                        <div key={rule.id} className="p-4 rounded-lg bg-muted/30 space-y-3">
                          <div className="flex items-start gap-3">
                            <StatusIcon className={`w-5 h-5 mt-0.5 ${statusColor}`} />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-sm">{rule.reason}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  rule.severity === "major" ? "bg-destructive/20 text-destructive" :
                                  rule.severity === "minor" ? "bg-warning/20 text-warning" :
                                  "bg-muted text-muted-foreground"
                                }`}>
                                  {rule.severity}
                                </span>
                              </div>

                              {rule.suggestedFix && (
                                <div className="p-3 rounded bg-card border border-border">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">
                                    Suggested Fix
                                  </p>
                                  <p className="text-sm">{rule.suggestedFix}</p>
                                  {rule.status !== "pass" && (
                                    <Button 
                                      size="sm" 
                                      className="mt-2 gap-2"
                                      onClick={() => handleApplyFix(rule.id)}
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                      Apply Fix & Create v4
                                    </Button>
                                  )}
                                </div>
                              )}

                              {rule.citations.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {rule.citations.map((citation, idx) => (
                                    <a
                                      key={idx}
                                      href={citation.url}
                                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {citation.clause}
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Settings Sidebar */}
          <ThreadSettingsSidebar open={settingsOpen} onOpenChange={setSettingsOpen} />
        </div>
      </div>
    </Layout>
  );
}
