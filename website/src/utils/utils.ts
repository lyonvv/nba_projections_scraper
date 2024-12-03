import {
  InitialOverUnders,
  InitialPicks,
  TeamAbbreviationLookup,
} from "@/constants";
import {
  IDailyProjections,
  IProjectionDataRow,
  ISingleTeamDailyProjection,
} from "@/types/projections";
import { TeamAbbreviation, TeamName } from "@/types/teams";
import { IndividualStandings, Pick, Standings } from "@/types/picks";

export const convertCSVRowsToDailyProjections = (
  rows: IProjectionDataRow[]
): IDailyProjections[] => {
  const groupedByDate = rows.reduce((acc, row) => {
    const dateString = row.date_retrieved;

    const parsedDate = new Date(dateString);
    const dateKey = parsedDate.toISOString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(row);
    return acc;
  }, {} as Record<string, IProjectionDataRow[]>);

  return Object.entries(groupedByDate)
    .map(([date, rows]) => {
      const projections = rows.reduce((acc, row) => {
        const abbreviation = TeamAbbreviationLookup[row.team_name as TeamName];

        acc[abbreviation] = {
          dateRetrieved: row.date_retrieved,
          teamName: row.team_name as TeamName,
          currentWins: row.current_w,
          currentLosses: row.current_l,
          projectedWins: row.proj_w,
          projectedLosses: row.proj_l,
          winDivisionPct: row.win_div,
          playoffPct: row.playoff,
          top6Pct: row.top6,
          playinPct: row.playin,
          projectedSeed: row.proj_seed,
          projectedDraftPick: row.proj_draft,
          firstPickPct: row.first_pick,
        };
        return acc;
      }, {} as Record<TeamAbbreviation, ISingleTeamDailyProjection>);

      return {
        dateRetrieved: date,
        projections,
      };
    })
    .sort((a, b) => a.dateRetrieved.localeCompare(b.dateRetrieved));
};

export const getDistanceFromLine = (currentDelta: number, pick: Pick) => {
  const isOnTrack = pick === "Over" ? currentDelta > 0 : currentDelta < 0;

  const absoluteDelta = Math.abs(currentDelta);

  const distanceFromLine = isOnTrack ? absoluteDelta : -absoluteDelta;

  return distanceFromLine;
};

export const getCurrentStandings = (
  latestProjections: IDailyProjections
): Standings => {
  return Object.entries(latestProjections.projections).reduce(
    (acc, [abbreviationString, projection]) => {
      const abbreviation = abbreviationString as TeamAbbreviation;

      const initialLine = InitialOverUnders[abbreviation];

      const initialPicks = InitialPicks[abbreviation];

      const currentDelta = projection.projectedWins - initialLine;

      const willDelta = getDistanceFromLine(currentDelta, initialPicks.Will);

      const owenDelta = getDistanceFromLine(currentDelta, initialPicks.Owen);

      const lyonDelta = getDistanceFromLine(currentDelta, initialPicks.Lyon);

      if (willDelta === 0) {
        acc.Will.countPush++;
      } else if (willDelta > 0) {
        acc.Will.countCorrect++;
        acc.Will.correctDistanceFromLine += willDelta;
      } else {
        acc.Will.countIncorrect++;
        acc.Will.incorrectDistanceFromLine += willDelta;
      }

      if (owenDelta === 0) {
        acc.Owen.countPush++;
      } else if (owenDelta > 0) {
        acc.Owen.countCorrect++;
        acc.Owen.correctDistanceFromLine += owenDelta;
      } else {
        acc.Owen.countIncorrect++;
        acc.Owen.incorrectDistanceFromLine += owenDelta;
      }

      if (lyonDelta === 0) {
        acc.Lyon.countPush++;
      } else if (lyonDelta > 0) {
        acc.Lyon.countCorrect++;
        acc.Lyon.correctDistanceFromLine += lyonDelta;
      } else {
        acc.Lyon.countIncorrect++;
        acc.Lyon.incorrectDistanceFromLine += lyonDelta;
      }

      return acc;
    },
    {
      Owen: {
        countCorrect: 0,
        countIncorrect: 0,
        countPush: 0,
        correctDistanceFromLine: 0,
        incorrectDistanceFromLine: 0,
      } as IndividualStandings,
      Will: {
        countCorrect: 0,
        countIncorrect: 0,
        countPush: 0,
        correctDistanceFromLine: 0,
        incorrectDistanceFromLine: 0,
      } as IndividualStandings,
      Lyon: {
        countCorrect: 0,
        countIncorrect: 0,
        countPush: 0,
        correctDistanceFromLine: 0,
        incorrectDistanceFromLine: 0,
      } as IndividualStandings,
    } as Standings
  );
};
