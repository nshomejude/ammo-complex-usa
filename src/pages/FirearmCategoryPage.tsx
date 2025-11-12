import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FirearmCard } from "@/components/FirearmCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { firearms } from "@/data/firearms";
import { firearmCategories } from "@/data/firearmCategories";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const FirearmCategoryPage = () => {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [stockFilter, setStockFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCalibers, setSelectedCalibers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const category = firearmCategories.find(cat => cat.slug === slug);
  const Icon = category?.icon;

  // Get unique manufacturers and calibers for the current category
  const { manufacturers, calibers, minPrice, maxPrice } = useMemo(() => {
    const categoryFirearms = firearms.filter(firearm => {
      if (slug === "all") return true;
      return firearm.categorySlug === slug;
    });

    const manufacturerSet = new Set<string>();
    const caliberSet = new Set<string>();
    let min = Infinity;
    let max = 0;

    categoryFirearms.forEach(f => {
      manufacturerSet.add(f.manufacturer);
      f.caliber.forEach(cal => caliberSet.add(cal));
      if (f.price < min) min = f.price;
      if (f.price > max) max = f.price;
    });

    return {
      manufacturers: Array.from(manufacturerSet).sort(),
      calibers: Array.from(caliberSet).sort(),
      minPrice: min === Infinity ? 0 : min,
      maxPrice: max
    };
  }, [slug]);

  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers(prev =>
      prev.includes(manufacturer)
        ? prev.filter(m => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };

  const toggleCaliber = (caliber: string) => {
    setSelectedCalibers(prev =>
      prev.includes(caliber)
        ? prev.filter(c => c !== caliber)
        : [...prev, caliber]
    );
  };

  const clearFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedManufacturers([]);
    setSelectedCalibers([]);
    setStockFilter("all");
    setSearchQuery("");
  };

  const hasActiveFilters = 
    priceRange[0] !== minPrice || 
    priceRange[1] !== maxPrice || 
    selectedManufacturers.length > 0 || 
    selectedCalibers.length > 0 ||
    stockFilter !== "all" ||
    searchQuery !== "";

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
    .filter(firearm => {
      return firearm.price >= priceRange[0] && firearm.price <= priceRange[1];
    })
    .filter(firearm => {
      if (selectedManufacturers.length === 0) return true;
      return selectedManufacturers.includes(firearm.manufacturer);
    })
    .filter(firearm => {
      if (selectedCalibers.length === 0) return true;
      return firearm.caliber.some(cal => selectedCalibers.includes(cal));
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
            
            <Button
              variant={showFilters || hasActiveFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-background text-foreground">{
                  [
                    priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0,
                    selectedManufacturers.length,
                    selectedCalibers.length,
                    stockFilter !== "all" ? 1 : 0
                  ].reduce((a, b) => a + b, 0)
                }</Badge>
              )}
            </Button>

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
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm font-semibold">Active Filters:</span>
              {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                <Badge variant="secondary" className="gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setPriceRange([minPrice, maxPrice])}
                  />
                </Badge>
              )}
              {selectedManufacturers.map(mfg => (
                <Badge key={mfg} variant="secondary" className="gap-1">
                  {mfg}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleManufacturer(mfg)}
                  />
                </Badge>
              ))}
              {selectedCalibers.map(cal => (
                <Badge key={cal} variant="secondary" className="gap-1">
                  {cal}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleCaliber(cal)}
                  />
                </Badge>
              ))}
              {stockFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {stockFilter === "in-stock" ? "In Stock" : "Out of Stock"}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setStockFilter("all")}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {showFilters && (
            <aside className="w-72 flex-shrink-0">
              <Card className="p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={minPrice}
                      max={maxPrice}
                      step={50}
                      className="mb-2"
                    />
                  </div>

                  <Separator />

                  {/* Stock Filter */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Availability</Label>
                    <Select value={stockFilter} onValueChange={setStockFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by stock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Manufacturer Filter */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">
                      Manufacturer ({selectedManufacturers.length})
                    </Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {manufacturers.map(manufacturer => (
                        <div key={manufacturer} className="flex items-center gap-2">
                          <Checkbox 
                            id={`mfg-${manufacturer}`}
                            checked={selectedManufacturers.includes(manufacturer)}
                            onCheckedChange={() => toggleManufacturer(manufacturer)}
                          />
                          <Label 
                            htmlFor={`mfg-${manufacturer}`} 
                            className="cursor-pointer text-sm font-normal"
                          >
                            {manufacturer}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Caliber Filter */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">
                      Caliber ({selectedCalibers.length})
                    </Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {calibers.map(caliber => (
                        <div key={caliber} className="flex items-center gap-2">
                          <Checkbox 
                            id={`cal-${caliber}`}
                            checked={selectedCalibers.includes(caliber)}
                            onCheckedChange={() => toggleCaliber(caliber)}
                          />
                          <Label 
                            htmlFor={`cal-${caliber}`} 
                            className="cursor-pointer text-sm font-normal"
                          >
                            {caliber}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </aside>
          )}

          {/* Firearms Grid */}
          <div className="flex-1">
            {filteredFirearms.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredFirearms.length} {filteredFirearms.length === 1 ? 'firearm' : 'firearms'}
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredFirearms.map((firearm) => (
                    <FirearmCard key={firearm.id} {...firearm} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No firearms found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FirearmCategoryPage;