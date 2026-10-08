<script lang="ts">
  /**
   * DSS TextInput · Svelte 5 example
   * --------------------------------------------------------------
   * Standard form input with label, help text, and validation states.
   * Supports density (touch/default/compact), prefix/suffix addons,
   * and error/success/warning states. Nutzt ausschließlich die Klassen aus
   * css/components.css (kein eigener Scoped-Style); gleiche Struktur wie die
   * React-Fassung.
   */
  import type { Snippet } from 'svelte';

  type State = 'default' | 'error' | 'ok' | 'warn';
  type Density = 'touch' | 'default' | 'compact';

  let {
    label = '',
    value = $bindable(''),
    placeholder = '',
    help = '',
    state = 'default',
    density = 'default',
    type = 'text',
    required = false,
    optional = '',
    disabled = false,
    pattern = '',
    inputmode,
    maxlength,
    id = undefined,
    name = undefined,
    prefix,
    suffix,
  }: {
    label?: string;
    value?: string;
    placeholder?: string;
    help?: string;
    state?: State;
    density?: Density;
    type?: string;
    required?: boolean;
    optional?: string;
    disabled?: boolean;
    pattern?: string;
    inputmode?: 'numeric' | 'decimal' | 'text' | 'tel' | 'email';
    maxlength?: number;
    id?: string;
    name?: string;
    prefix?: Snippet;
    suffix?: Snippet;
  } = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `dss-input-${uid}`);
  const helpId = $derived(`${inputId}-help`);
</script>

<div class="dss-field" class:is-error={state === 'error'} class:is-ok={state === 'ok'} class:is-warn={state === 'warn'}>
  {#if label}
    <label class="dss-field-label" for={inputId}>
      {label}
      {#if required}<span class="req" aria-hidden="true">*</span>{/if}
      {#if optional}<span class="opt">{optional}</span>{/if}
    </label>
  {/if}

  <div class="dss-input-group">
    {#if prefix}<span class="dss-addon">{@render prefix()}</span>{/if}
    <input
      id={inputId}
      {name}
      class="dss-input"
      class:dss-input--default={density === 'default'}
      class:dss-input--compact={density === 'compact'}
      bind:value
      {type}
      {placeholder}
      {disabled}
      {required}
      {pattern}
      {inputmode}
      {maxlength}
      aria-invalid={state === 'error' ? 'true' : undefined}
      aria-describedby={help ? helpId : undefined}
    />
    {#if suffix}<span class="dss-addon dss-addon--right">{@render suffix()}</span>{/if}
  </div>

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
