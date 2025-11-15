import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Search, Package, Shield } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { products as rawProducts } from "@/data/products";
import { firearms as rawFirearms } from "@/data/firearms";
import { addProductVariations, addFirearmVariations } from "@/utils/addDefaultVariations";
import { ProductCard } from "@/components/ProductCard";
import { FirearmCard } from "@/components/FirearmCard";

const Brands = () => {
  const { manufacturer } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const products = useMemo(() => rawProducts.map(addProductVariations), []);
  const firearms = useMemo(() => rawFirearms.map(addFirearmVariations), []);

  // Get all unique manufacturers from both products and firearms
  const allManufacturers = useMemo(() => {
    const manufacturerMap = new Map<string, {
      name: string;
      slug: string;
      productCount: number;
      firearmCount: number;
      description: string;
    }>();

    products.forEach(product => {
      if (product.manufacturer) {
        const slug = product.manufacturer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const existing = manufacturerMap.get(slug);
        if (existing) {
          existing.productCount++;
        } else {
          manufacturerMap.set(slug, {
            name: product.manufacturer,
            slug,
            productCount: 1,
            firearmCount: 0,
            description: `Premium ammunition manufacturer offering high-quality ${product.manufacturer} products.`
          });
        }
      }
    });

    firearms.forEach(firearm => {
      const slug = firearm.manufacturer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const existing = manufacturerMap.get(slug);
      if (existing) {
        existing.firearmCount++;
        existing.description = `Leading firearms manufacturer ${firearm.manufacturer} - trusted for quality and reliability.`;
      } else {
        manufacturerMap.set(slug, {
          name: firearm.manufacturer,
          slug,
          productCount: 0,
          firearmCount: 1,
          description: `Premium firearms manufacturer ${firearm.manufacturer} - engineering excellence and innovation.`
        });
      }
    });

    return Array.from(manufacturerMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [products, firearms]);

  const filteredManufacturers = allManufacturers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Single brand page
  if (manufacturer) {
    const brand = allManufacturers.find(m => m.slug === manufacturer);
    
    if (!brand) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Brand Not Found</h1>
              <p className="text-muted-foreground mb-6">The manufacturer you're looking for doesn't exist in our catalog.</p>
              <Link to="/brands">
                <Button>View All Brands</Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    const brandProducts = products.filter(p => 
      p.manufacturer?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === manufacturer
    );
    const brandFirearms = firearms.filter(f => 
      f.manufacturer.toLowerCase().replace(/[^a-z0-9]+/g, '-') === manufacturer
    );

    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-10 w-10 text-tactical" />
              <div>
                <h1 className="text-4xl font-bold">{brand.name}</h1>
                <p className="text-muted-foreground">{brand.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.productCount > 0 && (
                <Badge variant="secondary" className="text-sm">
                  <Package className="h-3 w-3 mr-1" />
                  {brand.productCount} Ammunition Products
                </Badge>
              )}
              {brand.firearmCount > 0 && (
                <Badge variant="secondary" className="text-sm">
                  <Shield className="h-3 w-3 mr-1" />
                  {brand.firearmCount} Firearms
                </Badge>
              )}
            </div>
          </div>

          {brandProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Ammunition Products</h2>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {brandProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    quantityVariations={[
                      { rounds: 20, price: product.price, inStock: true },
                      { rounds: 50, price: product.price * 2.3, inStock: true },
                      { rounds: 100, price: product.price * 4.2, inStock: product.inStock },
                    ]}
                  />
                ))}
              </div>
            </section>
          )}

          {brandFirearms.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Firearms</h2>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {brandFirearms.map(firearm => (
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
            </section>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // All brands directory
  useEffect(() => {
    document.title = "Brand Directory - All Manufacturers | Arms Complex";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-10 w-10 text-tactical" />
            <div>
              <h1 className="text-4xl font-bold">Brand Directory</h1>
              <p className="text-muted-foreground text-lg">
                Explore all {allManufacturers.length} manufacturers available at Arms Complex
              </p>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search brands..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredManufacturers.map(brand => (
            <Link key={brand.slug} to={`/brands/${brand.slug}`}>
              <Card className="h-full hover:shadow-lg hover:border-tactical/50 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-tactical" />
                    {brand.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {brand.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brand.productCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <Package className="h-3 w-3 mr-1" />
                        {brand.productCount} Products
                      </Badge>
                    )}
                    {brand.firearmCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {brand.firearmCount} Firearms
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredManufacturers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No brands found matching your search.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Brands;
