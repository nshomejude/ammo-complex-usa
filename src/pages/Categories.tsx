import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TopSellingCard } from "@/components/TopSellingCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { topAmmunition } from "@/data/topAmmunition";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Categories = () => {
  // Add variations to all products
  const products = rawProducts.map(addProductVariations);
  
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate actual product counts for each category
  const categoriesWithCounts = useMemo(() => {
    return topAmmunition.map((ammo) => {
      const productCount = products.filter(
        (product) => product.categorySlug === ammo.slug
      ).length;
      return { ...ammo, productCount };
    });
  }, []);

  const filteredAmmunition = categoriesWithCounts.filter(
    (ammo) =>
      ammo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.caliber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingAmmunition = filteredAmmunition.filter((ammo) => ammo.trending);
  const otherAmmunition = filteredAmmunition.filter((ammo) => !ammo.trending);

  const totalProducts = categoriesWithCounts.reduce(
    (sum, cat) => sum + cat.productCount,
    0
  );
  const totalCategories = categoriesWithCounts.length;

  // SEO: Update document title and meta tags
  useEffect(() => {
    // Set page title
    document.title = "Ammunition Catalog - 20 Categories | Arms Complex";

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      `Browse ${totalProducts} ammunition products across ${totalCategories} categories. Including 9mm Luger, .223 Remington, 12 Gauge, .308 Winchester, and more. Licensed dealer with FFL verification.`
    );

    // Update or create keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      "content",
      "ammunition, 9mm luger, 223 remington, 308 winchester, 12 gauge, 45 acp, ammo catalog, rifle ammunition, pistol ammunition, shotgun shells, ammunition dealer, licensed ammunition, FFL dealer"
    );

    // Open Graph tags
    const updateOrCreateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOrCreateOGTag("og:title", "Ammunition Catalog - 20 Categories | Arms Complex");
    updateOrCreateOGTag(
      "og:description",
      `Browse ${totalProducts} ammunition products across ${totalCategories} categories. Licensed FFL dealer offering premium ammunition for civilians.`
    );
    updateOrCreateOGTag("og:type", "website");
    updateOrCreateOGTag("og:url", window.location.href);

    // Twitter Card tags
    const updateOrCreateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOrCreateTwitterTag("twitter:title", "Ammunition Catalog - 20 Categories | Arms Complex");
    updateOrCreateTwitterTag(
      "twitter:description",
      `Browse ${totalProducts} ammunition products across ${totalCategories} categories. Licensed FFL dealer.`
    );

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Ammunition Catalog",
      "description": `Browse ${totalProducts} ammunition products across ${totalCategories} categories`,
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "Arms Complex",
        "description": "Licensed Ammunition Dealer"
      },
      "numberOfItems": totalProducts,
      "hasPart": categoriesWithCounts.map((cat) => ({
        "@type": "ItemList",
        "name": cat.name,
        "description": cat.description,
        "numberOfItems": cat.productCount,
        "itemListElement": {
          "@type": "ListItem",
          "name": cat.name
        }
      }))
    };

    let structuredDataScript = document.querySelector('script[type="application/ld+json"][data-page="categories"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.setAttribute("type", "application/ld+json");
      structuredDataScript.setAttribute("data-page", "categories");
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Cleanup function to reset title on unmount
    return () => {
      document.title = "Arms Complex - Licensed Ammunition Dealer";
    };
  }, [totalProducts, totalCategories, categoriesWithCounts]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <ShopSidebar type="categories" />
        
        <div className="flex-1 flex flex-col">
          <Navigation />
          
          <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
            <div className="mb-3 sm:mb-4">
              <SidebarTrigger className="mb-3 sm:mb-4" />
            </div>
            
            {/* Header Section with SEO-optimized content */}
            <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Package className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ammunition Catalog</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-2">
            Browse our complete collection of ammunition across {totalCategories} categories including 
            9mm Luger, .223 Remington, 12 Gauge, .308 Winchester, .45 ACP, and specialty cartridges
          </p>
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {totalProducts} Products Available
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">
              {trendingAmmunition.length} Trending Categories
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">
              FFL Verified Dealer
            </Badge>
          </div>
          
          <Input
            type="search"
            placeholder="Search by caliber, name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full sm:max-w-md h-10 sm:h-11"
            aria-label="Search ammunition categories"
          />
        </header>

        {/* Trending Section */}
        {trendingAmmunition.length > 0 && (
          <section className="mb-8 sm:mb-12" aria-labelledby="trending-heading">
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
              <h2 id="trending-heading" className="text-xl sm:text-2xl font-bold text-tactical">
                🔥 Trending Ammunition Categories
              </h2>
              <Badge variant="destructive" className="animate-pulse text-xs sm:text-sm">Hot</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {trendingAmmunition.map((ammo) => (
                <article key={ammo.id} className="relative">
                  <TopSellingCard
                    name={ammo.name}
                    icon={ammo.icon}
                    salesCount={ammo.salesCount}
                    slug={ammo.slug}
                    trending={ammo.trending}
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-background/95 backdrop-blur"
                    aria-label={`${ammo.productCount} products in ${ammo.name} category`}
                  >
                    {ammo.productCount} Products
                  </Badge>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Categories Section */}
        {otherAmmunition.length > 0 && (
          <section aria-labelledby="all-categories-heading">
            <h2 id="all-categories-heading" className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              All Ammunition Categories
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {otherAmmunition.map((ammo) => (
                <article key={ammo.id} className="relative">
                  <TopSellingCard
                    name={ammo.name}
                    icon={ammo.icon}
                    salesCount={ammo.salesCount}
                    slug={ammo.slug}
                    trending={ammo.trending}
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-background/95 backdrop-blur"
                    aria-label={`${ammo.productCount} products in ${ammo.name} category`}
                  >
                    {ammo.productCount} Products
                  </Badge>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredAmmunition.length === 0 && (
          <div className="text-center py-8 sm:py-12" role="status">
            <Package className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              No ammunition categories found matching your search.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        )}
      </main>

      <Footer />
      </div>
      </div>
    </SidebarProvider>
  );
};

export default Categories;
