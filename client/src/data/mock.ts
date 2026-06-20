export const memberStats = {
  roundsUsed: 2,
  roundsTotal: 5,
  resetLabel: 'Monday',
  neighborhood: 'Soho'
};

export const mockVenues = [
  {
    id: '1',
    name: 'Lowlight Bar',
    category: 'Cocktail bar',
    distance: '0.4 mi',
    vibe: 'Candlelit, vinyl, low tables',
    rating: '4.9',
    saves: '2.4k',
    crowd: 'Date night',
    offer: "This round's on the house: one house spritz",
    status: 'Open until 1am',
    accent: 'amber'
  },
  {
    id: '2',
    name: 'Koya Room',
    category: 'Sushi',
    distance: '0.8 mi',
    vibe: 'Tight counter, warm wood, chef-led',
    rating: '4.8',
    saves: '1.8k',
    crowd: 'Counter seats',
    offer: 'Start this round with yuzu edamame',
    status: '8 seats left',
    accent: 'green'
  },
  {
    id: '3',
    name: 'Afterglow Listening Lounge',
    category: 'Listening lounge',
    distance: '1.1 mi',
    vibe: 'Hi-fi room, amber booths, no phones',
    rating: '4.9',
    saves: '3.1k',
    crowd: 'Music heads',
    offer: 'A tasting pour before the night opens up',
    status: 'Blackout after 10pm',
    accent: 'blue'
  },
  {
    id: '4',
    name: 'Marlow Hearth',
    category: 'Wine bar',
    distance: '1.3 mi',
    vibe: 'Open fire, burgundy walls, long bar',
    rating: '4.7',
    saves: '1.2k',
    crowd: 'After-work',
    offer: 'Burnt honey panna cotta with any drink',
    status: 'Quiet now',
    accent: 'red'
  },
  {
    id: '5',
    name: 'The Green Tile',
    category: 'Aperitivo bar',
    distance: '1.6 mi',
    vibe: 'Standing room, citrus, terrazzo',
    rating: '4.8',
    saves: '940',
    crowd: 'Pre-dinner',
    offer: 'Olive, almond, and crisp panelle plate',
    status: 'Best before 8pm',
    accent: 'green'
  },
  {
    id: '6',
    name: 'Room 27',
    category: 'Cocktail bar',
    distance: '1.9 mi',
    vibe: 'Hidden door, copper rail, sharp service',
    rating: '4.9',
    saves: '2.9k',
    crowd: 'Late night',
    offer: 'Bartender choice mini martini',
    status: 'Members trending',
    accent: 'amber'
  }
];

export const visitHistory = [
  { id: 'h1', venue: 'Lowlight Bar', date: 'Thu', detail: 'House spritz confirmed', signal: '18m check-in' },
  { id: 'h2', venue: 'Koya Room', date: 'Tue', detail: 'Yuzu edamame confirmed', signal: '24m check-in' },
  { id: 'h3', venue: 'Afterglow', date: 'Last week', detail: 'Tasting pour confirmed', signal: '42m check-in' }
];

export const ownerMetrics = [
  { label: 'Rounds this week', value: '184', tone: 'amber' },
  { label: 'Attach rate', value: '63%', tone: 'green' },
  { label: 'Repeat guests', value: '41%', tone: 'blue' }
] as const;

export const adminQueue = [
  { id: 'q1', venue: 'Nori & Night', area: 'Soho', offer: 'Two-piece chef nigiri tasting', risk: 'Low' },
  { id: 'q2', venue: 'Candle Room', area: 'Soho', offer: 'Low-ABV candlelight cordial', risk: 'Review photos' },
  { id: 'q3', venue: 'Juniper Steps', area: 'Clerkenwell', offer: 'Mini negroni or soda spritz', risk: 'Low' }
];
