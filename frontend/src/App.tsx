import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layouts/layout";
import EventsPage from "./pages/EventsPage";
import AuthPage from "./pages/AuthPage";
import ConfigErrorPage from "./configs/ConfigErrorPage";
import { isConfigured } from "./lib/supabaseClient";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  if (!isConfigured) {
    return <ConfigErrorPage />;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="greenum-theme">
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/events" replace />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
