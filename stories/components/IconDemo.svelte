<script>
  import Icon from '../../svelte/Icon.svelte';

  const families = [
    { title: 'Spielaktionen', ids: ['2p', '3p', 'ft', 'foul-p', 'foul-t', 'foul-u', 'foul-d', 'rebound', 'assist', 'steal', 'block', 'turnover', 'sub'] },
    { title: 'Court',         ids: ['hoop', 'backboard', 'zone', '3line', 'center', 'shotclock'] },
    { title: 'Rollen',        ids: ['whistle', 'scorer', 'coach', 'captain', 'dnp'] },
    { title: 'Status',        ids: ['live', 'timeout', 'half', 'dq', 'foulout', 'bonus'] },
    { title: 'System',        ids: ['sync', 'offline', 'valid', 'print', 'signature', 'cloud', 'lock'] },
    { title: 'UI · Navigation', ids: ['home', 'search', 'bell', 'cog', 'menu', 'more-h', 'chevron-r', 'chevron-d', 'chevron-l', 'chevron-u', 'arr-r'] },
    { title: 'UI · Aktionen',   ids: ['plus', 'minus', 'check', 'x', 'edit', 'trash', 'filter', 'sort', 'export', 'import', 'share'] },
    { title: 'UI · Content',    ids: ['calendar', 'roster', 'stats', 'trophy', 'folder', 'question', 'info', 'warn'] },
  ];

  let { view = 'single', name = 'whistle', size = 32 } = $props();
</script>

<div style="padding: 24px;">
  {#if view === 'single'}
    <Icon {name} {size} />

  {:else if view === 'sizes'}
    <div class="row" style="align-items: baseline;">
      <Icon name="whistle" size={16} />
      <Icon name="whistle" size={24} />
      <Icon name="whistle" size={32} />
      <Icon name="whistle" size={48} />
      <Icon name="whistle" size={64} />
    </div>

  {:else if view === 'tint'}
    <div class="row">
      <span style="display:inline-flex;align-items:center;gap:6px;color:var(--amber-700);"><Icon name="live" /> Live</span>
      <span style="display:inline-flex;align-items:center;gap:6px;color:var(--err-text);"><Icon name="foul-d" /> Disqualifiziert</span>
      <span style="display:inline-flex;align-items:center;gap:6px;color:var(--ok-text);"><Icon name="valid" /> Validiert</span>
      <span style="display:inline-flex;align-items:center;gap:6px;color:var(--sky-700);"><Icon name="whistle" /> Schiri</span>
    </div>

  {:else if view === 'actions'}
    <div class="row">
      {#each ['2p', '3p', 'ft', 'foul-p', 'foul-t', 'foul-u', 'foul-d', 'rebound', 'assist', 'steal', 'block', 'turnover', 'sub'] as n}
        <div class="tile">
          <Icon name={n} size={32} />
          <div class="lbl">{n}</div>
        </div>
      {/each}
    </div>

  {:else}
    <div class="stack">
      {#each families as fam}
        <div>
          <div class="hdr">{fam.title} · {fam.ids.length}</div>
          <div class="row">
            {#each fam.ids as n}
              <div class="tile">
                <Icon name={n} size={28} />
                <div class="lbl">{n}</div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  .stack { display: flex; flex-direction: column; gap: 18px; }
  .hdr {
    font-family: var(--font-mono); font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--page-mute); margin-bottom: 8px;
  }
  .tile {
    width: 88px; min-height: 84px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px;
    background: var(--surface-0);
    border: 1px solid var(--page-line);
    border-radius: var(--radius-md);
    padding: 10px 6px;
    color: var(--ink-800);
  }
  .lbl {
    font-family: var(--font-mono); font-size: 10.5px;
    color: var(--page-mute);
    text-align: center; max-width: 100%;
    overflow: hidden; text-overflow: ellipsis;
  }
</style>
