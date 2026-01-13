import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-green-700 text-primary-foreground">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed mb-8">
            Join hundreds of UM students and faculty members who are already
            making an impact. Start your sustainability journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your UM email"
              className="bg-primary-foreground text-foreground border-none h-12"
            />
            <Button size="lg" variant="secondary" className="h-12">
              Join Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/80">
            Open to all University of Malaya students, faculty, and staff
          </p>
        </div>
      </div>
    </section>
  );
}
