import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Leaf, Trophy } from "lucide-react";

interface User {
  rank: number;
  name: string;
  username: string;
  points: number;
  badges: number;
  avatar: string;
}

interface RemainingRankingsProps {
  users: User[];
}

export function RemainingRankings({ users }: RemainingRankingsProps) {
  return (
    <Card className="overflow-hidden">
      <div className="divide-y divide-border">
        {users.map((user) => (
          <div
            key={user.rank}
            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            {/* Rank */}
            <div className="shrink-0 w-12 text-center">
              <span className="text-2xl font-bold text-muted-foreground">
                {user.rank}
              </span>
            </div>

            {/* Avatar */}
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="grow min-w-0">
              <h4 className="font-semibold text-foreground truncate">
                {user.name}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                @{user.username}
              </p>
            </div>

            {/* Badges */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              <Trophy className="h-4 w-4" />
              <span>{user.badges}</span>
            </div>

            {/* Points */}
            <div className="flex items-center gap-2 shrink-0">
              <Leaf className="h-5 w-5 text-green-700 dark:text-green-400" />
              <span className="font-bold text-green-700 dark:text-green-400 text-lg">
                {user.points.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
