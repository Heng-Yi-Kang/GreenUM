import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { SlashIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
export function BreadcrumbWithCustomSeparator() {
    const location = useLocation();
    const { isAdmin } = useAuth();
    return (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { asChild: true, children: _jsx(Link, { to: "/events", className: location.pathname === "/events"
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground", children: "Events" }) }) }), _jsx(BreadcrumbSeparator, { children: _jsx(SlashIcon, {}) }), isAdmin ? (_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { asChild: true, children: _jsx(Link, { to: "/events/manager/events", className: location.pathname === "/events/manager/events"
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground", children: "My Events" }) }) })) : (_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { asChild: true, children: _jsx(Link, { to: "/events/going", className: location.pathname === "/events/going"
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground", children: "Going" }) }) }))] }) }));
}
