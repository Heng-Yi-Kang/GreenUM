import { Card } from "@/components/ui/card";
import { Recycle, Trophy, TrendingUp, Users, Award, Leaf } from "lucide-react";

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
          Everything you need to make a difference
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Powerful features designed to educate, motivate, and reward your
          sustainable actions on campus.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-lg transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <Recycle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Smart Recycling Guides
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Learn exactly what can be recycled and how. Get instant answers
              about any item with our comprehensive recycling database.
            </p>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Points & Rewards
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Earn points for every eco-friendly action. Unlock badges, climb
              leaderboards, and redeem rewards at campus partners.
            </p>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Real-Time Data
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Track campus-wide recycling rates with IoT-enabled bins. See your
              impact in real-time and help us reach our goals.
            </p>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Community Leaderboards
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Compete with friends, departments, and faculties. Join a community
              committed to making University Malata greener.
            </p>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Achievements System
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Collect unique badges for milestones. From "First Recycle" to "Eco
              Champion" - celebrate every step of your journey.
            </p>
          </div>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Education Hub
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Access tutorials, tips, and sustainability news. Learn how small
              actions create big environmental impacts.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
