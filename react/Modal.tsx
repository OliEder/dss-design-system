import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { SeverityIcon, type Severity } from './SeverityIcon';
import { cn } from './cn';

export type ModalSeverity = 'default' | Severity;
export type ModalSize = 'sm' | 'md' | 'wide' | 'xwide';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  severity?: ModalSeverity;
  size?: ModalSize;
  /** Zeigt den Schließen-Button und erlaubt Escape/Hintergrund-Klick (Standard: true). */
  closable?: boolean;
  /** Schließen per Klick auf den Hintergrund (Standard: true). Mit false bleibt das Modal offen. */
  dismissOnBackdrop?: boolean;
  closeLabel?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  title,
  subtitle,
  severity = 'default',
  size = 'md',
  closable = true,
  dismissOnBackdrop = true,
  closeLabel = 'Schließen',
  footer,
  className,
  children,
}: ModalProps) {
  const blockOutsideDismiss = !closable || !dismissOnBackdrop;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dss-backdrop" />
        <div className="dss-modal-wrap">
          <Dialog.Content
            aria-describedby={undefined}
            className={cn('dss-modal', size !== 'md' && `dss-modal--${size}`, className)}
            onInteractOutside={(event) => {
              if (blockOutsideDismiss) event.preventDefault();
            }}
            onEscapeKeyDown={(event) => {
              if (!closable) event.preventDefault();
            }}
          >
            <div className="dss-m-head">
              {severity !== 'default' ? (
                <div className={`dss-m-head-icon dss-m-head-icon--${severity}`}>
                  <SeverityIcon severity={severity} />
                </div>
              ) : null}
              <div className="dss-m-head-text">
                <Dialog.Title className="dss-m-title">{title}</Dialog.Title>
                {subtitle ? <div className="dss-m-subtitle">{subtitle}</div> : null}
              </div>
              {closable ? (
                <Dialog.Close className="dss-m-close" aria-label={closeLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </Dialog.Close>
              ) : null}
            </div>
            <div className="dss-m-body">{children}</div>
            {footer ? <div className="dss-m-footer">{footer}</div> : null}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
