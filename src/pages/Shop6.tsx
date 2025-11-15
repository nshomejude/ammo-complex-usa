import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { products as rawProducts, Product } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, Eye, LayoutGrid, Rows } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ComparisonModal } from "@/components/ComparisonModal";
import { ComparisonBar } from "@/components/ComparisonBar";

const products = rawProducts.map(addProductVariations);

export default function Shop6() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "double">(() => {
    const saved = localStorage.getItem("shop6ViewMode");
    return (saved === "single" || saved === "double") ? saved : "double";
  });

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);

  const toggleViewMode = () => {
    const newMode = viewMode === "double" ? "single" : "double";
    setViewMode(newMode);
    localStorage.setItem("shop6ViewMode", newMode);
  };

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popularity");
  const [filters, setFilters] = useState({
    priceRange: [
      Number(searchParams.get("minPrice")) || 0,
      Number(searchParams.get("maxPrice")) || maxPrice
    ] as [number, number],
    selectedBrands: searchParams.get("brands")?.split(",").filter(Boolean) || [],
    stockStatus: (searchParams.get("stock") as "all" | "inStock" | "outOfStock") || "all",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (sortBy !== "popularity") params.set("sort", sortBy);
    if (filters.priceRange[0] > 0) params.set("minPrice", filters.priceRange[0].toString());
    if (filters.priceRange[1] < maxPrice) params.set("maxPrice", filters.priceRange[1].toString());
    if (filters.selectedBrands.length > 0) params.set("brands", filters.selectedBrands.join(","));
    if (filters.stockStatus !== "all") params.set("stock", filters.stockStatus);
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, sortBy, filters, maxPrice, setSearchParams]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const availableBrands = useMemo(() => {
    const brands = new Set(products.map(p => p.manufacturer).filter(Boolean));
    return Array.from(brands) as string[];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.caliber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesBrand = filters.selectedBrands.length === 0 || 
                         (product.manufacturer && filters.selectedBrands.includes(product.manufacturer));
      const matchesStock = filters.stockStatus === "all" || 
                         (filters.stockStatus === "inStock" && product.inStock) ||
                         (filters.stockStatus === "outOfStock" && !product.inStock);

      return matchesSearch && matchesPrice && matchesBrand && matchesStock;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, sortBy, filters]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          {/* Main Content */}
          <main className="flex-1 w-full xl:max-w-[calc(100%-280px)] overflow-x-hidden p-6">
            <div className="max-w-6xl mx-auto">
              {/* Military Header */}
              <div className="mb-10 border-l-4 border-destructive pl-6 py-4">
                <div className="flex items-center gap-4 mb-2">
                  <Shield className="h-10 w-10 text-destructive" />
                  <h1 className="text-5xl font-black text-foreground tracking-wider uppercase" 
                      style={{ fontFamily: 'Impact, sans-serif' }}>
                    Military Armory
                  </h1>
                </div>
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
                  Rugged Equipment • Deep Shadows • Bold Pricing
                </p>
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search military-grade ammunition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-destructive/30 focus:border-destructive"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleViewMode}
                    className="md:hidden h-10 w-10"
                    aria-label="Toggle view mode"
                  >
                    {viewMode === "double" ? <Rows className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[200px] border-2 border-destructive/30">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid - 4 columns with shadow effects */}
              <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                viewMode === "single" ? "grid-cols-1" : "grid-cols-2"
              }`}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative group hover:shadow-xl md:hover:shadow-2xl hover:shadow-destructive/20 transition-shadow duration-300">
                    <ProductCard {...product} />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 md:group-hover:opacity-100 md:transition-opacity shadow-lg border-2 border-destructive/30 text-xs md:text-sm h-8 md:h-9 px-2 md:px-3"
                      onClick={() => handleQuickView(product)}
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="hidden md:inline">Quick View</span>
                    </Button>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 md:py-16 border-2 border-destructive/30 rounded-lg col-span-2 md:col-span-3 lg:col-span-4">
                  <Shield className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 text-destructive" />
                  <p className="text-muted-foreground text-base md:text-lg font-bold uppercase">Mission Failed - No Products Found</p>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <div className="hidden xl:block">
            <ShopSidebar 
              type="products" 
              filters={filters}
              onFiltersChange={setFilters}
              availableBrands={availableBrands}
              maxPrice={maxPrice}
            />
          </div>
        </div>

        <Footer />
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={products}
      />

      <ComparisonBar onCompare={() => setIsComparisonOpen(true)} />
    </SidebarProvider>
  );
}