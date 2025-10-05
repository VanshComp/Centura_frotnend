import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, FolderKanban, FileCheck, BookOpen, BarChart3, Settings, Layers, MessageSquare, Inbox, GitBranch, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { Breadcrumbs } from "./Breadcrumbs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { QuickComplianceChat } from "./QuickComplianceChat";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

const marketingNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Queue", href: "/queue", icon: FileCheck },
  { name: "Assets", href: "/assets", icon: Layers },
  { name: "Rules", href: "/rules", icon: BookOpen },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const complianceNavigation = [
  { name: "Inbox", href: "/compliance/inbox", icon: Inbox },
  { name: "Projects", href: "/compliance/projects", icon: FolderKanban },
  { name: "Exchange Tracker", href: "/compliance/exchange", icon: GitBranch },
  { name: "Reports", href: "/compliance/reports", icon: BarChart3 },
  { name: "Settings", href: "/compliance/settings", icon: Settings },
];

function MinimalSidebar({ isComplianceMode, navigation }: { isComplianceMode: boolean; navigation: typeof marketingNavigation }) {
  const sidebar = useSidebar();
  const open = sidebar?.open ?? true;
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="flex flex-col">
        {/* Logo */}
        <Link 
          to={isComplianceMode ? "/compliance" : "/dashboard"}
          className="p-4 border-b border-sidebar-border block hover:bg-sidebar-accent transition-all"
        >
          <div className="flex items-center gap-2">
            {isComplianceMode && <Shield className="w-5 h-5 text-primary" />}
            {open && (
              <div>
                <h1 className="text-xl font-serif font-light text-sidebar-primary">
                  Centura
                </h1>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">
                  {isComplianceMode ? "Compliance Mode" : "Marketing Mode"}
                </p>
              </div>
            )}
            {!open && !isComplianceMode && (
              <h1 className="text-xl font-serif font-light text-sidebar-primary">C</h1>
            )}
          </div>
        </Link>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === "/dashboard" && location.pathname === "/") ||
                  (item.href === "/compliance/projects" && location.pathname === "/compliance") ||
                  (location.pathname.startsWith(item.href) && item.href !== "/" && item.href !== "/compliance");
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User section at bottom */}
        <div className="mt-auto p-3 border-t border-sidebar-border">
          <ProfileSwitcher />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function LayoutContent({ 
  children, 
  isComplianceMode, 
  navigation,
  breadcrumbs 
}: { 
  children: React.ReactNode; 
  isComplianceMode: boolean; 
  navigation: typeof marketingNavigation;
  breadcrumbs?: BreadcrumbItem[];
}) {
  const [quickChatOpen, setQuickChatOpen] = useState(false);

  // Global hotkey: Cmd/Ctrl + K for Quick Check (only in marketing mode)
  useEffect(() => {
    if (isComplianceMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setQuickChatOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isComplianceMode]);

  return (
    <>
      {!isComplianceMode && (
        <QuickComplianceChat open={quickChatOpen} onOpenChange={setQuickChatOpen} />
      )}
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar with navigation */}
        <MinimalSidebar isComplianceMode={isComplianceMode} navigation={navigation} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header Bar */}
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center h-full px-6 gap-3">
              <SidebarTrigger />
              
              {/* Breadcrumbs */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <>
                  <div className="h-6 w-px bg-border shrink-0" />
                  <Breadcrumbs items={breadcrumbs} />
                </>
              )}
              
              {/* QCC Button for Marketing Mode */}
              {!isComplianceMode && (
                <button
                  onClick={() => setQuickChatOpen(true)}
                  className="ml-auto flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Quick Compliance Check
                </button>
              )}
            </div>
          </header>
          
          <main className="flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export const Layout = ({ children, breadcrumbs }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) => {
  const location = useLocation();
  const isComplianceMode = location.pathname.startsWith("/compliance");
  const navigation = isComplianceMode ? complianceNavigation : marketingNavigation;

  return (
    <SidebarProvider>
      <LayoutContent isComplianceMode={isComplianceMode} navigation={navigation} breadcrumbs={breadcrumbs}>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
};
