import { useState, useEffect, useRef, useMemo } from "react";
import { Search as SearchIcon, X, Target, Package, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { firearms } from "@/data/firearms";
import { products } from "@/data/products";

interface SearchResult {
  id: string;
  name: string;
  type: "firearm" | "product";
  price: number;
  category?: string;
  caliber?: string[];
}

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCalibersFilter, setSelectedCalibersFilter] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Extract unique values for filters
  const { calibers, manufacturers } = useMemo(() => {
    const caliberSet = new Set<string>();
    const manufacturerSet = new Set<string>();

    firearms.forEach(f => {
      f.caliber.forEach(cal => caliberSet.add(cal));
      manufacturerSet.add(f.manufacturer);
    });

    products.forEach(p => {
      caliberSet.add(p.caliber);
      manufacturerSet.add(p.manufacturer);
    });

    return {
      calibers: Array.from(caliberSet).sort(),
      manufacturers: Array.from(manufacturerSet).sort()
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const performSearch = (searchQuery: string) => {
    setIsLoading(true);
    const lowerQuery = searchQuery.toLowerCase();

    let firearmResults: SearchResult[] = firearms
      .filter(
        (f) =>
          f.name.toLowerCase().includes(lowerQuery) ||
          f.manufacturer.toLowerCase().includes(lowerQuery) ||
          f.caliber.some((cal) => cal.toLowerCase().includes(lowerQuery)) ||
          f.description.toLowerCase().includes(lowerQuery)
      )
      .filter(f => {
        const matchesPrice = f.price >= priceRange[0] && f.price <= priceRange[1];
        const matchesCaliber = selectedCalibersFilter.length === 0 || 
          f.caliber.some(cal => selectedCalibersFilter.includes(cal));
        const matchesManufacturer = selectedManufacturers.length === 0 || 
          selectedManufacturers.includes(f.manufacturer);
        return matchesPrice && matchesCaliber && matchesManufacturer;
      })
      .slice(0, 5)
      .map((f) => ({
        id: f.id,
        name: `${f.manufacturer} ${f.name}`,
        type: "firearm" as const,
        price: f.price,
        category: f.categorySlug,
        caliber: f.caliber,
      }));

    let productResults: SearchResult[] = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.manufacturer.toLowerCase().includes(lowerQuery) ||
          p.caliber.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      )
      .filter(p => {
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesCaliber = selectedCalibersFilter.length === 0 || 
          selectedCalibersFilter.includes(p.caliber);
        const matchesManufacturer = selectedManufacturers.length === 0 || 
          selectedManufacturers.includes(p.manufacturer);
        return matchesPrice && matchesCaliber && matchesManufacturer;
      })
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        name: p.name,
        type: "product" as const,
        price: p.price,
        category: p.category,
        caliber: [p.caliber],
      }));

    const combined = [...firearmResults, ...productResults].slice(0, 8);
    setResults(combined);
    setIsOpen(combined.length > 0 || showAdvanced);
    setIsLoading(false);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "firearm") {
      navigate(`/firearm/${result.id}`);
    } else {
      navigate(`/product/${result.id}`);
    }
    setQuery("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setShowAdvanced(false);
  };

  const handleViewAllResults = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setShowAdvanced(false);
    }
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

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCalibersFilter([]);
    setSelectedManufacturers([]);
  };

  const hasActiveFilters = 
    priceRange[0] !== 0 || 
    priceRange[1] !== 5000 || 
    selectedCalibersFilter.length > 0 || 
    selectedManufacturers.length > 0;

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search firearms and ammunition..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => (results.length > 0 || showAdvanced) && setIsOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && handleViewAllResults()}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant={showAdvanced || hasActiveFilters ? "default" : "outline"}
          size="icon"
          onClick={() => {
            setShowAdvanced(!showAdvanced);
            setIsOpen(!showAdvanced || results.length > 0);
          }}
          className="flex-shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && (
        <Card className="absolute top-full mt-2 w-[600px] z-50 shadow-lg bg-background">
          <div className="max-h-[500px] overflow-y-auto">
            {showAdvanced && (
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Advanced Filters
                  </h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Price Range */}
                  <div>
                    <Label className="text-sm mb-2 block">
                      Price: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={5000}
                      step={50}
                    />
                  </div>

                  <Separator />

                  {/* Caliber */}
                  <div>
                    <Label className="text-sm mb-2 block">Caliber</Label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {calibers.slice(0, 12).map(cal => (
                        <Badge
                          key={cal}
                          variant={selectedCalibersFilter.includes(cal) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCaliber(cal)}
                        >
                          {cal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Manufacturer */}
                  <div>
                    <Label className="text-sm mb-2 block">Manufacturer</Label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {manufacturers.slice(0, 12).map(mfg => (
                        <Badge
                          key={mfg}
                          variant={selectedManufacturers.includes(mfg) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleManufacturer(mfg)}
                        >
                          {mfg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="p-2">
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full p-3 hover:bg-accent rounded-lg transition-colors text-left flex items-start gap-3"
                    >
                      <div className="mt-1 flex-shrink-0">
                        {result.type === "firearm" ? (
                          <Target className="h-5 w-5 text-tactical" />
                        ) : (
                          <Package className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm truncate">{result.name}</p>
                          <span className="text-sm font-semibold text-tactical flex-shrink-0">
                            ${result.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {result.type === "firearm" ? "Firearm" : "Ammunition"}
                          </Badge>
                          {result.caliber && result.caliber.length > 0 && (
                            <span className="text-xs text-muted-foreground truncate">
                              {result.caliber.slice(0, 2).join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {query.trim() && (
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={handleViewAllResults}
                    >
                      View All Results
                      <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                    </Button>
                  </div>
                )}
              </>
            ) : query.trim().length >= 2 && !showAdvanced ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : null}
          </div>
        </Card>
      )}

    </div>
  );
};
