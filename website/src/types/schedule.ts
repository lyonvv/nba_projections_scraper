import { TeamAbbreviation } from "./teams";

export interface IScheduleDataRow {
  date_time_est: string;
  visitor_team: string;
  visitor_score: number;
  home_team: string;
  home_score: number;
  box_score_link: string;
  overtime: string;
  attendance: number;
  game_duration: string;
  arena: string;
}

export interface IGame {
  date: string;
  visitor: TeamAbbreviation;
  visitorScore: number;
  home: TeamAbbreviation;
  homeScore: number;
  boxScoreLink: string;
  overtime: boolean;
  attendance: number;
  gameDuration: string;
  arena: string;
}

export type ITeamSchedules = {
  [team in TeamAbbreviation]: IGame[];
};
