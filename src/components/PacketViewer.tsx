import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PacketViewerProps {
  caseId: string;
}

export function PacketViewer({ caseId }: PacketViewerProps) {
  const { toast } = useToast();
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "json">("pdf");

  // Mock AI results data
  const aiResults = [
    {
      rulePack: "SEBI Mutual Fund Regulations",
      rules: [
        {
          id: "MF-01",
          title: "Disclosure of Fees and Charges",
          status: "pass",
          severity: "high",
          finding: "All fees and charges are clearly disclosed in the creative.",
          citations: ["SEBI (MF) Regulations 1996, Section 4.2.1"],
        },
        {
          id: "MF-02",
          title: "Past Performance Disclaimer",
          status: "fail",
          severity: "critical",
          finding: "Missing mandatory disclaimer about past performance not indicating future returns.",
          citations: ["SEBI (MF) Regulations 1996, Section 5.3.2"],
          suggestedFix: "Add disclaimer: 'Past performance is not indicative of future returns.'",
        },
      ],
    },
    {
      rulePack: "ASCI Guidelines",
      rules: [
        {
          id: "ASCI-03",
          title: "Truthful Claims",
          status: "pass",
          severity: "high",
          finding: "All claims are substantiated and truthful.",
          citations: ["ASCI Code Chapter III, Clause 1.4"],
        },
        {
          id: "ASCI-04",
          title: "Social Responsibility",
          status: "warning",
          severity: "medium",
          finding: "Content may require additional sensitivity review for diverse audiences.",
          citations: ["ASCI Code Chapter V"],
        },
      ],
    },
  ];

  const handleDownload = (format: "pdf" | "json") => {
    toast({
      title: `Downloading ${format.toUpperCase()} packet`,
      description: `Generating compliance packet for Case #${caseId}...`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "fail":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pass: "bg-success/20 text-success border-success/30",
      fail: "bg-destructive/20 text-destructive border-destructive/30",
      warning: "bg-warning/20 text-warning border-warning/30",
    };
    return variants[status] || "";
  };

  return (
    <div className="space-y-6">
      {/* Header with download options */}
      <Card className="p-6 border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium mb-1">Compliance Packet (Immutable)</h3>
            <p className="text-sm text-muted-foreground">
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDownload("pdf")} className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDownload("json")} className="gap-2">
              <Download className="w-4 h-4" />
              Download JSON
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Results by Rule Pack */}
      {aiResults.map((pack, idx) => (
        <Card key={idx} className="p-6 border-border">
          <h4 className="text-base font-medium mb-4">{pack.rulePack}</h4>
          <div className="space-y-4">
            {pack.rules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-lg border border-border bg-muted/30 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(rule.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{rule.id}</span>
                        <span className="text-sm">—</span>
                        <span className="text-sm">{rule.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.finding}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusBadge(rule.status)}>
                    {rule.status}
                  </Badge>
                </div>

                {/* Citations */}
                {rule.citations && rule.citations.length > 0 && (
                  <div className="pl-7">
                    <p className="text-xs text-muted-foreground mb-1">Citations:</p>
                    {rule.citations.map((citation, cidx) => (
                      <div key={cidx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ExternalLink className="w-3 h-3" />
                        <span>{citation}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Fix */}
                {rule.suggestedFix && (
                  <div className="pl-7 mt-2 rounded-md bg-primary/5 border border-primary/20 p-3">
                    <p className="text-xs font-medium text-primary mb-1">Suggested Fix:</p>
                    <p className="text-xs text-muted-foreground">{rule.suggestedFix}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
