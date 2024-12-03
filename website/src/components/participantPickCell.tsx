import { Pick } from "@/types/picks";
import { getDistanceFromLine } from "@/utils/utils";

type ParticipantPickCellProps = {
  currentDelta: number;
  pick: Pick;
};

export const ParticipantPickCell = ({
  currentDelta,
  pick,
}: ParticipantPickCellProps) => {
  const distanceFromLine = getDistanceFromLine(currentDelta, pick);

  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundColor: `rgb(
        ${
          distanceFromLine < 0 ? 255 : Math.max(0, 255 - distanceFromLine * 10)
        }, 
        ${
          distanceFromLine > 0 ? 255 : Math.max(0, 255 + distanceFromLine * 10)
        }, 
        ${255 - Math.abs(distanceFromLine * 10)}
      )`,
      }}
    >
      {pick}
    </div>
  );
};
