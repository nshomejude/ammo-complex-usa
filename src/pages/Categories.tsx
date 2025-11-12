import { Navigation } from "@/components/Navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/categories";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Ammunition Categories</h1>
          <p className="text-muted-foreground">Explore our comprehensive selection organized by type</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
