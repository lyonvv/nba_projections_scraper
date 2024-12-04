import { IDailyProjections } from "@/types/projections";
import { getCurrentStandings } from "@/utils/utils";
import { ProjectionsTable } from "@/components/projectionsTable";
import { GetStaticProps } from "next";
import { CurrentStandings } from "@/components/currentStandings";
import { getStaticDataFromCsvs } from "@/utils/serverUtils";

export const getStaticProps: GetStaticProps<{
  projectionsData: IDailyProjections[];
}> = async () => {
  const { projectionsData } = getStaticDataFromCsvs();

  return {
    props: {
      projectionsData: projectionsData,
    },
  };
};

interface HomeProps {
  projectionsData: IDailyProjections[];
}

const Home = ({ projectionsData }: HomeProps) => {
  const latestProjections =
    projectionsData.length > 0
      ? projectionsData[projectionsData.length - 1]
      : null;

  const mostRecentDate = latestProjections
    ? new Date(latestProjections?.dateRetrieved).toDateString()
    : null;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      {latestProjections && (
        <div className="flex flex-col w-full space-y-6">
          <CurrentStandings
            standings={getCurrentStandings(latestProjections)}
          />
          <ProjectionsTable projections={latestProjections} />
          <div>
            <div className="text-gray-500">
              {"Projection data from "}
              <a
                className="text-blue-500 underline"
                href={"https://www.espn.com/nba/bpi/_/view/projections"}
                target={"_blank"}
              >
                {"ESPN"}
              </a>
            </div>
            <div className="text-gray-500">{`Last updated on ${mostRecentDate}`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
