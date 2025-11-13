import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Award, GitCompare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = rawProducts.map(addProductVariations);

export default function Shop10() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [compareMode, setCompareMode] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    selectedBrands: [] as string[],
    stockStatus: "all" as "all" | "inStock" | "outOfStock",
  });

  const availableBrands = useMemo(() => {
    const brands = new Set(products.map(p => p.manufacturer).filter(Boolean));
    return Array.from(brands) as string[];
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price));
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
          />

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
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
                  className="border-accent/30"
                >
                  <GitCompare className="mr-2 h-4 w-4" />
                  {compareMode ? "Exit Compare" : "Compare"}
                </Button>
              </div>

              {compareMode && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Compare Mode Active:</strong> Select products to compare specifications side-by-side
                  </p>
                </div>
              )}

              {/* Products Grid - 3 columns premium spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`group relative ${compareMode ? 'ring-2 ring-accent/50 rounded-lg' : ''}`}
                  >
                    <ProductCard {...product} />
                    {product.inStock && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                        In Stock
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 border-2 border-accent/30 rounded-lg bg-accent/5">
                  <Award className="h-16 w-16 mx-auto mb-4 text-accent" />
                  <p className="text-muted-foreground text-lg">No premium products match your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
}