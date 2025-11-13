import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Save } from "lucide-react";
import { toast } from "sonner";
import { products as defaultProducts } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "products_data";

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    caliber: product?.caliber || "",
    rounds: product?.rounds || 0,
    price: product?.price || 0,
    inStock: product?.inStock ?? true,
    category: product?.category || "rifle",
    description: product?.description || "",
    manufacturer: product?.manufacturer || "",
    grainWeight: product?.grainWeight || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.caliber) {
      toast.error("Please fill in all required fields");
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const products = stored ? JSON.parse(stored) : defaultProducts;

    if (product) {
      // Update existing product
      const updatedProducts = products.map((p: any) =>
        p.id === product.id ? { ...formData, price: Number(formData.price), rounds: Number(formData.rounds) } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
      toast.success("Product updated successfully");
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        price: Number(formData.price),
        rounds: Number(formData.rounds),
      };
      products.push(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      toast.success("Product added successfully");
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">Product ID *</Label>
          <Input
            id="id"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="e.g., 556-federal-xm193"
            required
            disabled={!!product}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Federal XM193 55gr FMJ"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="caliber">Caliber *</Label>
          <Input
            id="caliber"
            value={formData.caliber}
            onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
            placeholder="e.g., 5.56 NATO"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            placeholder="e.g., Federal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rounds">Rounds</Label>
          <Input
            id="rounds"
            type="number"
            value={formData.rounds}
            onChange={(e) => setFormData({ ...formData, rounds: parseInt(e.target.value) || 0 })}
            placeholder="20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            placeholder="14.99"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grainWeight">Grain Weight</Label>
          <Input
            id="grainWeight"
            value={formData.grainWeight}
            onChange={(e) => setFormData({ ...formData, grainWeight: e.target.value })}
            placeholder="e.g., 55gr"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rifle">Rifle</SelectItem>
              <SelectItem value="pistol">Pistol</SelectItem>
              <SelectItem value="shotgun">Shotgun</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product description..."
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="inStock"
          checked={formData.inStock}
          onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="bg-tactical hover:bg-tactical/90">
          <Save className="mr-2 h-4 w-4" />
          {product ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
