import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Inbox, FolderKanban, FileCheck, BarChart3, Settings } from "lucide-react";

const quickActions = [
  {
    title: "Compliance Inbox",
    description: "Review pending submissions",
    icon: Inbox,
    href: "/compliance/inbox",
    count: 2,
  },
  {
    title: "Project Tracker",
    description: "View all projects",
    icon: FolderKanban,
    href: "/compliance/projects",
  },
  {
    title: "Exchange Tracker",
    description: "Track regulatory filings",
    icon: FileCheck,
    href: "/compliance/exchange",
  },
  {
    title: "Reports",
    description: "SLA & throughput metrics",
    icon: BarChart3,
    href: "/compliance/reports",
  },
];

export default function ComplianceHome() {
  return (
    <Layout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fade-in">
        {/* Header */}
        <div className="space-y-3 mb-10">
          <h1 className="text-6xl font-serif font-light tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Compliance Workspace</h1>
          <p className="text-base text-muted-foreground">
            Review submissions, manage approvals, and track regulatory filings
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-warning/30 bg-gradient-to-br from-warning/10 to-warning/5 hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground mb-3 group-hover:text-warning transition-colors">Pending Review</p>
            <p className="text-4xl font-serif font-light text-warning font-numeric">2</p>
            <div className="mt-2 text-xs text-warning/70">Requires attention</div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground mb-3 group-hover:text-primary transition-colors">Under Review</p>
            <p className="text-4xl font-serif font-light font-numeric group-hover:text-primary transition-colors">0</p>
            <div className="mt-2 text-xs text-muted-foreground">Currently processing</div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground mb-3 group-hover:text-primary transition-colors">Awaiting Exchange</p>
            <p className="text-4xl font-serif font-light font-numeric group-hover:text-primary transition-colors">0</p>
            <div className="mt-2 text-xs text-muted-foreground">Filed submissions</div>
          </div>

          <div className="p-6 rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 to-success/5 hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground mb-3 group-hover:text-success transition-colors">Approved This Week</p>
            <p className="text-4xl font-serif font-light text-success font-numeric">1</p>
            <div className="mt-2 text-xs text-success/70">+20% from last week</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-serif font-light mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.href}
                to={action.href}
                className="group p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                    <action.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      {action.count !== undefined && (
                        <span className="px-3 py-1.5 rounded-full bg-warning/20 text-warning text-sm font-semibold shadow-sm">
                          {action.count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
