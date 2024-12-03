import {
  IDailyProjections,
  IProjectionDataRow,
  ISingleTeamDailyProjection,
} from "@/types/projections";
import {
  TeamAbbreviation,
  TeamAbbreviationLookup,
  TeamName,
} from "@/types/teams";

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
