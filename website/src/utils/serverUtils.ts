import { TeamAbbreviationLookup } from "@/constants";
import {
  IDailyProjections,
  IProjectionDataRow,
  ISingleTeamDailyProjection,
} from "@/types/projections";
import { TeamAbbreviation, TeamName } from "@/types/teams";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

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

export const getStaticDataFromCsvs = () => {
  const dataFolder = path.join(process.cwd(), "data");

  const files = fs.readdirSync(dataFolder);

  const parsedData: IProjectionDataRow[] = files
    .filter((file) => file.endsWith(".csv"))
    .map((file) => {
      const filePath = path.join(dataFolder, file);
      const content = fs.readFileSync(filePath, "utf8");

      return parse(content, { columns: true }) as IProjectionDataRow[];
    })
    .flatMap((data) => data);

  const convertedData = convertCSVRowsToDailyProjections(parsedData);

  return convertedData;
};
