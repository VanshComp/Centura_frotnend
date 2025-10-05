import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  overlays?: Array<{
    type: 'warning' | 'disclosure' | 'identity';
    position: { x: number; y: number; width: number; height: number };
    content: string;
  }>;
}

export const ImageViewer = ({ src, alt, overlays = [] }: ImageViewerProps) => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.max(50, zoom - 25))}
            disabled={zoom <= 50}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            disabled={zoom >= 200}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Image Container */}
      <div className="flex-1 overflow-auto bg-black/20 p-8 flex items-center justify-center">
        <div className="relative" style={{ transform: `scale(${zoom / 100})` }}>
          <img
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg shadow-elevated"
          />
          
          {/* Overlays */}
          {overlays.map((overlay, idx) => (
            <div
              key={idx}
              className={`
                absolute border-2 rounded
                ${overlay.type === 'warning' ? 'border-warning bg-warning/10' :
                  overlay.type === 'disclosure' ? 'border-primary bg-primary/10' :
                  'border-accent bg-accent/10'}
              `}
              style={{
                left: `${overlay.position.x}%`,
                top: `${overlay.position.y}%`,
                width: `${overlay.position.width}%`,
                height: `${overlay.position.height}%`,
              }}
            >
              <div className="absolute -top-6 left-0 text-xs font-medium px-2 py-1 rounded bg-card border border-border whitespace-nowrap">
                {overlay.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
