<script lang="ts">
  /**
   * DSS TextInput · Svelte 5 example
   * --------------------------------------------------------------
   * Standard form input with label, help text, and validation states.
   * Supports density (touch/default/compact), prefix/suffix addons,
   * and error/success/warning states.
   */
  import type { Snippet } from 'svelte';

  type State = 'default' | 'error' | 'ok' | 'warn';

  let {
    label = '',
    value = $bindable(''),
    placeholder = '',
    help = '',
    state = 'default',
    type = 'text',
    required = false,
    optional = '',
    disabled = false,
    pattern = '',
    inputmode,
    maxlength,
    prefix,
    suffix,
  }: {
    label?: string;
    value?: string;
    placeholder?: string;
    help?: string;
    state?: State;
    type?: string;
    required?: boolean;
    optional?: string;
    disabled?: boolean;
    pattern?: string;
    inputmode?: 'numeric' | 'decimal' | 'text' | 'tel' | 'email';
    maxlength?: number;
    prefix?: Snippet;
    suffix?: Snippet;
  } = $props();
</script>

<div class="field" class:is-error={state === 'error'} class:is-ok={state === 'ok'} class:is-warn={state === 'warn'}>
  {#if label}
    <label class="field-label">
      {label}
      {#if required}<span class="req">*</span>{/if}
      {#if optional}<span class="opt">{optional}</span>{/if}
    </label>
  {/if}

  <div class="input-group" class:has-addon={prefix || suffix}>
    {#if prefix}<span class="addon">{@render prefix()}</span>{/if}
    <input
      class="input"
      bind:value
      {type}
      {placeholder}
      {disabled}
      {pattern}
      {inputmode}
      {maxlength}
    />
    {#if suffix}<span class="addon right">{@render suffix()}</span>{/if}
  </div>

  {#if help}
    <div class="field-help" class:err={state === 'error'} class:ok={state === 'ok'} class:warn={state === 'warn'}>
      {help}
    </div>
  {/if}
</div>

<style>
  .field {
    display: flex; flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }
  .field-label {
    font-family: var(--font-body); font-weight: 600;
    font-size: 12.5px;
    color: var(--base-800);
    display: flex; align-items: baseline; gap: 6px;
  }
  .field-label .req { color: var(--err-text); font-weight: 700; }
  .field-label .opt {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--n-500);
    text-transform: uppercase; letter-spacing: 0.06em;
    margin-left: auto;
  }
  .field-help { font-size: 12px; color: var(--page-mute); line-height: 1.4; }
  .field-help.err  { color: var(--err-text); font-weight: 500; }
  .field-help.ok   { color: var(--ok-text); font-weight: 500; }
  .field-help.warn { color: var(--warn-text); font-weight: 500; }

  .input-group {
    display: flex; align-items: stretch;
    border: 1px solid var(--n-300);
    border-radius: var(--radius-md);
    background: var(--n-0);
    overflow: hidden;
    transition: border-color 0.14s, box-shadow 0.14s;
  }
  .input-group:focus-within {
    border-color: var(--base-800);
    box-shadow: 0 0 0 var(--ring-w) var(--ring-color);
  }

  .input {
    flex: 1; min-width: 0;
    appearance: none;
    border: 0; outline: 0; background: transparent;
    height: var(--fld-h-default);
    padding: 0 14px;
    font-family: var(--font-body); font-size: 15px;
    color: var(--base-900);
  }
  .input::placeholder { color: var(--n-500); }
  .input:disabled { color: var(--n-500); cursor: not-allowed; }

  .addon {
    display: inline-flex; align-items: center;
    padding: 0 14px;
    background: var(--n-100);
    color: var(--base-700);
    font-family: var(--font-mono); font-size: 13px; font-weight: 600;
    border-right: 1px solid var(--n-200);
  }
  .addon.right { border-right: 0; border-left: 1px solid var(--n-200); }

  /* States */
  .field.is-error .input-group { border-color: var(--err-fill); }
  .field.is-ok    .input-group { border-color: var(--ok-fill); }
  .field.is-warn  .input-group { border-color: var(--warn-fill); }
</style>
