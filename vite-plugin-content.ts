/**
 * Vite plugin that generates /data/noticias.json and /data/ayuda.json
 * dynamically from the markdown files in public/noticias and public/ayuda.
 * No need for a pre-build step or static JSON files.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import type { Plugin } from "vite";

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  content: string;
}

interface WikiCategory {
  slug: string;
  title: string;
  icon: string;
  order: number;
  excerpt: string;
  image: string;
  content: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: normalized };

  const metaBlock = match[1];
  const body = match[2].trim();
  const meta: Record<string, string> = {};

  for (const line of metaBlock.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  return { meta, body };
}

async function findCover(dir: string): Promise<string | null> {
  const files = await readdir(dir);
  return files.find((f) => f.startsWith("portada")) || null;
}

async function generateNews(publicDir: string): Promise<NewsItem[]> {
  const noticiasDir = join(publicDir, "noticias");
  let dirs: string[];
  try {
    dirs = await readdir(noticiasDir);
  } catch {
    return [];
  }

  const items: NewsItem[] = [];

  for (const slug of dirs) {
    const dirPath = join(noticiasDir, slug);
    const mdPath = join(dirPath, "contenido.md");

    let raw: string;
    try {
      raw = await readFile(mdPath, "utf-8");
    } catch {
      continue;
    }

    const { meta, body } = parseFrontmatter(raw);
    const cover = await findCover(dirPath);
    const coverExt = cover ? extname(cover) : ".png";

    items.push({
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      tag: meta.tag || "",
      excerpt: meta.excerpt || "",
      image: `/noticias/${slug}/portada${coverExt}`,
      content: body,
    });
  }

  items.sort((a, b) => (b.date > a.date ? 1 : -1));
  return items;
}

async function generateWiki(publicDir: string): Promise<WikiCategory[]> {
  const wikiDir = join(publicDir, "ayuda");
  let dirs: string[];
  try {
    dirs = await readdir(wikiDir);
  } catch {
    return [];
  }

  const items: WikiCategory[] = [];

  for (const slug of dirs) {
    const dirPath = join(wikiDir, slug);
    const mdPath = join(dirPath, "contenido.md");

    let raw: string;
    try {
      raw = await readFile(mdPath, "utf-8");
    } catch {
      continue;
    }

    const { meta, body } = parseFrontmatter(raw);
    const cover = await findCover(dirPath);
    const coverExt = cover ? extname(cover) : ".png";

    items.push({
      slug,
      title: meta.title || slug,
      icon: meta.icon || "FileText",
      order: parseInt(meta.order || "99", 10),
      excerpt: meta.excerpt || "",
      image: `/ayuda/${slug}/portada${coverExt}`,
      content: body,
    });
  }

  items.sort((a, b) => a.order - b.order);
  return items;
}

export function contentPlugin(): Plugin {
  let publicDir: string;

  return {
    name: "vite-plugin-content",

    configResolved(config) {
      publicDir = config.publicDir;
    },

    configureServer(server) {
      // Serve /data/noticias.json and /data/ayuda.json dynamically in dev
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/data/noticias.json") {
          const data = await generateNews(publicDir);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
          return;
        }
        if (req.url === "/data/ayuda.json") {
          const data = await generateWiki(publicDir);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
          return;
        }
        next();
      });

      // Watch markdown files and trigger reload on change or creation
      const watcher = server.watcher;
      watcher.add(join(publicDir, "noticias"));
      watcher.add(join(publicDir, "ayuda"));
      watcher.on("all", (event, path) => {
        if (path.endsWith(".md") && (event === "change" || event === "add" || event === "unlink")) {
          server.ws.send({ type: "full-reload" });
        }
      });
    },

    async generateBundle() {
      // At build time, emit the JSON files as assets
      const news = await generateNews(publicDir);
      this.emitFile({
        type: "asset",
        fileName: "data/noticias.json",
        source: JSON.stringify(news),
      });

      const wiki = await generateWiki(publicDir);
      this.emitFile({
        type: "asset",
        fileName: "data/ayuda.json",
        source: JSON.stringify(wiki),
      });
    },
  };
}
