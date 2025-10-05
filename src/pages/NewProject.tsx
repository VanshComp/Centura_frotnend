import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useUnsavedGuard } from "@/hooks/use-unsaved-guard";

export default function NewProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "MUTUAL_FUND",
    owner: "",
    dueDate: "",
    obppEnabled: false,
  });
  
  const [isDirty, setIsDirty] = useState(false);
  
  // Guard against navigation with unsaved changes
  useUnsavedGuard({ when: isDirty && formData.name.length > 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDirty(false);
    toast({
      title: "Project created",
      description: "Your project has been created successfully.",
    });
    navigate("/projects");
  };
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-4">
              <BackButton isDirty={isDirty && formData.name.length > 0} />
            </div>
            <h1 className="text-4xl font-serif font-light tracking-tight">Create New Project</h1>
            <p className="text-sm text-muted-foreground">Set up a new compliance project for your creative assets</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Q4 Mutual Fund Campaign"
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="ABC Mutual Fund"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Owner *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    placeholder="Marketing Team"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Categories Enabled * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['EQUITY', 'DERIVATIVES', 'COMMODITIES', 'MUTUAL_FUND', 'INSURANCE', 'IPO'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.category === cat}
                        onChange={() => setFormData({ ...formData, category: cat })}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">
                        {cat === 'EQUITY' && 'Equity (Cash)'}
                        {cat === 'DERIVATIVES' && 'Derivatives (F&O)'}
                        {cat === 'COMMODITIES' && 'Commodities'}
                        {cat === 'MUTUAL_FUND' && 'Mutual Fund'}
                        {cat === 'INSURANCE' && 'Insurance'}
                        {cat === 'IPO' && 'IPO'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Default Stage
                </label>
                <select
                  value={formData.category}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                >
                  <option value="S1_CONCEPT_CLAIMS">S1: Concept & Claims</option>
                  <option value="S2_SCRIPT_COPY">S2: Script & Copy</option>
                  <option value="S3_DESIGN_STATIC">S3: Design & Static</option>
                  <option value="S4_AV_ROUGHCUT">S4: AV Rough Cut</option>
                  <option value="S5_CHANNEL_PACKAGING">S5: Channel Packaging</option>
                  <option value="S6_APPROVALS_ARCHIVE">S6: Approvals & Archive</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="obpp"
                  checked={formData.obppEnabled}
                  onChange={(e) => setFormData({ ...formData, obppEnabled: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="obpp" className="text-sm font-medium">
                  Enable OBPP/Bonds compliance checks
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" size="lg" className="shadow-glow">
                Create Project
              </Button>
              <Link to="/projects">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
