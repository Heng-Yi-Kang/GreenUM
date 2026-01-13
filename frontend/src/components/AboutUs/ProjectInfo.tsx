import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Lightbulb } from "lucide-react";

export function ProjectInfo() {
  return (
    <section className="py-20 md:py-32 bg-accent/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl mb-4">
            The Project
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Developed as part of our Project Management course, GreenUM
            demonstrates how technology can drive positive environmental change.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Course Project</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built as part of the Project Management course at University of
                Malaya, applying agile methodologies and collaborative
                development practices.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To create a digital platform that makes sustainability
                accessible, engaging, and measurable for the entire University
                of Malaya community.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 mb-4">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">The Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Empowering students and staff to take collective action towards
                a greener campus through technology and community building.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
