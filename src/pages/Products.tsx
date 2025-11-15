import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, LayoutGrid, Rows } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const Products = () => {
  // Add variations to all products
  const products = rawProducts.map(addProductVariations);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"single" | "double">(() => {
    const saved = localStorage.getItem("productViewMode");
    return (saved === "single" || saved === "double") ? saved : "double";
  });

  // Advanced filters
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    selectedBrands: [] as string[],
    stockStatus: "all" as "all" | "inStock" | "outOfStock"
  });

  const toggleViewMode = () => {
    const newMode = viewMode === "double" ? "single" : "double";
    setViewMode(newMode);
    localStorage.setItem("productViewMode", newMode);
  };

  // Get unique brands from products
  const availableBrands = Array.from(new Set(products.map(p => p.name.split(" ")[0]))).sort();
  const maxPrice = Math.max(...products.map(p => p.price));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.caliber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    // Price filter
    const matchesPrice = product.price >= filters.priceRange[0] && 
                        product.price <= filters.priceRange[1];
    
    // Brand filter
    const productBrand = product.name.split(" ")[0];
    const matchesBrand = filters.selectedBrands.length === 0 || 
                        filters.selectedBrands.includes(productBrand);
    
    // Stock filter
    const matchesStock = filters.stockStatus === "all" ||
                        (filters.stockStatus === "inStock" && product.inStock) ||
                        (filters.stockStatus === "outOfStock" && !product.inStock);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesStock;
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
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-col w-full">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          <ShopSidebar 
            type="products" 
            filters={filters}
            onFiltersChange={setFilters}
            availableBrands={availableBrands}
            maxPrice={maxPrice}
            className="hidden lg:block"
          />
          
          <main className="flex-1 w-full lg:max-w-[calc(100%-280px)] overflow-x-hidden">
            <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
              <div className="mb-3 sm:mb-4 lg:hidden">
                <SidebarTrigger className="mb-3 sm:mb-4" />
              </div>
            
            <header className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Package className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">All Ammunition Products</h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Browse our complete selection of {products.length} ammunition products for rifles, pistols, 
                shotguns, and specialty applications
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs sm:text-sm">{inStockCount} In Stock</Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">FFL Verified</Badge>
                {(filters.selectedBrands.length > 0 || 
                  filters.priceRange[0] > 0 || 
                  filters.priceRange[1] < maxPrice ||
                  filters.stockStatus !== "all") && (
                  <Badge variant="destructive" className="cursor-pointer text-xs sm:text-sm">
                    {filters.selectedBrands.length + 
                     (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0) +
                     (filters.stockStatus !== "all" ? 1 : 0)} Active Filters
                  </Badge>
                )}
              </div>
            </header>

        <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or caliber..."
              className="pl-10 h-10 sm:h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleViewMode}
              className="sm:hidden h-10 w-10"
              aria-label="Toggle view mode"
            >
              {viewMode === "double" ? <Rows className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            </Button>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] h-10 sm:h-11">
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
        </div>

        <section aria-label="Product listing">
          <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
            viewMode === "single" ? "grid-cols-1" : "grid-cols-2"
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product}
                quantityVariations={[
                  { rounds: 20, price: product.price, inStock: true },
                  { rounds: 50, price: product.price * 2.3, inStock: true },
                  { rounds: 100, price: product.price * 4.2, inStock: product.inStock },
                ]}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12" role="status">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
          </section>
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Products;
