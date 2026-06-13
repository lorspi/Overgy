export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  content: string;
}

export interface WikiCategory {
  slug: string;
  title: string;
  icon: string;
  order: number;
  excerpt: string;
  image: string;
  content: string;
}

export async function fetchNews(): Promise<NewsItem[]> {
  const res = await fetch("/data/noticias.json");
  if (!res.ok) return [];
  return res.json();
}

export async function fetchWikiCategories(): Promise<WikiCategory[]> {
  const res = await fetch("/data/ayuda.json");
  if (!res.ok) return [];
  return res.json();
}
