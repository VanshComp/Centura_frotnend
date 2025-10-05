import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BackButtonProps {
  isDirty?: boolean;
  onBeforeNavigate?: () => Promise<boolean>;
  className?: string;
  showLabel?: boolean;
}

export const BackButton = ({ 
  isDirty, 
  onBeforeNavigate, 
  className,
  showLabel = false 
}: BackButtonProps) => {
  const { handleBack, backLabel } = useBackNavigation({ isDirty, onBeforeNavigate });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className={className}
            aria-label={backLabel}
          >
            <ArrowLeft className="w-4 h-4" />
            {showLabel && <span className="ml-2">{backLabel}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{backLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
