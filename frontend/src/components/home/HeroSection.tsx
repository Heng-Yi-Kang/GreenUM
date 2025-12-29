import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-linear-to-br from-green-50/50 via-background to-green-100/50 dark:from-green-950/20 dark:via-background dark:to-green-900/20" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <Leaf className="h-4 w-4" />
              Supporting SDG 12 - Responsible Consumption
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
              Green<span className="text-green-800">UM</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Transform University Malata into a sustainability leader. Track
              your recycling, earn rewards, and join a community fighting
              climate change together.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 text-white bg-green-800">
                Get Started
                <Leaf className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">2,500+</div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">15K kg</div>
                <div className="text-sm text-muted-foreground">
                  Recycled This Year
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">30%</div>
                <div className="text-sm text-muted-foreground">
                  Waste Reduction
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-tr from-green-200/30 to-green-300/30 dark:from-green-900/20 dark:to-green-800/20 blur-3xl" />
            <Card className="relative overflow-hidden border-2">
              <div className="bg-card p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Your Impact Dashboard
                  </h3>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    +45%
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Recycling Rate
                      </span>
                      <span className="font-medium text-card-foreground">
                        78%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[78%] bg-green-800 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Points Earned
                      </span>
                      <span className="font-medium text-card-foreground">
                        1,240 pts
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[62%] bg-green-600 dark:bg-green-600 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground">
                      12
                    </div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground">
                      #8
                    </div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground">
                      45
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Days Active
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
