import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Filter, UserPlus, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const submittedAssets = [
  {
    id: "5",
    caseId: "CASE-001",
    title: "YouTube Pre-roll Final",
    project: "Q4 Mutual Fund Campaign",
    submittedBy: "Marketing Team",
    submittedDate: "2025-11-05",
    category: "Mutual Fund",
    assetType: "VIDEO",
    stage: "S6_APPROVALS_ARCHIVE",
    status: "Pending",
    priority: "High",
    assignedTo: null,
    slaDays: 2,
  },
  {
    id: "9",
    caseId: "CASE-002",
    title: "Landing Page Final Copy",
    project: "IPO Campaign Materials",
    submittedBy: "Copywriter",
    submittedDate: "2025-11-04",
    category: "IPO",
    assetType: "TEXT",
    stage: "S6_APPROVALS_ARCHIVE",
    status: "Pending",
    priority: "Medium",
    assignedTo: null,
    slaDays: 3,
  },
  {
    id: "10",
    caseId: "CASE-003",
    title: "Email Campaign Banner",
    project: "Insurance Product Launch",
    submittedBy: "Design Team",
    submittedDate: "2025-11-03",
    category: "Insurance",
    assetType: "IMAGE",
    stage: "S6_APPROVALS_ARCHIVE",
    status: "ApprovedByCompliance",
    priority: "Low",
    assignedTo: "Sarah Chen",
    slaDays: null,
  },
];

export default function ComplianceInbox() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);

  const handleApprove = (caseId: string, title: string) => {
    toast({
      title: "Asset approved",
      description: `${title} has been approved and closed.`,
    });
  };

  const handleReject = (caseId: string, title: string) => {
    toast({
      title: "Asset returned",
      description: `${title} has been returned for changes.`,
      variant: "destructive",
    });
  };

  const handleBulkAssign = () => {
    if (selectedCases.length === 0) return;
    toast({
      title: "Cases assigned",
      description: `${selectedCases.length} case(s) have been assigned.`,
    });
    setSelectedCases([]);
  };

  const filteredAssets = submittedAssets.filter((asset) => {
    if (statusFilter !== "all" && asset.status !== statusFilter) return false;
    if (priorityFilter !== "all" && asset.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Inbox', href: '/compliance/inbox' }
    ]}>
      <div className="flex flex-col h-full animate-fade-in">
        {/* Dynamic Action Bar - Filters & Actions */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px] hover-scale transition-all">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="UnderReview">Under Review</SelectItem>
                  <SelectItem value="ChangesRequested">Changes Requested</SelectItem>
                  <SelectItem value="ApprovedByCompliance">Approved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[200px] hover-scale transition-all">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              {selectedCases.length > 0 && (
                <>
                  <span className="text-sm text-muted-foreground font-medium">
                    {selectedCases.length} selected
                  </span>
                  <Button variant="outline" size="sm" onClick={handleBulkAssign} className="gap-2 hover-scale transition-all">
                    <UserPlus className="w-4 h-4" />
                    Bulk Assign
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-5xl font-serif font-light tracking-tight">Compliance Inbox</h1>
              <p className="text-sm text-muted-foreground">
                Review and approve assets submitted for final compliance
              </p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <p className="text-sm font-medium text-muted-foreground mb-2">Pending Review</p>
                <p className="text-3xl font-serif font-light">
                  {submittedAssets.filter((a) => a.status === "Pending").length}
                </p>
              </div>

              <div className="p-6 rounded-xl border border-success/30 bg-success/5">
                <p className="text-sm font-medium text-muted-foreground mb-2">Approved Today</p>
                <p className="text-3xl font-serif font-light text-success">
                  {submittedAssets.filter((a) => a.status === "ApprovedByCompliance").length}
                </p>
              </div>

              <div className="p-6 rounded-xl border border-warning/30 bg-warning/5">
                <p className="text-sm font-medium text-muted-foreground mb-2">Avg Review Time</p>
                <p className="text-3xl font-serif font-light text-warning">4.2h</p>
              </div>
            </div>

            {/* Cases Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                        <input
                          type="checkbox"
                          className="rounded border-border"
                          checked={selectedCases.length === filteredAssets.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCases(filteredAssets.map((a) => a.caseId));
                            } else {
                              setSelectedCases([]);
                            }
                          }}
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Case ID</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Asset</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">SLA</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Assigned To</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAssets.map((asset) => (
                      <tr key={asset.caseId} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            checked={selectedCases.includes(asset.caseId)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCases([...selectedCases, asset.caseId]);
                              } else {
                                setSelectedCases(selectedCases.filter((id) => id !== asset.caseId));
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/compliance/cases/${asset.caseId}`}>
                            <p className="text-sm font-mono hover:text-primary transition-colors">
                              {asset.caseId}
                            </p>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/compliance/cases/${asset.caseId}`}>
                            <p className="font-medium hover:text-primary transition-colors">
                              {asset.title}
                            </p>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">{asset.project}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm">{asset.category}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={
                              asset.priority === "High"
                                ? "bg-destructive/20 text-destructive border-destructive/30"
                                : asset.priority === "Medium"
                                ? "bg-warning/20 text-warning border-warning/30"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {asset.priority}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {asset.slaDays !== null && (
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-3 h-3" />
                              <span>{asset.slaDays}d</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={
                              asset.status === "Pending"
                                ? "bg-warning/20 text-warning border-warning/30"
                                : asset.status === "ApprovedByCompliance"
                                ? "bg-success/20 text-success border-success/30"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {asset.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm">{asset.assignedTo || "Unassigned"}</p>
                        </td>
                        <td className="px-6 py-4">
                          {asset.status === "Pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => {
                                toast({
                                  title: "Case assigned",
                                  description: `${asset.title} has been assigned to you.`,
                                });
                              }}
                            >
                              Take Case
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
