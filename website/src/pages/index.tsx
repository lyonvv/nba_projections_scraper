import { GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { IDailyProjections, IProjectionDataRow } from "@/types/projections";
import { convertCSVRowsToDailyProjections } from "@/utils/utils";

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
  const mostRecentDate =
    csvData.length > 0
      ? new Date(csvData[csvData.length - 1].dateRetrieved).toDateString()
      : null;

  return (
    <div>
      <h1>Welcome to Next.js with the Pages Router</h1>
      <div>{`${csvData.length} days of data collected`}</div>
      {mostRecentDate && <div>{`Last updated on ${mostRecentDate}`}</div>}
    </div>
  );
};

export default Home;
