import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
// import { useAuth } from "@/context/AuthContext";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

export default function EventCard({
  // id,
  title,
  description,
  date,
  time,
  location,
  image_url,
  onClick,
}: // onEdit,
// onDelete,
EventCardProps) {
  // const { isAdmin } = useAuth();

  return (
    <Card
      className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer py-0"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image_url || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white text-balance">{title}</h3>
        </div>
      </div>
      <CardContent className="p-5 pt-0">
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime12Hour(time)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
          <button className="flex-1 py-2 px-4 bg-white border border-green-500 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
            View Details
          </button>

          {isAdmin && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit && onEdit(id);
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                title="Edit Event"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(id);
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div> */}
      </CardContent>
    </Card>
  );
}
