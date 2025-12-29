import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-2">
        <div className="bg-linear-to-br from-green-50 via-card to-green-100 dark:from-green-950/30 dark:via-card dark:to-green-900/20 p-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-card-foreground text-balance">
              Ready to join the green revolution?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Start tracking your impact, earning rewards, and making University
              Malata more sustainable today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2 bg-green-800 text-white">
                Create Free Account
                <Leaf className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
