import { Navigation } from "@/components/Navigation";
import { TopSellingCard } from "@/components/TopSellingCard";
import { topAmmunition } from "@/data/topAmmunition";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAmmunition = topAmmunition.filter(
    (ammo) =>
      ammo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.caliber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingAmmunition = filteredAmmunition.filter((ammo) => ammo.trending);
  const otherAmmunition = filteredAmmunition.filter((ammo) => !ammo.trending);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Top 20 Ammunition Categories</h1>
          <p className="text-muted-foreground mb-6">Best-selling ammunition in licensed civilian markets</p>
          
          <Input
            type="search"
            placeholder="Search by caliber, name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {trendingAmmunition.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-tactical">🔥 Trending Now</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingAmmunition.map((ammo) => (
                <TopSellingCard
                  key={ammo.id}
                  name={ammo.name}
                  icon={ammo.icon}
                  salesCount={ammo.salesCount}
                  slug={ammo.slug}
                  trending={ammo.trending}
                />
              ))}
            </div>
          </div>
        )}

        {otherAmmunition.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">All Categories</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {otherAmmunition.map((ammo) => (
                <TopSellingCard
                  key={ammo.id}
                  name={ammo.name}
                  icon={ammo.icon}
                  salesCount={ammo.salesCount}
                  slug={ammo.slug}
                  trending={ammo.trending}
                />
              ))}
            </div>
          </div>
        )}

        {filteredAmmunition.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No ammunition categories found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Categories;
