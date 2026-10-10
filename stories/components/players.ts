// Demo-Fotos der Spielerkarten (nur Storybook): jedes Foto gehört in allen Beispielen zum selben erfundenen Namen.
// Quellen und Lizenz: ../assets/players/CREDITS.md. Die Fotos zeigen reale Personen, die Namen sind erfunden.
import tanner from '../assets/players/tanner.jpg';
import okafor from '../assets/players/okafor.jpg';
import vogler from '../assets/players/vogler.jpg';
import hollis from '../assets/players/hollis.jpg';
import mertens from '../assets/players/mertens.jpg';
import sorell from '../assets/players/sorell.jpg';

export const PLAYERS = {
  tanner: { photo: tanner, name: 'J. Tanner', jersey: '4', position: 'PG' },
  okafor: { photo: okafor, name: 'M. Okafor', jersey: '7', position: 'SG' },
  vogler: { photo: vogler, name: 'K. Vogler', jersey: '13', position: 'PF' },
  hollis: { photo: hollis, name: 'D. Hollis', jersey: '15', position: 'C' },
  mertens: { photo: mertens, name: 'G. Mertens', jersey: '3', position: 'SG' },
  sorell: { photo: sorell, name: 'B. Sorell', jersey: '12', position: 'SF' },
} as const;

/** Foto-URL je Schlüssel (für die Auswahl in der Spielwiese). */
export const FOTO: Record<string, string> = Object.fromEntries(Object.entries(PLAYERS).map(([key, value]) => [key, value.photo]));
