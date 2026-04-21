"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseToolDataOptions<T> {
  toolType: string;
  defaultData: T;
}

export function useToolData<T>({ toolType, defaultData }: UseToolDataOptions<T>) {
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

          const dataRes = await fetch(`/api/tools?tool=${toolType}`);
          const result = await dataRes.json();

          if (result.data) {
            setData(result.data as T);
            setLastSaved(result.updatedAt);
          }
        }
      } catch {
        // Not authenticated or network error
      }
      setLoaded(true);
    }

    init();
  }, [toolType]);

  // Auto-save with debounce
  const save = useCallback(
    (newData: T) => {
      setData(newData);

      if (!isAuthenticated) return;

      // Extract projectName from the data if it exists
      const projectName = (newData as Record<string, unknown>)?.projectName as string || "";

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
      }, 1500);
    },
    [isAuthenticated, toolType]
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
