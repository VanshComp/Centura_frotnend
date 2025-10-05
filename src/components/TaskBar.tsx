import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronUp, 
  ChevronDown, 
  X, 
  ExternalLink,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Task {
  id: string;
  threadTitle: string;
  iteration: string;
  status: "running" | "complete" | "error";
  progress: number;
}

interface TaskBarProps {
  tasks: Task[];
}

export function TaskBar({ tasks }: TaskBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const { projectId, assetId } = useParams();

  const activeTasks = tasks.filter(task => !dismissed.includes(task.id));

  if (activeTasks.length === 0) return null;

  const handleDismiss = (taskId: string) => {
    setDismissed(prev => [...prev, taskId]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-screen-xl mx-auto px-4 pb-4">
        <div className="pointer-events-auto bg-card border border-border rounded-xl shadow-elevated overflow-hidden">
          {/* Collapsed View - Chips */}
          {!expanded && (
            <div className="p-3 flex items-center gap-2 flex-wrap">
              {activeTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 text-sm"
                >
                  {task.status === "running" && (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  )}
                  {task.status === "complete" && (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  )}
                  <span className="font-medium">
                    Checking: {task.threadTitle}
                  </span>
                  <span className="text-muted-foreground">
                    ({task.iteration})
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 -mr-1"
                    onClick={() => handleDismiss(task.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-auto"
                onClick={() => setExpanded(true)}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Expanded View - Panel */}
          {expanded && (
            <div className="max-h-96 overflow-y-auto">
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0">
                <h3 className="font-semibold text-sm">Active Checks</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setExpanded(false)}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Task List */}
              <div className="p-4 space-y-4">
                {activeTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl border border-border bg-muted/20 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {task.status === "running" && (
                            <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                          )}
                          {task.status === "complete" && (
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                          )}
                          <h4 className="font-semibold text-sm truncate">
                            {task.threadTitle}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Iteration {task.iteration} • {task.status === "running" ? "Running checks..." : "Complete"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => handleDismiss(task.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    {task.status === "running" && (
                      <div className="space-y-1">
                        <Progress value={task.progress} className="h-1.5" />
                        <p className="text-xs text-muted-foreground">
                          {task.progress}% complete
                        </p>
                      </div>
                    )}

                    {/* Stepper - simplified */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`flex items-center gap-1 ${
                        task.progress > 0 ? "text-success" : "text-muted-foreground"
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>SEBI MF</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className={`flex items-center gap-1 ${
                        task.progress > 50 ? "text-success" : "text-muted-foreground"
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ASCI</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className={`flex items-center gap-1 ${
                        task.progress > 80 ? "text-success" : "text-muted-foreground"
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>AMFI</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/projects/${projectId}/assets/${assetId}/threads/1`}
                        className="flex-1"
                      >
                        <Button size="sm" variant="outline" className="w-full gap-2">
                          <ExternalLink className="w-3 h-3" />
                          Open Thread
                        </Button>
                      </Link>
                      {task.status === "complete" && (
                        <Button size="sm" className="flex-1">
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
