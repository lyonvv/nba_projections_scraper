import { InitialOverUnders, InitialPicks } from "@/constants";
import { Pick } from "@/types/picks";
import { IDailyProjections } from "@/types/projections";
import { TeamAbbreviation, TeamName } from "@/types/teams";

type ProjectionsTableProps = { projections: IDailyProjections };

type ProjectionsTableRow = {
  teamName: TeamName;
  currentWins: number;
  currentLosses: number;
  projectedWins: number;
  projectedLosses: number;
  openingLineWins: number;
  willPick: Pick;
  owenPick: Pick;
  lyonPick: Pick;
};

export const ProjectionsTable = ({ projections }: ProjectionsTableProps) => {
  const data: ProjectionsTableRow[] = Object.entries(
    projections.projections
  ).map(([teamAbbreviation, projection]) => {
    const abbreviation = teamAbbreviation as TeamAbbreviation;

    return {
      teamName: projection.teamName,
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 border-b">{"Team"}</th>
            <th className="text-left px-4 py-2 border-b">{"Current Wins"}</th>
            <th className="text-left px-4 py-2 border-b">{"Current Losses"}</th>
            <th className="text-left px-4 py-2 border-b">{"Projected Wins"}</th>
            <th className="text-left px-4 py-2 border-b">
              {"Projected Losses"}
            </th>
            <th className="text-left px-4 py-2 border-b">
              {"Opening Line Wins"}
            </th>
            <th className="text-left px-4 py-2 border-b">{"Will's Pick"}</th>
            <th className="text-left px-4 py-2 border-b">{"Owen's Pick"}</th>
            <th className="text-left px-4 py-2 border-b">{"Lyon's Pick"}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="px-4 py-2 border-b">{row.teamName}</td>
              <td className="px-4 py-2 border-b">{row.currentWins}</td>
              <td className="px-4 py-2 border-b">{row.currentLosses}</td>
              <td className="px-4 py-2 border-b">{row.projectedWins}</td>
              <td className="px-4 py-2 border-b">{row.projectedLosses}</td>
              <td className="px-4 py-2 border-b">{row.openingLineWins}</td>
              <td className="px-4 py-2 border-b">{row.willPick}</td>
              <td className="px-4 py-2 border-b">{row.owenPick}</td>
              <td className="px-4 py-2 border-b">{row.lyonPick}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
