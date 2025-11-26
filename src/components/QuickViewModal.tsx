import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Package, Target, Zap } from "lucide-react";
import { Product } from "@/data/products";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedVariation, setSelectedVariation] = useState(0);
  const { addToCart } = useCart();

  if (!product) return null;

  const currentVariation = product.quantityVariations?.[selectedVariation] || {
    rounds: product.rounds,
    price: product.price,
    inStock: product.inStock,
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentVariation.price,
      image: "/placeholder.svg",
      type: 'product',
      variation: product.quantityVariations ? {
        type: 'rounds',
        value: `${currentVariation.rounds} rounds`
      } : undefined
    });
    
    toast.success(`Added ${product.name} (${currentVariation.rounds} rounds) to cart`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between pr-8">
            <span>Quick View</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden border border-border">
              <img
                src="/placeholder.svg"
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery - if product has variations with images */}
            {product.quantityVariations && product.quantityVariations.some(v => v.image) && (
              <div className="grid grid-cols-4 gap-2">
                {product.quantityVariations.filter(v => v.image).slice(0, 4).map((variation, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-muted rounded border border-border cursor-pointer hover:border-primary transition-colors overflow-hidden"
                    onClick={() => setSelectedVariation(idx)}
                  >
                    <img
                      src={variation.image || "/placeholder.svg"}
                      alt={`${product.name} variation`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <Badge variant="outline" className="text-sm">
                  {product.caliber}
                </Badge>
                {product.manufacturer && (
                  <Badge variant="secondary" className="text-sm">
                    {product.manufacturer}
                  </Badge>
                )}
                {currentVariation.inStock ? (
                  <Badge className="bg-tactical text-tactical-foreground">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                ${currentVariation.price.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentVariation.rounds} rounds
              </div>
            </div>

            <Separator />

            {/* Quantity Variations */}
            {product.quantityVariations && product.quantityVariations.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Quantity</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.quantityVariations.map((variation, idx) => (
                    <Button
                      key={idx}
                      variant={selectedVariation === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariation(idx)}
                      className="flex flex-col h-auto py-3 items-start"
                      disabled={!variation.inStock}
                    >
                      <span className="font-semibold">{variation.rounds} rounds</span>
                      <span className="text-sm">${variation.price.toFixed(2)}</span>
                      {!variation.inStock && (
                        <span className="text-xs text-destructive">Out of Stock</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Specifications
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Caliber:</span>
                  <span className="font-medium">{product.caliber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Rounds:</span>
                  <span className="font-medium">{currentVariation.rounds}</span>
                </div>
                {product.grainWeight && (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Grain:</span>
                    <span className="font-medium">{product.grainWeight}</span>
                  </div>
                )}
                {product.manufacturer && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="font-medium">{product.manufacturer}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {product.shortDescription && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!currentVariation.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = `/product/${product.id}`}
              >
                Full Details
              </Button>
            </div>

            {/* Additional Info */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Features
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}