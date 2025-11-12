import { products } from "@/data/products";
import { topAmmunition } from "@/data/topAmmunition";

/**
 * Generates a sitemap.xml content with all product and category URLs
 * Update the BASE_URL constant with your actual domain
 */

const BASE_URL = "https://yourdomain.com";
const LAST_MOD = new Date().toISOString().split("T")[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

/**
 * Generate sitemap content
 * @returns XML string for sitemap
 */
export const generateSitemap = (): string => {
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: "/", priority: 1.0, changefreq: "daily" as const },
    { path: "/products", priority: 0.9, changefreq: "daily" as const },
    { path: "/categories", priority: 0.9, changefreq: "weekly" as const },
    { path: "/firearms", priority: 0.8, changefreq: "daily" as const },
    { path: "/firearm-categories", priority: 0.8, changefreq: "weekly" as const },
    { path: "/about", priority: 0.5, changefreq: "monthly" as const },
    { path: "/contact", priority: 0.5, changefreq: "monthly" as const },
    { path: "/shipping", priority: 0.5, changefreq: "monthly" as const },
    { path: "/firearms-license", priority: 0.5, changefreq: "monthly" as const },
    { path: "/how-to-buy", priority: 0.5, changefreq: "monthly" as const },
  ];

  staticPages.forEach((page) => {
    urls.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: LAST_MOD,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  });

  // Category pages
  topAmmunition.forEach((category) => {
    const priority = category.trending ? 0.8 : 0.7;
    urls.push({
      loc: `${BASE_URL}/category/${category.slug}`,
      lastmod: LAST_MOD,
      changefreq: "weekly",
      priority,
    });
  });

  // Product pages
  products.forEach((product) => {
    // Higher priority for in-stock products
    const priority = product.inStock ? 0.6 : 0.5;
    urls.push({
      loc: `${BASE_URL}/product/${product.id}`,
      lastmod: LAST_MOD,
      changefreq: "weekly",
      priority,
    });
  });

  // Generate XML
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = "</urlset>";

  const urlEntries = urls
    .map(
      (url) =>
        `  <url>\n` +
        `    <loc>${url.loc}</loc>\n` +
        `    <lastmod>${url.lastmod}</lastmod>\n` +
        `    <changefreq>${url.changefreq}</changefreq>\n` +
        `    <priority>${url.priority.toFixed(1)}</priority>\n` +
        `  </url>`
    )
    .join("\n");

  return xmlHeader + urlsetOpen + urlEntries + "\n" + urlsetClose;
};

/**
 * Get sitemap statistics
 */
export const getSitemapStats = () => {
  return {
    totalUrls: products.length + topAmmunition.length + 10, // 10 static pages
    productUrls: products.length,
    categoryUrls: topAmmunition.length,
    staticPages: 10,
    inStockProducts: products.filter((p) => p.inStock).length,
    trendingCategories: topAmmunition.filter((c) => c.trending).length,
  };
};

/**
 * Example usage:
 * 
 * // To generate and log the sitemap:
 * console.log(generateSitemap());
 * 
 * // To get statistics:
 * console.log(getSitemapStats());
 * 
 * // To save to file (in a Node.js environment):
 * import fs from 'fs';
 * fs.writeFileSync('public/sitemap.xml', generateSitemap());
 */
