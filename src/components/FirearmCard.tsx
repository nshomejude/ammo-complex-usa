import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import placeholderImage from "@/assets/placeholder-product.jpg";
import { useState } from "react";

interface FirearmCardProps {
  id: string;
  name: string;
  manufacturer: string;
  caliber: string[];
  price: number;
  inStock: boolean;
  actionType: string;
  image?: string;
  capacity?: string;
  quantityVariations?: {
    quantity: number;
    price: number;
    inStock: boolean;
    image?: string;
  }[];
}

export const FirearmCard = ({ id, name, manufacturer, caliber, price: initialPrice, inStock: initialInStock, actionType, image: initialImage, capacity, quantityVariations }: FirearmCardProps) => {
  const [selectedVariation, setSelectedVariation] = useState({
    quantity: 1,
    price: initialPrice,
    inStock: initialInStock,
    image: initialImage
  });
  
  const [showPriceChange, setShowPriceChange] = useState(false);

  const handleQuantityClick = (e: React.MouseEvent, variant: { quantity: number; price: number; inStock: boolean; image?: string }) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowPriceChange(true);
    setTimeout(() => setShowPriceChange(false), 2000);
    
    setSelectedVariation({
      quantity: variant.quantity,
      price: variant.price,
      inStock: variant.inStock,
      image: variant.image || initialImage
    });
  };

  const priceDifference = selectedVariation.price - initialPrice;
  const hasPriceChange = Math.abs(priceDifference) > 0.01;
  const isCheaper = priceDifference < 0;

  return (
    <Link to={`/firearm/${id}`}>
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
          <Badge className="absolute top-1 sm:top-2 right-1 sm:right-2 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-tactical/90 text-tactical-foreground backdrop-blur-sm transition-all duration-300">
            Qty: {selectedVariation.quantity}
          </Badge>
          
          {hasPriceChange && showPriceChange && (
            <div className={`absolute top-1 sm:top-2 left-1 sm:left-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm font-semibold text-xs sm:text-sm animate-scale-in ${
              isCheaper 
                ? 'bg-green-500/90 text-white' 
                : 'bg-orange-500/90 text-white'
            }`}>
              {isCheaper ? '↓' : '↑'} ${Math.abs(priceDifference).toFixed(2)}
            </div>
          )}
        </div>
        
        <CardContent className="p-2 sm:p-4">
          <h3 className="font-semibold mb-1 sm:mb-2 line-clamp-2 text-sm sm:text-base">{name}</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-2">{manufacturer} • {actionType}</p>
          
          {quantityVariations && quantityVariations.length > 0 && (
            <div className="mb-2 sm:mb-3">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-1.5">Quantity:</p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {quantityVariations.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleQuantityClick(e, variant)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-md border transition-all duration-200 ${
                      variant.quantity === selectedVariation.quantity
                        ? 'bg-tactical text-tactical-foreground border-tactical shadow-sm scale-105'
                        : variant.inStock
                        ? 'bg-secondary border-border hover:border-tactical/50 hover:bg-tactical/10 hover:scale-105'
                        : 'bg-muted border-border text-muted-foreground line-through opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!variant.inStock}
                  >
                    {variant.quantity}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {caliber.length > 0 && (
            <div className="mb-2 sm:mb-3">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-1.5">Available Calibers:</p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {caliber.slice(0, 3).map((cal, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                    {cal}
                  </Badge>
                ))}
                {caliber.length > 3 && (
                  <Badge variant="secondary" className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                    +{caliber.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className={`text-lg sm:text-2xl font-bold transition-all duration-300 ${
                hasPriceChange && showPriceChange 
                  ? isCheaper 
                    ? 'text-green-500 animate-pulse' 
                    : 'text-orange-500 animate-pulse'
                  : 'text-tactical'
              }`}>
                ${selectedVariation.price.toFixed(2)}
              </span>
              {hasPriceChange && (
                <span className={`text-[9px] sm:text-xs font-medium transition-all duration-300 ${
                  isCheaper ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {isCheaper ? `Save $${Math.abs(priceDifference).toFixed(2)}` : `+$${priceDifference.toFixed(2)}`}
                </span>
              )}
            </div>
            {selectedVariation.inStock ? (
              <Badge variant="outline" className="border-tactical text-tactical text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 transition-all duration-300">Available</Badge>
            ) : (
              <Badge variant="outline" className="border-destructive text-destructive text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 transition-all duration-300">Out of Stock</Badge>
            )}
          </div>
          
          {hasPriceChange && (
            <div className="text-[10px] sm:text-xs text-muted-foreground line-through">
              Base: ${initialPrice.toFixed(2)}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-2 sm:p-4 sm:pt-0 pt-0">
          <Button 
            className="w-full bg-tactical hover:bg-tactical/90 transition-all duration-300 h-8 sm:h-10 text-xs sm:text-sm" 
            disabled={!selectedVariation.inStock}
          >
            <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {selectedVariation.inStock ? 'View Details' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};