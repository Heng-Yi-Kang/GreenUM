import { Leaf } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-800 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-100 mb-6">
            <Leaf className="h-4 w-4" />
            <span>About GreenUM</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-balance md:text-6xl mb-6">
            Building a{" "}
            <span className="text-green-700">sustainable campus</span> together
          </h1>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            GreenUM is a student-led initiative created as part of the Project
            Management course at University of Malaya. Our mission is to connect
            the UM community through meaningful eco-friendly activities and
            drive real environmental impact on campus.
          </p>
        </div>
      </div>
    </section>
  );
}
