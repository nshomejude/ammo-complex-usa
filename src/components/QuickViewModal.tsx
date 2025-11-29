import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Package, Target, Zap } from "lucide-react";
import { Product } from "@/data/products";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DBVariation {
  name: string;
  price_modifier: number;
  description: string;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [dbVariations, setDbVariations] = useState<DBVariation[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product && isOpen) {
      fetchVariations();
    }
  }, [product, isOpen]);

  const fetchVariations = async () => {
    if (!product) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('variations')
        .eq('id', product.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data?.variations) {
        setDbVariations(data.variations as unknown as DBVariation[]);
      }
    } catch (error) {
      console.error('Error fetching variations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  // Use database variations if available, otherwise fall back to local data
  const variations = dbVariations.length > 0 
    ? dbVariations.map(v => ({
        name: v.name,
        price: product.price + v.price_modifier,
        description: v.description
      }))
    : product.quantityVariations?.map(v => ({
        name: `${v.rounds} rounds`,
        price: v.price,
        description: `Box of ${v.rounds}`
      })) || [];

  const currentVariation = variations[selectedVariation] || {
    name: `${product.rounds} rounds`,
    price: product.price,
    description: `Box of ${product.rounds}`
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentVariation.price,
      image: (product as any).image || "/placeholder.svg",
      type: 'product',
      variation: variations.length > 0 ? {
        type: 'package',
        value: currentVariation.name
      } : undefined
    });
    
    toast.success(`Added ${product.name} (${currentVariation.name}) to cart`);
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
                {product.inStock ? (
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
                {currentVariation.name}
              </div>
              {currentVariation.description && (
                <div className="text-xs text-muted-foreground">
                  {currentVariation.description}
                </div>
              )}
            </div>

            <Separator />

            {/* Package Variations */}
            {variations.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Package</label>
                <div className="grid grid-cols-2 gap-2">
                  {variations.map((variation, idx) => (
                    <Button
                      key={idx}
                      variant={selectedVariation === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariation(idx)}
                      className="flex flex-col h-auto py-3 items-start"
                    >
                      <span className="font-semibold">{variation.name}</span>
                      <span className="text-sm">${variation.price.toFixed(2)}</span>
                      {variation.description && (
                        <span className="text-xs text-muted-foreground">{variation.description}</span>
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
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium">{currentVariation.name}</span>
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
                disabled={loading}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {loading ? 'Loading...' : 'Add to Cart'}
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