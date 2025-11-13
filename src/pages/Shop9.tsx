import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const products = rawProducts.map(addProductVariations);
const ITEMS_PER_PAGE = 12;

export default function Shop9() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navigation />
        
        <div className="flex flex-1 w-full">
          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Stencil Header */}
              <div className="mb-10 border-4 border-border p-6">
                <h1 className="text-6xl font-black text-foreground tracking-wider uppercase mb-2"
                    style={{ 
                      fontFamily: 'Impact, sans-serif',
                      textShadow: '3px 3px 0 hsl(var(--border))'
                    }}>
                  COMPACT ARMORY
                </h1>
                <p className="text-muted-foreground font-bold uppercase tracking-widest">
                  Efficient Layout • Paginated Results • Military Precision
                </p>
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search ammunition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-border"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[200px] border-2 border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid - 3 columns compact */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 p-0 border-2"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 border-4 border-border">
                  <p className="text-muted-foreground text-lg font-bold uppercase">
                    No Products Found
                  </p>
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