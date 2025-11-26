import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Wallet, Plus, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentAddress {
  id: string;
  payment_type: 'bitcoin' | 'usdt' | 'monero';
  address: string;
  label: string | null;
  is_active: boolean;
}

export const PaymentSettings = () => {
  const [addresses, setAddresses] = useState<PaymentAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    payment_type: "bitcoin" as 'bitcoin' | 'usdt' | 'monero',
    address: "",
    label: "",
    is_active: true,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const { data, error } = await supabase
      .from("payment_addresses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching addresses:", error);
    } else {
      setAddresses(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      // Update existing
      const { error } = await supabase
        .from("payment_addresses")
        .update({
          payment_type: formData.payment_type,
          address: formData.address,
          label: formData.label || null,
          is_active: formData.is_active,
        })
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update address");
        console.error(error);
      } else {
        toast.success("Address updated successfully");
        resetForm();
        fetchAddresses();
      }
    } else {
      // Create new
      const { error } = await supabase.from("payment_addresses").insert({
        payment_type: formData.payment_type,
        address: formData.address,
        label: formData.label || null,
        is_active: formData.is_active,
      });

      if (error) {
        toast.error("Failed to add address");
        console.error(error);
      } else {
        toast.success("Address added successfully");
        resetForm();
        fetchAddresses();
      }
    }
    setLoading(false);
  };

  const handleEdit = (addr: PaymentAddress) => {
    setEditingId(addr.id);
    setFormData({
      payment_type: addr.payment_type,
      address: addr.address,
      label: addr.label || "",
      is_active: addr.is_active,
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("payment_addresses")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast.error("Failed to delete address");
      console.error(error);
    } else {
      toast.success("Address deleted successfully");
      fetchAddresses();
    }
    setDeleteId(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      payment_type: "bitcoin",
      address: "",
      label: "",
      is_active: true,
    });
  };

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'bitcoin': return 'Bitcoin (BTC)';
      case 'usdt': return 'USDT (Tether)';
      case 'monero': return 'Monero (XMR)';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {editingId ? "Edit Payment Address" : "Add Payment Address"}
          </CardTitle>
          <CardDescription>
            Add cryptocurrency addresses for customer payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment_type">Payment Type</Label>
              <Select
                value={formData.payment_type}
                onValueChange={(value: any) => setFormData({ ...formData, payment_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="usdt">USDT (Tether)</SelectItem>
                  <SelectItem value="monero">Monero (XMR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter cryptocurrency address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Main BTC Wallet"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="flex-1">
                {editingId ? <Edit className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {loading ? "Saving..." : editingId ? "Update Address" : "Add Address"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Addresses</CardTitle>
          <CardDescription>Manage your cryptocurrency payment addresses</CardDescription>
        </CardHeader>
        <CardContent>
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No payment addresses added yet
            </p>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{getPaymentTypeLabel(addr.payment_type)}</span>
                      {addr.is_active ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    {addr.label && (
                      <div className="text-sm text-muted-foreground mb-1">{addr.label}</div>
                    )}
                    <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                      {addr.address}
                    </code>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(addr)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteId(addr.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the payment address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
