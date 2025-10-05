import { useEffect, useRef } from "react";
import { useBlocker } from "react-router-dom";

interface UnsavedGuardOptions {
  when: boolean;
  message?: string;
}

export const useUnsavedGuard = ({ 
  when, 
  message = "You have unsaved changes. Are you sure you want to leave?" 
}: UnsavedGuardOptions) => {
  const isDirtyRef = useRef(when);

  // Update ref when state changes
  useEffect(() => {
    isDirtyRef.current = when;
  }, [when]);

  // Block navigation when dirty
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirtyRef.current && currentLocation.pathname !== nextLocation.pathname
  );

  // Handle browser back/forward
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [message]);

  // Show confirmation dialog when blocked
  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmed = window.confirm(message);
      if (confirmed) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  return {
    isDirty: when,
    blocker,
  };
};
