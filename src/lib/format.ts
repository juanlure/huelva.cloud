import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(value: string) {
  const date = value.length <= 10 ? parseISO(`${value}T00:00:00`) : parseISO(value);
  if (Number.isNaN(date.getTime())) return value;
  return format(date, "d LLL yyyy", { locale: es });
}

export function formatRead(minutes: number) {
  return `${minutes} min`;
}

export function isoFromUnknown(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return String(value ?? "");
}

export function numFromUnknown(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return Number(value ?? 0);
}
