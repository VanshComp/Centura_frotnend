import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning";
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  variant = "default" 
}: MetricCardProps) => {
  const variantClasses = {
    default: "bg-card border-border",
    primary: "bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30",
    success: "bg-gradient-to-br from-success/20 to-success/5 border-success/30",
    warning: "bg-gradient-to-br from-warning/20 to-warning/5 border-warning/30",
  };

  return (
    <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all hover:shadow-md hover:border-border ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-serif font-light text-foreground mb-1 tracking-tight">{value}</p>
          {trend && (
            <p className={`text-xs font-medium ${trend.positive ? 'text-success' : 'text-destructive'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl transition-all ${
          variant === "primary" ? "bg-primary/10" :
          variant === "success" ? "bg-success/10" :
          variant === "warning" ? "bg-warning/10" :
          "bg-muted/50"
        }`}>
          <Icon className={`w-5 h-5 ${
            variant === "primary" ? "text-primary" :
            variant === "success" ? "text-success" :
            variant === "warning" ? "text-warning" :
            "text-muted-foreground"
          }`} />
        </div>
      </div>
    </div>
  );
};
