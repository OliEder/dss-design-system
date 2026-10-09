import { useEffect, useState } from 'react';

export type Framework = 'vanilla' | 'svelte' | 'react';

// Ohne Attribut oder mit unbekanntem Wert gilt Svelte (wie in stories/docs/_CodeSwitch.svelte).
function read(): Framework {
  const v = document.documentElement.dataset.framework;
  return v === 'vanilla' || v === 'react' ? v : 'svelte';
}

/** Aktive Fassung aus html[data-framework], gesetzt vom Decorator (Werkzeugleiste "Fassung"). */
export function useActiveFramework(): Framework {
  const [fw, setFw] = useState<Framework>(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setFw(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-framework'] });
    setFw(read());
    return () => obs.disconnect();
  }, []);
  return fw;
}
