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
  finish?: string;
  finishVariations?: {
    finish: string;
    price: number;
    inStock: boolean;
    image?: string;
    colorCode: string;
  }[];
}

export const FirearmCard = ({ id, name, manufacturer, caliber, price: initialPrice, inStock: initialInStock, actionType, image: initialImage, finish: initialFinish, finishVariations }: FirearmCardProps) => {
  const [selectedVariation, setSelectedVariation] = useState({
    finish: initialFinish || '',
    price: initialPrice,
    inStock: initialInStock,
    image: initialImage,
    colorCode: ''
  });
  
  const [showPriceChange, setShowPriceChange] = useState(false);

  const handleFinishClick = (e: React.MouseEvent, variant: { finish: string; price: number; inStock: boolean; image?: string; colorCode: string }) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowPriceChange(true);
    setTimeout(() => setShowPriceChange(false), 2000);
    
    setSelectedVariation({
      finish: variant.finish,
      price: variant.price,
      inStock: variant.inStock,
      image: variant.image || initialImage,
      colorCode: variant.colorCode
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
          {selectedVariation.finish && (
            <Badge className="absolute top-2 right-2 bg-tactical/90 text-tactical-foreground backdrop-blur-sm transition-all duration-300">
              {selectedVariation.finish}
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
          <p className="text-xs text-muted-foreground mb-2">{manufacturer} • {actionType}</p>
          
          {finishVariations && finishVariations.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1.5">Finish Options:</p>
              <div className="flex flex-wrap gap-2">
                {finishVariations.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleFinishClick(e, variant)}
                    className={`group/swatch relative px-3 py-1.5 text-xs font-semibold rounded-md border transition-all duration-200 flex items-center gap-2 ${
                      variant.finish === selectedVariation.finish
                        ? 'bg-tactical text-tactical-foreground border-tactical shadow-sm scale-105'
                        : variant.inStock
                        ? 'bg-secondary border-border hover:border-tactical/50 hover:bg-tactical/10 hover:scale-105'
                        : 'bg-muted border-border text-muted-foreground line-through opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!variant.inStock}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                    {variant.finish}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {caliber.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1.5">Available Calibers:</p>
              <div className="flex flex-wrap gap-1.5">
                {caliber.slice(0, 3).map((cal, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {cal}
                  </Badge>
                ))}
                {caliber.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{caliber.length - 3} more
                  </Badge>
                )}
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
              <Badge variant="outline" className="border-tactical text-tactical transition-all duration-300">Available</Badge>
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