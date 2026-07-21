import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public website */}
          <Route path="/" element={<LandingPage />} />

          {/* Hidden admin login page — no link from public site */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected CMS dashboard — requires valid JWT */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
