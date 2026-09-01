import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// Every route ships as pre-rendered HTML, so hydrate it in place. The
// createRoot branch only matters for the dev server, which serves an empty
// shell.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
