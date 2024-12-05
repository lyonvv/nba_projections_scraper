import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isValidTeamAbbreviation } from "@/utils/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { IDailyProjections } from "@/types/projections";
import { getStaticDataFromCsvs } from "@/utils/serverUtils";
import { TeamAbbreviation, TeamAbbreviations } from "@/types/teams";
import { ITeamSchedules } from "@/types/schedule";
import { TeamChart } from "@/components/teamChart";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = TeamAbbreviations.map((team) => ({
    params: { team },
  }));

  return {
    paths,
    fallback: false, // No fallback: only these paths will be generated
  };
};

export const getStaticProps: GetStaticProps<{
  projections: IDailyProjections[];
  scheduleData: ITeamSchedules;
}> = async () => {
  const { projectionsData, scheduleData } = getStaticDataFromCsvs();

  return {
    props: {
      projections: projectionsData,
      scheduleData: scheduleData,
    },
  };
};

interface TeamPageProps {
  projections: IDailyProjections[];
  scheduleData: ITeamSchedules;
}

export const TeamPage = ({ projections, scheduleData }: TeamPageProps) => {
  const router = useRouter();
  const { team } = router.query;

  useEffect(() => {
    if (!isValidTeamAbbreviation(team as string)) {
      router.replace("/");
    }
  }, [router, team]);

  const teamAbbreviation = team as TeamAbbreviation;

  const games = scheduleData[teamAbbreviation];

  return (
    <div>
      <Link href="/">
        <button>Back</button>
      </Link>
      <h1>Team: {team}</h1>
      <div>{projections.length}</div>
      <div>{games.length}</div>
      <TeamChart team={teamAbbreviation} projections={projections} />
    </div>
  );
};

export default TeamPage;
