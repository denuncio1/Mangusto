import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./globals.css";
import { AuthProvider } from "./hooks/useAuth.tsx";

createRoot(document.getElementById("root")!).render(
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
