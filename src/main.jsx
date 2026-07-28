import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// The camera position is derived from scroll offset, so a browser restoring a
// mid-page scroll before layout settles would start the flight mid-corridor.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
