import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleConnect = (service: string) => {
    toast({
      title: `Connecting to ${service}`,
      description: `Opening ${service} authentication...`,
    });
  };

  const handleCancel = () => {
    toast({
      title: "Changes discarded",
      description: "Your settings have been reset.",
    });
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 mb-4">
              <BackButton />
            </div>
            <h1 className="text-5xl font-serif font-light tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and compliance preferences</p>
          </div>

          {/* Account Settings */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-6">
            <h2 className="text-2xl font-serif font-normal">Account Settings</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="User Name"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="user@company.com"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select className="w-full px-4 py-2 rounded-lg bg-input border border-border">
                <option>Designer</option>
                <option>Copywriter</option>
                <option>Marketing Lead</option>
                <option>Compliance Officer</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-6">
            <h2 className="text-2xl font-serif font-normal">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates for asset changes</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compliance Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when compliance review is needed</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mention Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified when someone mentions you</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
              </div>
            </div>
          </div>

          {/* Compliance Settings */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-6">
            <h2 className="text-2xl font-serif font-normal">Compliance Preferences</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Default Category</label>
              <select className="w-full px-4 py-2 rounded-lg bg-input border border-border">
                <option>Mutual Fund</option>
                <option>Equity (Cash)</option>
                <option>Derivatives (F&O)</option>
                <option>Commodities</option>
                <option>Insurance</option>
                <option>IPO</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Retention Period (Years)</label>
              <input
                type="number"
                defaultValue="5"
                min="1"
                max="10"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border"
              />
              <p className="text-xs text-muted-foreground mt-1">
                How long to retain compliance packets and asset history
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-apply Suggested Fixes</p>
                <p className="text-sm text-muted-foreground">Automatically apply fixes with high confidence</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-border" />
            </div>
          </div>

          {/* Integrations */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-6">
            <h2 className="text-2xl font-serif font-normal">Integrations</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Slack</p>
                  <p className="text-sm text-muted-foreground">Get notifications in Slack channels</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleConnect("Slack")}>Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Microsoft Teams</p>
                  <p className="text-sm text-muted-foreground">Sync updates to Teams channels</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleConnect("Microsoft Teams")}>Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Google Drive</p>
                  <p className="text-sm text-muted-foreground">Import assets from Drive</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleConnect("Google Drive")}>Connect</Button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <Button size="lg" className="gap-2 shadow-glow" onClick={handleSave}>
              <Save className="w-5 h-5" />
              Save Changes
            </Button>
            <Button variant="outline" size="lg" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
