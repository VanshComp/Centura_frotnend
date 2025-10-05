import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  markers?: Array<{
    time: number;
    type: 'warning' | 'issue' | 'disclosure';
    label: string;
  }>;
}

export const VideoPlayer = ({ src, markers = [] }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(30); // Mock duration

  return (
    <div className="flex flex-col h-full">
      {/* Video Container */}
      <div className="flex-1 bg-black relative flex items-center justify-center">
        {src ? (
          <video className="w-full h-full" />
        ) : (
          <div className="text-center">
            <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Video preview</p>
          </div>
        )}

        {/* Overlay controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <div className="flex-1">
              <div className="relative">
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                {/* Markers */}
                {markers.map((marker, idx) => (
                  <div
                    key={idx}
                    className={`
                      absolute w-2 h-2 rounded-full -top-0.5 -translate-x-1
                      ${marker.type === 'warning' ? 'bg-warning' :
                        marker.type === 'issue' ? 'bg-destructive' :
                        'bg-primary'}
                    `}
                    style={{ left: `${(marker.time / duration) * 100}%` }}
                    title={marker.label}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-white/70 mt-1">
                <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/20"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline Markers */}
      {markers.length > 0 && (
        <div className="p-4 border-t border-border bg-card space-y-2">
          <p className="text-sm font-medium">Timeline Markers</p>
          <div className="space-y-1">
            {markers.map((marker, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTime(marker.time)}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors text-left"
              >
                <div className={`
                  w-2 h-2 rounded-full
                  ${marker.type === 'warning' ? 'bg-warning' :
                    marker.type === 'issue' ? 'bg-destructive' :
                    'bg-primary'}
                `} />
                <span className="text-xs font-mono text-muted-foreground min-w-[50px]">
                  {Math.floor(marker.time / 60)}:{String(Math.floor(marker.time % 60)).padStart(2, '0')}
                </span>
                <span className="text-sm flex-1">{marker.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
