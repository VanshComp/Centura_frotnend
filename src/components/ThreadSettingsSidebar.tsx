import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Settings, Download, Trash2, Copy, Ticket, PanelRightClose } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ThreadSettingsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STAGES = [
  { value: "S1_CONCEPT_BRIEF", label: "Concept & Brief" },
  { value: "S2_SCRIPT_COPY", label: "Script & Copy" },
  { value: "S3_DESIGN_STATIC", label: "Design & Static" },
  { value: "S4_AV_ROUGHCUT", label: "AV & Rough Cut" },
  { value: "S5_CHANNEL_PACKAGING", label: "Channel Packaging" },
  { value: "S6_APPROVALS_ARCHIVE", label: "Approvals & Archive" },
];

const GUIDELINES = [
  { id: "sebi_mf", label: "SEBI MF Guidelines" },
  { id: "asci", label: "ASCI Code" },
  { id: "amfi", label: "AMFI Guidelines" },
];

export const ThreadSettingsSidebar = ({ open, onOpenChange }: ThreadSettingsSidebarProps) => {
  const [stage, setStage] = useState("S4_AV_ROUGHCUT");
  const [guidelines, setGuidelines] = useState<string[]>(["sebi_mf", "asci"]);
  
  // Ticket settings state
  const [ticketStatus, setTicketStatus] = useState("in_review");
  const [ticketPriority, setTicketPriority] = useState("medium");
  const [ticketAssignee, setTicketAssignee] = useState("");
  const [ticketNotes, setTicketNotes] = useState("");

  const toggleGuideline = (guidelineId: string) => {
    setGuidelines(prev =>
      prev.includes(guidelineId)
        ? prev.filter(id => id !== guidelineId)
        : [...prev, guidelineId]
    );
  };

  const handleDownload = () => {
    toast({
      title: "Downloading report",
      description: "Compliance report is being prepared...",
    });
  };

  const handleDuplicate = () => {
    toast({
      title: "Thread duplicated",
      description: "Creating a copy with the same settings...",
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this compliance check?")) {
      toast({
        title: "Thread deleted",
        description: "Compliance check has been removed",
      });
    }
  };

  return (
    <div 
      className={`transition-all duration-300 ${open ? 'w-[420px]' : 'w-0'} shrink-0 overflow-hidden border-l border-border/50 bg-card/30 backdrop-blur-sm flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Thread Settings</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(false)}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Close settings"
        >
          <PanelRightClose className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Stage */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Production Stage
          </Label>
          <Select value={stage} onValueChange={setStage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STAGES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Guidelines */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Active Guidelines
          </Label>
          <div className="space-y-2">
            {GUIDELINES.map((guideline) => (
              <div
                key={guideline.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={`thread-${guideline.id}`}
                  checked={guidelines.includes(guideline.id)}
                  onCheckedChange={() => toggleGuideline(guideline.id)}
                />
                <Label
                  htmlFor={`thread-${guideline.id}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {guideline.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Ticket Settings */}
        <div className="space-y-3 bg-muted/20 rounded-lg p-3 border border-border/30">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-primary" />
            <Label className="text-xs font-semibold uppercase tracking-wider">
              Ticket Settings
            </Label>
          </div>
          
          <div className="space-y-3">
            {/* Ticket Status */}
            <div className="space-y-2">
              <Label htmlFor="ticket-status" className="text-xs">Status</Label>
              <Select value={ticketStatus} onValueChange={setTicketStatus}>
                <SelectTrigger id="ticket-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="changes_required">Changes Required</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="ticket-priority" className="text-xs">Priority</Label>
              <Select value={ticketPriority} onValueChange={setTicketPriority}>
                <SelectTrigger id="ticket-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignee */}
            <div className="space-y-2">
              <Label htmlFor="ticket-assignee" className="text-xs">Assignee</Label>
              <Input
                id="ticket-assignee"
                type="text"
                placeholder="Enter assignee email"
                value={ticketAssignee}
                onChange={(e) => setTicketAssignee(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="ticket-notes" className="text-xs">Notes</Label>
              <Textarea
                id="ticket-notes"
                placeholder="Add notes or comments..."
                value={ticketNotes}
                onChange={(e) => setTicketNotes(e.target.value)}
                className="text-sm min-h-[80px] resize-none"
              />
            </div>

            <Button 
              size="sm" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Ticket updated",
                  description: "Thread ticket settings have been saved",
                });
              }}
            >
              Update Ticket
            </Button>
          </div>
        </div>

        <Separator />

        {/* Metadata */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Metadata
          </Label>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-warning">In Review</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rules Run</span>
              <span className="font-medium">8 checks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">File Size</span>
              <span className="font-medium">24.5 MB</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Actions
          </Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleDuplicate}
            >
              <Copy className="w-4 h-4" />
              Duplicate Check
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete Thread
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
