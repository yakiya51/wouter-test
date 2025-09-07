import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { AuthProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>
);
