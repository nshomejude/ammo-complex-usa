import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { FirearmCategoryCard } from "@/components/FirearmCategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { firearmCategories } from "@/data/firearmCategories";
import { products as rawProducts } from "@/data/products";
import { firearms as rawFirearms } from "@/data/firearms";
import { addProductVariations, addFirearmVariations } from "@/utils/addDefaultVariations";
import { FirearmCard } from "@/components/FirearmCard";
import { AlertCircle, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Add variations to all products and firearms
  const products = rawProducts.map(addProductVariations);
  const firearms = rawFirearms.map(addFirearmVariations);
  
  const featuredProducts = products.filter(p => p.inStock).slice(0, 4);
  const featuredFirearms = firearms.filter(f => f.inStock).slice(0, 8);

  // Top 8 firearm categories for homepage
  const topFirearmCategories = firearmCategories
    .sort((a, b) => parseFloat(b.salesCount.replace('K', '')) - parseFloat(a.salesCount.replace('K', '')))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <section className="container mx-auto px-4 py-4 sm:py-6">
        <Alert className="mb-8 border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive-foreground">Legal Notice</AlertTitle>
          <AlertDescription className="text-destructive-foreground">
            All purchases require valid firearms license verification. By using this site, you certify 
            you are legally permitted to purchase ammunition in your jurisdiction.
          </AlertDescription>
        </Alert>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-tactical" />
            <div>
              <h2 className="text-3xl font-bold">Top Selling Firearm Categories</h2>
              <p className="text-muted-foreground">Most popular firearm types in the civilian market</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topFirearmCategories.map((category) => (
              <FirearmCategoryCard key={category.id} {...category} />
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link to="/firearm-categories">
              <Button variant="outline" className="border-tactical text-tactical hover:bg-tactical hover:text-tactical-foreground">
                View All 20 Categories
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Firearms</h2>
          <p className="text-muted-foreground mb-4">Popular firearms available now</p>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredFirearms.map((firearm) => (
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

          <div className="mt-4 text-center">
            <Link to="/firearms">
              <Button variant="outline" className="border-tactical text-tactical hover:bg-tactical hover:text-tactical-foreground">
                Browse All Firearms
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Popular Ammunition Categories</h2>
          <p className="text-muted-foreground mb-4">Browse ammunition by caliber</p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Featured Ammunition</h2>
          <p className="text-muted-foreground mb-4">In-stock ammunition ready to ship</p>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product}
                quantityVariations={[
                  { rounds: 20, price: product.price, inStock: true },
                  { rounds: 50, price: product.price * 2.3, inStock: true },
                  { rounds: 100, price: product.price * 4.2, inStock: false },
                ]}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
