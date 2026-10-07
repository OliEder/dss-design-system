import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { expectNoA11yViolations } from './test-utils';

describe('Skeleton', () => {
  it('rendert eine Zeile mit Größe und kündigt den Ladezustand an', () => {
    const { container } = render(<Skeleton variant="line" width="50%" height="12px" />);
    const el = container.querySelector('.dss-skel')!;
    expect(el).toHaveClass('dss-skel--line');
    expect(el).toHaveStyle({ width: '50%', height: '12px' });
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Lädt …');
  });

  it('übernimmt ein eigenes Label', () => {
    render(<Skeleton label="Spielplan wird geladen" />);
    expect(screen.getByRole('status')).toHaveTextContent('Spielplan wird geladen');
  });

  it('wiederholt einfache Varianten count-mal, aber kündigt nur einmal an', () => {
    const { container } = render(<Skeleton variant="block" count={3} />);
    expect(container.querySelectorAll('.dss-skel--block')).toHaveLength(3);
    expect(screen.getAllByRole('status')).toHaveLength(1);
  });

  it('rundet den Kreis vollständig ab', () => {
    const { container } = render(<Skeleton variant="circle" width="40px" height="40px" rounded="8px" />);
    expect(container.querySelector('.dss-skel--circle')).toHaveStyle({ borderRadius: '50%' });
  });

  it('rendert die Spieler-Zeile count-mal', () => {
    const { container } = render(<Skeleton variant="row" count={2} />);
    expect(container.querySelectorAll('.dss-skel-row')).toHaveLength(2);
  });

  it('rendert die Spielkarten-Vorlage', () => {
    const { container } = render(<Skeleton variant="match" />);
    expect(container.querySelector('.dss-skel-match')).toBeInTheDocument();
    expect(container.querySelectorAll('.dss-skel-match-row')).toHaveLength(2);
  });

  it('hat keine A11y-Verstöße', async () => {
    const { container } = render(<Skeleton variant="row" count={2} />);
    await expectNoA11yViolations(container);
  });
});
