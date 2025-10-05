import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { BackButton } from "@/components/BackButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TaskBar } from "@/components/TaskBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  Clock,
  Plus,
  ArrowRight,
  Upload,
  FileVideo,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  User,
  X,
  PanelRightClose,
  PanelRightOpen
} from "lucide-react";

// Stages available for selection
const STAGES = [
  { value: "S1_CONCEPT_BRIEF", label: "Concept & Brief" },
  { value: "S2_SCRIPT_COPY", label: "Script & Copy" },
  { value: "S3_DESIGN_STATIC", label: "Design & Static" },
  { value: "S4_AV_ROUGHCUT", label: "AV & Rough Cut" },
  { value: "S5_CHANNEL_PACKAGING", label: "Channel Packaging" },
  { value: "S6_APPROVALS_ARCHIVE", label: "Approvals & Archive" },
];

// Guidelines/Rule packs available
const GUIDELINES = [
  { id: "sebi_mf", label: "SEBI MF Guidelines", description: "Mutual fund advertising requirements" },
  { id: "asci", label: "ASCI Code", description: "Advertising Standards Council of India" },
  { id: "amfi", label: "AMFI Guidelines", description: "Association of Mutual Funds guidelines" },
  { id: "sebi_inv", label: "SEBI Investment", description: "General investment advertising" },
];

// Mock compliance check threads (latest first)
const mockThreads = [
  {
    id: "3",
    version: "v3",
    created_at: "2 hours ago",
    stage: "S4_AV_ROUGHCUT",
    status: "in-review",
    pass: 5,
    warning: 2,
    fail: 1,
    guidelines: ["SEBI MF", "ASCI"],
  },
  {
    id: "2",
    version: "v2",
    created_at: "1 day ago",
    stage: "S4_AV_ROUGHCUT",
    status: "approved",
    pass: 7,
    warning: 1,
    fail: 0,
    guidelines: ["SEBI MF"],
  },
  {
    id: "1",
    version: "v1",
    created_at: "3 days ago",
    stage: "S3_DESIGN_STATIC",
    status: "rejected",
    pass: 3,
    warning: 3,
    fail: 3,
    guidelines: ["SEBI MF", "ASCI"],
  },
];

