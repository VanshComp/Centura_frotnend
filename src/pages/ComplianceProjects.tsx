import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ComplianceProjects() {
  const navigate = useNavigate();

  // Mock projects data
  const projects = [
    {
      id: "1",
      name: "Q4 Mutual Fund Campaign",
      subsidiary: "Mutual Funds Division",
      category: "Mutual Fund",
      assets: 5,
      pending: 1,
      underReview: 1,
      approved: 3,
    },
    {
      id: "2",
      name: "Life Insurance Q4",
      subsidiary: "Life Insurance Division",
      category: "Life Insurance",
      assets: 8,
      pending: 0,
      underReview: 2,
      approved: 6,
    },
    {
      id: "3",
      name: "Term Plan Launch",
      subsidiary: "Insurance Division",
      category: "Term Plan",
      assets: 6,
      pending: 0,
      underReview: 1,
      approved: 5,
    },
    {
      id: "4",
      name: "Health Insurance Campaign",
      subsidiary: "Health Insurance Division",
      category: "Health Insurance",
      assets: 4,
      pending: 0,
      underReview: 0,
      approved: 4,
    },
  ];

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Projects', href: '/compliance/projects' }
    ]}>
      <div className="flex flex-col h-full">
        {/* Dynamic Action Bar - Filters */}
        <div className="border-b border-border/50 bg-background/50 px-6 py-3">
          <div className="flex items-center justify-end gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-light tracking-tight mb-2">
                Compliance Projects
              </h1>
              <p className="text-muted-foreground">
                Track compliance status across all active projects
              </p>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Subsidiary</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Total Assets</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Under Review</TableHead>
                    <TableHead>Approved</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow
                      key={project.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/compliance/projects/${project.id}`)}
                    >
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.subsidiary}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-numeric">{project.assets}</span>
                      </TableCell>
                      <TableCell>
                        {project.pending > 0 ? (
                          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 font-numeric">
                            {project.pending}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground font-numeric">0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {project.underReview > 0 ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-numeric">
                            {project.underReview}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground font-numeric">0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30 font-numeric">
                          {project.approved}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/compliance/projects/${project.id}`);
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Details
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
