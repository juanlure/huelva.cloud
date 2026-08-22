import { useEffect, useState } from "react";

export function useChecked(storageKey: string) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) setIds(parsed.filter((x) => typeof x === "string"));
    } catch {
      /* ignore broken local state */
    }
  }, [storageKey]);

  function toggle(id: string) {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  function reset() {
    setIds([]);
    window.localStorage.removeItem(storageKey);
  }

  return { ids, toggle, reset, has: (id: string) => ids.includes(id) };
}
