import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CourtLines } from './CourtLines';
import { expectNoA11yViolations } from './test-utils';

describe('CourtLines', () => {
  it('rendert einen dekorativen, fixierten Hintergrund', () => {
    const { container } = render(<CourtLines />);
    const bg = container.firstElementChild!;
    expect(bg).toHaveClass('dss-courtbg');
    expect(bg).not.toHaveClass('dss-courtbg--absolute');
    expect(bg).toHaveAttribute('aria-hidden', 'true');
    expect(bg.querySelector('.dss-courtlines')).toBeInTheDocument();
  });

  it('kann statt am Viewport am nächsten positionierten Container hängen', () => {
    const { container } = render(<CourtLines position="absolute" className="extra" />);
    expect(container.firstElementChild).toHaveClass('dss-courtbg--absolute', 'extra');
  });

  it('hat keine A11y-Verstöße', async () => {
    const { container } = render(<CourtLines />);
    await expectNoA11yViolations(container);
  });
});
