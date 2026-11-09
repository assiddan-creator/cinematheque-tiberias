import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Site } from "./App";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Site />
    </StaticRouter>,
  );
}

export { routeMeta } from "./meta";
export { venue } from "./content";
