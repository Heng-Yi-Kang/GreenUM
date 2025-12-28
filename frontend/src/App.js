import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AuthPage from "./pages/AuthPage";
import ManagerEventsPage from "./pages/ManagerEventsPage";
import ConfigErrorPage from "./configs/ConfigErrorPage";
import { isConfigured } from "./lib/supabaseClient";
import { SiteHeader } from "./components/shared/Header";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
function App() {
    if (!isConfigured) {
        return _jsx(ConfigErrorPage, {});
    }
    return (_jsxs(ThemeProvider, { defaultTheme: "light", storageKey: "greenum-theme", children: [_jsx(AuthProvider, { children: _jsxs(Router, { children: [_jsx(SiteHeader, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/events/*", element: _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "manager/events", element: _jsx(ManagerEventsPage, {}) })] }) }) })] })] }) }), _jsx(Toaster, { position: "top-center", richColors: true })] }));
}
export default App;
