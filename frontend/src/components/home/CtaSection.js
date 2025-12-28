import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";
export function CTASection() {
    return (_jsx("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: _jsx(Card, { className: "overflow-hidden border-2", children: _jsx("div", { className: "bg-linear-to-br from-green-50 via-card to-green-100 dark:from-green-950/30 dark:via-card dark:to-green-900/20 p-12", children: _jsxs("div", { className: "text-center space-y-6 max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-4xl font-bold text-card-foreground text-balance", children: "Ready to join the green revolution?" }), _jsx("p", { className: "text-lg text-muted-foreground text-pretty", children: "Start tracking your impact, earning rewards, and making University Malata more sustainable today." }), _jsxs("div", { className: "flex flex-wrap gap-4 justify-center pt-4", children: [_jsxs(Button, { size: "lg", className: "gap-2 bg-green-800 text-white", children: ["Create Free Account", _jsx(Leaf, { className: "h-4 w-4" })] }), _jsx(Button, { size: "lg", variant: "outline", children: "Watch Demo" })] })] }) }) }) }));
}
