// Fiktive Demo-Daten für Table (Demo und Beispiele teilen sie)
export const roster = [
  { num: '4',  name: 'J. Tanner',  pos: 'PG', cap: false, status: 'on' },
  { num: '7',  name: 'M. Okafor',   pos: 'SG', cap: false, status: 'on' },
  { num: '11', name: 'L. Brandt',  pos: 'SF', cap: true,  status: 'on' },
  { num: '13', name: 'K. Vogler',    pos: 'PF', cap: false, status: 'on' },
  { num: '15', name: 'D. Hollis',    pos: 'C',  cap: false, status: 'on' },
  { num: '21', name: 'P. Kessel',    pos: 'SG', cap: false, status: 'bench' },
  { num: '24', name: 'E. Marlow',   pos: 'SF', cap: false, status: 'bench' },
  { num: '32', name: 'B. Havel',    pos: 'PF', cap: false, status: 'bench' },
  { num: '8',  name: 'O. Falkenstein', pos: 'SG', cap: false, status: 'bench' },
  { num: '9',  name: 'C. Fenwick',  pos: 'PG', cap: false, status: 'dnp' },
];

export const boxscore = [
  { num: '4',  name: 'J. Tanner', pos: 'pg', min: '32:14', pts: 22, p2: '6/11', p3: '3/6',  ft: '1/2', reb: 4, ast: 8, foul: 2, pm: '+18' },
  { num: '7',  name: 'M. Okafor',  pos: 'sg', min: '29:45', pts: 19, p2: '4/8',  p3: '3/8',  ft: '2/2', reb: 3, ast: 5, foul: 3, pm: '+15' },
  { num: '11', name: 'L. Brandt', pos: 'sf', min: '28:02', pts: 14, p2: '5/10', p3: '0/2',  ft: '4/4', reb: 7, ast: 2, foul: 2, pm: '+12' },
  { num: '13', name: 'K. Vogler',   pos: 'pf', min: '26:18', pts: 12, p2: '5/9',  p3: '0/0',  ft: '2/3', reb: 9, ast: 1, foul: 3, pm: '+9'  },
  { num: '15', name: 'D. Hollis',   pos: 'c',  min: '24:30', pts: 10, p2: '4/7',  p3: '0/0',  ft: '2/4', reb: 11,ast: 1, foul: 4, pm: '+8'  },
  { num: '21', name: 'P. Kessel',   pos: 'sg', min: '12:08', pts: 6,  p2: '2/4',  p3: '0/2',  ft: '2/2', reb: 1, ast: 3, foul: 1, pm: '+3'  },
  { num: '24', name: 'E. Marlow',  pos: 'sf', min: '08:55', pts: 4,  p2: '1/3',  p3: '0/1',  ft: '2/2', reb: 2, ast: 0, foul: 1, pm: '+2'  },
];

export const crew = [
  { role: 'Hauptschiedsrichter', name: 'Sven Roder',  license: 'SR-2024-0892', status: 'on' },
  { role: '2. Schiedsrichter',    name: 'Maik Lenz',  license: 'SR-2024-1245', status: 'on' },
  { role: 'Anschreiber',          name: 'Jule Arendt',     license: 'KG-2025-7621', status: 'on' },
  { role: 'Zeitnehmer',           name: 'Timo Brecht',   license: 'KG-2025-7188', status: 'on' },
  { role: '24-Sek.-Zeitnehmer',   name: 'Elke Moser',  license: 'KG-2025-8042', status: 'on' },
];

// Vorzeichen: Plus grün, Minus rot (Klassen plus/minus der Zahlenzelle)
export const signClass = (pm: string) => (pm.startsWith('-') || pm.startsWith('−') ? 'minus' : 'plus');
