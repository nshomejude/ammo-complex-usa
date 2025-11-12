import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, Target, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

    const firearmResults: SearchResult[] = firearms
      .filter(
        (f) =>
          f.name.toLowerCase().includes(lowerQuery) ||
          f.manufacturer.toLowerCase().includes(lowerQuery) ||
          f.caliber.some((cal) => cal.toLowerCase().includes(lowerQuery)) ||
          f.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map((f) => ({
        id: f.id,
        name: `${f.manufacturer} ${f.name}`,
        type: "firearm" as const,
        price: f.price,
        category: f.categorySlug,
        caliber: f.caliber,
      }));

    const productResults: SearchResult[] = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.manufacturer.toLowerCase().includes(lowerQuery) ||
          p.caliber.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      )
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
    setIsOpen(combined.length > 0);
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
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search firearms and ammunition..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
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

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-[400px] overflow-y-auto shadow-lg">
          <div className="p-2">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </Card>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && !isLoading && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <div className="p-4 text-center text-sm text-muted-foreground">
            No results found for "{query}"
          </div>
        </Card>
      )}
    </div>
  );
};
