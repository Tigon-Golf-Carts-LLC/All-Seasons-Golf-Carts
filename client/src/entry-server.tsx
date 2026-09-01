import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import App from "./App";
import { BASE_PATH } from "./lib/site";
import { routes } from "./routes";

export { routes, BASE_PATH };

export interface RenderResult {
  /** Markup for the #root container. */
  body: string;
  /** <head> tags collected from react-helmet. */
  head: string;
}

/** Render one route to static HTML. `path` is router-relative (e.g. "/blog"). */
export function render(path: string): RenderResult {
  const ssrPath = `${BASE_PATH.replace(/\/+$/, "")}${path}`;
  const body = renderToString(<App ssrPath={ssrPath} />);

  // renderStatic() must run after renderToString and drains the collected tags.
  const helmet = Helmet.renderStatic();
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  return { body, head };
}
