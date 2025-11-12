import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const featuredProducts = products.filter(p => p.inStock).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning-foreground">Legal Notice</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            All purchases require valid firearms license verification. By using this site, you certify 
            you are legally permitted to purchase ammunition in your jurisdiction.
          </AlertDescription>
        </Alert>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground mb-8">Find the right ammunition for your needs</p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground mb-8">Popular ammunition in stock now</p>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
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

export default Index;
