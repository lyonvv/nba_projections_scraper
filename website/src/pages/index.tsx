import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { IDailyProjections, IProjectionDataRow } from "@/types/projections";
import { convertCSVRowsToDailyProjections } from "@/utils/utils";
import { ProjectionsTable } from "@/components/projectionsTable";
import { GetStaticProps } from "next";

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
    <div>
      <h1>Welcome to Next.js with the Pages Router</h1>
      <div>{`${csvData.length} days of data collected`}</div>
      {latestProjections && (
        <>
          <ProjectionsTable projections={latestProjections} />
          <div>{`Last updated on ${mostRecentDate}`}</div>
        </>
      )}
    </div>
  );
};

export default Home;
