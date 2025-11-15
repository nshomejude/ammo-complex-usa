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
import { Search, Award, GitCompare, Eye, LayoutGrid, Rows } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ComparisonModal } from "@/components/ComparisonModal";
import { ComparisonBar } from "@/components/ComparisonBar";

const products = rawProducts.map(addProductVariations);

export default function Shop10() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [compareMode, setCompareMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "double">(() => {
    const saved = localStorage.getItem("shop10ViewMode");
    return (saved === "single" || saved === "double") ? saved : "double";
  });

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);

  const toggleViewMode = () => {
    const newMode = viewMode === "double" ? "single" : "double";
    setViewMode(newMode);
    localStorage.setItem("shop10ViewMode", newMode);
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
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-background to-muted/20">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          {/* Left Sidebar */}
          <ShopSidebar 
            type="products" 
            filters={filters}
            onFiltersChange={setFilters}
            availableBrands={availableBrands}
            maxPrice={maxPrice}
            className="hidden lg:block"
          />

          {/* Main Content */}
          <main className="flex-1 w-full lg:max-w-[calc(100%-280px)] overflow-x-hidden p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {/* Premium Header */}
              <div className="mb-10 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Award className="h-12 w-12 text-accent" />
                    <div>
                      <h1 className="text-5xl font-bold text-foreground mb-1">Premium Collection</h1>
                      <p className="text-muted-foreground text-lg">Curated selection of elite ammunition</p>
                    </div>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-sm">
                    PREMIUM QUALITY
                  </Badge>
                </div>
              </div>

              {/* Search, Sort, and Compare */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search premium products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-accent/30 focus:border-accent"
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
                    <SelectTrigger className="w-full md:w-[200px] border-accent/30">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant={compareMode ? "default" : "outline"}
                    onClick={() => setCompareMode(!compareMode)}
                    className="border-accent/30 hidden md:flex"
                  >
                    <GitCompare className="mr-2 h-4 w-4" />
                    {compareMode ? "Exit Compare" : "Compare"}
                  </Button>
                </div>
              </div>

              {compareMode && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Compare Mode Active:</strong> Select products to compare specifications side-by-side
                  </p>
                </div>
              )}

              {/* Products Grid - Responsive premium spacing */}
              <div className={`grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                viewMode === "single" ? "grid-cols-1" : "grid-cols-2"
              }`}>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`group relative ${compareMode ? 'ring-2 ring-accent/50 rounded-lg' : ''}`}
                  >
                    <ProductCard {...product} />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 md:group-hover:opacity-100 md:transition-opacity shadow-lg border-accent/30 text-xs md:text-sm h-8 md:h-9 px-2 md:px-3"
                      onClick={() => handleQuickView(product)}
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="hidden md:inline">Quick View</span>
                    </Button>
                    {product.inStock && (
                      <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-accent text-accent-foreground text-xs md:text-sm">
                        In Stock
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 md:py-16 border-2 border-accent/30 rounded-lg bg-accent/5 col-span-2 md:col-span-3 lg:col-span-4">
                  <Award className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 text-accent" />
                  <p className="text-muted-foreground text-base md:text-lg">No premium products match your criteria.</p>
                </div>
              )}
            </div>
          </main>
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