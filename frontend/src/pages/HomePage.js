import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CTASection } from "@/components/home/CtaSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
const HomePage = () => {
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(HeroSection, {}), _jsx(FeaturesGrid, {}), _jsx(StatsSection, {}), _jsx(CTASection, {}), _jsx(Footer, {})] }));
};
export default HomePage;
