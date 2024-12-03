import { TeamAbbreviation, TeamName } from "./teams";

export interface IProjectionDataRow {
  date_retrieved: string;
  team_name: string;
  current_w: number;
  current_l: number;
  proj_w: number;
  proj_l: number;
  win_div: number;
  playoff: number;
  top6: number;
  playin: number;
  proj_seed: number;
  proj_draft: number;
  first_pick: number;
}

export interface ISingleTeamDailyProjection {
  dateRetrieved: string;
  teamName: TeamName;
  currentWins: number;
  currentLosses: number;
  projectedWins: number;
  projectedLosses: number;
  winDivisionPct: number;
  playoffPct: number;
  top6Pct: number;
  playinPct: number;
  projectedSeed: number;
  projectedDraftPick: number;
  firstPickPct: number;
}

export interface IDailyProjections {
  dateRetrieved: string;
  projections: Record<TeamAbbreviation, ISingleTeamDailyProjection>;
}
