/** Minimaler Klassen-Join ohne Abhängigkeit (kein Tailwind-Merge im Paket). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
