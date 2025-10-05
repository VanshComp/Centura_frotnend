import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const topFailingRules = [
  { rule: "MF Standard Warning Text", pack: "SEBI MF", failures: 12 },
  { rule: "Disclosure Visibility", pack: "ASCI Influencer", failures: 8 },
  { rule: "Warning Legibility", pack: "Exchange Code", failures: 7 },
  { rule: "Past Performance Disclaimer", pack: "SEBI MF", failures: 5 },
  { rule: "No Misleading Claims", pack: "ASCI Base", failures: 4 },
];

const projectStats = [
  { project: "Q4 Mutual Fund Campaign", assets: 24, passRate: 87, avgIterations: 2.1, avgTime: "18h" },
  { project: "Equity Trading Platform", assets: 18, passRate: 92, avgIterations: 1.8, avgTime: "12h" },
  { project: "IPO Campaign Materials", assets: 31, passRate: 95, avgIterations: 1.4, avgTime: "8h" },
  { project: "Insurance Product Launch", assets: 16, passRate: 90, avgIterations: 1.9, avgTime: "15h" },
];

export default function Reports() {
  return (
    <Layout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BackButton />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-serif font-light tracking-tight">Reports</h1>
              <p className="text-sm text-muted-foreground mt-1">Analytics and insights across all projects</p>
            </div>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Overall Pass Rate"
            value="89%"
            icon={CheckCircle}
            variant="success"
            trend={{ value: "+3% vs last month", positive: true }}
          />
          <MetricCard
            title="Avg Time to Approval"
            value="14.2h"
            icon={Clock}
            variant="primary"
            trend={{ value: "-2.5h vs last month", positive: true }}
          />
          <MetricCard
            title="Avg Iterations"
            value="1.9"
            icon={TrendingUp}
            variant="default"
            trend={{ value: "-0.3 vs last month", positive: true }}
          />
          <MetricCard
            title="Total Issues"
            value="36"
            icon={AlertTriangle}
            variant="warning"
            trend={{ value: "-8 vs last week", positive: true }}
          />
        </div>

        {/* Top Failing Rules */}
        <div>
          <h2 className="text-2xl font-serif font-normal mb-6">Top Failing Rules</h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Rule</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Pack</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Failures (Last 30 Days)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topFailingRules.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium">{item.rule}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
                        {item.pack}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-destructive"
                            style={{ width: `${(item.failures / 12) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{item.failures}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Performance */}
        <div>
          <h2 className="text-2xl font-serif font-normal mb-6">Project Performance</h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Assets</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Pass Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Avg Iterations</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Avg Time to Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projectStats.map((project, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium">{project.project}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{project.assets}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden max-w-[100px]">
                          <div 
                            className="h-full bg-success"
                            style={{ width: `${project.passRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-success">{project.passRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{project.avgIterations}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{project.avgTime}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-serif font-normal mb-4">Pass Rate Trend</h3>
            <div className="aspect-video flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-serif font-normal mb-4">Issues by Category</h3>
            <div className="aspect-video flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
