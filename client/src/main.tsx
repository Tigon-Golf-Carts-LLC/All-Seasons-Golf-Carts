import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { captureFirstTouch } from "./lib/leads";
import "./index.css";

// Remember the first utm_* / gclid / fbclid seen, whichever page the visitor
// lands on, so a lead sent later from another page keeps its attribution.
captureFirstTouch();

const container = document.getElementById("root")!;

// Every route ships as pre-rendered HTML, so hydrate it in place. The
// createRoot branch only matters for the dev server, which serves an empty
// shell.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
