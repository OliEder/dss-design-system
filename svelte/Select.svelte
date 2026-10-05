<script lang="ts">
  /**
   * DSS Select · Svelte 5
   * --------------------------------------------------------------
   * Natives <select> im DSS-Look. Nutzt ausschließlich die Klassen aus
   * css/components.css (kein eigener Scoped-Style) — tokens.css und
   * components.css müssen im App-Root importiert sein.
   */
  type State = 'default' | 'error' | 'ok' | 'warn';
  type Density = 'default' | 'compact';
  type Option = { value: string; label: string; disabled?: boolean };

  let {
    label = '',
    value = $bindable(''),
    options,
    help = '',
    state = 'default',
    density = 'default',
    disabled = false,
    required = false,
    id = undefined,
    name = undefined,
    onchange,
  }: {
    label?: string;
    value?: string;
    options: Option[];
    help?: string;
    state?: State;
    density?: Density;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    name?: string;
    onchange?: (e: Event) => void;
  } = $props();

  const uid = $props.id();
  const selectId = $derived(id ?? `dss-select-${uid}`);
  const helpId = $derived(`${selectId}-help`);
</script>

<div class="dss-field" class:is-error={state === 'error'} class:is-ok={state === 'ok'} class:is-warn={state === 'warn'}>
  {#if label}
    <label class="dss-field-label" for={selectId}>
      {label}
      {#if required}<span class="req" aria-hidden="true">*</span>{/if}
    </label>
  {/if}

  <select
    id={selectId}
    {name}
    {disabled}
    {required}
    class="dss-select"
    class:dss-select--compact={density === 'compact'}
    aria-invalid={state === 'error' ? 'true' : undefined}
    aria-describedby={help ? helpId : undefined}
    bind:value
    {onchange}
  >
    {#each options as option (option.value)}
      <option value={option.value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>

  {#if help}
    <div
      id={helpId}
      class="dss-field-help"
      class:dss-field-help--err={state === 'error'}
      class:dss-field-help--ok={state === 'ok'}
      class:dss-field-help--warn={state === 'warn'}
    >
      {help}
    </div>
  {/if}
</div>
