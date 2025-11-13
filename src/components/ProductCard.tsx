import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import placeholderImage from "@/assets/placeholder-product.jpg";
import { useState } from "react";

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
    image?: string;
  }[];
}

export const ProductCard = ({ id, name, caliber, rounds, price: initialPrice, inStock: initialInStock, image: initialImage, grainWeight: initialGrainWeight, grainWeightVariations }: ProductCardProps) => {
  const [selectedVariation, setSelectedVariation] = useState({
    grainWeight: initialGrainWeight || '',
    price: initialPrice,
    inStock: initialInStock,
    image: initialImage
  });
  
  const [showPriceChange, setShowPriceChange] = useState(false);

  const handleVariationClick = (e: React.MouseEvent, variant: { grainWeight: string; price: number; inStock: boolean; image?: string }) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowPriceChange(true);
    setTimeout(() => setShowPriceChange(false), 2000);
    
    setSelectedVariation({
      grainWeight: variant.grainWeight,
      price: variant.price,
      inStock: variant.inStock,
      image: variant.image || initialImage
    });
  };

  const priceDifference = selectedVariation.price - initialPrice;
  const hasPriceChange = Math.abs(priceDifference) > 0.01;
  const isCheaper = priceDifference < 0;

  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-tactical/50 cursor-pointer h-full group">
      <div className="aspect-square bg-secondary overflow-hidden relative">
        <img 
          src={selectedVariation.image || placeholderImage} 
          alt={name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
        />
        {selectedVariation.grainWeight && (
          <Badge className="absolute top-2 right-2 bg-tactical/90 text-tactical-foreground backdrop-blur-sm transition-all duration-300">
            {selectedVariation.grainWeight}
          </Badge>
        )}
        
        {hasPriceChange && showPriceChange && (
          <div className={`absolute top-2 left-2 px-3 py-1.5 rounded-full backdrop-blur-sm font-semibold text-sm animate-scale-in ${
            isCheaper 
              ? 'bg-green-500/90 text-white' 
              : 'bg-orange-500/90 text-white'
          }`}>
            {isCheaper ? '↓' : '↑'} ${Math.abs(priceDifference).toFixed(2)}
          </div>
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
                  onClick={(e) => handleVariationClick(e, variant)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all duration-200 ${
                    variant.grainWeight === selectedVariation.grainWeight
                      ? 'bg-tactical text-tactical-foreground border-tactical shadow-sm scale-105'
                      : variant.inStock
                      ? 'bg-secondary border-border hover:border-tactical/50 hover:bg-tactical/10 hover:scale-105'
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
        
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold transition-all duration-300 ${
              hasPriceChange && showPriceChange 
                ? isCheaper 
                  ? 'text-green-500 animate-pulse' 
                  : 'text-orange-500 animate-pulse'
                : 'text-tactical'
            }`}>
              ${selectedVariation.price.toFixed(2)}
            </span>
            {hasPriceChange && (
              <span className={`text-xs font-medium transition-all duration-300 ${
                isCheaper ? 'text-green-500' : 'text-orange-500'
              }`}>
                {isCheaper ? `Save $${Math.abs(priceDifference).toFixed(2)}` : `+$${priceDifference.toFixed(2)}`}
              </span>
            )}
          </div>
          {selectedVariation.inStock ? (
            <Badge variant="outline" className="border-tactical text-tactical transition-all duration-300">In Stock</Badge>
          ) : (
            <Badge variant="outline" className="border-destructive text-destructive transition-all duration-300">Out of Stock</Badge>
          )}
        </div>
        
        {hasPriceChange && (
          <div className="text-xs text-muted-foreground line-through">
            Base: ${initialPrice.toFixed(2)}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-tactical hover:bg-tactical/90 transition-all duration-300" 
          disabled={!selectedVariation.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {selectedVariation.inStock ? 'View Details' : 'Out of Stock'}
        </Button>
      </CardFooter>
      </Card>
    </Link>
  );
};
