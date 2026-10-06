import type { Preview } from '@storybook/svelte-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Pull in design-system tokens so every story renders with the real
// color, type, spacing scale.
import '../tokens/tokens.css';
import '../css/components.css';
import './storybook.css';

const preview: Preview = {
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
          'Components', ['Button', 'TextInput', 'Select', 'Checkbox', 'Modal', 'Banner', 'Card', 'Card Library', 'Tabs', 'Navigation', 'Table', 'EmptyState', 'PlayByPlay', 'Icon'],
        ],
      },
    },
    a11y: {
      // DSS targets WCAG 2.1 AAA on text pairs
      config: { rules: [{ id: 'color-contrast', enabled: true }] },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { Light: 'light', Dark: 'dark' },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
