import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";
import { TreePine } from "lucide-react";
export function EventsEmpty() {
    const { isAdmin } = useAuth();
    return (_jsx("div", { className: "flex items-center justify-center py-6 w-full", children: _jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-16 w-full max-w-full h-[50vh]\n", children: [_jsx(TreePine, { className: "w-20 h-20 mb-2" }), _jsx("div", { className: "mb-2 text-center", children: _jsx("h2", { className: "text-xl font-semibold text-foreground", children: isAdmin ? "No event created" : "No events yet" }) }), _jsx("p", { className: "text-muted-foreground text-sm mb-6", children: isAdmin
                        ? "You have not created any event. Add one."
                        : "Events will appear here once they are created." })] }) }));
}
