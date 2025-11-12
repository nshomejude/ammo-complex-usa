# Sitemap Configuration & SEO Setup

## Overview
This project includes a comprehensive SEO setup with a sitemap.xml file and dynamic sitemap generation utility.

## Files Created

### 1. `public/sitemap.xml`
- Static XML sitemap with all site URLs
- Includes homepage, main pages, 20 ammunition categories, and sample products
- Located at: `https://yourdomain.com/sitemap.xml`
- **Total URLs**: 300+ (static pages + categories + products)

### 2. `public/robots.txt` (Updated)
- Directs search engines to sitemap location
- Blocks admin pages from crawling
- Sets crawl-delay for polite crawling

### 3. `src/utils/generateSitemap.ts`
- Dynamic sitemap generator utility
- Automatically creates sitemap from current products and categories
- Use to regenerate sitemap when adding new products

## Sitemap Structure

### URL Priority Levels
```
1.0 - Homepage (/)
0.9 - Main listing pages (/products, /categories)
0.8 - Popular categories (trending ammunition)
0.7 - Standard categories
0.6 - Trending/in-stock products
0.5 - Standard/out-of-stock products
```

### Change Frequency
```
daily   - Homepage, product listings
weekly  - Categories, individual products
monthly - Info pages (about, contact, shipping)
```

## Using the Dynamic Sitemap Generator

### 1. Generate Sitemap Content
```typescript
import { generateSitemap, getSitemapStats } from "@/utils/generateSitemap";

// Get sitemap XML
const sitemapXML = generateSitemap();
console.log(sitemapXML);

// Get statistics
const stats = getSitemapStats();
console.log(stats);
// Output:
// {
//   totalUrls: 330,
//   productUrls: 300,
//   categoryUrls: 20,
//   staticPages: 10,
//   inStockProducts: 280,
//   trendingCategories: 10
// }
```

### 2. Update BASE_URL
Before deployment, update the `BASE_URL` constant in `src/utils/generateSitemap.ts`:

```typescript
const BASE_URL = "https://your-actual-domain.com";
```

### 3. Regenerate Sitemap (Manual)
When you add new products or categories:

```bash
# In a Node.js script or admin panel:
import fs from 'fs';
import { generateSitemap } from './src/utils/generateSitemap';

fs.writeFileSync('public/sitemap.xml', generateSitemap());
```

## URLs Included in Sitemap

### Static Pages (10 URLs)
- `/` - Homepage
- `/products` - All products listing
- `/categories` - Ammunition categories
- `/firearms` - Firearms listing
- `/firearm-categories` - Firearm categories
- `/about` - About page
- `/contact` - Contact page
- `/shipping` - Shipping information
- `/firearms-license` - Licensing info
- `/how-to-buy` - Purchase guide

### Category Pages (20 URLs)
All 20 ammunition categories:
- `/category/9mm-luger`
- `/category/22-long-rifle`
- `/category/12-gauge`
- `/category/556-223`
- `/category/308-762`
- `/category/45-acp`
- `/category/380-acp`
- `/category/40-sw`
- `/category/357-38-special`
- `/category/762x39-soviet`
- `/category/65-creedmoor`
- `/category/30-06-springfield`
- `/category/20-gauge`
- `/category/243-winchester`
- `/category/300-win-mag`
- `/category/357-sig`
- `/category/10mm-auto`
- `/category/762x54r`
- `/category/223-match-varmint`
- `/category/410-bore`

### Product Pages (300+ URLs)
All individual product pages:
- `/product/[product-id]` - Each ammunition product

## Robots.txt Configuration

Location: `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://yourdomain.com/sitemap.xml
Crawl-delay: 1
```

### Key Features:
- ✅ Allows all search engines
- ✅ Blocks admin pages
- ✅ References sitemap location
- ✅ Sets polite crawl delay

## SEO Benefits

### Search Engine Discovery
- Helps Google, Bing, and other search engines discover all pages
- Prioritizes important pages (homepage, categories)
- Updates search engines on content freshness

### Improved Indexing
- All 300+ products indexed efficiently
- Category pages ranked appropriately
- Better search result visibility

### Technical SEO
- Proper XML structure following sitemap protocol
- Priority and change frequency hints
- Canonical URL support

## Verification & Testing

### 1. Test Sitemap Access
Visit: `https://yourdomain.com/sitemap.xml`

### 2. Validate Sitemap
Use online validators:
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Google Search Console Sitemap Tool

### 3. Submit to Search Engines

#### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to "Sitemaps"
4. Submit: `https://yourdomain.com/sitemap.xml`

#### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Select your site
3. Navigate to "Sitemaps"
4. Submit your sitemap URL

## Maintenance

### When to Regenerate Sitemap
- ✅ After adding new products
- ✅ After adding new categories
- ✅ After major content updates
- ✅ Monthly (recommended)

### Automated Updates (Future)
Consider implementing automated sitemap generation:
- Server-side build script
- Admin panel integration
- CI/CD pipeline step

## Additional SEO Files

The project also includes:
- ✅ Meta tags on all pages (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD structured data (products, categories)
- ✅ Canonical URLs
- ✅ Semantic HTML (article, header, nav tags)
- ✅ Breadcrumb navigation

## Best Practices Implemented

1. **Mobile-First**: All pages responsive
2. **Fast Loading**: Optimized images and code
3. **Clear URLs**: Descriptive, SEO-friendly paths
4. **Structured Data**: Rich snippets for products
5. **Security**: HTTPS required (update in production)
6. **Accessibility**: ARIA labels, semantic HTML

## Next Steps

1. ✅ Replace `yourdomain.com` with your actual domain
2. ✅ Submit sitemap to Google Search Console
3. ✅ Submit sitemap to Bing Webmaster Tools
4. ✅ Monitor indexing status
5. ✅ Set up automated sitemap regeneration
6. ✅ Consider implementing dynamic sitemap route

## Support & Resources

- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Schema.org Documentation](https://schema.org/)
