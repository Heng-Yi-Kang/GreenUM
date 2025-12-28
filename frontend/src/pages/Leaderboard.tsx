import { leaderboardData } from "@/components/leaderboard/LeaderBoardData";
import { LeaderboardFooter } from "@/components/leaderboard/LeaderBoardFooter";
import { LeaderboardHeader } from "@/components/leaderboard/LeaderBoardHeader";
import { RankingsDivider } from "@/components/leaderboard/RankingDivider";
import { RemainingRankings } from "@/components/leaderboard/RemainingRankings";
import { TopThreePodium } from "@/components/leaderboard/TopThreePodium";

const topThree = leaderboardData.slice(0, 3);
const remaining = leaderboardData.slice(3);

export default function LeaderboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <LeaderboardHeader />
      <TopThreePodium topThree={topThree} />
      <RankingsDivider />
      <RemainingRankings users={remaining} />
      <LeaderboardFooter />
    </main>
  );
}
