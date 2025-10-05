import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "1",
    name: "JSW Q4 2024",
    brand: "JSW Steel",
    category: "Financial Services",
    owner: "Marketing Team",
    assets: 24,
    passRate: 87,
    dueDate: "2025-11-15",
    status: "active",
  },
  {
    id: "2",
    name: "Angel One Demat Campaign",
    brand: "Angel One",
    category: "Trading Platform",
    owner: "Product Team",
    assets: 18,
    passRate: 92,
    dueDate: "2025-11-20",
    status: "active",
  },
  {
    id: "3",
    name: "JSW Paints Launch",
    brand: "JSW Paints",
    category: "Consumer Products",
    owner: "Brand Team",
    assets: 31,
    passRate: 95,
    dueDate: "2025-11-10",
    status: "compliance",
  },
];

export default function Projects() {
  return (
    <Layout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BackButton />
          </div>
          <h1 className="text-5xl font-serif font-light tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage all your compliance projects</p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Link to="/projects/new">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-elevated transition-all group cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-normal mb-1 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.brand}</p>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${project.status === 'active' ? 'bg-primary/20 text-primary' : 
                      project.status === 'compliance' ? 'bg-accent/20 text-accent' : 
                      'bg-success/20 text-success'}
                  `}>
                    {project.status === 'active' ? 'Active' : 
                     project.status === 'compliance' ? 'In Compliance' : 'Approved'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium">{project.owner}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assets</span>
                    <span className="font-medium">{project.assets}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pass Rate</span>
                    <span className="font-medium text-success">{project.passRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Due Date</span>
                    <span className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
