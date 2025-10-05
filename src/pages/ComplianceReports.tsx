import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function ComplianceReports() {
  // Mock SLA data
  const slaData = [
    { category: "Mutual Fund", total: 45, onTime: 42, breached: 3, avgDays: 2.3 },
    { category: "Life Insurance", total: 38, onTime: 35, breached: 3, avgDays: 2.8 },
    { category: "Term Plan", total: 52, onTime: 48, breached: 4, avgDays: 2.5 },
    { category: "Health Insurance", total: 29, onTime: 28, breached: 1, avgDays: 1.9 },
  ];

  // Mock throughput data
  const throughputData = [
    { officer: "Sarah Chen", assigned: 28, completed: 25, pending: 3, avgTime: "2.1d" },
    { officer: "Mike Ross", assigned: 22, completed: 19, pending: 3, avgTime: "2.4d" },
    { officer: "Jessica Pearson", assigned: 31, completed: 30, pending: 1, avgTime: "1.8d" },
    { officer: "Harvey Specter", assigned: 25, completed: 23, pending: 2, avgTime: "2.2d" },
  ];

  // Mock aging data
  const agingData = [
    { caseId: "CASE-089", project: "Q4 Mutual Fund", days: 8, status: "UnderReview", priority: "High" },
    { caseId: "CASE-076", project: "Term Plan Launch", days: 7, status: "ChangesRequested", priority: "Medium" },
    { caseId: "CASE-091", project: "Health Insurance", days: 6, status: "UnderReview", priority: "High" },
    { caseId: "CASE-103", project: "Life Insurance Q4", days: 5, status: "UnderReview", priority: "Low" },
  ];

  // Mock approval stats by category
  const approvalStats = [
    { category: "Mutual Fund", approved: 42, changes: 8, rejected: 2, approvalRate: 80.8 },
    { category: "Life Insurance", approved: 35, changes: 6, rejected: 1, approvalRate: 83.3 },
    { category: "Term Plan", approved: 48, changes: 9, rejected: 3, approvalRate: 80.0 },
    { category: "Health Insurance", approved: 28, changes: 3, rejected: 0, approvalRate: 90.3 },
  ];

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Reports', href: '/compliance/reports' }
    ]}>
      <div className="flex flex-col h-full">
        {/* Dynamic Action Bar */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-end">
            <Button size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export All Reports
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-5xl font-serif font-light tracking-tight mb-3">
                Compliance Reports
              </h1>
              <p className="text-muted-foreground">
                SLA performance, throughput, and approval metrics
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">SLA Compliance</span>
                </div>
                <div className="text-3xl font-semibold font-numeric">92.3%</div>
                <div className="text-xs text-success mt-1 font-numeric">+2.1% from last month</div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Avg Turnaround</span>
                </div>
                <div className="text-3xl font-semibold font-numeric">2.3d</div>
                <div className="text-xs text-success mt-1 font-numeric">-0.4d improvement</div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-warning" />
                  <span className="text-sm text-muted-foreground">Cases Aging</span>
                </div>
                <div className="text-3xl font-semibold font-numeric">4</div>
                <div className="text-xs text-warning mt-1">&gt;5 days old</div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="text-sm text-muted-foreground">SLA Breaches</span>
                </div>
                <div className="text-3xl font-semibold font-numeric">11</div>
                <div className="text-xs text-destructive mt-1">This month</div>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="sla" className="space-y-6">
              <TabsList>
                <TabsTrigger value="sla">SLA Performance</TabsTrigger>
                <TabsTrigger value="throughput">Throughput</TabsTrigger>
                <TabsTrigger value="aging">Aging Cases</TabsTrigger>
                <TabsTrigger value="approvals">Approvals by Category</TabsTrigger>
              </TabsList>

              <TabsContent value="sla">
                <Card>
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">SLA Performance by Category</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      On-time completion rates and average turnaround
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Cases</TableHead>
                        <TableHead>On Time</TableHead>
                        <TableHead>Breached</TableHead>
                        <TableHead>Compliance Rate</TableHead>
                        <TableHead>Avg. Days</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {slaData.map((row) => (
                        <TableRow key={row.category}>
                          <TableCell className="font-medium">{row.category}</TableCell>
                          <TableCell>{row.total}</TableCell>
                          <TableCell>
                            <span className="text-success">{row.onTime}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-destructive">{row.breached}</span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                (row.onTime / row.total) * 100 >= 90
                                  ? "bg-success/10 text-success border-success/30"
                                  : "bg-warning/10 text-warning border-warning/30"
                              }
                            >
                              {((row.onTime / row.total) * 100).toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell>{row.avgDays}d</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="throughput">
                <Card>
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">Officer Throughput</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Individual performance and workload distribution
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Officer</TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Pending</TableHead>
                        <TableHead>Completion Rate</TableHead>
                        <TableHead>Avg. Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {throughputData.map((row) => (
                        <TableRow key={row.officer}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                                {row.officer.charAt(0)}
                              </div>
                              {row.officer}
                            </div>
                          </TableCell>
                          <TableCell>{row.assigned}</TableCell>
                          <TableCell>{row.completed}</TableCell>
                          <TableCell>{row.pending}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-primary/10 text-primary border-primary/30"
                            >
                              {((row.completed / row.assigned) * 100).toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell>{row.avgTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="aging">
                <Card>
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">Aging Cases</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cases older than 5 days requiring attention
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Days Old</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agingData.map((row) => (
                        <TableRow key={row.caseId}>
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {row.caseId}
                            </code>
                          </TableCell>
                          <TableCell className="font-medium">{row.project}</TableCell>
                          <TableCell>
                            <span className="text-destructive font-medium">{row.days}d</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{row.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                row.priority === "High"
                                  ? "bg-destructive/10 text-destructive border-destructive/30"
                                  : row.priority === "Medium"
                                  ? "bg-warning/10 text-warning border-warning/30"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {row.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Case
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="approvals">
                <Card>
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-medium">Approvals by Category</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Decision outcomes and approval rates
                    </p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Approved</TableHead>
                        <TableHead>Changes Requested</TableHead>
                        <TableHead>Rejected</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Approval Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvalStats.map((row) => (
                        <TableRow key={row.category}>
                          <TableCell className="font-medium">{row.category}</TableCell>
                          <TableCell>
                            <span className="text-success">{row.approved}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-warning">{row.changes}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-destructive">{row.rejected}</span>
                          </TableCell>
                          <TableCell>{row.approved + row.changes + row.rejected}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                row.approvalRate >= 85
                                  ? "bg-success/10 text-success border-success/30"
                                  : "bg-warning/10 text-warning border-warning/30"
                              }
                            >
                              {row.approvalRate.toFixed(1)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
          </Tabs>
        </div>
      </div>
      </div>
    </Layout>
  );
}
