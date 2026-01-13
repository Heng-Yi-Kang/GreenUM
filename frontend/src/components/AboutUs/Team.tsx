import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const teamMembers = [
  {
    name: "MOAAZ KHAMIS",

    initial: "MH",
    color: "bg-green-600",
  },
  {
    name: "HENG YI KANG",

    initial: "YK",
    color: "bg-emerald-600",
  },
  {
    name: "JANICE LIEO YI TIAN",

    initial: "JL",
    color: "bg-teal-600",
  },

  {
    name: "SAIKET DAS",

    initial: "SD",
    color: "bg-emerald-600",
  },

  {
    name: "LYE KAI XING",

    initial: "LK",
    color: "bg-green-700",
  },
  {
    name: "MD MUNTASIR UL HAKIM",

    initial: "MH",
    color: "bg-green-600",
  },
  {
    name: "HUANG HOUYUAN",

    initial: "HH",
    color: "bg-emerald-700",
  },
  {
    name: "SAKHA FAIZ DARMADI",

    initial: "SF",
    color: "bg-teal-700",
  },
];

export function Team() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 mb-4">
            <Users className="h-4 w-4" />
            Our Team
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl mb-4">
            Meet the Builders
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Ten dedicated students from diverse backgrounds came together to
            build GreenUM and make sustainability a priority at University of
            Malaya.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="border-2 hover:border-green-500/50 transition-colors"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center mb-4`}
                >
                  <span className="text-2xl font-bold text-white">
                    {member.initial}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-2 bg-green-50/50 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Course Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                This project was developed as part of the{" "}
                <strong>Project Management</strong> course at{" "}
                <strong>University of Malaya</strong>. Throughout the semester,
                our team applied project management principles, agile
                methodologies, and collaborative development practices to bring
                GreenUM from concept to reality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
