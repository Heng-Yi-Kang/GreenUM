import { Trophy } from "lucide-react";

export function LeaderboardHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
        <Trophy className="h-8 w-8 text-green-700 dark:text-green-400" />
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
        GreenUM Leaderboard
      </h1>
      <p className="text-muted-foreground text-lg">
        Top eco-champions making a difference at University Malata
      </p>
    </div>
  );
}
