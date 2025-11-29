import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Save, Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSuccess: () => void;
}

interface Variation {
  name: string;
  price_modifier: number;
  description: string;
}

export const ProductForm = ({ product, onClose, onSuccess }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    caliber: product?.caliber || "",
    rounds: product?.rounds || 0,
    price: product?.price || 0,
    inStock: product?.in_stock ?? true,
    category: product?.category || "rifle",
    description: product?.description || "",
    manufacturer: product?.manufacturer || "",
    grainWeight: product?.grainWeight || "",
    stockQuantity: product?.stock_quantity || 0,
    lowStockThreshold: product?.low_stock_threshold || 10,
    imageUrl: product?.image_url || "",
  });

  const [variations, setVariations] = useState<Variation[]>(
    product?.variations || []
  );
  const [newVariation, setNewVariation] = useState<Variation>({
    name: "",
    price_modifier: 0,
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.caliber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload image if a new file was selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${formData.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const productData = {
        id: formData.id,
        name: formData.name,
        caliber: formData.caliber,
        price: Number(formData.price),
        rounds: Number(formData.rounds),
        manufacturer: formData.manufacturer,
        description: formData.description,
        in_stock: formData.inStock,
        stock_quantity: Number(formData.stockQuantity),
        low_stock_threshold: Number(formData.lowStockThreshold),
        image_url: imageUrl,
        variations: variations.length > 0 ? (variations as any) : null,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success("Product added successfully");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setUploading(false);
    }
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Product Image</Label>
          <div className="flex items-center gap-4 mt-2">
            {formData.imageUrl && (
              <img 
                src={formData.imageUrl} 
                alt="Product preview" 
                className="w-20 h-20 object-cover rounded-md border"
              />
            )}
            <div className="flex-1">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
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
          <Label htmlFor="stockQuantity">Stock Quantity *</Label>
          <Input
            id="stockQuantity"
            type="number"
            min="0"
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lowStockThreshold">Low Stock Alert Threshold *</Label>
          <Input
            id="lowStockThreshold"
            type="number"
            min="0"
            value={formData.lowStockThreshold}
            onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
            placeholder="10"
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Product Variations (Optional)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add quantity or package variations with different pricing
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {variations.map((variation, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="flex-1 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-sm font-medium">{variation.name}</p>
                  <p className="text-xs text-muted-foreground">{variation.description}</p>
                </div>
                <div className="text-sm">
                  Base Price: ${formData.price}
                </div>
                <div className="text-sm">
                  Modifier: ${variation.price_modifier >= 0 ? '+' : ''}{variation.price_modifier}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setVariations(variations.filter((_, i) => i !== index))}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-dashed rounded-lg">
            <div className="space-y-2">
              <Label className="text-xs">Variation Name</Label>
              <Input
                placeholder="e.g., 50 Rounds"
                value={newVariation.name}
                onChange={(e) => setNewVariation({ ...newVariation, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Price Modifier ($)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g., 10"
                value={newVariation.price_modifier}
                onChange={(e) => setNewVariation({ ...newVariation, price_modifier: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="e.g., Box of 50"
                value={newVariation.description}
                onChange={(e) => setNewVariation({ ...newVariation, description: e.target.value })}
              />
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (!newVariation.name.trim()) {
                toast.error("Please enter a variation name");
                return;
              }
              setVariations([...variations, newVariation]);
              setNewVariation({ name: "", price_modifier: 0, description: "" });
              toast.success("Variation added");
            }}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Variation
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="bg-tactical hover:bg-tactical/90" disabled={uploading}>
          <Save className="mr-2 h-4 w-4" />
          {uploading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};