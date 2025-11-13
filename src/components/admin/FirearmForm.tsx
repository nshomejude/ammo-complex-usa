import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { firearms as defaultFirearms } from "@/data/firearms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "firearms_data";

interface FirearmFormProps {
  firearm?: any;
  onClose: () => void;
}

export const FirearmForm = ({ firearm, onClose }: FirearmFormProps) => {
  const [formData, setFormData] = useState({
    id: firearm?.id || "",
    name: firearm?.name || "",
    manufacturer: firearm?.manufacturer || "",
    categorySlug: firearm?.categorySlug || "semi-auto-pistols",
    caliber: firearm?.caliber || [""],
    price: firearm?.price || 0,
    inStock: firearm?.inStock ?? true,
    description: firearm?.description || "",
    actionType: firearm?.actionType || "",
    capacity: firearm?.capacity || "",
    barrelLength: firearm?.barrelLength || "",
    weight: firearm?.weight || "",
    finish: firearm?.finish || "",
  });

  const handleCaliberChange = (index: number, value: string) => {
    const newCalibers = [...formData.caliber];
    newCalibers[index] = value;
    setFormData({ ...formData, caliber: newCalibers });
  };

  const addCaliberField = () => {
    setFormData({ ...formData, caliber: [...formData.caliber, ""] });
  };

  const removeCaliberField = (index: number) => {
    const newCalibers = formData.caliber.filter((_, i) => i !== index);
    setFormData({ ...formData, caliber: newCalibers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.manufacturer) {
      toast.error("Please fill in all required fields");
      return;
    }

    const filteredCalibers = formData.caliber.filter(c => c.trim() !== "");
    if (filteredCalibers.length === 0) {
      toast.error("Please add at least one caliber");
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const firearms = stored ? JSON.parse(stored) : defaultFirearms;

    const firearmData = {
      ...formData,
      caliber: filteredCalibers,
      price: Number(formData.price),
    };

    if (firearm) {
      // Update existing firearm
      const updatedFirearms = firearms.map((f: any) =>
        f.id === firearm.id ? firearmData : f
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFirearms));
      toast.success("Firearm updated successfully");
    } else {
      // Add new firearm
      firearms.push(firearmData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(firearms));
      toast.success("Firearm added successfully");
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {firearm ? "Edit Firearm" : "Add New Firearm"}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">Firearm ID *</Label>
          <Input
            id="id"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="e.g., glock-17"
            required
            disabled={!!firearm}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Firearm Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Glock 17"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer *</Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            placeholder="e.g., Glock"
            required
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
            placeholder="599.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="actionType">Action Type</Label>
          <Input
            id="actionType"
            value={formData.actionType}
            onChange={(e) => setFormData({ ...formData, actionType: e.target.value })}
            placeholder="e.g., Semi-Automatic"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="e.g., 17+1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="barrelLength">Barrel Length</Label>
          <Input
            id="barrelLength"
            value={formData.barrelLength}
            onChange={(e) => setFormData({ ...formData, barrelLength: e.target.value })}
            placeholder="e.g., 4.49 inches"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 25.06 oz"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="finish">Finish</Label>
          <Input
            id="finish"
            value={formData.finish}
            onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
            placeholder="e.g., Matte Black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categorySlug">Category</Label>
          <Select value={formData.categorySlug} onValueChange={(value) => setFormData({ ...formData, categorySlug: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semi-auto-pistols">Semi-Auto Pistols</SelectItem>
              <SelectItem value="compact-pistols">Compact Pistols</SelectItem>
              <SelectItem value="revolvers">Revolvers</SelectItem>
              <SelectItem value="bolt-action-rifles">Bolt Action Rifles</SelectItem>
              <SelectItem value="precision-rifles">Precision Rifles</SelectItem>
              <SelectItem value="sniper-rifles">Sniper Rifles</SelectItem>
              <SelectItem value="ar-style-rifles">AR-Style Rifles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Calibers *</Label>
        {formData.caliber.map((cal, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={cal}
              onChange={(e) => handleCaliberChange(index, e.target.value)}
              placeholder="e.g., 9mm"
            />
            {formData.caliber.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCaliberField(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCaliberField}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Caliber
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Firearm description..."
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
          {firearm ? "Update Firearm" : "Add Firearm"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
