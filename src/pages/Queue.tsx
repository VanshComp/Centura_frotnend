import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const myAssets = [
  {
    id: "1",
    title: "Instagram Reel - MF Returns",
    project: "Q4 Mutual Fund Campaign",
    status: "warning",
    stage: "S4_AV_ROUGHCUT",
    priority: "high",
    dueDate: "2025-11-10",
    issues: 3,
  },
  {
    id: "2",
    title: "Landing Page Copy",
    project: "Equity Trading Platform",
    status: "pass",
    stage: "S2_SCRIPT_COPY",
    priority: "medium",
    dueDate: "2025-11-12",
    issues: 0,
  },
  {
    id: "3",
    title: "Email Banner - IPO Offer",
    project: "IPO Campaign Materials",
    status: "fail",
    stage: "S3_DESIGN_STATIC",
    priority: "high",
    dueDate: "2025-11-08",
    issues: 5,
  },
  {
    id: "4",
    title: "YouTube Pre-roll Script",
    project: "Q4 Mutual Fund Campaign",
    status: "warning",
    stage: "S2_SCRIPT_COPY",
    priority: "medium",
    dueDate: "2025-11-15",
    issues: 1,
  },
  {
    id: "7",
    title: "Product Feature Cards",
    project: "Equity Trading Platform",
    status: "warning",
    stage: "S3_DESIGN_STATIC",
    priority: "low",
    dueDate: "2025-11-18",
    issues: 2,
  },
  {
    id: "8",
    title: "SMS Campaign Text",
    project: "Insurance Product Launch",
    status: "fail",
    stage: "S5_CHANNEL_PACKAGING",
    priority: "high",
    dueDate: "2025-11-09",
    issues: 2,
  },
];

export default function Queue() {
  const sortedAssets = [...myAssets].sort((a, b) => {
    // Sort by priority (high first) then by due date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority as keyof typeof priorityOrder] !== priorityOrder[b.priority as keyof typeof priorityOrder]) {
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Layout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BackButton />
          </div>
          <h1 className="text-5xl font-serif font-light tracking-tight">My Queue</h1>
          <p className="text-sm text-muted-foreground">Assets assigned to you, sorted by priority and due date</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Assigned</span>
            </div>
            <p className="text-3xl font-serif font-light">{myAssets.length}</p>
          </div>

          <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">High Priority</span>
            </div>
            <p className="text-3xl font-serif font-light text-destructive">
              {myAssets.filter(a => a.priority === 'high').length}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-warning/30 bg-warning/5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Issues to Fix</span>
            </div>
            <p className="text-3xl font-serif font-light text-warning">
              {myAssets.reduce((sum, a) => sum + a.issues, 0)}
            </p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Asset</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Stage</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{asset.title}</p>
                        {asset.issues > 0 && (
                          <p className="text-sm text-warning mt-1">
                            {asset.issues} issue{asset.issues > 1 ? 's' : ''} to resolve
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{asset.project}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
                        {asset.stage.replace(/S\d_/, '').replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={asset.status as any} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        text-sm px-3 py-1 rounded-full font-medium
                        ${asset.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                          asset.priority === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-muted text-muted-foreground'}
                      `}>
                        {asset.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{new Date(asset.dueDate).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/assets/${asset.id}`}>
                        <Button variant="ghost" size="sm">
                          Open
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
