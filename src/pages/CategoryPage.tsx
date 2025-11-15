import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { categories } from "@/data/categories";
import { topAmmunition } from "@/data/topAmmunition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryPage = () => {
  // Add variations to all products
  const products = rawProducts.map(addProductVariations);
  
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState("name");
  const [stockFilter, setStockFilter] = useState("all");

  // Find category in either categories or topAmmunition
  const category = categories.find((c) => c.slug === slug);
  const ammoCategory = topAmmunition.find((a) => a.slug === slug);

  // Get category info
  const categoryInfo = category || ammoCategory;
  const categoryName = categoryInfo?.name || "Category";
  const categoryDescription = categoryInfo?.description || "";
  const CategoryIcon = categoryInfo?.icon;

  // Map ammunition slugs to product categories
  const slugToCategoryMap: { [key: string]: string } = {
    "9mm-luger": "pistol",
    "22-lr": "rimfire",
    "12-gauge": "shotgun",
    "556-nato": "rifle",
    "308-winchester": "rifle",
    "45-acp": "pistol",
    "380-acp": "pistol",
    "40-sw": "pistol",
    "357-magnum": "pistol",
    "762x39": "rifle",
    "65-creedmoor": "rifle",
    "30-06-springfield": "rifle",
    "20-gauge": "shotgun",
    "243-winchester": "rifle",
    "300-win-mag": "rifle",
    "357-sig": "pistol",
    "10mm-auto": "pistol",
    "762x54r": "rifle",
    "223-match": "rifle",
    "410-bore": "shotgun",
  };

  // Filter products by category
  let filteredProducts = products;
  
  if (slug) {
    const productCategory = slugToCategoryMap[slug] || slug;
    filteredProducts = products.filter((p) => p.category === productCategory);
  }

  // Apply stock filter
  if (stockFilter === "inStock") {
    filteredProducts = filteredProducts.filter((p) => p.inStock);
  } else if (stockFilter === "outOfStock") {
    filteredProducts = filteredProducts.filter((p) => !p.inStock);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "caliber":
        return a.caliber.localeCompare(b.caliber);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const inStockCount = sortedProducts.filter(p => p.inStock).length;

  // SEO: Update document title and meta tags
  useEffect(() => {
    if (categoryName) {
      document.title = `${categoryName} Ammunition - ${sortedProducts.length} Products | Arms Complex`;

      const updateMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("name", name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      updateMeta("description", `Shop ${sortedProducts.length} ${categoryName} products. ${categoryDescription} ${inStockCount} in stock. Licensed FFL dealer with competitive prices.`);
      updateMeta("keywords", `${categoryName}, ${categoryName} ammunition, buy ${categoryName}, ammo for sale, in stock ammunition, FFL dealer`);

      // Open Graph
      const updateOG = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };

      updateOG("og:title", `${categoryName} Ammunition | Arms Complex`);
      updateOG("og:description", `${categoryDescription} ${sortedProducts.length} products available.`);
      updateOG("og:type", "product.group");
      updateOG("og:url", window.location.href);

      // Canonical
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.href = window.location.href;

      // Structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${categoryName} Ammunition`,
        "description": categoryDescription,
        "url": window.location.href,
        "numberOfItems": sortedProducts.length,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Categories",
              "item": `${window.location.origin}/categories`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": categoryName
            }
          ]
        }
      };

      let script = document.querySelector('script[type="application/ld+json"][data-page="category"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-page", "category");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      document.title = "Arms Complex - Licensed Ammunition Dealer";
    };
  }, [categoryName, categoryDescription, sortedProducts.length, inStockCount]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto p-6 py-12">
        <nav aria-label="Breadcrumb">
          <Link to="/categories">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex items-start gap-4 mb-4">
            {CategoryIcon && (
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-tactical/10 text-tactical">
                <CategoryIcon className="h-8 w-8" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{categoryName}</h1>
                {ammoCategory?.trending && (
                  <Badge className="bg-accent text-accent-foreground">
                    Trending
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">{categoryDescription}</p>
              {ammoCategory?.salesCount && (
                <p className="text-tactical font-semibold mt-2">
                  {ammoCategory.salesCount} units sold
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-5 w-5" />
            <span className="font-medium">
              {sortedProducts.length} {sortedProducts.length === 1 ? "Product" : "Products"} Available
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="inStock">In Stock Only</SelectItem>
                <SelectItem value="outOfStock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="priceLow">Price (Low to High)</SelectItem>
                <SelectItem value="priceHigh">Price (High to Low)</SelectItem>
                <SelectItem value="caliber">Caliber</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
            {sortedProducts.map((product) => (
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
        ) : (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
            <p className="text-muted-foreground mb-6">
              {stockFilter === "inStock"
                ? "No products are currently in stock for this category."
                : stockFilter === "outOfStock"
                ? "No out of stock products in this category."
                : "This category doesn't have any products yet."}
            </p>
            <Link to="/products">
              <Button variant="outline">Browse All Products</Button>
            </Link>
          </div>
        )}

        {ammoCategory && sortedProducts.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">About {categoryName}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Specifications</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Caliber: {ammoCategory.caliber}</li>
                    <li>• Category: {categoryName}</li>
                    <li>• Sales Rank: #{ammoCategory.id} nationwide</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Usage</h3>
                  <p className="text-muted-foreground">{categoryDescription}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
