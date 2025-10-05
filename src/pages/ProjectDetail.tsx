import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { BackButton } from "@/components/BackButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CheckCircle, Clock, AlertTriangle, Plus, Settings, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  { id: "review", title: "To Review", color: "border-l-muted" },
  { id: "changes", title: "Changes Needed", color: "border-l-warning" },
  { id: "compliance", title: "Awaiting Compliance", color: "border-l-accent" },
  { id: "approved", title: "Approved", color: "border-l-success" },
];

const tickets = {
  review: [
    { id: "1", title: "Hero Banner - Desktop", type: "IMAGE", stage: "S3_DESIGN_STATIC", assignee: "Design Team" },
    { id: "2", title: "Product Feature Copy", type: "TEXT", stage: "S2_SCRIPT_COPY", assignee: "Copywriter" },
  ],
  changes: [
    { id: "3", title: "Instagram Reel - Returns", type: "VIDEO", stage: "S4_AV_ROUGHCUT", assignee: "Video Team", issues: 3 },
    { id: "4", title: "SMS Campaign Text", type: "SHORT_TEXT", stage: "S5_CHANNEL_PACKAGING", assignee: "Marketing", issues: 1 },
  ],
  compliance: [
    { id: "5", title: "YouTube Pre-roll Final", type: "VIDEO", stage: "S6_APPROVALS_ARCHIVE", assignee: "Compliance" },
  ],
  approved: [
    { id: "6", title: "Email Subject Lines", type: "TEXT", stage: "S6_APPROVALS_ARCHIVE", assignee: "Approved" },
    { id: "7", title: "Landing Page Hero", type: "IMAGE", stage: "S6_APPROVALS_ARCHIVE", assignee: "Approved" },
  ],
};

export default function ProjectDetail() {
  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Top Navigation Bar */}
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="h-6 w-px bg-border shrink-0" />
            <BackButton />
            <Breadcrumbs items={[
              { label: 'Projects', href: '/projects' },
              { label: 'JSW Q4 2024', href: '/projects/1' }
            ]} />
          </div>
        </div>

        {/* Dynamic Action Bar */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Link to="/assets/new">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Asset
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* Project Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-5xl font-serif font-light tracking-tight truncate">
                JSW Q4 2024
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <span className="font-medium text-foreground">JSW Steel</span>
                <span>•</span>
                <span>Financial Services</span>
                <span>•</span>
                <span>Due Nov 15, 2025</span>
              </div>
            </div>
          </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Assets"
            value="24"
            icon={Clock}
          />
          <MetricCard
            title="Pass Rate"
            value="87%"
            icon={CheckCircle}
            variant="success"
            trend={{ value: "+5%", positive: true }}
          />
          <MetricCard
            title="In Review"
            value="6"
            icon={Clock}
            variant="primary"
          />
          <MetricCard
            title="Issues"
            value="4"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Kanban Board */}
        <div>
          <h2 className="text-3xl font-serif font-light mb-6 tracking-tight">Asset Pipeline</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {columns.map((column) => (
              <div key={column.id} className="space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-semibold text-sm">
                    {column.title}
                  </h3>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                    {tickets[column.id as keyof typeof tickets].length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-2">
                  {tickets[column.id as keyof typeof tickets].map((ticket) => (
                    <Link key={ticket.id} to={`/projects/1/assets/${ticket.id}`}>
                      <div className={`
                        p-4 rounded-xl border-l-4 bg-card/50 border border-border/50
                        hover:border-border hover:shadow-md transition-all
                        cursor-pointer group ${column.color}
                      `}>
                        <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">
                          {ticket.title}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-muted/50 text-muted-foreground uppercase tracking-wider">
                            {ticket.type}
                          </span>
                        </div>
                        {ticket.issues && (
                          <div className="mb-3">
                            <StatusBadge status="warning" count={ticket.issues} size="sm" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-medium ring-1 ring-primary/20">
                            {ticket.assignee[0]}
                          </div>
                          <span>{ticket.assignee}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Add Card Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 border-dashed text-xs h-8"
                >
                  <Plus className="w-3 h-3" />
                  Add Asset
                </Button>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}
