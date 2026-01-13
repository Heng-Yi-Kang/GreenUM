import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-800 px-4 py-2 text-sm font-medium text-accent-foreground w-fit">
              <Leaf className="h-4 w-4" />
              <span>University of Malaya Sustainability Platform</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
              Build a <span className="text-green-700">sustainable</span> future
              together
            </h1>

            <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              GreenUM connects University of Malaya students, faculty, and staff
              through eco-friendly activities and events. Join our community to
              make a real impact on campus sustainability.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="text-base bg-green-700 hover:bg-green-800 text-white"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">
                  Active Members
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">150+</div>
                <div className="text-sm text-muted-foreground">
                  Events Hosted
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">2.5T</div>
                <div className="text-sm text-muted-foreground">CO₂ Reduced</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-accent/50 p-8">
              <img
                src="/hero.jpg"
                alt="Students engaged in sustainability activities"
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-green-500/20 blur-3xl" />
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
