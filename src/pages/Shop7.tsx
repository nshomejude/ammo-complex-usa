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
import { Search, Star, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ComparisonModal } from "@/components/ComparisonModal";
import { ComparisonBar } from "@/components/ComparisonBar";

const products = rawProducts.map(addProductVariations);

export default function Shop7() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);

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
      <div className="min-h-screen flex flex-col w-full bg-muted/20">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          {/* Left Sidebar - Attributes */}
          <ShopSidebar 
            type="products" 
            filters={filters}
            onFiltersChange={setFilters}
            availableBrands={availableBrands}
            maxPrice={maxPrice}
          />

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Dual Filter Layout</h1>
                <p className="text-sm md:text-base text-muted-foreground">Advanced filtering system with attribute controls</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 md:h-11"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] h-10 md:h-11">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary" className="flex items-center gap-1 h-10 md:h-11 px-3 md:px-4 text-xs md:text-sm">
                    {filteredProducts.length} Products
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard {...product} />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 md:group-hover:opacity-100 md:transition-opacity shadow-lg text-xs md:text-sm h-8 md:h-9 px-2 md:px-3"
                      onClick={() => handleQuickView(product)}
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="hidden md:inline">Quick View</span>
                    </Button>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground text-lg">No products match your filters.</p>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar - Reviews Summary */}
          <aside className="hidden lg:block w-72 p-6 border-l border-border bg-card/50">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    Customer Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">5 Stars</span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '85%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">4 Stars</span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '10%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">10%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">3 Stars</span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '3%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">2 Stars</span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '1%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1 Star</span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '1%' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">1%</span>
                    </div>
                  </div>
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