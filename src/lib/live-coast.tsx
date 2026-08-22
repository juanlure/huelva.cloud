import { createContext, useContext, type ReactNode } from "react";
import type { LiveCoast } from "@/lib/server/coast";

const LiveCoastContext = createContext<LiveCoast | null>(null);

export function LiveCoastProvider({
  value,
  children,
}: {
  value: LiveCoast | null;
  children: ReactNode;
}) {
  return <LiveCoastContext.Provider value={value}>{children}</LiveCoastContext.Provider>;
}

export function useLiveCoast() {
  return useContext(LiveCoastContext);
}
