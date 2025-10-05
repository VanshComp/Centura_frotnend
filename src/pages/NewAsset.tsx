import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useUnsavedGuard } from "@/hooks/use-unsaved-guard";

export default function NewAsset() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    stage: "S2_SCRIPT_COPY",
    assetType: "TEXT",
    category: "MUTUAL_FUND",
    channel: "social",
    influencerFlag: false,
    priority: "medium",
    assignee: "",
    dueDate: "",
  });
  
  const [isDirty, setIsDirty] = useState(false);
  
  // Guard against navigation with unsaved changes
  useUnsavedGuard({ when: isDirty && formData.title.length > 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDirty(false);
    toast({
      title: "Asset created",
      description: "Your asset has been created successfully.",
    });
    navigate("/projects/1");
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
              <BackButton isDirty={isDirty && formData.title.length > 0} />
            </div>
            <h1 className="text-4xl font-serif font-light tracking-tight">Create New Asset</h1>
            <p className="text-sm text-muted-foreground">Add a new creative asset to your project</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Instagram Reel - MF Returns"
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stage *
                  </label>
                  <select
                    required
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
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

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Asset Type *
                  </label>
                  <select
                    required
                    value={formData.assetType}
                    onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                  >
                    <option value="TEXT">Text/Script</option>
                    <option value="IMAGE">Image/Poster</option>
                    <option value="VIDEO">Video</option>
                    <option value="SHORT_TEXT">Short Text (SMS/Push)</option>
                    <option value="AUDIO">Audio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                  >
                    <option value="EQUITY">Equity (Cash)</option>
                    <option value="DERIVATIVES">Derivatives (F&O)</option>
                    <option value="COMMODITIES">Commodities</option>
                    <option value="MUTUAL_FUND">Mutual Fund</option>
                    <option value="INSURANCE">Insurance</option>
                    <option value="IPO">IPO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Channel *
                  </label>
                  <select
                    required
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                  >
                    <option value="social">Social Media</option>
                    <option value="email">Email</option>
                    <option value="web">Website</option>
                    <option value="app">Mobile App</option>
                    <option value="print">Print</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority *
                  </label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Assignee
                </label>
                <input
                  type="text"
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  placeholder="Select team or user"
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="influencer"
                  checked={formData.influencerFlag}
                  onChange={(e) => setFormData({ ...formData, influencerFlag: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="influencer" className="text-sm font-medium">
                  Influencer or Social campaign (enables ASCI Influencer checks)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formData.assetType === 'TEXT' && 'Or compose in the editor after creation'}
                    {formData.assetType === 'IMAGE' && 'PNG, JPG, SVG up to 10MB'}
                    {formData.assetType === 'VIDEO' && 'MP4, MOV up to 100MB'}
                    {formData.assetType === 'SHORT_TEXT' && 'Or compose in the editor after creation'}
                    {formData.assetType === 'AUDIO' && 'WAV, MP3 up to 50MB'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" size="lg" className="shadow-glow">
                Create Asset
              </Button>
              <Link to="/projects/1">
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
