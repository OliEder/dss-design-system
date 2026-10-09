// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DosDonts } from '../stories/docs/blocks/DosDonts';
import { FrameworkCode } from '../stories/docs/blocks/FrameworkCode';

afterEach(() => document.documentElement.removeAttribute('data-framework'));

describe('FrameworkCode', () => {
  const props = { vanilla: '<button>v</button>', svelte: '<Button>s</Button>', react: '<Button>r</Button>' };

  it('zeigt standardmäßig Svelte', () => {
    render(<FrameworkCode {...props} />);
    expect(screen.getByText('<Button>s</Button>')).toBeInTheDocument();
    expect(screen.queryByText('<Button>r</Button>')).toBeNull();
  });

  it('folgt html[data-framework] auch nach dem Rendern', async () => {
    render(<FrameworkCode {...props} />);
    await act(async () => {
      document.documentElement.dataset.framework = 'react';
      await new Promise((r) => setTimeout(r, 20));
    });
    expect(screen.getByText('<Button>r</Button>')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Code-Beispiel React' })).toHaveAttribute('tabindex', '0');
  });

  it('meldet fehlenden Code', () => {
    document.documentElement.dataset.framework = 'vanilla';
    render(<FrameworkCode svelte="x" />);
    expect(screen.getByText('Für diese Fassung gibt es hier kein Beispiel.')).toBeInTheDocument();
  });
});

describe('DosDonts', () => {
  const pairs = [
    {
      title: 'Eine Haupt-Aktion pro Ansicht',
      doText: 'Ein amber Button, daneben Secondary.',
      dontText: 'Zwei amber Buttons konkurrieren.',
      good: <button>gut</button>,
      bad: <button>schlecht</button>,
    },
  ];

  it('zeigt Regel, beide Beispiele und Begründungen', () => {
    const { container } = render(<DosDonts pairs={pairs} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Eine Haupt-Aktion pro Ansicht' })).toBeInTheDocument();
    expect(screen.getByText('Ein amber Button, daneben Secondary.', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Zwei amber Buttons konkurrieren.', { exact: false })).toBeInTheDocument();
    expect(container.querySelector('.dss-dd-do .dss-dd-badge')?.textContent).toBe('✓ Do');
    expect(container.querySelector('.dss-dd-dont .dss-dd-badge')?.textContent).toContain("✗ Don't");
  });

  it('macht das falsche Beispiel inert, das richtige nicht', () => {
    const { container } = render(<DosDonts pairs={pairs} />);
    const stages = container.querySelectorAll('.dss-dd-stage');
    expect(stages[0]).not.toHaveAttribute('inert');
    expect(stages[1]).toHaveAttribute('inert');
  });

  it('benennt das falsche Beispiel für Screenreader', () => {
    render(<DosDonts pairs={pairs} />);
    expect(screen.getByText('Beispiel für falsche Verwendung')).toHaveClass('dss-sr-only');
  });
});
