import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Users, TrendingUp } from "lucide-react";
import { useStats } from "@/hooks/useStats";

// Helper function to format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export function Analytics() {
  const { stats, loading } = useStats();

  // Create dynamic stats array based on fetched data
  const displayStats = [
    {
      title: "Active Events",
      value: loading ? "..." : stats.activeEvents.toString(),
      change: "Upcoming & Ongoing",
      icon: Activity,
      trend: "up" as const,
    },
    {
      title: "Total Participants",
      value: loading
        ? "..."
        : stats.totalUsers > 0
        ? formatNumber(stats.totalUsers)
        : "0",
      change: "Registered Users",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Impact Score",
      value: loading
        ? "..."
        : stats.impactScore > 0
        ? formatNumber(stats.impactScore)
        : "0",
      change: "Estimated based on engagement",
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: "CO₂ Reduced",
      value: loading ? "..." : `${stats.co2Reduced}T`,
      change: "Estimated from events",
      icon: BarChart3,
      trend: "up" as const,
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 mb-4">
            <BarChart3 className="h-4 w-4" />
            Analytics Dashboard
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl mb-4">
            Track your community's impact
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get real-time insights into event participation, community growth,
            and environmental impact. Make data-driven decisions to amplify your
            sustainability efforts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayStats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
