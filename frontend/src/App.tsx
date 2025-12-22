import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layouts/layout';
import EventsPage from './pages/EventsPage';
import AuthPage from './pages/AuthPage';
import ConfigErrorPage from './components/ConfigErrorPage';
import { isConfigured } from './lib/supabaseClient';

import { AuthProvider } from './context/AuthContext';

function App() {
  if (!isConfigured) {
    return <ConfigErrorPage />;
  }

  return (
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
  );
}

export default App;
