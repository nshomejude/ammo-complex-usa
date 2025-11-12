import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { FirearmCard } from "@/components/FirearmCard";
import { firearms } from "@/data/firearms";
import { firearmCategories } from "@/data/firearmCategories";
import { products } from "@/data/products";
import { Shield, Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FirearmDetail = () => {
  const { id } = useParams();
  const firearm = firearms.find(f => f.id === id);

  if (!firearm) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Firearm Not Found</AlertTitle>
            <AlertDescription>
              The firearm you're looking for doesn't exist in our catalog.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const category = firearmCategories.find(cat => cat.slug === firearm.categorySlug);
  const relatedFirearms = firearms
    .filter(f => f.categorySlug === firearm.categorySlug && f.id !== firearm.id)
    .slice(0, 4);
  
  const compatibleAmmo = products.filter(product => 
    firearm.caliber.some(cal => product.caliber.includes(cal))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16">
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning-foreground">FFL Transfer Required</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            This firearm must be transferred to a licensed FFL dealer. Background check and age verification (21+ for handguns, 18+ for long guns) required by federal law.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center p-12">
            <div className="text-center">
              <Shield className="h-48 w-48 mx-auto text-tactical mb-6" />
              <Badge variant="secondary" className="text-lg px-4 py-2">{firearm.actionType}</Badge>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">{firearm.manufacturer}</p>
              <h1 className="text-4xl font-bold mb-4">{firearm.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {firearm.caliber.map((cal, idx) => (
                  <Badge key={idx} variant="outline" className="border-tactical text-tactical">
                    {cal}
                  </Badge>
                ))}
                {category && (
                  <Link to={`/firearm-category/${category.slug}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      {category.name}
                    </Badge>
                  </Link>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-tactical">${firearm.price.toFixed(2)}</span>
                {firearm.inStock ? (
                  <Badge className="bg-tactical text-tactical-foreground">Available</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Price may vary by location and FFL dealer fees apply</p>
            </div>

            <p className="text-muted-foreground mb-6">{firearm.description}</p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Action Type</p>
                  <p className="font-semibold">{firearm.actionType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{firearm.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barrel Length</p>
                  <p className="font-semibold">{firearm.barrelLength}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-semibold">{firearm.weight}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Finish</p>
                  <p className="font-semibold">{firearm.finish}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                className="w-full bg-tactical hover:bg-tactical/90"
                size="lg"
                disabled={!firearm.inStock}
              >
                <Phone className="mr-2 h-5 w-5" />
                {firearm.inStock ? 'Contact to Purchase' : 'Out of Stock'}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Request More Info
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <MapPin className="mr-2 h-5 w-5" />
                Find FFL Dealer
              </Button>
            </div>

            {category && (
              <Alert className="mt-6">
                <AlertDescription>
                  <strong>Age Requirement:</strong> {category.ageRequirement}+ years old
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {compatibleAmmo.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Compatible Ammunition</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {compatibleAmmo.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {relatedFirearms.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Related Firearms</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFirearms.map((related) => (
                <FirearmCard key={related.id} {...related} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default FirearmDetail;