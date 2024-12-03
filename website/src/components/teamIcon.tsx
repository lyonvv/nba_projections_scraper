import { TeamAbbreviation } from "@/types/teams";
import Image from "next/image";

export type TeamIconProps = {
  team: TeamAbbreviation;
  size?: number;
};

export const TeamIcon = ({ team, size = 50 }: TeamIconProps) => {
  return (
    <div>
      <Image
        src={`/teamLogos/${team}_logo.svg`}
        alt={`${team} logo`}
        height={size}
        width={size}
      />
    </div>
  );
};
