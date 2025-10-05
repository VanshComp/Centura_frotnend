import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, User, LogOut, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ProfileSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const isComplianceMode = location.pathname.startsWith("/compliance");

  const handleSwitchMode = () => {
    if (isComplianceMode) {
      navigate("/dashboard");
    } else {
      navigate("/compliance/inbox");
    }
  };

  const handleSignOut = () => {
    // Show success message
    const event = new CustomEvent('toast', {
      detail: {
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      }
    });
    window.dispatchEvent(event);
    
    // Navigate to home/login after a brief delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-sidebar-accent transition-all cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold ring-1 ring-primary/20">
            {isComplianceMode ? "C" : "U"}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium truncate">
              {isComplianceMode ? "Compliance Officer" : "User Name"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {isComplianceMode ? "Sarah Chen" : "Designer"}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end" side="right">
        <div className="space-y-1">
          <div className="px-3 py-2">
            <p className="text-sm font-medium">
              {isComplianceMode ? "Compliance Officer" : "User Name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isComplianceMode ? "sarah.chen@company.com" : "user@company.com"}
            </p>
          </div>
          
          <Separator />
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10"
            onClick={handleSwitchMode}
          >
            {isComplianceMode ? (
              <>
                <User className="w-4 h-4" />
                Switch to Marketing
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Switch to Compliance
              </>
            )}
          </Button>
          
          <Separator />
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
