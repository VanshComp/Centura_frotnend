import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { FolderKanban, Clock, CheckCircle, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const recentProjects = [
  {
    id: "1",
    name: "Q4 Mutual Fund Campaign",
    brand: "ABC Mutual Fund",
    category: "Mutual Fund",
    assets: 24,
    status: "active",
    passRate: 87,
    dueDate: "2025-11-15",
  },
  {
    id: "2",
    name: "Equity Trading Platform Launch",
    brand: "XYZ Securities",
    category: "Equity",
    assets: 18,
    status: "active",
    passRate: 92,
    dueDate: "2025-11-20",
  },
  {
    id: "3",
    name: "IPO Campaign Materials",
    brand: "NewCo Ltd",
    category: "IPO",
    assets: 31,
    status: "compliance",
    passRate: 95,
    dueDate: "2025-11-10",
  },
];

const recentAssets = [
  { id: "1", title: "Instagram Reel - MF Returns", project: "Q4 Mutual Fund Campaign", status: "warning", stage: "S4_AV_ROUGHCUT" },
  { id: "2", title: "Landing Page Copy", project: "Equity Trading Platform", status: "pass", stage: "S2_SCRIPT_COPY" },
  { id: "3", title: "Email Banner - IPO Offer", project: "IPO Campaign Materials", status: "fail", stage: "S3_DESIGN_STATIC" },
  { id: "4", title: "YouTube Pre-roll Script", project: "Q4 Mutual Fund Campaign", status: "warning", stage: "S2_SCRIPT_COPY" },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-5xl font-serif font-light tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Overview of your compliance projects and activities
            </p>
          </div>
          <Link to="/projects/new">
            <Button size="lg" className="gap-2 shadow-sm">
              <Plus className="w-5 h-5" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Projects"
            value="12"
            icon={FolderKanban}
            variant="primary"
          />
          <MetricCard
            title="Assets in Review"
            value="47"
            icon={Clock}
            trend={{ value: "+12%", positive: true }}
          />
          <MetricCard
            title="Pass Rate"
            value="89%"
            icon={CheckCircle}
            variant="success"
            trend={{ value: "+3%", positive: true }}
          />
          <MetricCard
            title="Issues"
            value="23"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-serif font-light tracking-tight">Recent Projects</h2>
            <Link to="/projects">
              <Button variant="ghost" size="sm" className="gap-1">
                View all →
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-border hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold mb-0.5 group-hover:text-primary transition-colors truncate">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{project.brand}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-primary/80">{project.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Assets</span>
                      <span className="font-medium">{project.assets}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Pass Rate</span>
                      <span className="font-medium text-success">{project.passRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Due</span>
                      <span className="font-medium">{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Assets */}
        <div>
          <h2 className="text-3xl font-serif font-light mb-6 tracking-tight">Recent Activity</h2>
          
          <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm">{asset.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">{asset.project}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] px-2 py-1 rounded-full bg-muted/50 text-muted-foreground uppercase tracking-wider">
                          {asset.stage.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={asset.status as any} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/assets/${asset.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs">
                            View →
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
      </div>
    </Layout>
  );
}
