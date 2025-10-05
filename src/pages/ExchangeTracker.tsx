import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExchangeTracker() {
  const navigate = useNavigate();

  // Mock exchange filings data
  const filings = [
    {
      caseId: "CASE-001",
      project: "Q4 Mutual Fund Campaign",
      asset: "YouTube Pre-roll Final",
      authority: "NSE",
      submissionRef: "NSE/MF/2025/0012",
      submittedAt: "2025-11-05",
      status: "Submitted" as const,
      aging: 2,
    },
    {
      caseId: "CASE-003",
      project: "Life Insurance Q4",
      asset: "Digital Banner Set",
      authority: "IRDAI",
      submissionRef: "IRDAI/LI/2025/0089",
      submittedAt: "2025-11-01",
      status: "Approved" as const,
      decisionAt: "2025-11-06",
      aging: 7,
    },
    {
      caseId: "CASE-002",
      project: "Term Plan Launch",
      asset: "TV Commercial 30s",
      authority: "SEBI",
      submissionRef: "SEBI/AD/2025/0234",
      submittedAt: "2025-10-28",
      status: "QueryReceived" as const,
      aging: 10,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      Submitted: "bg-primary/10 text-primary border-primary/30",
      QueryReceived: "bg-warning/10 text-warning border-warning/30",
      Approved: "bg-success/10 text-success border-success/30",
      Rejected: "bg-destructive/10 text-destructive border-destructive/30",
    };
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Exchange Tracker', href: '/compliance/exchange' }
    ]}>
      <div className="flex flex-col h-full">
        {/* Dynamic Action Bar - Filters */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by case, project, or reference..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Authority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authorities</SelectItem>
                  <SelectItem value="nse">NSE</SelectItem>
                  <SelectItem value="bse">BSE</SelectItem>
                  <SelectItem value="sebi">SEBI</SelectItem>
                  <SelectItem value="irdai">IRDAI</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="query">Query Received</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-light tracking-tight mb-2">
                Exchange & Regulator Tracker
              </h1>
              <p className="text-muted-foreground">
                Portfolio-wide view of all submissions to exchanges and regulatory authorities
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">3</div>
                <div className="text-sm text-muted-foreground">Active Filings</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">1</div>
                <div className="text-sm text-muted-foreground">Pending Approval</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">1</div>
                <div className="text-sm text-muted-foreground">Approved This Week</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">6.3</div>
                <div className="text-sm text-muted-foreground">Avg. Days to Approval</div>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Authority</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aging</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filings.map((filing) => (
                    <TableRow
                      key={filing.caseId}
                      className="cursor-pointer"
                      onClick={() => navigate(`/compliance/cases/${filing.caseId}`)}
                    >
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {filing.caseId}
                        </code>
                      </TableCell>
                      <TableCell className="font-medium">{filing.project}</TableCell>
                      <TableCell>{filing.asset}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{filing.authority}</Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs">{filing.submissionRef}</code>
                      </TableCell>
                      <TableCell>
                        {new Date(filing.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(filing.status)}</TableCell>
                      <TableCell>
                        <span className="text-sm">{filing.aging}d</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/compliance/cases/${filing.caseId}`);
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
