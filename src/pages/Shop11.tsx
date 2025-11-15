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
import { Search, Star, TrendingUp, Filter, X, Eye, LayoutGrid, Rows } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ComparisonModal } from "@/components/ComparisonModal";
import { ComparisonBar } from "@/components/ComparisonBar";

const products = rawProducts.map(addProductVariations);

export default function Shop11() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "double">(() => {
    const saved = localStorage.getItem("shop11ViewMode");
    return (saved === "single" || saved === "double") ? saved : "double";
  });

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);

  const toggleViewMode = () => {
    const newMode = viewMode === "double" ? "single" : "double";
    setViewMode(newMode);
    localStorage.setItem("shop11ViewMode", newMode);
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

  const activeFilterCount = 
    (filters.stockStatus !== "all" ? 1 : 0) + 
    filters.selectedBrands.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-background via-card/50 to-background">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          {/* Left Sidebar - Collapsible Filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleContent>
              <ShopSidebar 
                type="products" 
                filters={filters}
                onFiltersChange={setFilters}
                availableBrands={availableBrands}
                maxPrice={maxPrice}
                className="hidden lg:block"
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Main Content */}
          <main className={`flex-1 w-full overflow-x-hidden p-6 lg:p-8 ${showFilters ? 'lg:max-w-[calc(100%-280px)]' : ''}`}>
            <div className="max-w-6xl mx-auto">
              {/* Ultimate Header */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-6xl font-black text-foreground mb-2 tracking-tight">
                      Ultimate Arsenal
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      Advanced filtering system with complete control
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-base px-4 py-2">
                      {filteredProducts.length} Products
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Search, Sort, and Filter Toggle */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:w-auto relative"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showFilters ? "Hide" : "Show"} Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 px-2 py-0 h-5 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
                
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search all products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2 flex-1">
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
                    <SelectTrigger className="flex-1 md:w-[220px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFilterCount > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {filters.stockStatus !== "all" && (
                    <Badge variant="secondary" className="gap-2">
                      {filters.stockStatus === "inStock" ? "In Stock Only" : "Out of Stock"}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, stockStatus: "all"})}
                      />
                    </Badge>
                  )}
                  {filters.selectedBrands.map(brand => (
                    <Badge key={brand} variant="secondary" className="gap-2">
                      {brand}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setFilters({
                          ...filters, 
                          selectedBrands: filters.selectedBrands.filter(b => b !== brand)
                        })}
                      />
                    </Badge>
                  ))}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && (
                    <Badge variant="secondary" className="gap-2">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setFilters({...filters, priceRange: [0, maxPrice]})}
                      />
                    </Badge>
                  )}
                </div>
              )}

              {/* Products Grid - Responsive ultimate layout */}
              <div className={`grid gap-3 md:gap-4 lg:gap-6 ${
                showFilters 
                  ? viewMode === "single" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                  : viewMode === "single" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard {...product} />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 md:group-hover:opacity-100 md:transition-opacity shadow-lg border-accent/30 text-xs md:text-sm h-8 md:h-9 px-2 md:px-3"
                      onClick={() => handleQuickView(product)}
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="hidden md:inline">Quick View</span>
                    </Button>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 md:py-20 col-span-2 md:col-span-3 lg:col-span-4">
                  <div className="max-w-md mx-auto">
                    <Star className="mx-auto h-12 md:h-16 w-12 md:w-16 text-accent/20 mb-4 animate-pulse" />
                    <p className="text-muted-foreground text-base md:text-xl mb-4">
                      No products found matching your criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchTerm("");
                      setFilters({
                        priceRange: [0, maxPrice],
                        selectedBrands: [],
                        stockStatus: "all",
                      });
                    }} className="text-xs md:text-sm">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar - Review Summary */}
          <aside className="hidden xl:block w-80 p-6 border-l border-border">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    Review Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{rating} ★</span>
                        <span className="text-muted-foreground">
                          {rating === 5 ? '85%' : rating === 4 ? '10%' : rating === 3 ? '3%' : '1%'}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ 
                            width: rating === 5 ? '85%' : rating === 4 ? '10%' : rating === 3 ? '3%' : '1%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-tactical" />
                    Trending Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Check out the most popular products this week from verified buyers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>
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