import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ComplianceSettings() {
  const { toast } = useToast();

  // Mock SLA targets by category
  const slaTargets = [
    { id: "1", category: "Mutual Fund", targetDays: 3, priorityMultiplier: 0.5 },
    { id: "2", category: "Life Insurance", targetDays: 3, priorityMultiplier: 0.5 },
    { id: "3", category: "Term Plan", targetDays: 2, priorityMultiplier: 0.5 },
    { id: "4", category: "Health Insurance", targetDays: 2, priorityMultiplier: 0.5 },
  ];

  // Mock decision templates
  const decisionTemplates = [
    { id: "1", name: "Missing Risk Disclosure", type: "RequestChanges", text: "Risk disclosure statements are incomplete or missing required disclaimers." },
    { id: "2", name: "Performance Data Issues", type: "RequestChanges", text: "Performance data presentation does not meet regulatory standards." },
    { id: "3", name: "Misleading Claims", type: "RequestChanges", text: "Content contains potentially misleading claims or guarantees." },
    { id: "4", name: "Standard Approval", type: "Approve", text: "All compliance requirements met. Approved for publication." },
  ];

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your compliance settings have been updated.",
    });
  };

  const handleAddCategory = () => {
    toast({
      title: "Add category",
      description: "Opening form to add a new compliance category...",
    });
  };

  const handleEdit = (category: string) => {
    toast({
      title: "Edit category",
      description: `Editing ${category}...`,
    });
  };

  const handleDelete = (item: string) => {
    toast({
      title: "Item deleted",
      description: `${item} has been removed.`,
      variant: "destructive",
    });
  };

  const handleAddTemplate = () => {
    toast({
      title: "Add template",
      description: "Creating a new decision template...",
    });
  };

  const handleAddAuthority = () => {
    toast({
      title: "Add authority",
      description: "Adding a new regulatory authority...",
    });
  };

  const handleManageUsers = (role: string) => {
    toast({
      title: "Manage users",
      description: `Opening user management for ${role} role...`,
    });
  };

  return (
    <Layout breadcrumbs={[
      { label: 'Compliance', href: '/compliance' },
      { label: 'Settings', href: '/compliance/settings' }
    ]}>
      <div className="flex flex-col h-full">
        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-[1200px] mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl font-serif font-light tracking-tight mb-3">
                Compliance Settings
              </h1>
              <p className="text-muted-foreground">
                Manage SLA targets, decision templates, and compliance workflows
              </p>
            </div>

            <Tabs defaultValue="sla" className="space-y-6">
              <TabsList>
                <TabsTrigger value="sla">SLA Targets</TabsTrigger>
                <TabsTrigger value="templates">Decision Templates</TabsTrigger>
                <TabsTrigger value="authorities">Authorities</TabsTrigger>
                <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              </TabsList>

              <TabsContent value="sla" className="space-y-6">
                <Card>
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">SLA Targets by Category</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Set default turnaround times for each compliance category
                        </p>
                      </div>
                      <Button className="gap-2" onClick={handleAddCategory}>
                        <Plus className="w-4 h-4" />
                        Add Category
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Target (Days)</TableHead>
                        <TableHead>High Priority Multiplier</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {slaTargets.map((target) => (
                        <TableRow key={target.id}>
                          <TableCell className="font-medium">{target.category}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              defaultValue={target.targetDays}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.1"
                              defaultValue={target.priorityMultiplier}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(target.category)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(target.category)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="p-6 border-t border-border">
                    <Button onClick={handleSave}>Save SLA Settings</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Decision Templates</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pre-defined reasons for approval or change requests
                        </p>
                      </div>
                      <Button className="gap-2" onClick={handleAddTemplate}>
                        <Plus className="w-4 h-4" />
                        Add Template
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {decisionTemplates.map((template) => (
                      <Card key={template.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Input
                                defaultValue={template.name}
                                className="font-medium"
                              />
                              <Select defaultValue={template.type}>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Approve">Approve</SelectItem>
                                  <SelectItem value="RequestChanges">Request Changes</SelectItem>
                                  <SelectItem value="OnHold">On Hold</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Textarea
                              defaultValue={template.text}
                              className="min-h-[80px]"
                            />
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(template.name)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="p-6 border-t border-border">
                    <Button onClick={handleSave}>Save Templates</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="authorities" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Exchange & Regulatory Authorities</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Manage the list of authorities for filing tracking
                  </p>
                  <div className="space-y-3">
                    {["NSE", "BSE", "SEBI", "IRDAI", "RBI"].map((authority) => (
                      <div key={authority} className="flex items-center gap-3">
                        <Input defaultValue={authority} className="flex-1" />
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(authority)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="gap-2" onClick={handleAddAuthority}>
                      <Plus className="w-4 h-4" />
                      Add Authority
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button onClick={handleSave}>Save Authorities</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="roles" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Roles & Permissions</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Manage user roles and access levels
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 border border-border rounded-lg">
                      <div>
                        <Label>Compliance Officer</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Review cases, make decisions, manage filings
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleManageUsers("Compliance Officer")}>Manage Users</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4 border border-border rounded-lg">
                      <div>
                        <Label>Compliance Lead</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          All officer capabilities + triage, reassign, SLA controls
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleManageUsers("Compliance Lead")}>Manage Users</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4 border border-border rounded-lg">
                      <div>
                        <Label>Admin</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Full system access, settings, and user management
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleManageUsers("Admin")}>Manage Users</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
          </Tabs>
        </div>
      </div>
      </div>
    </Layout>
  );
}
