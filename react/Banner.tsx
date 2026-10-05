import type { HTMLAttributes, ReactNode } from 'react';
import { SeverityIcon, type Severity } from './SeverityIcon';
import { cn } from './cn';

export type BannerSeverity = Severity;

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  severity?: BannerSeverity;
  title?: ReactNode;
  icon?: boolean;
}

/** Inline-Hinweis. role: "alert" für warn/danger, "status" für info/ok (überschreibbar). */
export function Banner({ severity = 'info', title, icon = true, role, className, children, ...rest }: BannerProps) {
  const resolvedRole = role ?? (severity === 'warn' || severity === 'danger' ? 'alert' : 'status');
  return (
    <div role={resolvedRole} className={cn('dss-banner', `dss-banner--${severity}`, className)} {...rest}>
      {icon ? <SeverityIcon severity={severity} className="dss-banner-icon" /> : null}
      <div className="dss-banner-body">
        {title ? <p className="dss-banner-title">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
