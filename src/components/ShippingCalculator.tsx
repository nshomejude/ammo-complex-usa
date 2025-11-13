import { useState } from "react";
import { Package, Clock } from "lucide-react";
import { shippingConfig, ShippingRegion } from "@/config/shipping";
import { Badge } from "@/components/ui/badge";

interface ShippingCalculatorProps {
  quantity: number;
}

export const ShippingCalculator = ({ quantity }: ShippingCalculatorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<ShippingRegion>('usEu');
  const [selectedMethod, setSelectedMethod] = useState<'standard' | 'express'>('standard');

  const region = shippingConfig.regions[selectedRegion];
  const method = region[selectedMethod];

  return (
    <div className="border-t border-border pt-3 mt-3 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Package className="h-4 w-4" />
        <span>Shipping Calculator</span>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          {(Object.keys(shippingConfig.regions) as ShippingRegion[]).map((regionKey) => (
            <button
              key={regionKey}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedRegion(regionKey);
              }}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-200 ${
                regionKey === selectedRegion
                  ? 'bg-tactical text-tactical-foreground border-tactical'
                  : 'bg-secondary border-border hover:border-tactical/50'
              }`}
            >
              {shippingConfig.regions[regionKey].name}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedMethod('standard');
            }}
            className={`flex-1 px-3 py-2 text-xs rounded-md border transition-all duration-200 ${
              selectedMethod === 'standard'
                ? 'bg-tactical text-tactical-foreground border-tactical'
                : 'bg-secondary border-border hover:border-tactical/50'
            }`}
          >
            <div className="font-semibold">{region.standard.label}</div>
            <div className="text-xs opacity-90">${region.standard.cost}</div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedMethod('express');
            }}
            className={`flex-1 px-3 py-2 text-xs rounded-md border transition-all duration-200 ${
              selectedMethod === 'express'
                ? 'bg-tactical text-tactical-foreground border-tactical'
                : 'bg-secondary border-border hover:border-tactical/50'
            }`}
          >
            <div className="font-semibold">{region.express.label}</div>
            <div className="text-xs opacity-90">${region.express.cost}</div>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Delivery: {method.days} days</span>
        </div>
        <Badge variant="secondary" className="font-semibold">
          ${method.cost.toFixed(2)}
        </Badge>
      </div>
    </div>
  );
};
