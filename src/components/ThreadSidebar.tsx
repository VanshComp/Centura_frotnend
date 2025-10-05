import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Image as ImageIcon,
  Video,
  GitBranch
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Iteration {
  id: string;
  number: number;
  label: string;
  status: string;
  created_at: string;
  parent_id?: string;
}

interface Thread {
  id: string;
  title: string;
  asset_type: "TEXT" | "IMAGE" | "VIDEO";
  status: string;
  iterations: Iteration[];
}

interface ThreadSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  currentThreadId: string;
  currentIterationId: string;
  iterations: Iteration[];
}

// Mock threads data
const mockThreads: Thread[] = [
  {
    id: "1",
    title: "Hero Reel 15s",
    asset_type: "VIDEO",
    status: "in-review",
    iterations: [
      { id: "1", number: 1, label: "v1", status: "approved", created_at: "2 days ago" },
      { id: "2", number: 2, label: "v2", status: "approved", created_at: "1 day ago", parent_id: "1" },
      { id: "3", number: 3, label: "v3", status: "in-review", created_at: "3 hours ago", parent_id: "2" },
    ],
  },
  {
    id: "2",
    title: "Instagram Story",
    asset_type: "IMAGE",
    status: "draft",
    iterations: [
      { id: "4", number: 1, label: "v1", status: "draft", created_at: "1 hour ago" },
    ],
  },
  {
    id: "3",
    title: "Email Copy",
    asset_type: "TEXT",
    status: "approved",
    iterations: [
      { id: "5", number: 1, label: "v1", status: "approved", created_at: "3 days ago" },
      { id: "6", number: 2, label: "v2", status: "approved", created_at: "2 days ago", parent_id: "5" },
    ],
  },
];

const getAssetIcon = (type: string) => {
  switch (type) {
    case "VIDEO": return Video;
    case "IMAGE": return ImageIcon;
    case "TEXT": return FileText;
    default: return FileText;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved": return CheckCircle2;
    case "in-review": return Clock;
    case "rejected": return XCircle;
    default: return Clock;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "text-success";
    case "in-review": return "text-warning";
    case "rejected": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

export function ThreadSidebar({ 
  collapsed, 
  onCollapse, 
  currentThreadId,
  currentIterationId,
}: ThreadSidebarProps) {
  const { projectId, assetId } = useParams();
  const [expandedThreads, setExpandedThreads] = useState<string[]>([currentThreadId]);

  const toggleThread = (threadId: string) => {
    setExpandedThreads(prev => 
      prev.includes(threadId) 
        ? prev.filter(id => id !== threadId)
        : [...prev, threadId]
    );
  };

  if (collapsed) {
    return (
      <div className="w-14 border-r border-border/50 bg-sidebar flex flex-col items-center py-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse(false)}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        {mockThreads.map((thread) => {
          const Icon = getAssetIcon(thread.asset_type);
          return (
            <Link
              key={thread.id}
              to={`/projects/${projectId}/assets/${assetId}/threads/${thread.id}`}
              className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${
                thread.id === currentThreadId
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
        <Button variant="ghost" size="icon" className="h-8 w-8 mt-auto">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-border/50 bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <h2 className="font-semibold text-sm">Threads & Iterations</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse(true)}
          className="h-6 w-6"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Threads List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {mockThreads.map((thread) => {
            const Icon = getAssetIcon(thread.asset_type);
            const isExpanded = expandedThreads.includes(thread.id);
            const isActive = thread.id === currentThreadId;

            return (
              <Collapsible
                key={thread.id}
                open={isExpanded}
                onOpenChange={() => toggleThread(thread.id)}
              >
                <div className={`rounded-lg ${isActive ? 'bg-sidebar-accent' : ''}`}>
                  <div className="flex items-center gap-1 p-1">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            isExpanded ? "" : "-rotate-90"
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <Link
                      to={`/projects/${projectId}/assets/${assetId}/threads/${thread.id}`}
                      className="flex-1 flex items-center gap-2 px-2 py-1.5 hover:bg-sidebar-accent/50 rounded-md transition-colors min-w-0"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium truncate">{thread.title}</span>
                    </Link>
                  </div>

                  <CollapsibleContent>
                    <div className="ml-7 mr-1 space-y-0.5 mt-1">
                      {thread.iterations.map((iteration) => {
                        const StatusIcon = getStatusIcon(iteration.status);
                        const statusColor = getStatusColor(iteration.status);
                        const isIterationActive = iteration.id === currentIterationId;

                        return (
                          <Link
                            key={iteration.id}
                            to={`/projects/${projectId}/assets/${assetId}/threads/${thread.id}/iterations/${iteration.id}`}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                              isIterationActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "hover:bg-sidebar-accent/50"
                            }`}
                          >
                            {iteration.parent_id && (
                              <GitBranch className="w-3 h-3 shrink-0 text-muted-foreground" />
                            )}
                            <span className="font-medium">{iteration.label}</span>
                            <StatusIcon className={`w-3 h-3 ml-auto shrink-0 ${statusColor}`} />
                          </Link>
                        );
                      })}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-7 text-xs mt-1"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        New Iteration
                      </Button>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Plus className="w-4 h-4 mr-2" />
          New Thread
        </Button>
      </div>
    </div>
  );
}
