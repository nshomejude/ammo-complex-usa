import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FirearmCard } from "@/components/FirearmCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { firearms } from "@/data/firearms";
import { firearmCategories } from "@/data/firearmCategories";
import { Search, Filter } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const FirearmCategoryPage = () => {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [stockFilter, setStockFilter] = useState("all");

  const category = firearmCategories.find(cat => cat.slug === slug);
  const Icon = category?.icon;

  const filteredFirearms = firearms
    .filter(firearm => {
      if (slug === "all") return true;
      return firearm.categorySlug === slug;
    })
    .filter(firearm => {
      const query = searchQuery.toLowerCase();
      return (
        firearm.name.toLowerCase().includes(query) ||
        firearm.manufacturer.toLowerCase().includes(query) ||
        firearm.caliber.some(cal => cal.toLowerCase().includes(query)) ||
        firearm.description.toLowerCase().includes(query)
      );
    })
    .filter(firearm => {
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

  if (!category && slug !== "all") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Category Not Found</AlertTitle>
            <AlertDescription>
              The firearm category you're looking for doesn't exist.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

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
          {category && Icon && (
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 rounded-full bg-tactical/10">
                <Icon className="h-12 w-12 text-tactical" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{category.name}</h1>
                  {category.trending && (
                    <Badge className="bg-accent text-accent-foreground">Trending</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Sales: {category.salesCount}</Badge>
                  <Badge variant="secondary">Age: {category.ageRequirement}+</Badge>
                </div>
                
                {category.recommendedAmmo.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Compatible Ammunition:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.recommendedAmmo.map((ammo, idx) => (
                        <Badge key={idx} variant="outline" className="border-tactical text-tactical">
                          {ammo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {slug === "all" && (
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">All Firearms</h1>
              <p className="text-muted-foreground text-lg">Browse our complete firearm catalog</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search firearms by name, manufacturer, or caliber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredFirearms.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredFirearms.length} {filteredFirearms.length === 1 ? 'firearm' : 'firearms'}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredFirearms.map((firearm) => (
                <FirearmCard key={firearm.id} {...firearm} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No firearms found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setStockFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default FirearmCategoryPage;