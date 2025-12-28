import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Crown, Leaf, Medal } from "lucide-react";

interface User {
  rank: number;
  name: string;
  username: string;
  points: number;
  badges: number;
  avatar: string;
}

interface TopThreePodiumProps {
  topThree: User[];
}

export function TopThreePodium({ topThree }: TopThreePodiumProps) {
  return (
    <div className="mb-12">
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* 2nd Place */}
        <Card className="md:order-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 rounded-full -mr-16 -mt-16" />
          <div className="relative flex flex-col items-center text-center p-6">
            <div className="mb-4 relative">
              <Avatar className="h-20 w-20 border-4 border-accent/20">
                <AvatarImage
                  src={topThree[1].avatar || "/placeholder.svg"}
                  alt={topThree[1].name}
                />
                <AvatarFallback>
                  {topThree[1].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
                <Medal className="h-5 w-5" />
              </div>
            </div>
            <Badge
              variant="outline"
              className="mb-2 bg-accent/10 text-accent-foreground border-accent/20"
            >
              2nd Place
            </Badge>
            <h3 className="font-semibold text-lg mb-1">{topThree[1].name}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              @{topThree[1].username}
            </p>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-2xl mb-2">
              <Leaf className="h-5 w-5" />
              {topThree[1].points.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {topThree[1].badges} badges earned
            </p>
          </div>
        </Card>

        {/* 1st Place */}
        <Card className="md:order-2 relative overflow-hidden border-2 border-green-200 dark:border-green-800 shadow-lg md:-mt-4">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 dark:bg-green-900/20 rounded-full -mr-20 -mt-20" />
          <div className="relative flex flex-col items-center text-center p-6">
            <div className="mb-4 relative">
              <Avatar className="h-24 w-24 border-4 border-green-200 dark:border-green-700">
                <AvatarImage
                  src={topThree[0].avatar || "/placeholder.svg"}
                  alt={topThree[0].name}
                />
                <AvatarFallback>
                  {topThree[0].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2 bg-green-700 dark:bg-green-600 text-white rounded-full p-2">
                <Crown className="h-6 w-6" />
              </div>
            </div>
            <Badge className="mb-2 bg-green-700 dark:bg-green-600 text-white hover:bg-green-800 dark:hover:bg-green-700">
              1st Place
            </Badge>
            <h3 className="font-semibold text-xl mb-1">{topThree[0].name}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              @{topThree[0].username}
            </p>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-3xl mb-2">
              <Leaf className="h-6 w-6" />
              {topThree[0].points.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {topThree[0].badges} badges earned
            </p>
          </div>
        </Card>

        {/* 3rd Place */}
        <Card className="md:order-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/30 rounded-full -mr-16 -mt-16" />
          <div className="relative flex flex-col items-center text-center p-6">
            <div className="mb-4 relative">
              <Avatar className="h-20 w-20 border-4 border-secondary/20">
                <AvatarImage
                  src={topThree[2].avatar || "/placeholder.svg"}
                  alt={topThree[2].name}
                />
                <AvatarFallback>
                  {topThree[2].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-2">
                <Medal className="h-5 w-5" />
              </div>
            </div>
            <Badge variant="secondary" className="mb-2">
              3rd Place
            </Badge>
            <h3 className="font-semibold text-lg mb-1">{topThree[2].name}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              @{topThree[2].username}
            </p>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-2xl mb-2">
              <Leaf className="h-5 w-5" />
              {topThree[2].points.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {topThree[2].badges} badges earned
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
