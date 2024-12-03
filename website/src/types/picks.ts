import { TeamAbbreviation } from "./teams";

export type Participant = "Owen" | "Will" | "Lyon";

export type Pick = "Over" | "Under";

export type CurrentPickStatus = Pick | "Push";

export type AllPicks = Record<TeamAbbreviation, Record<Participant, Pick>>;
