import { AllPicks } from "./types/picks";
import { TeamAbbreviation, TeamName } from "./types/teams";

export const TeamNameLookup: Record<TeamAbbreviation, TeamName> = {
  ATL: "Atlanta Hawks",
  BOS: "Boston Celtics",
  BKN: "Brooklyn Nets",
  CHA: "Charlotte Hornets",
  CHI: "Chicago Bulls",
  CLE: "Cleveland Cavaliers",
  DAL: "Dallas Mavericks",
  DEN: "Denver Nuggets",
  DET: "Detroit Pistons",
  GSW: "Golden State Warriors",
  HOU: "Houston Rockets",
  IND: "Indiana Pacers",
  LAC: "LA Clippers",
  LAL: "Los Angeles Lakers",
  MEM: "Memphis Grizzlies",
  MIA: "Miami Heat",
  MIL: "Milwaukee Bucks",
  MIN: "Minnesota Timberwolves",
  NOP: "New Orleans Pelicans",
  NYK: "New York Knicks",
  OKC: "Oklahoma City Thunder",
  ORL: "Orlando Magic",
  PHI: "Philadelphia 76ers",
  PHX: "Phoenix Suns",
  POR: "Portland Trail Blazers",
  SAC: "Sacramento Kings",
  SAS: "San Antonio Spurs",
  TOR: "Toronto Raptors",
  UTA: "Utah Jazz",
  WAS: "Washington Wizards",
};

export const TeamAbbreviationLookup: Record<TeamName, TeamAbbreviation> = {
  "Atlanta Hawks": "ATL",
  "Boston Celtics": "BOS",
  "Brooklyn Nets": "BKN",
  "Charlotte Hornets": "CHA",
  "Chicago Bulls": "CHI",
  "Cleveland Cavaliers": "CLE",
  "Dallas Mavericks": "DAL",
  "Denver Nuggets": "DEN",
  "Detroit Pistons": "DET",
  "Golden State Warriors": "GSW",
  "Houston Rockets": "HOU",
  "Indiana Pacers": "IND",
  "LA Clippers": "LAC",
  "Los Angeles Lakers": "LAL",
  "Memphis Grizzlies": "MEM",
  "Miami Heat": "MIA",
  "Milwaukee Bucks": "MIL",
  "Minnesota Timberwolves": "MIN",
  "New Orleans Pelicans": "NOP",
  "New York Knicks": "NYK",
  "Oklahoma City Thunder": "OKC",
  "Orlando Magic": "ORL",
  "Philadelphia 76ers": "PHI",
  "Phoenix Suns": "PHX",
  "Portland Trail Blazers": "POR",
  "Sacramento Kings": "SAC",
  "San Antonio Spurs": "SAS",
  "Toronto Raptors": "TOR",
  "Utah Jazz": "UTA",
  "Washington Wizards": "WAS",
};

export const InitialOverUnders: Record<TeamAbbreviation, number> = {
  ATL: 36.5,
  BOS: 58.5,
  BKN: 19.5,
  CHA: 31.5,
  CHI: 28.5,
  CLE: 48.5,
  DAL: 49.5,
  DEN: 50.5,
  DET: 25.5,
  GSW: 43.5,
  HOU: 42.5,
  IND: 46.5,
  LAC: 35.5,
  LAL: 42.5,
  MEM: 46.5,
  MIA: 43.5,
  MIL: 49.5,
  MIN: 51.5,
  NOP: 45.5,
  NYK: 53.5,
  OKC: 57.5,
  ORL: 47.5,
  PHI: 49.5,
  PHX: 48.5,
  POR: 20.5,
  SAC: 46.5,
  SAS: 35.5,
  TOR: 28.5,
  UTA: 27.5,
  WAS: 19.5,
};

export const InitialPicks: AllPicks = {
  ATL: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Over",
    Paul: "Over",
  },
  BOS: {
    Owen: "Over",
    Will: "Under",
    Lyon: "Over",
    Paul: "Over",
  },
  BKN: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Over",
    Paul: "Under",
  },
  CHA: {
    Owen: "Over",
    Will: "Under",
    Lyon: "Under",
    Paul: "Under",
  },
  CHI: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Under",
    Paul: "Over",
  },
  CLE: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Over",
    Paul: "Over",
  },
  DAL: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Over",
    Paul: "Over",
  },
  DEN: {
    Owen: "Over",
    Will: "Under",
    Lyon: "Under",
    Paul: "Under",
  },
  DET: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Under",
    Paul: "Under",
  },
  GSW: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Over",
    Paul: "Over",
  },
  HOU: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Under",
    Paul: "Over",
  },
  IND: {
    Owen: "Over",
    Will: "Under",
    Lyon: "Over",
    Paul: "Over",
  },
  LAC: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Under",
    Paul: "Under",
  },
  LAL: {
    Owen: "Over",
    Will: "Under",
    Lyon: "Over",
    Paul: "Under",
  },
  MEM: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Over",
    Paul: "Under",
  },
  MIA: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Under",
    Paul: "Over",
  },
  MIL: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Over",
    Paul: "Under",
  },
  MIN: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Under",
    Paul: "Over",
  },
  NOP: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Over",
    Paul: "Under",
  },
  NYK: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Under",
    Paul: "Under",
  },
  OKC: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Under",
    Paul: "Over",
  },
  ORL: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Over",
    Paul: "Over",
  },
  PHI: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Under",
    Paul: "Under",
  },
  PHX: {
    Owen: "Over",
    Will: "Over",
    Lyon: "Under",
    Paul: "Under",
  },
  POR: {
    Owen: "Over",
    Will: "Under",
    Lyon: "Under",
    Paul: "Under",
  },
  SAC: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Over",
    Paul: "Under",
  },
  SAS: {
    Owen: "Under",
    Will: "Over",
    Lyon: "Over",
    Paul: "Under",
  },
  TOR: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Under",
    Paul: "Over",
  },
  UTA: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Over",
    Paul: "Under",
  },
  WAS: {
    Owen: "Under",
    Will: "Under",
    Lyon: "Under",
    Paul: "Under",
  },
};

export const SEASON_START_DATE = new Date("2024-10-22");

export const SEASON_END_DATE = new Date("2025-04-13");
