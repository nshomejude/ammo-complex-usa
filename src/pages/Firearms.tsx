import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FirearmCard } from "@/components/FirearmCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { firearms } from "@/data/firearms";
import { firearmCategories } from "@/data/firearmCategories";
import { Search, Filter, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Firearms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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
      
      if (stockFilter === "in-stock") return firearm.inStock;
      if (stockFilter === "out-of-stock") return !firearm.inStock;
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16">
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning-foreground">FFL Transfer Required</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            All firearm purchases require transfer to a licensed FFL dealer. Age restrictions and background checks apply.
          </AlertDescription>
        </Alert>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-tactical" />
            <div>
              <h1 className="text-4xl font-bold">Browse All Firearms</h1>
              <p className="text-muted-foreground text-lg">Explore our complete catalog of firearms across all categories</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search firearms..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
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
              <SelectTrigger>
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

          <div className="flex items-center gap-3 mb-6">
            <Select value={stockFilter} onValueChange={(value) => {
              setStockFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-[180px]">
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
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFirearms.length)} of {filteredFirearms.length} firearms
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Badge variant="outline" className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedFirearms.map((firearm) => (
                <FirearmCard key={firearm.id} {...firearm} />
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

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2024 Arms Complex. All rights reserved.</p>
            <p>Licensed Federal Firearms Dealer | Legal Sales to Authorized Buyers Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Firearms;