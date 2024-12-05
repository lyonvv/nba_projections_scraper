import {
  InitialOverUnders,
  SEASON_END_DATE,
  SEASON_START_DATE,
} from "@/constants";
import { IDailyProjections } from "@/types/projections";
import { TeamAbbreviation } from "@/types/teams";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  ReferenceLine,
} from "recharts";

type TeamChartProps = {
  team: TeamAbbreviation;
  projections: IDailyProjections[];
};

export const TeamChart = ({ projections, team }: TeamChartProps) => {
  const openingLine = InitialOverUnders[team];

  const minTime = SEASON_START_DATE.getTime();
  const maxTime = SEASON_END_DATE.getTime();

  const filteredData = projections.map((projection) => {
    const teamProjection = projection.projections[team];

    return {
      ...teamProjection,
      timeRetrieved: new Date(projection.dateRetrieved).getTime(),
    };
  });

  const latestProjection = filteredData.sort(
    (a, b) => a.timeRetrieved - b.timeRetrieved
  )[filteredData.length - 1];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={filteredData}>
        <XAxis
          dataKey="timeRetrieved"
          tickFormatter={(str) => new Date(str).toLocaleDateString()}
          domain={[minTime, maxTime]} // Set the domain with min/max dates
          type="number"
        />
        <YAxis min={0} max={82} />
        <Line
          type="monotone"
          dataKey="projectedWins"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="currentWins"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
        />
        <ReferenceLine y={openingLine} stroke="gray" strokeDasharray="3 3" />

        <ReferenceLine
          stroke="#82ca9d"
          strokeDasharray="3 3"
          strokeWidth={2}
          segment={[
            {
              x: latestProjection.timeRetrieved,
              y: latestProjection.currentWins,
            },
            { x: maxTime, y: latestProjection.projectedWins },
          ]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
