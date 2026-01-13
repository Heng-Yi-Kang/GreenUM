import { Trophy, TrendingUp, Users } from "lucide-react";

export function Community() {
  return (
    <section className="py-20 md:py-32 bg-accent/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 mb-4">
            <Trophy className="h-4 w-4" />
            Community Engagement
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-balance mb-6 md:text-5xl">
            Connect and celebrate impact together
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-12">
            Join a vibrant community of sustainability champions. Track your
            progress, earn recognition for your environmental contributions, and
            connect with like-minded individuals.
          </p>

          <div className="grid gap-6 md:grid-cols-3 text-left">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">
                  Impact Scoring System
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Earn points for every sustainable action and watch your impact
                  grow over time.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Membership Tiers</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Progress through tiers from Earth Defender to Eco Champion as
                  you participate more.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">User Profiles</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Showcase your achievements and connect with like-minded
                  individuals in the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
