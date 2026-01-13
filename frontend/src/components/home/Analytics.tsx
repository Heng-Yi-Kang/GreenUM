import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Active Events",
    value: "24",
    change: "+12% from last month",
    icon: Activity,
    trend: "up",
  },
  {
    title: "Total Participants",
    value: "1,234",
    change: "+18% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Impact Score",
    value: "45.2K",
    change: "+25% from last month",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "CO₂ Reduced",
    value: "2.5T",
    change: "+8% from last month",
    icon: BarChart3,
    trend: "up",
  },
];

export function Analytics() {
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
          {stats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
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
