// Renders every route to static HTML after `vite build`, so crawlers and the first paint get
// real text. The client mounts with createRoot afterwards (schedule depends on the visitor's clock).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = path.join(root, "dist-ssr", "entry-server.js");
const { render, routeMeta, venue } = await import(pathToFileURL(ssr).href);

// SITE_URL wins; on Vercel the project's production address is provided to every build
// (the vercel.app address until a custom domain is added, then the domain).
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "";
const site = (process.env.SITE_URL || vercelUrl).replace(/\/$/, "");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovieTheater",
  name: venue.name,
  telephone: venue.phoneTel,
  email: venue.email,
  sameAs: [venue.facebook],
  seatingCapacity: 319,
  address: {
    "@type": "PostalAddress",
    streetAddress: venue.street,
    addressLocality: venue.city,
    addressCountry: "IL",
  },
  ...(site ? { url: site + "/" } : {}),
};

function page(key, url, out) {
  const meta = routeMeta[key];
  let html = template
    .replace("<!--app-html-->", render(url))
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`);
  let extra = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  if (site) {
    const abs = site + (meta.path === "/" ? "/" : meta.path);
    if (key !== "404") extra += `\n    <link rel="canonical" href="${abs}" />\n    <meta property="og:url" content="${abs}" />`;
    html = html.replace(/content="\/og\.png"/g, `content="${site}/og.png"`);
  }
  if (key === "404") extra += `\n    <meta name="robots" content="noindex" />`;
  html = html.replace("<!--head-extra-->", extra);
  const file = path.join(dist, out);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("prerendered", url, "->", out);
}

page("/", "/", "index.html");
page("/screenings", "/screenings", "screenings/index.html");
page("/events", "/events", "events/index.html");
page("/tech", "/tech", "tech/index.html");
page("404", "/404", "404.html");

const robots = ["User-agent: *", "Allow: /"];
if (site) {
  robots.push(`Sitemap: ${site}/sitemap.xml`);
  const urls = ["/", "/screenings", "/events", "/tech"]
    .map((p) => `  <url><loc>${site}${p}</loc></url>`)
    .join("\n");
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
} else {
  console.log("SITE_URL not set: skipping canonical, og:url and sitemap.xml");
}
fs.writeFileSync(path.join(dist, "robots.txt"), robots.join("\n") + "\n");
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
