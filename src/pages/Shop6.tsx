import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";

const products = rawProducts.map(addProductVariations);

export default function Shop6() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
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
      <div className="min-h-screen flex flex-col w-full bg-background">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
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

              {/* Products Grid - 4 columns with shadow effects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="hover:shadow-2xl hover:shadow-destructive/20 transition-shadow duration-300">
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 border-2 border-destructive/30 rounded-lg">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-destructive" />
                  <p className="text-muted-foreground text-lg font-bold uppercase">Mission Failed - No Products Found</p>
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
    </SidebarProvider>
  );
}