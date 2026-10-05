import type { ReactNode } from 'react';

export type Severity = 'info' | 'ok' | 'warn' | 'danger';

const GLYPHS: Record<Severity, { strokeWidth: number; paths: ReactNode }> = {
  danger: {
    strokeWidth: 1.8,
    paths: (
      <>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M5.2 10.8l5.6-5.6" />
      </>
    ),
  },
  warn: {
    strokeWidth: 1.8,
    paths: (
      <>
        <path d="M8 1.5L15 14H1z" />
        <path d="M8 6v3M8 11.5v.05" />
      </>
    ),
  },
  ok: { strokeWidth: 2.2, paths: <path d="M3 8.2l3.5 3.5L13 5" /> },
  info: {
    strokeWidth: 1.8,
    paths: (
      <>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 7v4M8 4.5v.05" />
      </>
    ),
  },
};

export function SeverityIcon({ severity, className }: { severity: Severity; className?: string }) {
  const { strokeWidth, paths } = GLYPHS[severity];
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths}
    </svg>
  );
}
