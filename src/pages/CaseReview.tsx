import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle, Clock, Download, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PacketViewer } from "@/components/PacketViewer";
import { CreativePreview } from "@/components/CreativePreview";
import { CommentsSection } from "@/components/CommentsSection";
import { DecisionPanel } from "@/components/DecisionPanel";
import { ChecklistEditor } from "@/components/ChecklistEditor";
import { FilingsTable } from "@/components/FilingsTable";
import { useState } from "react";

export default function CaseReview() {
  const { caseId } = useParams();
  const [checklistComplete, setChecklistComplete] = useState(false);

  // Mock case data
  const caseData = {
    id: caseId,
    project: "Q4 Mutual Fund Campaign",
    asset: "YouTube Pre-roll Final",
    assetType: "video" as "text" | "image" | "video",
    status: "UnderReview",
    priority: "High",
    submittedBy: "Marketing Team",
    submittedAt: "2025-11-05",
    assignedTo: "Sarah Chen",
    slaDueAt: "2025-11-07",
    category: "Mutual Fund",
    stage: "S6_APPROVALS_ARCHIVE",
  };

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Inbox', href: '/compliance/inbox' },
      { label: caseData.asset, href: `/compliance/cases/${caseId}` }
    ]}>
      <div className="flex flex-col h-full">
        {/* Dynamic Action Bar */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Reassign
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download Packet
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-success/5 text-success border-success/30 hover:bg-success/10"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-warning/5 text-warning border-warning/30 hover:bg-warning/10"
            >
              <XCircle className="w-4 h-4" />
              Request Changes
            </Button>
          </div>
        </div>

        {/* Case Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-background to-muted/20">
          <div className="p-8 max-w-[1600px] mx-auto">
            {/* Case Header with Status */}
            <div className="space-y-4 mb-10 animate-fade-in">
              <div>
                <h1 className="text-5xl font-serif font-light tracking-tight mb-3">{caseData.asset}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{caseData.project}</span>
                  <span>•</span>
                  <span>Submitted by {caseData.submittedBy}</span>
                  <span>•</span>
                  <span>{new Date(caseData.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              {/* Status Information */}
              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline" 
                  className="bg-warning/10 text-warning border-warning/30 px-3 py-1 font-medium"
                >
                  {caseData.status}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="bg-destructive/10 text-destructive border-destructive/30 px-3 py-1 font-medium"
                >
                  Priority: {caseData.priority}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">SLA: 2d remaining</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="packet" className="space-y-8">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
                <TabsTrigger
                  value="packet"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 font-medium text-base transition-all hover:text-primary"
                >
                  Packet
                </TabsTrigger>
                <TabsTrigger
                  value="creative"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 font-medium text-base transition-all hover:text-primary"
                >
                  Creative
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 font-medium text-base transition-all hover:text-primary"
                >
                  Comments
                </TabsTrigger>
                <TabsTrigger
                  value="checklist"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 font-medium text-base transition-all hover:text-primary"
                >
                  Checklist
                </TabsTrigger>
                <TabsTrigger
                  value="decision"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 font-medium text-base transition-all hover:text-primary"
                >
                  Decision
                </TabsTrigger>
                <TabsTrigger
                  value="filings"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 font-medium text-base transition-all hover:text-primary"
                >
                  Filings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="packet" className="space-y-6 animate-fade-in">
                <PacketViewer caseId={caseId || ""} />
              </TabsContent>

              <TabsContent value="creative" className="space-y-6">
                <CreativePreview assetType={caseData.assetType} />
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <CommentsSection />
              </TabsContent>

              <TabsContent value="checklist" className="space-y-6">
                <ChecklistEditor caseId={caseId || ""} onCompletionChange={setChecklistComplete} />
              </TabsContent>

              <TabsContent value="decision" className="space-y-6">
                <DecisionPanel caseId={caseId || ""} checklistComplete={checklistComplete} />
              </TabsContent>

              <TabsContent value="filings" className="space-y-6">
                <FilingsTable caseId={caseId || ""} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
