import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import placeholderImage from "@/assets/placeholder-product.jpg";

interface ProductCardProps {
  id: string;
  name: string;
  caliber: string;
  rounds: number;
  price: number;
  inStock: boolean;
  image?: string;
  grainWeight?: string;
  grainWeightVariations?: {
    grainWeight: string;
    price: number;
    inStock: boolean;
  }[];
}

export const ProductCard = ({ id, name, caliber, rounds, price, inStock, image, grainWeight, grainWeightVariations }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-tactical/50 cursor-pointer h-full">
      <div className="aspect-square bg-secondary overflow-hidden relative">
        <img 
          src={image || placeholderImage} 
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
        />
        {grainWeight && (
          <Badge className="absolute top-2 right-2 bg-tactical/90 text-tactical-foreground">
            {grainWeight}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{caliber} • {rounds} Rounds</p>
        
        {grainWeightVariations && grainWeightVariations.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1.5">Grain Weight:</p>
            <div className="flex flex-wrap gap-1.5">
              {grainWeightVariations.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={(e) => e.preventDefault()}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                    variant.grainWeight === grainWeight
                      ? 'bg-tactical text-tactical-foreground border-tactical shadow-sm'
                      : variant.inStock
                      ? 'bg-secondary border-border hover:border-tactical/50 hover:bg-tactical/10'
                      : 'bg-muted border-border text-muted-foreground line-through opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!variant.inStock}
                >
                  {variant.grainWeight}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-tactical">${price.toFixed(2)}</span>
          {inStock ? (
            <Badge variant="outline" className="border-tactical text-tactical">In Stock</Badge>
          ) : (
            <Badge variant="outline" className="border-destructive text-destructive">Out of Stock</Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-tactical hover:bg-tactical/90" 
          disabled={!inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {inStock ? 'View Details' : 'Out of Stock'}
        </Button>
      </CardFooter>
      </Card>
    </Link>
  );
};
