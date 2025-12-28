import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {} from "react";
import { BreadcrumbWithCustomSeparator } from "./Navbar";
const Layout = ({ children }) => {
    return (_jsxs("div", { className: "bg-white dark:bg-gray-950", children: [_jsx("div", { className: "bg-background", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: _jsx(BreadcrumbWithCustomSeparator, {}) }) }), _jsx("main", { className: "min-h-screen", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: children }) })] }));
};
export default Layout;
