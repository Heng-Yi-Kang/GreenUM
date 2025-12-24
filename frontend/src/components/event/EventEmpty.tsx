import { useAuth } from "@/context/AuthContext";
import { TreePine } from "lucide-react";

export function EventsEmpty() {
  const { isAdmin } = useAuth();
  return (
    <div className="flex items-center justify-center py-6 w-full">
      <div
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-16 w-full max-w-full h-[50vh]
"
      >
        {/* Heart Icon */}
        <TreePine className="w-20 h-20 mb-2" />

        {/* Empty State Message */}
        <div className="mb-2 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            {isAdmin ? "No event created" : "No events yet"}
          </h2>
        </div>

        <p className="text-muted-foreground text-sm mb-6">
          {isAdmin
            ? "You have not created any event. Add one."
            : "Events will appear here once they are created."}
        </p>
      </div>
    </div>
  );
}
