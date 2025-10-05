import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageViewer } from "@/components/ImageViewer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useState } from "react";
import { FileText, Image, Video } from "lucide-react";

interface CreativePreviewProps {
  assetType: "text" | "image" | "video";
}

export function CreativePreview({ assetType }: CreativePreviewProps) {
  const [selectedVersion, setSelectedVersion] = useState("latest");
  const [comparisonMode, setComparisonMode] = useState(false);

  // Mock versions
  const versions = [
    { value: "latest", label: "Latest Submission (v3)", date: "2025-11-05" },
    { value: "v2", label: "Version 2", date: "2025-11-03" },
    { value: "v1", label: "Version 1", date: "2025-11-01" },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Version:</span>
              <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((v) => (
                    <SelectItem key={v.value} value={v.value}>
                      {v.label} • {v.date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setComparisonMode(!comparisonMode)}
            >
              {comparisonMode ? "Single View" : "Compare Versions"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {assetType === "text" && <FileText className="w-4 h-4 text-muted-foreground" />}
            {assetType === "image" && <Image className="w-4 h-4 text-muted-foreground" />}
            {assetType === "video" && <Video className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm text-muted-foreground capitalize">{assetType} Asset</span>
          </div>
        </div>
      </Card>

      {/* Preview Area */}
      <div className={comparisonMode ? "grid grid-cols-2 gap-6" : ""}>
        <Card className="p-6 border-border">
          <h4 className="text-sm font-medium mb-4">
            {comparisonMode ? "Selected Version" : "Creative Preview"}
          </h4>
          {assetType === "video" && (
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
          )}
          {assetType === "image" && (
            <ImageViewer
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
              alt="Marketing Asset"
            />
          )}
          {assetType === "text" && (
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <div className="prose prose-sm max-w-none">
                <h3>Investment Opportunity: Mutual Fund</h3>
                <p>
                  Discover growth potential with our diversified mutual fund portfolio. Designed for
                  investors seeking long-term wealth creation with professional fund management.
                </p>
                <ul>
                  <li>Diversified across sectors and market caps</li>
                  <li>Professional fund management team</li>
                  <li>Low minimum investment requirement</li>
                  <li>Tax benefits under Section 80C</li>
                </ul>
                <p className="text-xs text-muted-foreground italic">
                  *Past performance is not indicative of future returns. Mutual fund investments are
                  subject to market risks. Please read the scheme information document carefully before
                  investing.
                </p>
              </div>
            </div>
          )}
        </Card>

        {comparisonMode && (
          <Card className="p-6 border-border">
            <h4 className="text-sm font-medium mb-4">Previous Version</h4>
            <div className="rounded-lg border border-border bg-muted/30 p-6 flex items-center justify-center h-[400px]">
              <p className="text-sm text-muted-foreground">Previous version preview</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
