import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { ShoppingCart, AlertCircle, ArrowLeft, Package, Shield, CheckCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Alert className="border-destructive bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive-foreground">Product Not Found</AlertTitle>
            <AlertDescription className="text-destructive-foreground">
              The product you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity}x ${product.name} to cart`);
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 50));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const totalPrice = (product.price * quantity).toFixed(2);

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Product Image/Placeholder */}
          <Card className="overflow-hidden">
            <div className="aspect-square bg-secondary flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-8xl font-bold text-tactical mb-4">{product.caliber}</div>
                <div className="text-2xl text-muted-foreground">{product.rounds} Rounds</div>
              </div>
            </div>
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-center gap-3">
              {product.inStock ? (
                <Badge className="bg-tactical text-tactical-foreground border-0 text-base px-4 py-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="border-destructive text-destructive text-base px-4 py-1">
                  Out of Stock
                </Badge>
              )}
              <Badge variant="outline" className="text-base px-4 py-1">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
            </div>

            <Separator />

            <div>
              <div className="text-4xl font-bold text-tactical mb-2">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">Per box of {product.rounds} rounds</p>
              <p className="text-xs text-muted-foreground mt-1">
                ${(product.price / product.rounds).toFixed(3)} per round
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= 50}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: <span className="text-xl font-bold text-foreground">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full bg-tactical hover:bg-tactical/90 text-lg py-6"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Legal Notice */}
            <Alert className="border-warning bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning-foreground">Legal Purchase Requirements</AlertTitle>
              <AlertDescription className="text-warning-foreground text-sm">
                You must be 18+ for rifle/shotgun ammunition and 21+ for handgun ammunition. 
                Valid ID and compliance with all federal, state, and local laws required.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Caliber</p>
                  <p className="font-semibold text-lg">{product.caliber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rounds per Box</p>
                  <p className="font-semibold text-lg">{product.rounds}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bullet Weight</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'pistol' ? '115-147 gr' : 
                     product.category === 'rifle' ? '55-168 gr' : 
                     product.category === 'shotgun' ? '1 oz' : '40 gr'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Muzzle Velocity</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'pistol' ? '1,100-1,200 fps' : 
                     product.category === 'rifle' ? '2,700-3,000 fps' : 
                     product.category === 'shotgun' ? '1,200-1,325 fps' : '1,200 fps'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bullet Type</p>
                  <p className="font-semibold text-lg">
                    {product.name.includes('FMJ') ? 'Full Metal Jacket (FMJ)' : 
                     product.name.includes('Defense') ? 'Jacketed Hollow Point (JHP)' : 
                     product.name.includes('Buckshot') ? '00 Buckshot' : 
                     product.name.includes('Slug') ? 'Rifled Slug' : 
                     'Soft Point (SP)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Case Material</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'shotgun' ? 'Plastic Hull' : 'Brass'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Primer Type</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'rimfire' ? 'Rimfire' : 
                     product.category === 'shotgun' ? '209 Primer' : 'Boxer Primer'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reloadable</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'rimfire' ? 'No' : 'Yes'}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold mb-3">Recommended Use</h3>
                <div className="flex flex-wrap gap-2">
                  {product.name.includes('Defense') && (
                    <>
                      <Badge variant="secondary">Self Defense</Badge>
                      <Badge variant="secondary">Home Protection</Badge>
                    </>
                  )}
                  {product.name.includes('FMJ') && (
                    <>
                      <Badge variant="secondary">Target Practice</Badge>
                      <Badge variant="secondary">Training</Badge>
                    </>
                  )}
                  {product.name.includes('Match') && (
                    <>
                      <Badge variant="secondary">Competition</Badge>
                      <Badge variant="secondary">Long Range</Badge>
                    </>
                  )}
                  {product.category === 'rifle' && !product.name.includes('FMJ') && (
                    <>
                      <Badge variant="secondary">Hunting</Badge>
                      <Badge variant="secondary">Target Shooting</Badge>
                    </>
                  )}
                  {product.category === 'shotgun' && (
                    <>
                      {product.name.includes('Buckshot') && <Badge variant="secondary">Home Defense</Badge>}
                      {product.name.includes('Target') && <Badge variant="secondary">Clay Sports</Badge>}
                      {product.name.includes('Slug') && <Badge variant="secondary">Hunting</Badge>}
                    </>
                  )}
                  {product.category === 'rimfire' && (
                    <>
                      <Badge variant="secondary">Plinking</Badge>
                      <Badge variant="secondary">Small Game</Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-tactical/30 bg-tactical/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-tactical" />
                  Shipping Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-semibold">
                    {product.rounds >= 50 ? '2-3 lbs' : 
                     product.rounds >= 20 ? '1-2 lbs' : '0.5-1 lb'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HazMat Required:</span>
                  <span className="font-semibold">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Signature Required:</span>
                  <span className="font-semibold">Adult (21+)</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard Shipping:</span>
                  <span className="font-semibold">3-7 days</span>
                </div>
                <Link to="/shipping">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Shipping Policy
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-tactical" />
                  Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Factory fresh ammunition</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Quality guaranteed by manufacturer</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Secure HazMat packaging</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Full compliance verification</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-tactical/50 cursor-pointer">
                    <div className="aspect-square bg-secondary flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold text-tactical mb-2">{relatedProduct.caliber}</div>
                        <div className="text-sm text-muted-foreground">{relatedProduct.rounds} Rounds</div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-tactical">${relatedProduct.price.toFixed(2)}</span>
                        {relatedProduct.inStock ? (
                          <Badge variant="outline" className="border-tactical text-tactical">In Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="border-destructive text-destructive">Out of Stock</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;