"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseToolDataOptions<T> {
  toolType: string;
  projectName?: string;
  defaultData: T;
}

export function useToolData<T>({ toolType, projectName = "", defaultData }: UseToolDataOptions<T>) {
  const [data, setData] = useState<T>(defaultData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Check auth and load data on mount
  useEffect(() => {
    async function init() {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session.authenticated) {
          setIsAuthenticated(true);

          const dataRes = await fetch(`/api/tools?tool=${toolType}&project=${encodeURIComponent(projectName)}`);
          const result = await dataRes.json();

          if (result.data) {
            setData(result.data as T);
            setLastSaved(result.updatedAt);
          }
        }
      } catch {
        // Not authenticated or network error, use default data
      }
      setLoaded(true);
    }

    init();
  }, [toolType, projectName]);

  // Auto-save with debounce
  const save = useCallback(
    (newData: T) => {
      setData(newData);

      if (!isAuthenticated) return;

      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        setIsSaving(true);
        try {
          await fetch("/api/tools", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toolType, projectName, data: newData }),
          });
          setLastSaved(new Date().toISOString());
        } catch {
          // Save failed silently
        }
        setIsSaving(false);
      }, 1500); // Debounce 1.5 seconds
    },
    [isAuthenticated, toolType, projectName]
  );

  return {
    data,
    setData: save,
    isAuthenticated,
    isSaving,
    lastSaved,
    loaded,
  };
}
