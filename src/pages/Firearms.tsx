import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FirearmCard } from "@/components/FirearmCard";
import { ShopSidebar } from "@/components/ShopSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { firearms as rawFirearms } from "@/data/firearms";
import { addFirearmVariations } from "@/utils/addDefaultVariations";
import { firearmCategories } from "@/data/firearmCategories";
import { Search, Filter, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Firearms = () => {
  // Add variations to all firearms
  const firearms = rawFirearms.map(addFirearmVariations);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Advanced filters
  const [filters, setFilters] = useState({
    priceRange: [0, 5000] as [number, number],
    selectedBrands: [] as string[],
    stockStatus: "all" as "all" | "inStock" | "outOfStock"
  });

  // Get unique manufacturers from firearms
  const availableManufacturers = Array.from(new Set(firearms.map(f => f.manufacturer))).sort();
  const maxPrice = Math.max(...firearms.map(f => f.price));

  const filteredFirearms = firearms
    .filter(firearm => {
      if (categoryFilter !== "all" && firearm.categorySlug !== categoryFilter) return false;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        firearm.name.toLowerCase().includes(query) ||
        firearm.manufacturer.toLowerCase().includes(query) ||
        firearm.caliber.some(cal => cal.toLowerCase().includes(query)) ||
        firearm.description.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
      
      // Stock filter (legacy)
      if (stockFilter === "in-stock" && !firearm.inStock) return false;
      if (stockFilter === "out-of-stock" && firearm.inStock) return false;
      
      // Advanced price filter
      if (firearm.price < filters.priceRange[0] || firearm.price > filters.priceRange[1]) return false;
      
      // Advanced manufacturer filter
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(firearm.manufacturer)) return false;
      
      // Advanced stock filter
      if (filters.stockStatus === "inStock" && !firearm.inStock) return false;
      if (filters.stockStatus === "outOfStock" && firearm.inStock) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "manufacturer":
          return a.manufacturer.localeCompare(b.manufacturer);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredFirearms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFirearms = filteredFirearms.slice(startIndex, startIndex + itemsPerPage);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <ShopSidebar 
          type="firearms"
          filters={filters}
          onFiltersChange={setFilters}
          availableBrands={availableManufacturers}
          maxPrice={maxPrice}
        />
        
        <div className="flex-1 flex flex-col">
          <Navigation />
          
          <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="mb-3 sm:mb-4">
              <SidebarTrigger className="mb-3 sm:mb-4" />
            </div>
            
            <Alert className="mb-6 sm:mb-8 border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-sm sm:text-base text-warning-foreground">FFL Transfer Required</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm text-warning-foreground">
            All firearm purchases require transfer to a licensed FFL dealer. Age restrictions and background checks apply.
          </AlertDescription>
        </Alert>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-tactical" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Browse All Firearms</h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Explore our complete catalog of firearms across all categories</p>
                {(filters.selectedBrands.length > 0 || 
                  filters.priceRange[0] > 0 || 
                  filters.priceRange[1] < maxPrice ||
                  filters.stockStatus !== "all") && (
                  <Badge variant="destructive" className="text-xs sm:text-sm">
                    {filters.selectedBrands.length + 
                     (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0) +
                     (filters.stockStatus !== "all" ? 1 : 0)} Active Filters
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search firearms..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-10 sm:h-11"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="h-10 sm:h-11">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {firearmCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-10 sm:h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 sm:mb-6">
            <Select value={stockFilter} onValueChange={(value) => {
              setStockFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-full sm:w-[180px] h-10 sm:h-11">
                <SelectValue placeholder="Stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || categoryFilter !== "all" || stockFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setStockFilter("all");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {paginatedFirearms.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFirearms.length)} of {filteredFirearms.length} firearms
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-xs sm:text-sm"
                >
                  Previous
                </Button>
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  Page {currentPage} of {totalPages}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-xs sm:text-sm"
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {paginatedFirearms.map((firearm) => (
                <FirearmCard 
                  key={firearm.id} 
                  {...firearm}
                  quantityVariations={[
                    { quantity: 1, price: firearm.price, inStock: true },
                    { quantity: 2, price: firearm.price * 1.9, inStock: true },
                    { quantity: 3, price: firearm.price * 2.7, inStock: firearm.inStock },
                  ]}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Badge variant="outline" className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </Badge>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-4">No firearms found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setStockFilter("all");
              setCurrentPage(1);
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </section>

      <Footer />
      </div>
      </div>
    </SidebarProvider>
  );
};

export default Firearms;