import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useComparison } from "@/hooks/useComparison";
import { Product } from "@/data/products";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const ComparisonModal = ({ isOpen, onClose, products }: ComparisonModalProps) => {
  const { comparison, removeFromComparison, clearComparison } = useComparison();
  
  const compareProducts = products.filter(p => comparison.includes(p.id));

  if (compareProducts.length === 0) {
    return null;
  }

  const attributes = [
    { key: 'name', label: 'Product Name' },
    { key: 'caliber', label: 'Caliber' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'price', label: 'Price', format: (v: unknown) => `$${(v as number).toFixed(2)}` },
    { key: 'rounds', label: 'Rounds' },
    { key: 'grainWeight', label: 'Grain Weight' },
    { key: 'inStock', label: 'Availability', format: (v: unknown) => (v as boolean) ? 'In Stock' : 'Out of Stock' },
    { key: 'category', label: 'Category' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Compare Products ({compareProducts.length})</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearComparison}
            >
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border bg-muted p-3 text-left font-semibold sticky left-0 z-10 bg-muted">
                    Specification
                  </th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="border border-border p-3 min-w-[200px]">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium">{product.name}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => removeFromComparison(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => (
                  <tr key={attr.key}>
                    <td className="border border-border bg-muted p-3 font-medium sticky left-0 z-10 bg-muted">
                      {attr.label}
                    </td>
                    {compareProducts.map((product) => {
                      const value = product[attr.key as keyof Product];
                      let displayValue = 'N/A';
                      
                      if (value !== undefined && value !== null) {
                        if (attr.format) {
                          displayValue = attr.format(value);
                        } else {
                          displayValue = value.toString();
                        }
                      }
                      
                      return (
                        <td key={product.id} className="border border-border p-3 text-sm">
                          {displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="border border-border bg-muted p-3 font-medium sticky left-0 z-10 bg-muted">
                    Description
                  </td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="border border-border p-3 text-sm">
                      {product.shortDescription || product.description}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
