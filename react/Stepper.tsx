import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from './cn';

export type StepState = 'done' | 'current' | 'pending';
export type StepperVariant = 'horizontal' | 'compact' | 'vertical';

export interface StepItem {
  id: string;
  label: string;
  description?: string;
  state: StepState;
}

export interface StepperProps {
  steps: StepItem[];
  variant?: StepperVariant;
  /** Macht erledigte und aktuelle Schritte klickbar (Buttons); ohne Angabe sind es reine Anzeigen. */
  onStep?: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

const STATE_TEXT: Record<StepState, string> = { done: 'erledigt', current: 'aktuell', pending: 'ausstehend' };

/** Schrittanzeige für mehrstufige Abläufe (Setup, Runden, Onboarding). */
export function Stepper({ steps, variant = 'horizontal', onStep, ariaLabel = 'Fortschritt', className }: StepperProps) {
  const currentIdx = steps.findIndex((s) => s.state === 'current');
  const doneCount = steps.filter((s) => s.state === 'done').length;

  const dot = (step: StepItem, index: number): ReactNode => {
    const content = step.state === 'done' ? <Icon name="check" size={14} /> : <span aria-hidden="true">{index + 1}</span>;
    if (onStep && step.state !== 'pending') {
      return (
        <button type="button" className="dss-step-dot" aria-label={`${index + 1}. ${step.label}`} onClick={() => onStep(step.id)}>
          {content}
        </button>
      );
    }
    return (
      <span className="dss-step-dot" aria-hidden="true">
        {content}
      </span>
    );
  };

  const label = (step: StepItem): ReactNode => (
    <div className="dss-step-label">
      {step.label}
      <span className="dss-sr-only"> ({STATE_TEXT[step.state]})</span>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className={cn('dss-step', 'dss-step--c', className)} role="group" aria-label={ariaLabel}>
        <div className="dss-step-track" aria-hidden="true">
          <div className="dss-step-fill" style={{ width: `${steps.length ? (doneCount / steps.length) * 100 : 0}%` }} />
        </div>
        <div className="dss-step-info">
          <span className="dss-step-num">
            {currentIdx + 1} / {steps.length}
          </span>
          <span className="dss-step-cur">{steps[currentIdx]?.label ?? '—'}</span>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <ol className={cn('dss-step', 'dss-step--v', className)} aria-label={ariaLabel}>
        {steps.map((step, i) => (
          <li
            key={step.id}
            className={cn('dss-step-item', `is-${step.state}`)}
            aria-current={step.state === 'current' ? 'step' : undefined}
          >
            <div className="dss-step-rail">
              {dot(step, i)}
              {i < steps.length - 1 ? <span className="dss-step-vline" aria-hidden="true" /> : null}
            </div>
            <div className="dss-step-body">
              {label(step)}
              {step.description ? <div className="dss-step-desc">{step.description}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn('dss-step', 'dss-step--h', className)} aria-label={ariaLabel}>
      {steps.map((step, i) => (
        <li
          key={step.id}
          className={cn('dss-step-item', `is-${step.state}`)}
          aria-current={step.state === 'current' ? 'step' : undefined}
        >
          {dot(step, i)}
          {label(step)}
          {i < steps.length - 1 ? <span className="dss-step-line" aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}
