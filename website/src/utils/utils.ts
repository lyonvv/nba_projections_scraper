import { InitialOverUnders, InitialPicks } from "@/constants";
import { IDailyProjections } from "@/types/projections";
import { TeamAbbreviation, TeamAbbreviations } from "@/types/teams";
import { IndividualStandings, Pick, Standings } from "@/types/picks";

export const getDistanceFromLine = (currentDelta: number, pick: Pick) => {
  const isOnTrack = pick === "Over" ? currentDelta > 0 : currentDelta < 0;

  const absoluteDelta = Math.abs(currentDelta);

  const distanceFromLine = isOnTrack ? absoluteDelta : -absoluteDelta;

  return distanceFromLine;
};

export const isValidTeamAbbreviation = (
  teamAbbreviation: string | null | undefined
): boolean => {
  if (!teamAbbreviation) {
    return false;
  }
  return TeamAbbreviations.includes(teamAbbreviation as TeamAbbreviation);
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

      const paulDelta = getDistanceFromLine(currentDelta, initialPicks.Paul);

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

      if (paulDelta === 0) {
        acc.Paul.countPush++;
      } else if (paulDelta > 0) {
        acc.Paul.countCorrect++;
        acc.Paul.correctDistanceFromLine += paulDelta;
      } else {
        acc.Paul.countIncorrect++;
        acc.Paul.incorrectDistanceFromLine += paulDelta;
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
      Paul: {
        countCorrect: 0,
        countIncorrect: 0,
        countPush: 0,
        correctDistanceFromLine: 0,
        incorrectDistanceFromLine: 0,
      } as IndividualStandings,
    } as Standings
  );
};
