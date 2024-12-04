import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isValidTeamAbbreviation } from "@/utils/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { IDailyProjections } from "@/types/projections";
import { getStaticDataFromCsvs } from "@/utils/serverUtils";
import { TeamAbbreviations } from "@/types/teams";

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
  csvData: IDailyProjections[];
}> = async () => {
  const convertedData = getStaticDataFromCsvs();

  return {
    props: {
      csvData: convertedData,
    },
  };
};

interface TeamPageProps {
  csvData: IDailyProjections[];
}

export const TeamPage = ({ csvData }: TeamPageProps) => {
  const router = useRouter();
  const { team } = router.query;

  useEffect(() => {
    if (!isValidTeamAbbreviation(team as string)) {
      router.replace("/");
    }
  }, [router, team]);

  return (
    <div>
      <Link href="/">
        <button>Back</button>
      </Link>
      <h1>Team: {team}</h1>
      <div>{csvData.length}</div>
    </div>
  );
};

export default TeamPage;
