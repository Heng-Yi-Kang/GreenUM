import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
export default function EventCard({ 
// id,
title, description, date, time, location, image_url, onClick, }) {
    // const { isAdmin } = useAuth();
    return (_jsxs(Card, { className: "group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer py-0", onClick: onClick, children: [_jsxs("div", { className: "relative h-48 overflow-hidden", children: [_jsx("img", { src: image_url || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80", alt: title, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to from-black/60 to-transparent" }), _jsx("div", { className: "absolute bottom-4 left-4 right-4", children: _jsx("h3", { className: "text-lg font-bold text-white text-balance", children: title }) })] }), _jsxs(CardContent, { className: "p-5 pt-0", children: [_jsx("p", { className: "mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground", children: description }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsx("span", { children: new Date(date).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }) })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: formatTime12Hour(time) })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { className: "line-clamp-1", children: location })] })] })] })] }));
}
