import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      <div className="p-8 space-y-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 py-12">
          <h1 className="text-6xl md:text-7xl font-serif font-light glow-effect">
            Centura
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Stage-aware, ticket-driven Brand & Regulatory Compliance Platform
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/projects/new">
              <Button size="lg" className="gap-2 shadow-glow">
                <Plus className="w-5 h-5" />
                Create Project
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline" className="gap-2">
                View Projects
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-normal">Stage-Aware Compliance</h3>
            <p className="text-muted-foreground">
              Enforce the right checks at each stage from concept to archive, across all regulatory packs.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur space-y-4">
            <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-2xl font-serif font-normal">One-Click Fixes</h3>
            <p className="text-muted-foreground">
              Apply recommended text edits, overlay templates, and disclosure badges instantly.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur space-y-4">
            <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-2xl font-serif font-normal">Complete Workflow</h3>
            <p className="text-muted-foreground">
              From asset creation to compliance approval with versioning, collaboration, and audit trails.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-light mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/queue">
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">My Queue</h3>
                <p className="text-sm text-muted-foreground">View assets assigned to you</p>
              </div>
            </Link>
            <Link to="/assets">
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Assets Library</h3>
                <p className="text-sm text-muted-foreground">Browse all creative assets</p>
              </div>
            </Link>
            <Link to="/compliance">
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Compliance Inbox</h3>
                <p className="text-sm text-muted-foreground">Review submitted assets</p>
              </div>
            </Link>
            <Link to="/reports">
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Reports</h3>
                <p className="text-sm text-muted-foreground">Analytics and insights</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
