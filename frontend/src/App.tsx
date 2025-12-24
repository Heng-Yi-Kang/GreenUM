import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./layout/layout";
import EventsPage from "./pages/EventsPage";
import AuthPage from "./pages/AuthPage";
import GoingPage from "./pages/GoingPage";
import ConfigErrorPage from "./configs/ConfigErrorPage";
import { isConfigured } from "./lib/supabaseClient";

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
          <Layout>
            <Routes>
              <Route path="/" element={<EventsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/going" element={<GoingPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
