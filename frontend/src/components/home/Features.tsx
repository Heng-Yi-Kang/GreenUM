import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    description:
      "Browse and register for sustainable activities with real-time attendee tracking and calendar integration.",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description:
      "Connect with like-minded individuals through user profiles, membership tiers, and collaborative events.",
    color: "text-emerald-700",
    bgColor: "bg-emerald-100",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track active events, monitor participation metrics, and measure your community impact in real-time.",
    color: "text-teal-700",
    bgColor: "bg-teal-100",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-accent/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 mb-4">
            Features
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl mb-4">
            Everything you need to drive change
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Powerful tools designed to make sustainability engaging, measurable,
            and rewarding for the entire UM community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-green-500/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
