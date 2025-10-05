import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Status = "pass" | "warning" | "fail";

interface StatusBadgeProps {
  status: Status;
  count?: number;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge = ({ status, count, size = "md" }: StatusBadgeProps) => {
  const configs = {
    pass: {
      icon: CheckCircle2,
      bg: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
      label: "Pass",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
      label: "Warning",
    },
    fail: {
      icon: XCircle,
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
      label: "Fail",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div
      className={`
        inline-flex items-center rounded-full border font-medium backdrop-blur-sm transition-all
        ${config.bg} ${config.text} ${config.border}
        ${sizeClasses[size]}
      `}
    >
      <Icon className={iconSizes[size]} />
      <span className="font-medium">{config.label}</span>
      {count !== undefined && (
        <span className="ml-1 font-semibold opacity-80">({count})</span>
      )}
    </div>
  );
};
