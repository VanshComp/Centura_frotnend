import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export default function ProjectTracker() {
  const { pid } = useParams();
  const navigate = useNavigate();

  // Mock project data
  const project = {
    id: pid,
    name: "Q4 Mutual Fund Campaign",
    subsidiary: "Mutual Funds Division",
    category: "Mutual Fund",
  };

  // Mock assets with compliance status
  const assets = [
    {
      id: "1",
      caseId: "CASE-001",
      name: "YouTube Pre-roll Final",
      complianceStatus: "UnderReview",
      exchangeStatus: "Submitted",
      exchangeAuthority: "NSE",
      assignedTo: "Sarah Chen",
      slaDays: 2,
    },
    {
      id: "2",
      caseId: "CASE-002",
      name: "Facebook Carousel Ad",
      complianceStatus: "ChangesRequested",
      exchangeStatus: null,
      assignedTo: "Mike Ross",
      slaDays: 4,
    },
    {
      id: "3",
      caseId: "CASE-003",
      name: "Print Ad - Full Page",
      complianceStatus: "ApprovedByCompliance",
      exchangeStatus: "Approved",
      exchangeAuthority: "SEBI",
      assignedTo: "Sarah Chen",
      slaDays: null,
    },
  ];

  const getComplianceStatusBadge = (status: string) => {
    const variants = {
      Pending: "bg-muted text-muted-foreground border-muted",
      UnderReview: "bg-primary/10 text-primary border-primary/30",
      ChangesRequested: "bg-warning/10 text-warning border-warning/30",
      ApprovedByCompliance: "bg-success/10 text-success border-success/30",
      ApprovedByExchange: "bg-success/10 text-success border-success/30",
      Closed: "bg-muted text-muted-foreground border-muted",
    };
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  const getExchangeStatusBadge = (status: string | null, authority?: string) => {
    if (!status) return <span className="text-muted-foreground text-sm">—</span>;
    
    const variants = {
      Submitted: "bg-primary/10 text-primary border-primary/30",
      Approved: "bg-success/10 text-success border-success/30",
      QueryReceived: "bg-warning/10 text-warning border-warning/30",
      Rejected: "bg-destructive/10 text-destructive border-destructive/30",
    };
    
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
        {authority && (
          <Badge variant="outline" className="text-xs">
            {authority}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Projects', href: '/compliance/projects' },
      { label: project.name, href: `/compliance/projects/${pid}` }
    ]}>
      <div className="flex flex-col h-full">
        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-5xl font-serif font-light tracking-tight mb-3">
                {project.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{project.subsidiary}</span>
                <span>•</span>
                <span>Category: {project.category}</span>
                <span>•</span>
                <span>{assets.length} Assets</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">
                  {assets.filter((a) => a.complianceStatus === "UnderReview").length}
                </div>
                <div className="text-sm text-muted-foreground">Under Review</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">
                  {assets.filter((a) => a.complianceStatus === "ChangesRequested").length}
                </div>
                <div className="text-sm text-muted-foreground">Changes Requested</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">
                  {assets.filter((a) => a.complianceStatus === "ApprovedByCompliance").length}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">
                  {assets.filter((a) => a.exchangeStatus === "Submitted").length}
                </div>
                <div className="text-sm text-muted-foreground">Filed with Exchange</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-2xl font-semibold font-numeric">
                  {assets.filter((a) => a.exchangeStatus === "Approved").length}
                </div>
                <div className="text-sm text-muted-foreground">Exchange Approved</div>
              </div>
            </div>

            {/* Project Compliance Grid */}
            <div className="rounded-xl border border-border bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-medium">Assets Compliance Status</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Track compliance and exchange approval status for all assets
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Compliance Status</TableHead>
                    <TableHead>Exchange Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow
                      key={asset.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/compliance/cases/${asset.caseId}`)}
                    >
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {asset.caseId}
                        </code>
                      </TableCell>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{getComplianceStatusBadge(asset.complianceStatus)}</TableCell>
                      <TableCell>
                        {getExchangeStatusBadge(asset.exchangeStatus, asset.exchangeAuthority)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                            {asset.assignedTo.charAt(0)}
                          </div>
                          <span className="text-sm">{asset.assignedTo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {asset.slaDays !== null ? (
                          <span className="text-sm">{asset.slaDays}d remaining</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/compliance/cases/${asset.caseId}`);
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open Case
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
