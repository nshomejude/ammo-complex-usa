import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.caliber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const inStockCount = products.filter(p => p.inStock).length;

  // SEO: Update document title and meta tags
  useEffect(() => {
    document.title = "All Ammunition Products - Browse 300+ Options | Arms Complex";

    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", `Shop ${products.length} ammunition products including 9mm, .223 Remington, 12 Gauge, .308 Winchester, and more. ${inStockCount} products in stock. Licensed FFL dealer with fast shipping.`);
    updateMeta("keywords", "ammunition products, buy ammo online, 9mm ammunition, rifle ammo, pistol ammunition, shotgun shells, in stock ammo, FFL dealer");

    // Open Graph
    const updateOG = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOG("og:title", "All Ammunition Products | Arms Complex");
    updateOG("og:description", `Shop ${products.length} ammunition products. ${inStockCount} in stock now.`);
    updateOG("og:type", "product.group");
    updateOG("og:url", window.location.href);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "All Ammunition Products",
      "description": `Browse ${products.length} ammunition products`,
      "url": window.location.href,
      "numberOfItems": products.length,
      "offers": {
        "@type": "AggregateOffer",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceCurrency": "USD",
        "lowPrice": Math.min(...products.map(p => p.price)),
        "highPrice": Math.max(...products.map(p => p.price)),
        "offerCount": products.length
      }
    };

    let script = document.querySelector('script[type="application/ld+json"][data-page="products"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-page", "products");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.title = "Arms Complex - Licensed Ammunition Dealer";
    };
  }, [inStockCount]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">All Ammunition Products</h1>
          </div>
          <p className="text-muted-foreground mb-4">
            Browse our complete selection of {products.length} ammunition products for rifles, pistols, 
            shotguns, and specialty applications
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">{inStockCount} In Stock</Badge>
            <Badge variant="outline">FFL Verified</Badge>
          </div>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or caliber..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="rifle">Rifle</SelectItem>
              <SelectItem value="pistol">Pistol</SelectItem>
              <SelectItem value="shotgun">Shotgun</SelectItem>
              <SelectItem value="rimfire">Rimfire</SelectItem>
              <SelectItem value="specialty">Specialty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section aria-label="Product listing">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12" role="status">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
