import { IDailyProjections } from "@/types/projections";
import { TeamAbbreviation, TeamName } from "@/types/teams";
import { InitialOverUnders, InitialPicks } from "@/constants";
import { ParticipantPickCell } from "./participantPickCell";
import { TeamIcon } from "./teamIcon";
import { ColumnConfig } from "@/types/tableConfig";
import { GenericTable } from "./genericTable";
import { Pick } from "@/types/picks";

export type ProjectionsTableRow = {
  teamName: TeamName;
  teamAbbreviation: TeamAbbreviation;
  currentWins: number;
  currentLosses: number;
  projectedWins: number;
  projectedLosses: number;
  openingLineWins: number;
  willPick: Pick;
  owenPick: Pick;
  lyonPick: Pick;
};

type ProjectionsTableProps = { projections: IDailyProjections };

export const ProjectionsTable = ({ projections }: ProjectionsTableProps) => {
  const data: ProjectionsTableRow[] = Object.entries(
    projections.projections
  ).map(([teamAbbreviation, projection]) => {
    const abbreviation = teamAbbreviation as TeamAbbreviation;
    return {
      teamName: projection.teamName,
      teamAbbreviation: abbreviation,
      currentWins: projection.currentWins,
      currentLosses: projection.currentLosses,
      projectedWins: projection.projectedWins,
      projectedLosses: projection.projectedLosses,
      openingLineWins: InitialOverUnders[abbreviation],
      willPick: InitialPicks[abbreviation].Will,
      owenPick: InitialPicks[abbreviation].Owen,
      lyonPick: InitialPicks[abbreviation].Lyon,
    };
  });

  const columns: ColumnConfig<ProjectionsTableRow>[] = [
    {
      label: "Team",
      valueFunction: (row) => row.teamName,
      sortFunction: (a, b) => a.teamName.localeCompare(b.teamName),
      renderFunction: (row) => (
        <div className="flex gap-5 items-center">
          <TeamIcon team={row.teamAbbreviation} size={30} />
          {row.teamName}
        </div>
      ),
    },
    {
      label: "Current Record",
      valueFunction: (row) => `${row.currentWins}-${row.currentLosses}`,
      sortFunction: (a, b) => a.currentWins - b.currentWins,
    },
    {
      label: "Projected Record",
      valueFunction: (row) => `${row.projectedWins}-${row.projectedLosses}`,
      sortFunction: (a, b) => a.projectedWins - b.projectedWins,
    },
    {
      label: "Opening Line Wins",
      valueFunction: (row) => row.openingLineWins,
      sortFunction: (a, b) => a.openingLineWins - b.openingLineWins,
    },
    {
      label: "Delta",
      valueFunction: (row) => row.projectedWins - row.openingLineWins,
      sortFunction: (a, b) =>
        a.projectedWins -
        a.openingLineWins -
        (b.projectedWins - b.openingLineWins),
      renderFunction: (row) => {
        const roundedDelta =
          Math.round((row.projectedWins - row.openingLineWins) * 100) / 100;
        return (
          <div
            className="flex justify-center items-center"
            style={{
              backgroundColor: `rgb(
                ${
                  roundedDelta < 0 ? 255 : Math.max(0, 255 - roundedDelta * 10)
                }, 
                ${
                  roundedDelta > 0 ? 255 : Math.max(0, 255 + roundedDelta * 10)
                }, 
                ${255 - Math.abs(roundedDelta * 10)}
              )`,
            }}
          >
            {roundedDelta > 0 ? "+" : ""}
            {roundedDelta}
          </div>
        );
      },
    },
    {
      label: "Will's Pick",
      valueFunction: (row) => row.willPick,
      sortFunction: (a, b) => a.willPick.localeCompare(b.willPick),
      renderFunction: (row) => (
        <ParticipantPickCell
          currentDelta={row.projectedWins - row.openingLineWins}
          pick={row.willPick}
        />
      ),
    },
    {
      label: "Owen's Pick",
      valueFunction: (row) => row.owenPick,
      sortFunction: (a, b) => a.owenPick.localeCompare(b.owenPick),
      renderFunction: (row) => (
        <ParticipantPickCell
          currentDelta={row.projectedWins - row.openingLineWins}
          pick={row.owenPick}
        />
      ),
    },
    {
      label: "Lyon's Pick",
      valueFunction: (row) => row.lyonPick,
      sortFunction: (a, b) => a.lyonPick.localeCompare(b.lyonPick),
      renderFunction: (row) => (
        <ParticipantPickCell
          currentDelta={row.projectedWins - row.openingLineWins}
          pick={row.lyonPick}
        />
      ),
    },
  ];

  return (
    <GenericTable data={data} columns={columns} title="Current Projections" />
  );
};
