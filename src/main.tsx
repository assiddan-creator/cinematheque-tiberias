import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are pre-rendered at build time. Parts that depend on today's date sit inside
// <Fresh> boundaries: if the build date differs, React re-renders only those parts.
if (container.firstElementChild) {
  hydrateRoot(container, app, { onRecoverableError: () => {} });
} else {
  createRoot(container).render(app);
}
