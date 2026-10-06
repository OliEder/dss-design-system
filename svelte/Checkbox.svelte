<script lang="ts" module>
  let seq = 0;
</script>

<script lang="ts">
  /**
   * DSS Checkbox · Svelte 5
   * --------------------------------------------------------------
   * Natives Kontrollkästchen im DSS-Look. Die Klickfläche ist das
   * gesamte Label (≥ 44 px, `density="compact"` 36 px). Nutzt nur
   * die Klassen aus css/components.css.
   */
  let {
    label,
    hint = '',
    checked = $bindable(false),
    disabled = false,
    density = 'default',
    id = undefined,
    name = undefined,
    onchange = undefined,
  }: {
    label: string;
    hint?: string;
    checked?: boolean;
    disabled?: boolean;
    density?: 'default' | 'compact';
    id?: string;
    name?: string;
    onchange?: (checked: boolean) => void;
  } = $props();

  const autoId = `dss-check-${++seq}`;
  const inputId = $derived(id ?? autoId);
</script>

<label
  for={inputId}
  class="dss-check"
  class:dss-check--compact={density === 'compact'}
  class:is-disabled={disabled}
>
  <input
    id={inputId}
    {name}
    type="checkbox"
    class="dss-check-input"
    bind:checked
    {disabled}
    aria-describedby={hint ? `${inputId}-hint` : undefined}
    onchange={() => onchange?.(checked)}
  />
  <span class="dss-check-text">
    <span class="dss-check-label">{label}</span>
    {#if hint}<span id={`${inputId}-hint`} class="dss-check-hint">{hint}</span>{/if}
  </span>
</label>
