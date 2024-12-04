import { ProjectionsTableRow } from "./projectionsTable";

type MobileTeamStatusCellProps = {
  rowData: ProjectionsTableRow;
};

export const MobileTeamStatusCell = ({
  rowData,
}: MobileTeamStatusCellProps) => {
  const roundedDelta =
    Math.round((rowData.projectedWins - rowData.openingLineWins) * 100) / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full gap-1">
        <span>{"Record:"}</span>
        <span>{`${rowData.currentWins}-${rowData.currentLosses}`}</span>
      </div>
      <div className="flex justify-between w-full gap-1">
        <span>Line:</span>
        <span>{`${rowData.openingLineWins}`}</span>
      </div>
      <div className="flex justify-between w-full gap-1">
        <span>Projected:</span>
        <span>{`${rowData.projectedWins}`}</span>
      </div>
      <div className="flex justify-between w-full gap-1">
        <span>Delta:</span>
        <div
          className="flex justify-center items-center px-1"
          style={{
            backgroundColor: `rgb(
          ${roundedDelta < 0 ? 255 : Math.max(0, 255 - roundedDelta * 10)}, 
          ${roundedDelta > 0 ? 255 : Math.max(0, 255 + roundedDelta * 10)}, 
          ${255 - Math.abs(roundedDelta * 10)}
        )`,
          }}
        >
          {roundedDelta > 0 ? "+" : ""}
          {roundedDelta}
        </div>
      </div>
    </div>
  );
};
