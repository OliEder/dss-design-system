import type { Preview } from '@storybook/svelte-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Pull in design-system tokens so every story renders with the real
// color, type, spacing scale.
import '../fonts/fonts.css';
import '../tokens/tokens.css';
import '../css/components.css';
import './storybook.css';
import { installPseudoStates } from './pseudo-states';


const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Marke',
      toolbar: {
        title: 'Marke',
        icon: 'paintbrush',
        items: [
          { value: 'bbv', title: 'BBV (Ink · Amber · Sky)' },
          { value: 'dbb', title: 'DBB (Schwarz · Gold · Orange)' },
        ],
        dynamicTitle: true,
      },
    },
    type: {
      description: 'Schrift',
      toolbar: {
        title: 'Schrift',
        icon: 'edit',
        items: [
          { value: 'standard', title: 'Standard (Sora · Manrope)' },
          { value: 'dbb', title: 'DBB-Original (Rubik · Sucrose*)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'bbv', type: 'standard' },
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page',     value: 'var(--page-bg)' },
        { name: 'surface',  value: 'var(--surface-0)' },
        { name: 'kampf',    value: 'var(--n-1000)' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Docs', ['Button', 'Forms', 'Cards & Lists', 'Navigation', 'Tables & Live-Scoring'],
          'Foundation', ['Colors', 'Typography', 'Spacing', 'Shadows'],
          'Components', ['Button', 'TextInput', 'Select', 'Checkbox', 'Modal', 'Banner', 'Card', 'Card Library', 'Tabs', 'Navigation', 'AppNav', 'Table', 'EmptyState', 'CourtLines', 'PlayByPlay', 'Icon'],
        ],
      },
    },
    a11y: {
      // DSS targets WCAG 2.1 AAA on text pairs
      config: { rules: [{ id: 'color-contrast', enabled: true }] },
    },
  },
  decorators: [
    (story, context) => {
      installPseudoStates(); // idempotent: Kopien der Hover-/Fokus-/Active-Regeln für feste Zustands-Vorschauen
      const brand = context.globals.brand;
      if (brand === 'dbb') document.documentElement.setAttribute('data-brand', 'dbb');
      else document.documentElement.removeAttribute('data-brand');
      if (context.globals.type === 'dbb') document.documentElement.setAttribute('data-type', 'dbb');
      else document.documentElement.removeAttribute('data-type');
      return story();
    },
    withThemeByDataAttribute({
      themes: { Light: 'light', Dark: 'dark' },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
