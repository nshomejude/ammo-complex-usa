import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FirearmCard } from "@/components/FirearmCard";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { firearms } from "@/data/firearms";
import { products } from "@/data/products";
import { Filter, X, SlidersHorizontal } from "lucide-react";

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCalibersFilter, setSelectedCalibersFilter] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFirearms, setShowFirearms] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  // Extract unique values for filters
  const { calibers, manufacturers, categories } = useMemo(() => {
    const caliberSet = new Set<string>();
    const manufacturerSet = new Set<string>();
    const categorySet = new Set<string>();

    firearms.forEach(f => {
      f.caliber.forEach(cal => caliberSet.add(cal));
      manufacturerSet.add(f.manufacturer);
      categorySet.add(f.categorySlug);
    });

    products.forEach(p => {
      caliberSet.add(p.caliber);
      manufacturerSet.add(p.manufacturer);
      categorySet.add(p.category);
    });

    return {
      calibers: Array.from(caliberSet).sort(),
      manufacturers: Array.from(manufacturerSet).sort(),
      categories: Array.from(categorySet).sort()
    };
  }, []);

  // Search and filter logic
  const filteredResults = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    let firearmResults = firearms.filter(f => {
      const matchesQuery = 
        f.name.toLowerCase().includes(lowerQuery) ||
        f.manufacturer.toLowerCase().includes(lowerQuery) ||
        f.caliber.some(cal => cal.toLowerCase().includes(lowerQuery)) ||
        f.description.toLowerCase().includes(lowerQuery);
      
      const matchesPrice = f.price >= priceRange[0] && f.price <= priceRange[1];
      const matchesCaliber = selectedCalibersFilter.length === 0 || 
        f.caliber.some(cal => selectedCalibersFilter.includes(cal));
      const matchesManufacturer = selectedManufacturers.length === 0 || 
        selectedManufacturers.includes(f.manufacturer);
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(f.categorySlug);

      return matchesQuery && matchesPrice && matchesCaliber && matchesManufacturer && matchesCategory;
    });

    let productResults = products.filter(p => {
      const matchesQuery = 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.manufacturer.toLowerCase().includes(lowerQuery) ||
        p.caliber.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery);
      
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesCaliber = selectedCalibersFilter.length === 0 || 
        selectedCalibersFilter.includes(p.caliber);
      const matchesManufacturer = selectedManufacturers.length === 0 || 
        selectedManufacturers.includes(p.manufacturer);
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(p.category);

      return matchesQuery && matchesPrice && matchesCaliber && matchesManufacturer && matchesCategory;
    });

    // Sort results
    const sortFn = (a: any, b: any) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    };

    firearmResults.sort(sortFn);
    productResults.sort(sortFn);

    return {
      firearms: showFirearms ? firearmResults : [],
      products: showProducts ? productResults : []
    };
  }, [query, sortBy, priceRange, selectedCalibersFilter, selectedManufacturers, selectedCategories, showFirearms, showProducts]);

  const totalResults = filteredResults.firearms.length + filteredResults.products.length;

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCalibersFilter([]);
    setSelectedManufacturers([]);
    setSelectedCategories([]);
  };

  const toggleCaliber = (caliber: string) => {
    setSelectedCalibersFilter(prev => 
      prev.includes(caliber) ? prev.filter(c => c !== caliber) : [...prev, caliber]
    );
  };

  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers(prev => 
      prev.includes(manufacturer) ? prev.filter(m => m !== manufacturer) : [...prev, manufacturer]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'w-72' : 'w-0'} transition-all flex-shrink-0`}>
            {showFilters && (
              <Card className="p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Type Filter */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Product Type</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="type-firearms"
                          checked={showFirearms}
                          onCheckedChange={(checked) => setShowFirearms(checked as boolean)}
                        />
                        <Label htmlFor="type-firearms" className="cursor-pointer">
                          Firearms ({filteredResults.firearms.length})
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="type-products"
                          checked={showProducts}
                          onCheckedChange={(checked) => setShowProducts(checked as boolean)}
                        />
                        <Label htmlFor="type-products" className="cursor-pointer">
                          Ammunition ({filteredResults.products.length})
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={5000}
                      step={50}
                      className="mb-2"
                    />
                  </div>

                  <Separator />

                  {/* Caliber Filter */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Caliber</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {calibers.slice(0, 15).map(caliber => (
                        <div key={caliber} className="flex items-center gap-2">
                          <Checkbox 
                            id={`cal-${caliber}`}
                            checked={selectedCalibersFilter.includes(caliber)}
                            onCheckedChange={() => toggleCaliber(caliber)}
                          />
                          <Label htmlFor={`cal-${caliber}`} className="cursor-pointer text-sm">
                            {caliber}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Manufacturer Filter */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Manufacturer</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {manufacturers.slice(0, 15).map(manufacturer => (
                        <div key={manufacturer} className="flex items-center gap-2">
                          <Checkbox 
                            id={`mfg-${manufacturer}`}
                            checked={selectedManufacturers.includes(manufacturer)}
                            onCheckedChange={() => toggleManufacturer(manufacturer)}
                          />
                          <Label htmlFor={`mfg-${manufacturer}`} className="cursor-pointer text-sm">
                            {manufacturer}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
                
                {(selectedCalibersFilter.length > 0 || selectedManufacturers.length > 0) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedCalibersFilter.map(cal => (
                      <Badge key={cal} variant="secondary" className="gap-1">
                        {cal}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleCaliber(cal)}
                        />
                      </Badge>
                    ))}
                    {selectedManufacturers.map(mfg => (
                      <Badge key={mfg} variant="secondary" className="gap-1">
                        {mfg}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleManufacturer(mfg)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {totalResults === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-lg text-muted-foreground mb-2">No results found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
              </Card>
            ) : (
              <>
                {filteredResults.firearms.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">
                      Firearms ({filteredResults.firearms.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredResults.firearms.map(firearm => (
                        <FirearmCard 
                          key={firearm.id} 
                          {...firearm}
                          finish={firearm.finish}
                          finishVariations={[
                            { finish: 'Matte Black', price: firearm.price, inStock: true, colorCode: '#1a1a1a' },
                            { finish: 'FDE', price: firearm.price + 25, inStock: true, colorCode: '#8b7355' },
                            { finish: 'OD Green', price: firearm.price + 30, inStock: true, colorCode: '#4a5d3f' },
                            { finish: 'Stainless', price: firearm.price + 40, inStock: firearm.inStock, colorCode: '#c0c0c0' },
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {filteredResults.products.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Ammunition ({filteredResults.products.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredResults.products.map(product => (
                        <ProductCard 
                          key={product.id} 
                          {...product}
                          grainWeight={product.grainWeight}
                          grainWeightVariations={[
                            { grainWeight: '55gr', price: product.price - 2, inStock: true },
                            { grainWeight: '62gr', price: product.price, inStock: true },
                            { grainWeight: '77gr', price: product.price + 3, inStock: product.inStock },
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchResults;
