import { useEffect } from "react";
import { useBackNavigation } from "./use-back-navigation";

interface KeyboardBackOptions {
  enabled?: boolean;
  isDirty?: boolean;
}

/**
 * Hook to enable keyboard shortcuts for back navigation
 * - Windows/Linux: Alt + Left Arrow
 * - Mac: Cmd + [
 */
export const useKeyboardBack = ({ enabled = true, isDirty = false }: KeyboardBackOptions = {}) => {
  const { handleBack } = useBackNavigation({ isDirty });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Left Arrow (Windows/Linux) or Cmd + [ (Mac)
      const isBackShortcut = 
        (e.altKey && e.key === 'ArrowLeft') || 
        (e.metaKey && e.key === '[');

      if (isBackShortcut) {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleBack]);
};
