import { Navigation } from "@/components/Navigation";
import { TopSellingCard } from "@/components/TopSellingCard";
import { topAmmunition } from "@/data/topAmmunition";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate actual product counts for each category
  const categoriesWithCounts = useMemo(() => {
    return topAmmunition.map((ammo) => {
      const productCount = products.filter(
        (product) => product.categorySlug === ammo.slug
      ).length;
      return { ...ammo, productCount };
    });
  }, []);

  const filteredAmmunition = categoriesWithCounts.filter(
    (ammo) =>
      ammo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.caliber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingAmmunition = filteredAmmunition.filter((ammo) => ammo.trending);
  const otherAmmunition = filteredAmmunition.filter((ammo) => !ammo.trending);

  const totalProducts = categoriesWithCounts.reduce(
    (sum, cat) => sum + cat.productCount,
    0
  );
  const totalCategories = categoriesWithCounts.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Ammunition Catalog</h1>
          </div>
          <p className="text-muted-foreground mb-2">
            Browse our complete collection of ammunition across {totalCategories} categories
          </p>
          <div className="flex gap-2 mb-6">
            <Badge variant="secondary" className="text-sm">
              {totalProducts} Products Available
            </Badge>
            <Badge variant="outline" className="text-sm">
              {trendingAmmunition.length} Trending Categories
            </Badge>
          </div>
          
          <Input
            type="search"
            placeholder="Search by caliber, name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Trending Section */}
        {trendingAmmunition.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-tactical">🔥 Trending Now</h2>
              <Badge variant="destructive" className="animate-pulse">Hot</Badge>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingAmmunition.map((ammo) => (
                <div key={ammo.id} className="relative">
                  <TopSellingCard
                    name={ammo.name}
                    icon={ammo.icon}
                    salesCount={ammo.salesCount}
                    slug={ammo.slug}
                    trending={ammo.trending}
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-background/95 backdrop-blur"
                  >
                    {ammo.productCount} Products
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Categories Section */}
        {otherAmmunition.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">All Categories</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {otherAmmunition.map((ammo) => (
                <div key={ammo.id} className="relative">
                  <TopSellingCard
                    name={ammo.name}
                    icon={ammo.icon}
                    salesCount={ammo.salesCount}
                    slug={ammo.slug}
                    trending={ammo.trending}
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-background/95 backdrop-blur"
                  >
                    {ammo.productCount} Products
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredAmmunition.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No ammunition categories found matching your search.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Categories;
