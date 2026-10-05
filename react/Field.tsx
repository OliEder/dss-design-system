import type { ReactNode } from 'react';
import { cn } from './cn';

export type FieldState = 'default' | 'error' | 'ok' | 'warn';

const HELP_MODIFIER: Record<Exclude<FieldState, 'default'>, string> = {
  error: 'dss-field-help--err',
  ok: 'dss-field-help--ok',
  warn: 'dss-field-help--warn',
};

export interface FieldProps {
  /** id des Steuerelements, auf das Label und Hilfetext zeigen. */
  controlId: string;
  label?: ReactNode;
  optional?: string;
  required?: boolean;
  help?: ReactNode;
  state: FieldState;
  className?: string;
  children: ReactNode;
}

/** Interner Wrapper für Label, Steuerelement und Hilfetext (TextInput, Select). */
export function Field({ controlId, label, optional, required, help, state, className, children }: FieldProps) {
  return (
    <div className={cn('dss-field', state !== 'default' && `is-${state}`, className)}>
      {label ? (
        <label className="dss-field-label" htmlFor={controlId}>
          {label}
          {required ? <span className="req" aria-hidden="true">*</span> : null}
          {optional ? <span className="opt">{optional}</span> : null}
        </label>
      ) : null}
      {children}
      {help ? (
        <div
          id={`${controlId}-help`}
          className={cn('dss-field-help', state !== 'default' && HELP_MODIFIER[state])}
        >
          {help}
        </div>
      ) : null}
    </div>
  );
}
