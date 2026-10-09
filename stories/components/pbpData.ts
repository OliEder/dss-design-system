// Fiktive Demo-Daten für PlayByPlay (Demo und Beispiele teilen sie). Neueste zuerst.
export type Ev = {
  id: string | number; time: string; quarter: string; team?: 'heim' | 'gast' | 'none';
  kind?: 'default' | 'score-2p' | 'score-3p' | 'ft' | 'foul' | 'timeout' | 'sub' | 'turnover';
  title: string; titleBold?: string; detail?: string; score?: { heim: number; gast: number };
};

export const initialEvents: Ev[] = [
  { id: 1,  time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'M. Okafor #7', detail: 'Assist · K. Vogler #13 · 3/7 von Downtown', score: { heim: 87, gast: 64 } },
  { id: 2,  time: '02:38', quarter: 'Q4', team: 'gast', kind: 'default',  title: 'Defensiv-Rebound · H. Lorenz #23', detail: '9 Rebounds gesamt',                                  score: { heim: 84, gast: 64 } },
  { id: 3,  time: '02:42', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: '2-Punkte-Wurf · J. Tanner #4', detail: 'aus der Zone · 8/12 FG',                                  score: { heim: 84, gast: 64 } },
  { id: 4,  time: '03:05', quarter: 'Q4', team: 'gast', kind: 'foul',     title: '5. Foul · H. Lorenz #23 · Fouled Out', detail: 'offensiv · gegen L. Brandt #21',                  score: { heim: 82, gast: 64 } },
  { id: 5,  time: '03:21', quarter: 'Q4', team: 'gast', kind: 'timeout',  title: 'Auszeit · Lindenberg Hawks', detail: '2. von 3 Auszeiten · 75 Sekunden',                              score: { heim: 82, gast: 64 } },
  { id: 6,  time: '03:48', quarter: 'Q4', team: 'heim', kind: 'ft',       title: 'Freiwurf · J. Tanner #4 · 2/2', detail: 'nach Foul · 5/6 FT',                                     score: { heim: 82, gast: 64 } },
  { id: 7,  time: '04:12', quarter: 'Q4', team: 'gast', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'G. Mertens #3', detail: 'unassisted · von links Flügel',              score: { heim: 80, gast: 64 } },
  { id: 8,  time: '04:45', quarter: 'Q4', team: 'none', kind: 'sub',      title: 'Auswechslung · TSV Nordhain', detail: 'P. Kessel #21 für M. Okafor #7',                              score: { heim: 80, gast: 61 } },
];

// Live-Scoring: nacheinander oben eingefügt
export const liveBank: Omit<Ev, 'id'>[] = [
  { time: '01:58', quarter: 'Q4', team: 'gast', kind: 'score-2p', title: '2-Punkte-Wurf · B. Sorell #12', detail: 'aus der Zone',                       score: { heim: 87, gast: 66 } },
  { time: '01:34', quarter: 'Q4', team: 'heim', kind: 'foul',     title: 'Foul · K. Vogler #13', detail: 'defensiv · 3. Foul',                            score: { heim: 87, gast: 66 } },
  { time: '01:33', quarter: 'Q4', team: 'gast', kind: 'ft',       title: 'Freiwurf · G. Mertens #3 · 1/2', detail: '5/6 FT',                              score: { heim: 87, gast: 67 } },
  { time: '01:33', quarter: 'Q4', team: 'gast', kind: 'ft',       title: 'Freiwurf · G. Mertens #3 · 2/2', detail: '6/7 FT',                              score: { heim: 87, gast: 68 } },
  { time: '01:08', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'J. Tanner #4', detail: 'vom Top of the Key',  score: { heim: 90, gast: 68 } },
  { time: '00:42', quarter: 'Q4', team: 'gast', kind: 'turnover', title: 'Ballverlust · G. Mertens #3', detail: 'Steal · J. Tanner #4',                 score: { heim: 90, gast: 68 } },
  { time: '00:32', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: 'Fastbreak · J. Tanner #4', detail: 'Layup · 4. Punkt in Folge',              score: { heim: 92, gast: 68 } },
];
