import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * `vite preview` for the pre-rendered build: /screenings serves dist/screenings/index.html,
 * and unknown paths get dist/404.html with a real 404 status (same as static hosts).
 */
function prerenderedPreview(): Plugin {
  return {
    name: "prerendered-preview",
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "/").split("?")[0];
        if (path.extname(url)) return next();
        const clean = decodeURIComponent(url).replace(/\/+$/, "");
        const page = path.join(dist, clean, "index.html");
        if (fs.existsSync(page)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(fs.readFileSync(page));
          return;
        }
        const notFound = path.join(dist, "404.html");
        if (!fs.existsSync(notFound)) return next();
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(notFound));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedPreview()],
  server: {
    port: 5173,
    open: true,
  },
});
