import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface SubTask {
  id: string;
  title: string;
  status: "open" | "completed";
  ruleId: string;
}

interface SubTasksListProps {
  subTasks: SubTask[];
  onToggle: (taskId: string) => void;
}

export const SubTasksList = ({ subTasks, onToggle }: SubTasksListProps) => {
  return (
    <div className="space-y-2">
      {subTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <button
            onClick={() => onToggle(task.id)}
            className="flex-shrink-0"
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          <div className="flex-1">
            <p
              className={`text-sm ${
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : ""
              }`}
            >
              {task.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Related to: {task.ruleId}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
