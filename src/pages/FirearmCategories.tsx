import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FirearmCategoryCard } from "@/components/FirearmCategoryCard";
import { firearmCategories } from "@/data/firearmCategories";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const FirearmCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredCategories = firearmCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "trending" && category.trending) ||
                         (filterType === "pistol" && (category.slug.includes("pistol") || category.slug.includes("revolver"))) ||
                         (filterType === "rifle" && category.slug.includes("rifle")) ||
                         (filterType === "shotgun" && category.slug.includes("shotgun"));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-tactical" />
            <div>
              <h1 className="text-4xl font-bold">Firearm Categories</h1>
              <p className="text-muted-foreground">Browse all firearm categories including sniper rifles, 1911 pistols, and specialty firearms</p>
            </div>
          </div>
        </div>

        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning-foreground">Information Notice</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            Arms Complex specializes in ammunition sales. These categories represent the types of firearms our ammunition supports. 
            All ammunition purchases require proper licensing and age verification.
          </AlertDescription>
        </Alert>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search firearm categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:flex-1"
          />
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="trending">Trending Only</SelectItem>
              <SelectItem value="pistol">Pistols & Revolvers</SelectItem>
              <SelectItem value="rifle">Rifles</SelectItem>
              <SelectItem value="shotgun">Shotguns</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredCategories.length}</span> of{" "}
            <span className="font-semibold text-foreground">{firearmCategories.length}</span> categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCategories.map((category) => (
            <FirearmCategoryCard key={category.id} {...category} />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories match your search criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FirearmCategories;