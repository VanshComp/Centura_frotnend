import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

interface DecisionPanelProps {
  caseId: string;
  checklistComplete: boolean;
}

export function DecisionPanel({ caseId, checklistComplete }: DecisionPanelProps) {
  const { toast } = useToast();
  const [decision, setDecision] = useState<"approve" | "changes" | "hold" | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState("");
  const [scope, setScope] = useState<"entire" | "specific">("entire");
  const [notes, setNotes] = useState("");

  // Predefined reasons for changes
  const changeReasons = [
    "Missing mandatory disclaimer",
    "Inaccurate or misleading claims",
    "Incomplete fee disclosure",
    "Non-compliance with category rules",
    "Insufficient risk warnings",
    "Formatting or presentation issues",
  ];

  const handleSubmitDecision = () => {
    if (!decision) return;

    if (decision === "approve" && !checklistComplete) {
      toast({
        title: "Cannot approve",
        description: "Complete the manual checklist before approving.",
        variant: "destructive",
      });
      return;
    }

    if (decision === "changes" && reasons.length === 0 && !customReason) {
      toast({
        title: "Reason required",
        description: "Please select or provide at least one reason for requesting changes.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title:
        decision === "approve"
          ? "Case Approved"
          : decision === "changes"
          ? "Changes Requested"
          : "Case On Hold",
      description:
        decision === "approve"
          ? `Case #${caseId} has been approved by compliance.`
          : decision === "changes"
          ? "Marketing team will be notified of required changes."
          : "Case has been placed on hold for review.",
    });

    // Reset form
    setDecision(null);
    setReasons([]);
    setCustomReason("");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Decision Selection */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-medium mb-4">Select Decision</h3>
        <RadioGroup value={decision || ""} onValueChange={(v) => setDecision(v as any)}>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <RadioGroupItem value="approve" id="approve" />
              <div className="flex-1">
                <Label htmlFor="approve" className="cursor-pointer flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="font-medium">Approve</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Case meets all compliance requirements and can proceed.
                </p>
                {!checklistComplete && (
                  <div className="flex items-center gap-2 mt-2">
                    <AlertTriangle className="w-3 h-3 text-warning" />
                    <span className="text-xs text-warning">Complete checklist first</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <RadioGroupItem value="changes" id="changes" />
              <div className="flex-1">
                <Label htmlFor="changes" className="cursor-pointer flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="font-medium">Request Changes</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Case requires modifications before approval.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <RadioGroupItem value="hold" id="hold" />
              <div className="flex-1">
                <Label htmlFor="hold" className="cursor-pointer flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="font-medium">Place On Hold</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Pause review pending additional information or escalation.
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </Card>

      {/* Reasons (for changes) */}
      {decision === "changes" && (
        <Card className="p-6 border-border">
          <h4 className="text-sm font-medium mb-4">Reasons for Changes</h4>
          <div className="space-y-3 mb-4">
            {changeReasons.map((reason) => (
              <div key={reason} className="flex items-center gap-2">
                <Checkbox
                  id={reason}
                  checked={reasons.includes(reason)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setReasons([...reasons, reason]);
                    } else {
                      setReasons(reasons.filter((r) => r !== reason));
                    }
                  }}
                />
                <Label htmlFor={reason} className="text-sm cursor-pointer">
                  {reason}
                </Label>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-reason" className="text-sm">
              Additional Reason (Optional)
            </Label>
            <Textarea
              id="custom-reason"
              placeholder="Provide additional details..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          </div>

          {/* Scope */}
          <div className="mt-4 space-y-2">
            <Label className="text-sm">Applies To</Label>
            <RadioGroup value={scope} onValueChange={(v) => setScope(v as any)}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="entire" id="entire" />
                <Label htmlFor="entire" className="text-sm cursor-pointer">
                  Entire case
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific" className="text-sm cursor-pointer">
                  Specific threads/iterations
                </Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
      )}

      {/* Notes */}
      {decision && (
        <Card className="p-6 border-border">
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm">
              Additional Notes {decision === "hold" && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional context or instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </Card>
      )}

      {/* Submit */}
      {decision && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDecision(null)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitDecision}>
            {decision === "approve" && "Approve Case"}
            {decision === "changes" && "Request Changes"}
            {decision === "hold" && "Place On Hold"}
          </Button>
        </div>
      )}
    </div>
  );
}
