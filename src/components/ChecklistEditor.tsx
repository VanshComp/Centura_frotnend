import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  status: "pass" | "fail" | "na" | "pending";
  note: string;
}

interface ChecklistEditorProps {
  caseId: string;
  onCompletionChange?: (isComplete: boolean) => void;
}

export function ChecklistEditor({ caseId, onCompletionChange }: ChecklistEditorProps) {
  // Mock checklist based on category/stage
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      label: "Risk disclosure statements present and accurate",
      required: true,
      status: "pending",
      note: "",
    },
    {
      id: "2",
      label: "Performance data includes required disclaimers",
      required: true,
      status: "pending",
      note: "",
    },
    {
      id: "3",
      label: "No misleading claims or guarantees",
      required: true,
      status: "pending",
      note: "",
    },
    {
      id: "4",
      label: "Fund category classification correct",
      required: true,
      status: "pending",
      note: "",
    },
    {
      id: "5",
      label: "Benchmark comparison methodology valid",
      required: false,
      status: "pending",
      note: "",
    },
    {
      id: "6",
      label: "Contact information and grievance redressal details",
      required: true,
      status: "pending",
      note: "",
    },
  ]);

  const updateItemStatus = (id: string, status: ChecklistItem["status"]) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setItems(updatedItems);
    checkCompletion(updatedItems);
  };

  const updateItemNote = (id: string, note: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, note } : item)));
  };

  const checkCompletion = (itemsList: ChecklistItem[]) => {
    const allRequiredSet = itemsList
      .filter((item) => item.required)
      .every((item) => item.status !== "pending");
    onCompletionChange?.(allRequiredSet);
  };

  const completionStats = {
    total: items.length,
    completed: items.filter((i) => i.status !== "pending").length,
    required: items.filter((i) => i.required).length,
    requiredCompleted: items.filter((i) => i.required && i.status !== "pending").length,
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Manual Compliance Checklist</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Category: Mutual Fund • Stage: S6 Approvals
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold">
            {completionStats.completed}/{completionStats.total}
          </div>
          <div className="text-xs text-muted-foreground">
            Required: {completionStats.requiredCompleted}/{completionStats.required}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-base">{item.label}</Label>
                  {item.required && (
                    <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/30">
                      Required
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${item.id}-pass`}
                  checked={item.status === "pass"}
                  onCheckedChange={() => updateItemStatus(item.id, "pass")}
                />
                <Label htmlFor={`${item.id}-pass`} className="text-sm cursor-pointer">
                  Pass
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${item.id}-fail`}
                  checked={item.status === "fail"}
                  onCheckedChange={() => updateItemStatus(item.id, "fail")}
                />
                <Label htmlFor={`${item.id}-fail`} className="text-sm cursor-pointer">
                  Fail
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${item.id}-na`}
                  checked={item.status === "na"}
                  onCheckedChange={() => updateItemStatus(item.id, "na")}
                />
                <Label htmlFor={`${item.id}-na`} className="text-sm cursor-pointer">
                  N/A
                </Label>
              </div>
            </div>

            <Textarea
              placeholder="Add notes or observations..."
              value={item.note}
              onChange={(e) => updateItemNote(item.id, e.target.value)}
              className="min-h-[60px]"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
