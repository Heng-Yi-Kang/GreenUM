import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function EventCardSkeleton() {
    return (_jsxs(Card, { className: "overflow-hidden py-0", children: [_jsx(Skeleton, { className: "h-48 w-full rounded-b-none" }), _jsxs(CardContent, { className: "p-5 pt-0", children: [_jsxs("div", { className: "mb-4 space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-3/4" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-4 w-4" }), _jsx(Skeleton, { className: "h-3 w-32" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-4 w-4" }), _jsx(Skeleton, { className: "h-3 w-24" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-4 w-4" }), _jsx(Skeleton, { className: "h-3 w-40" })] })] })] })] }));
}
