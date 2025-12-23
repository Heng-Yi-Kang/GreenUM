import { TreePine } from "lucide-react";

export function EventsEmpty() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-16 w-full max-w-2xl">
        {/* Heart Icon */}
        <TreePine className="w-20 h-20 rotate-12" />

        {/* Empty State Message */}
        <div className="mb-2 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No event created
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            You have not created any event. Add one below.
          </p>
        </div>

        {/* Create Event Button */}
        {/* <Button size="default" className="bg-pink-500 hover:bg-pink-600">
          Create Event
        </Button> */}
      </div>
    </div>
  );
}
