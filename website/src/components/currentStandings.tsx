import { IndividualStandings, Participant, Standings } from "@/types/picks";
import { GenericTable } from "./genericTable";
import { ColumnConfig } from "@/types/tableConfig";

type CurrentStandingsProps = {
  standings: Standings;
};

type CurrentStandingsRow = IndividualStandings & {
  participant: Participant;
};

export const CurrentStandings = ({ standings }: CurrentStandingsProps) => {
  const data: CurrentStandingsRow[] = Object.entries(standings)
    .map(([participantString, IndividualStandings]) => {
      const participant = participantString as Participant;
      return {
        participant,
        ...IndividualStandings,
      };
    })
    .sort((a, b) => b.countCorrect - a.countCorrect);

  const columns: ColumnConfig<CurrentStandingsRow>[] = [
    {
      label: "Participant",
      valueFunction: (row) => row.participant,
      sortFunction: (a, b) => a.participant.localeCompare(b.participant),
    },
    {
      label: "Current Correct",
      valueFunction: (row) => row.countCorrect,
      sortFunction: (a, b) => a.countCorrect - b.countCorrect,
    },
    {
      label: "Current Incorrect",
      valueFunction: (row) => row.countIncorrect,
      sortFunction: (a, b) => a.countIncorrect - b.countIncorrect,
    },
    {
      label: "Current Push",
      valueFunction: (row) => row.countPush,
      sortFunction: (a, b) => a.countPush - b.countPush,
    },
  ];

  return <GenericTable data={data} columns={columns} title={"Standings"} />;
};
