import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AuthPage from "./pages/AuthPage";
import ManagerEventsPage from "./pages/ManagerEventsPage";
import LeaderboardPage from "./pages/Leaderboard";
import ConfigErrorPage from "./configs/ConfigErrorPage";
import { isConfigured } from "./lib/supabaseClient";
import { SiteHeader } from "./components/shared/Header";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";

function App() {
  if (!isConfigured) {
    return <ConfigErrorPage />;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="greenum-theme">
      <AuthProvider>
        <Router>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/events/*" element={
              <Layout>
                <Routes>
                  <Route index element={<EventsPage />} />
                  <Route path="manager/events" element={<ManagerEventsPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
