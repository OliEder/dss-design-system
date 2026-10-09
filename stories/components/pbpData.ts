// Fiktive Demo-Daten für PlayByPlay (Demo und Beispiele teilen sie). Neueste zuerst.
export type Ev = {
  id: string | number; time: string; quarter: string; team?: 'heim' | 'gast' | 'none';
  kind?: 'default' | 'score-2p' | 'score-3p' | 'ft' | 'foul' | 'timeout' | 'sub' | 'turnover';
  title: string; titleBold?: string; detail?: string; score?: { heim: number; gast: number };
};

export const initialEvents: Ev[] = [
  { id: 1,  time: '02:14', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'N. Wimberg #7', detail: 'Assist · T. Reuter #13 · 3/7 von Downtown', score: { heim: 87, gast: 64 } },
  { id: 2,  time: '02:38', quarter: 'Q4', team: 'gast', kind: 'default',  title: 'Defensiv-Rebound · M. Wagner #23', detail: '9 Rebounds gesamt',                                  score: { heim: 84, gast: 64 } },
  { id: 3,  time: '02:42', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: '2-Punkte-Wurf · A. Seiferth #4', detail: 'aus der Zone · 8/12 FG',                                  score: { heim: 84, gast: 64 } },
  { id: 4,  time: '03:05', quarter: 'Q4', team: 'gast', kind: 'foul',     title: '5. Foul · M. Wagner #23 · Fouled Out', detail: 'offensiv · gegen R. Christen #21',                  score: { heim: 82, gast: 64 } },
  { id: 5,  time: '03:21', quarter: 'Q4', team: 'gast', kind: 'timeout',  title: 'Auszeit · USC Heidelberg', detail: '2. von 3 Auszeiten · 75 Sekunden',                              score: { heim: 82, gast: 64 } },
  { id: 6,  time: '03:48', quarter: 'Q4', team: 'heim', kind: 'ft',       title: 'Freiwurf · A. Seiferth #4 · 2/2', detail: 'nach Foul · 5/6 FT',                                     score: { heim: 82, gast: 64 } },
  { id: 7,  time: '04:12', quarter: 'Q4', team: 'gast', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'D. Mathis #3', detail: 'unassisted · von links Flügel',              score: { heim: 80, gast: 64 } },
  { id: 8,  time: '04:45', quarter: 'Q4', team: 'none', kind: 'sub',      title: 'Auswechslung · TSV Tröster', detail: 'P. Steidl #21 für N. Wimberg #7',                              score: { heim: 80, gast: 61 } },
];

// Live-Scoring: nacheinander oben eingefügt
export const liveBank: Omit<Ev, 'id'>[] = [
  { time: '01:58', quarter: 'Q4', team: 'gast', kind: 'score-2p', title: '2-Punkte-Wurf · B. Skerlec #12', detail: 'aus der Zone',                       score: { heim: 87, gast: 66 } },
  { time: '01:34', quarter: 'Q4', team: 'heim', kind: 'foul',     title: 'Foul · T. Reuter #13', detail: 'defensiv · 3. Foul',                            score: { heim: 87, gast: 66 } },
  { time: '01:33', quarter: 'Q4', team: 'gast', kind: 'ft',       title: 'Freiwurf · D. Mathis #3 · 1/2', detail: '5/6 FT',                              score: { heim: 87, gast: 67 } },
  { time: '01:33', quarter: 'Q4', team: 'gast', kind: 'ft',       title: 'Freiwurf · D. Mathis #3 · 2/2', detail: '6/7 FT',                              score: { heim: 87, gast: 68 } },
  { time: '01:08', quarter: 'Q4', team: 'heim', kind: 'score-3p', titleBold: 'Drei-Punkte-Wurf', title: 'A. Seiferth #4', detail: 'vom Top of the Key',  score: { heim: 90, gast: 68 } },
  { time: '00:42', quarter: 'Q4', team: 'gast', kind: 'turnover', title: 'Ballverlust · D. Mathis #3', detail: 'Steal · A. Seiferth #4',                 score: { heim: 90, gast: 68 } },
  { time: '00:32', quarter: 'Q4', team: 'heim', kind: 'score-2p', title: 'Fastbreak · A. Seiferth #4', detail: 'Layup · 4. Punkt in Folge',              score: { heim: 92, gast: 68 } },
];
