import { TeamAbbreviation } from "./teams";

export type Participant = "Owen" | "Will" | "Lyon" | "Paul";

export type Pick = "Over" | "Under";

export type CurrentPickStatus = Pick | "Push";

export type AllPicks = Record<TeamAbbreviation, Record<Participant, Pick>>;

export type Standings = Record<Participant, IndividualStandings>;

export type IndividualStandings = {
  countCorrect: number;
  countIncorrect: number;
  countPush: number;
  correctDistanceFromLine: number;
  incorrectDistanceFromLine: number;
};
