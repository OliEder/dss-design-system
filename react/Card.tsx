import { forwardRef, type ComponentType, type HTMLAttributes, type KeyboardEvent, type ReactNode, type SyntheticEvent } from 'react';
import { cn } from './cn';

export type CardVariant = 'default' | 'elevated' | 'flat' | 'hoverable';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick' | 'title'> {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: 'div' | 'article' | 'section' | 'a' | 'button';
  /** Mit href wird die Karte automatisch zum Link. */
  href?: string;
  onClick?: (event: SyntheticEvent<HTMLElement>) => void;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', as = 'div', href, onClick, onKeyDown, header, footer, className, children, ...rest },
  ref,
) {
  const tagName = href ? 'a' : as;
  const Tag = tagName as unknown as ComponentType<any>;
  const interactiveDiv = tagName === 'div' && Boolean(onClick);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onKeyDown={interactiveDiv ? handleKeyDown : onKeyDown}
      role={interactiveDiv ? 'button' : undefined}
      tabIndex={interactiveDiv ? 0 : undefined}
      className={cn('dss-card', `dss-card--${variant}`, `dss-card--pad-${padding}`, className)}
      {...rest}
    >
      {header ? <div className="dss-card-head">{header}</div> : null}
      <div className="dss-card-body">{children}</div>
      {footer ? <div className="dss-card-foot">{footer}</div> : null}
    </Tag>
  );
});
