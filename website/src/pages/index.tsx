import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { IDailyProjections, IProjectionDataRow } from "@/types/projections";
import {
  convertCSVRowsToDailyProjections,
  getCurrentStandings,
} from "@/utils/utils";
import { ProjectionsTable } from "@/components/projectionsTable";
import { GetStaticProps } from "next";
import { CurrentStandings } from "@/components/currentStandings";

export const getStaticProps: GetStaticProps<{
  csvData: IDailyProjections[];
}> = async () => {
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

  return {
    props: {
      csvData: convertedData,
    },
  };
};

interface HomeProps {
  csvData: IDailyProjections[];
}

const Home = ({ csvData }: HomeProps) => {
  const latestProjections =
    csvData.length > 0 ? csvData[csvData.length - 1] : null;

  const mostRecentDate = latestProjections
    ? new Date(latestProjections?.dateRetrieved).toDateString()
    : null;

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-8 p-6">
      <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
        2024 NBA Pick Em
      </h1>
      {latestProjections && (
        <div className="space-y-6">
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