export default function AssetDetail() {
  const { projectId, assetId } = useParams();
  const [newCheckDialogOpen, setNewCheckDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState("S4_AV_ROUGHCUT");
  const [selectedGuidelines, setSelectedGuidelines] = useState<string[]>(["sebi_mf", "asci", "amfi"]);
  
  // Ticket Settings State
  const [ticketSidebarOpen, setTicketSidebarOpen] = useState(true);
  const [ticketStatus, setTicketStatus] = useState("changes");
  const [ticketPriority, setTicketPriority] = useState("high");
  const [ticketAssignee, setTicketAssignee] = useState("john");
  const [ticketStage, setTicketStage] = useState("S4_AV_ROUGHCUT");
  const [ticketType, setTicketType] = useState("VIDEO");
  const [ticketDueDate, setTicketDueDate] = useState("2025-11-15");
  const [ticketNotes, setTicketNotes] = useState("Needs urgent review for SEBI compliance");
  const [ticketTags, setTicketTags] = useState<string[]>(["urgent", "sebi", "mf"]);
  const [ticketIssuesCount, setTicketIssuesCount] = useState("3");
  const [newTag, setNewTag] = useState("");
  
  // Mock tasks for TaskBar
  const [mockTasks] = useState([
    {
      id: "1",
      threadTitle: "Instagram Reel v3",
      iteration: "v3",
      status: "running" as const,
      progress: 65,
    },
  ]);

  const handleCreateNewCheck = () => {
    const guidelineNames = selectedGuidelines.map(id => 
      GUIDELINES.find(g => g.id === id)?.label
    ).join(", ");
    
    toast({
      title: "New compliance check started",
      description: `Running checks for ${selectedStage} stage with ${guidelineNames}`,
    });
    
    setNewCheckDialogOpen(false);
    // In real app, this would create a new thread and navigate to it
  };

  const toggleGuideline = (guidelineId: string) => {
    setSelectedGuidelines(prev =>
      prev.includes(guidelineId)
        ? prev.filter(id => id !== guidelineId)
        : [...prev, guidelineId]
    );
  };

  const handleUpdateTicket = () => {
    toast({
      title: "Ticket updated",
      description: "Ticket settings have been saved successfully.",
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !ticketTags.includes(newTag.trim().toLowerCase())) {
      setTicketTags([...ticketTags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTicketTags(ticketTags.filter(tag => tag !== tagToRemove));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-success";
      case "in-review": return "text-warning";
      case "rejected": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return CheckCircle2;
      case "in-review": return Clock;
      case "rejected": return XCircle;
      default: return Clock;
    }
  };

  return (
    <Layout>
      <TaskBar tasks={mockTasks} />
      <div className="min-h-screen bg-background">
        {/* Top Navigation Bar */}
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="h-6 w-px bg-border shrink-0" />
            <BackButton />
            <Breadcrumbs items={[
              { label: 'Projects', href: '/projects' },
              { label: 'JSW Q4 2024', href: `/projects/${projectId}` },
              { label: 'Instagram Reel', href: `/projects/${projectId}/assets/${assetId}` }
            ]} />
          </div>
        </div>

        {/* Dynamic Action Bar */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-end gap-2">
            <Dialog open={newCheckDialogOpen} onOpenChange={setNewCheckDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Compliance Check
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Run New Compliance Check</DialogTitle>
                  <DialogDescription>
                    Upload your latest asset and select the stage and guidelines to check against
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Upload Section */}
                  <div className="space-y-2">
                    <Label>Upload Asset</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">Video, Image, or Text file</p>
                    </div>
                  </div>

                  {/* Stage Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="stage">Production Stage</Label>
                    <Select value={selectedStage} onValueChange={setSelectedStage}>
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {STAGES.map((stage) => (
                          <SelectItem key={stage.value} value={stage.value}>
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Different stages have different compliance requirements
                    </p>
                  </div>

                  {/* Guidelines Selection */}
                  <div className="space-y-3">
                    <Label>Guidelines to Check</Label>
                    <div className="space-y-3">
                      {GUIDELINES.map((guideline) => (
                        <div key={guideline.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={guideline.id}
                            checked={selectedGuidelines.includes(guideline.id)}
                            onCheckedChange={() => toggleGuideline(guideline.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={guideline.id}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {guideline.label}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {guideline.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewCheckDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNewCheck} disabled={selectedGuidelines.length === 0}>
                    Run Check
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-6 p-8 relative">
          {/* Threads List - Main Content */}
          <div className={`flex-1 space-y-6 transition-all ${ticketSidebarOpen ? 'mr-0' : 'mr-0'}`}>
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-serif font-light tracking-tight mb-2">
                Instagram Reel - MF Returns
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-muted/50 uppercase tracking-wider text-xs">
                  VIDEO
                </span>
                <span>•</span>
                <span>JSW Q4 2024</span>
                <span>•</span>
                <span>{mockThreads.length} checks</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-light tracking-tight mb-2">
                Compliance Check History
              </h2>
              <p className="text-sm text-muted-foreground">
                Each check represents a compliance review of your asset at different stages
              </p>
            </div>

          <div className="space-y-3">
            {mockThreads.map((thread) => {
              const StatusIcon = getStatusIcon(thread.status);
              const statusColor = getStatusColor(thread.status);
              const stageName = STAGES.find(s => s.value === thread.stage)?.label || thread.stage;

              return (
                <Link
                  key={thread.id}
                  to={`/projects/${projectId}/assets/${assetId}/threads/${thread.id}`}
                  className="block"
                >
                  <Card className="p-6 hover:shadow-lg transition-all hover:border-primary/50 group cursor-pointer">
                    <div className="flex items-start gap-6">
                      {/* Version Badge */}
                      <div className="shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                          <FileVideo className="w-8 h-8 text-primary" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-semibold">{thread.version}</h3>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor} bg-current/10`}>
                                <StatusIcon className="w-3 h-3" />
                                {thread.status === "in-review" ? "In Review" : 
                                 thread.status === "approved" ? "Approved" : "Rejected"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{thread.created_at}</span>
                              <span>•</span>
                              <span>{stageName}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                        </div>

                        {/* Results Summary */}
                        <div className="flex items-center gap-3">
                          {thread.pass > 0 && (
                            <div className="flex items-center gap-1.5 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <span className="font-medium">{thread.pass} passed</span>
                            </div>
                          )}
                          {thread.warning > 0 && (
                            <div className="flex items-center gap-1.5 text-sm">
                              <AlertTriangle className="w-4 h-4 text-warning" />
                              <span className="font-medium">{thread.warning} warnings</span>
                            </div>
                          )}
                          {thread.fail > 0 && (
                            <div className="flex items-center gap-1.5 text-sm">
                              <XCircle className="w-4 h-4 text-destructive" />
                              <span className="font-medium">{thread.fail} failed</span>
                            </div>
                          )}
                        </div>

                        {/* Guidelines */}
                        <div className="flex flex-wrap gap-2">
                          {thread.guidelines.map((guideline) => (
                            <span
                              key={guideline}
                              className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                            >
                              {guideline}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

            {/* Empty State */}
            {mockThreads.length === 0 && (
              <Card className="p-12 text-center">
                <FileVideo className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold mb-2">No compliance checks yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Run your first compliance check to get started
                </p>
                <Button onClick={() => setNewCheckDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Run First Check
                </Button>
              </Card>
            )}
          </div>

          {/* Ticket Settings Sidebar - Collapsible with Floating Button */}
          {!ticketSidebarOpen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTicketSidebarOpen(true)}
              className="fixed right-4 top-24 z-10 shadow-lg gap-2"
              title="Open ticket settings"
            >
              <Ticket className="w-4 h-4" />
              Ticket Settings
            </Button>
          )}
          <div className={`transition-all duration-300 ${ticketSidebarOpen ? 'w-[420px]' : 'w-0'} shrink-0 overflow-hidden`}>
            <Card className="p-6 sticky top-8 h-fit">
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Ticket Settings</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTicketSidebarOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-muted"
                    title="Close ticket settings"
                  >
                    <PanelRightClose className="w-4 h-4" />
                  </Button>
                </div>

                {/* Pipeline Status */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-status" className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Pipeline Status
                  </Label>
                  <Select value={ticketStatus} onValueChange={setTicketStatus}>
                    <SelectTrigger id="ticket-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review">To Review</SelectItem>
                      <SelectItem value="changes">Changes Needed</SelectItem>
                      <SelectItem value="compliance">Awaiting Compliance</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Kanban column position
                  </p>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-priority" className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Priority
                  </Label>
                  <Select value={ticketPriority} onValueChange={setTicketPriority}>
                    <SelectTrigger id="ticket-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-muted" />
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning" />
                          High
                        </div>
                      </SelectItem>
                      <SelectItem value="urgent">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-destructive" />
                          Urgent
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assignee */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-assignee" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Assignee
                  </Label>
                  <Select value={ticketAssignee} onValueChange={setTicketAssignee}>
                    <SelectTrigger id="ticket-assignee">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="john">John Doe (Design Team)</SelectItem>
                      <SelectItem value="jane">Jane Smith (Video Team)</SelectItem>
                      <SelectItem value="bob">Bob Wilson (Compliance)</SelectItem>
                      <SelectItem value="marketing">Marketing Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Production Stage */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-stage">Production Stage</Label>
                  <Select value={ticketStage} onValueChange={setTicketStage}>
                    <SelectTrigger id="ticket-stage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGES.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Asset Type */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-type">Asset Type</Label>
                  <Select value={ticketType} onValueChange={setTicketType}>
                    <SelectTrigger id="ticket-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VIDEO">Video</SelectItem>
                      <SelectItem value="IMAGE">Image</SelectItem>
                      <SelectItem value="TEXT">Text</SelectItem>
                      <SelectItem value="SHORT_TEXT">Short Text</SelectItem>
                      <SelectItem value="AUDIO">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-due-date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </Label>
                  <Input
                    id="ticket-due-date"
                    type="date"
                    value={ticketDueDate}
                    onChange={(e) => setTicketDueDate(e.target.value)}
                  />
                </div>

                {/* Issues Count */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-issues">Active Issues Count</Label>
                  <Input
                    id="ticket-issues"
                    type="number"
                    min="0"
                    value={ticketIssuesCount}
                    onChange={(e) => setTicketIssuesCount(e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of compliance issues found
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder="Add tag..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  {ticketTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ticketTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="gap-1 pl-2 pr-1"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:bg-muted rounded-sm p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="ticket-notes">Notes</Label>
                  <Textarea
                    id="ticket-notes"
                    placeholder="Add notes about this asset ticket..."
                    value={ticketNotes}
                    onChange={(e) => setTicketNotes(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Update Button */}
                <Button onClick={handleUpdateTicket} className="w-full gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Update Ticket
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
}
