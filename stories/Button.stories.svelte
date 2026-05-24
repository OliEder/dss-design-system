<script context="module" lang="ts">
  import type { Meta } from '@storybook/sveltekit';
  import Button from '../svelte/Button.svelte';

  export const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'amber', 'secondary', 'danger', 'ghost'],
      },
      size:  { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
      touch: { control: 'boolean' },
      disabled: { control: 'boolean' },
    },
    args: {
      variant: 'primary',
      size: 'md',
      touch: false,
      disabled: false,
    },
  } satisfies Meta<Button>;
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Button from '../svelte/Button.svelte';
</script>

<Story name="Primary">
  {#snippet template(args)}
    <Button {...args}>Spielbericht freigeben</Button>
  {/snippet}
</Story>

<Story name="Amber" args={{ variant: 'amber' }}>
  {#snippet template(args)}
    <Button {...args}>Live-Scoring starten</Button>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
  {#snippet template(args)}
    <Button {...args}>Abbrechen</Button>
  {/snippet}
</Story>

<Story name="Danger" args={{ variant: 'danger' }}>
  {#snippet template(args)}
    <Button {...args}>Spiel verwerfen</Button>
  {/snippet}
</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>
  {#snippet template(args)}
    <Button {...args}>Mehr Optionen</Button>
  {/snippet}
</Story>

<Story name="Hallen-Touch" args={{ touch: true, variant: 'amber' }}>
  {#snippet template(args)}
    <Button {...args}>2-Punkte buchen</Button>
  {/snippet}
</Story>

<Story name="Alle Varianten">
  <div class="sb-row">
    <Button variant="primary">Primary</Button>
    <Button variant="amber">Amber</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
</Story>

<Story name="Alle Größen">
  <div class="sb-row">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button touch>Touch · 64 px</Button>
  </div>
</Story>

<Story name="Disabled">
  <div class="sb-row">
    <Button disabled>Primary</Button>
    <Button variant="amber" disabled>Amber</Button>
    <Button variant="secondary" disabled>Secondary</Button>
  </div>
</Story>
