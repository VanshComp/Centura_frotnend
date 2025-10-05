import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const assets = [
  { 
    id: "1", 
    title: "Instagram Reel - MF Returns", 
    project: "Q4 Mutual Fund Campaign", 
    stage: "S4_AV_ROUGHCUT", 
    assetType: "VIDEO",
    category: "MUTUAL_FUND",
    status: "warning", 
    assignee: "Video Team",
    updated: "2 hours ago",
    influencer: false
  },
  { 
    id: "2", 
    title: "Landing Page Copy", 
    project: "Equity Trading Platform", 
    stage: "S2_SCRIPT_COPY", 
    assetType: "TEXT",
    category: "EQUITY",
    status: "pass", 
    assignee: "Copy Team",
    updated: "1 day ago",
    influencer: false
  },
  { 
    id: "3", 
    title: "Email Banner - IPO Offer", 
    project: "IPO Campaign Materials", 
    stage: "S3_DESIGN_STATIC", 
    assetType: "IMAGE",
    category: "IPO",
    status: "fail", 
    assignee: "Design Team",
    updated: "3 hours ago",
    influencer: false
  },
  { 
    id: "4", 
    title: "YouTube Pre-roll Script", 
    project: "Q4 Mutual Fund Campaign", 
    stage: "S2_SCRIPT_COPY", 
    assetType: "TEXT",
    category: "MUTUAL_FUND",
    status: "warning", 
    assignee: "Copy Team",
    updated: "1 day ago",
    influencer: true
  },
  { 
    id: "5", 
    title: "SMS Campaign - F&O Launch", 
    project: "Derivatives Campaign", 
    stage: "S5_CHANNEL_PACKAGING", 
    assetType: "SHORT_TEXT",
    category: "DERIVATIVES",
    status: "pass", 
    assignee: "Marketing Team",
    updated: "5 hours ago",
    influencer: false
  },
];

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <Layout>
      <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BackButton />
          </div>
          <h1 className="text-5xl font-serif font-light tracking-tight">Assets Library</h1>
          <p className="text-sm text-muted-foreground">Browse and manage all creative assets across projects</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search assets by title, ID, or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-4 py-2 rounded-lg bg-input border border-border text-sm"
          >
            <option value="all">All Stages</option>
            <option value="S1_CONCEPT_CLAIMS">S1: Concept & Claims</option>
            <option value="S2_SCRIPT_COPY">S2: Script & Copy</option>
            <option value="S3_DESIGN_STATIC">S3: Design & Static</option>
            <option value="S4_AV_ROUGHCUT">S4: AV Rough Cut</option>
            <option value="S5_CHANNEL_PACKAGING">S5: Channel Packaging</option>
            <option value="S6_APPROVALS_ARCHIVE">S6: Approvals & Archive</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg bg-input border border-border text-sm"
          >
            <option value="all">All Types</option>
            <option value="TEXT">Text/Script</option>
            <option value="IMAGE">Image/Poster</option>
            <option value="VIDEO">Video</option>
            <option value="SHORT_TEXT">Short Text</option>
            <option value="AUDIO">Audio</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-input border border-border text-sm"
          >
            <option value="all">All Status</option>
            <option value="pass">Pass</option>
            <option value="warning">Warning</option>
            <option value="fail">Fail</option>
          </select>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Assets Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Asset</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Stage</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Assignee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{asset.title}</p>
                        {asset.influencer && (
                          <span className="text-xs px-2 py-0.5 rounded bg-warning/20 text-warning">
                            Influencer
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{asset.project}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                        {asset.stage.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{asset.assetType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{asset.category.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={asset.status as any} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{asset.assignee}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{asset.updated}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/assets/${asset.id}`}>
                        <Button variant="ghost" size="sm">
                          View
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
