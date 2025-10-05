import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useRef } from "react";

interface BackNavigationOptions {
  isDirty?: boolean;
  onBeforeNavigate?: () => Promise<boolean>;
}

// Hierarchical fallback map
const getParentRoute = (pathname: string): string => {
  // Iteration → Thread
  if (pathname.match(/\/threads\/[^/]+\/iterations\/[^/]+/)) {
    return pathname.replace(/\/iterations\/[^/]+/, '');
  }
  // Thread → Asset
  if (pathname.match(/\/threads\/[^/]+/)) {
    const match = pathname.match(/^(\/projects\/[^/]+\/assets\/[^/]+)/);
    return match ? match[1] : '/';
  }
  // Asset → Project
  if (pathname.match(/\/assets\/[^/]+/) && pathname.includes('/projects/')) {
    const match = pathname.match(/^(\/projects\/[^/]+)/);
    return match ? match[1] : '/projects';
  }
  if (pathname.match(/\/assets\/[^/]+/)) {
    return '/assets';
  }
  // Project → Landing
  if (pathname.match(/\/projects\/[^/]+/)) {
    return '/projects';
  }
  // Any other page → Landing
  return '/';
};

// Get user-friendly label for the back target
const getBackLabel = (pathname: string): string => {
  if (pathname.match(/\/threads\/[^/]+\/iterations\/[^/]+/)) return "Back to Thread";
  if (pathname.match(/\/threads\/[^/]+/)) return "Back to Asset";
  if (pathname.match(/\/assets\/[^/]+/) && pathname.includes('/projects/')) return "Back to Project";
  if (pathname.match(/\/assets\/[^/]+/)) return "Back to Assets";
  if (pathname.match(/\/projects\/[^/]+/)) return "Back to Projects";
  if (pathname === '/compliance') return "Back to Dashboard";
  if (pathname === '/reports') return "Back to Dashboard";
  if (pathname === '/settings') return "Back to Dashboard";
  if (pathname === '/rules') return "Back";
  return "Back";
};

export const useBackNavigation = (options: BackNavigationOptions = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyLengthRef = useRef(window.history.length);

  const canGoBack = useCallback(() => {
    // Check if there's actual browser history (not just the initial page load)
    return window.history.length > historyLengthRef.current || window.history.state?.idx > 0;
  }, []);

  const handleBack = useCallback(async () => {
    // Check for unsaved changes
    if (options.isDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmed) return;
    }

    // Call custom handler if provided
    if (options.onBeforeNavigate) {
      const shouldProceed = await options.onBeforeNavigate();
      if (!shouldProceed) return;
    }

    // Try browser history first
    if (canGoBack()) {
      navigate(-1);
    } else {
      // Fall back to hierarchical parent
      const parentRoute = getParentRoute(location.pathname);
      navigate(parentRoute);
    }
  }, [navigate, location.pathname, options, canGoBack]);

  const backLabel = getBackLabel(location.pathname);

  return {
    handleBack,
    backLabel,
    canGoBack: canGoBack(),
  };
};
