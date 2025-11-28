import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Target } from "lucide-react";
import { ProductList } from "./ProductList";
import { FirearmList } from "./FirearmList";
import { ProductForm } from "./ProductForm";
import { FirearmForm } from "./FirearmForm";

export const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingFirearm, setEditingFirearm] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showFirearmForm, setShowFirearmForm] = useState(false);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleEditFirearm = (firearm: any) => {
    setEditingFirearm(firearm);
    setShowFirearmForm(true);
  };

  const handleCloseProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleCloseFirearmForm = () => {
    setShowFirearmForm(false);
    setEditingFirearm(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-tactical" />
          Product Management
        </CardTitle>
        <CardDescription>
          Add, edit, or remove products and firearms from your inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Ammunition
            </TabsTrigger>
            <TabsTrigger value="firearms" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Firearms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {showProductForm ? (
              <ProductForm
                product={editingProduct}
                onClose={handleCloseProductForm}
                onSuccess={() => {
                  // Trigger refresh by closing and reopening
                  setShowProductForm(false);
                }}
              />
            ) : (
              <ProductList
                onEdit={handleEditProduct}
                onAdd={() => setShowProductForm(true)}
              />
            )}
          </TabsContent>

          <TabsContent value="firearms" className="space-y-4">
            {showFirearmForm ? (
              <FirearmForm
                firearm={editingFirearm}
                onClose={handleCloseFirearmForm}
              />
            ) : (
              <FirearmList
                onEdit={handleEditFirearm}
                onAdd={() => setShowFirearmForm(true)}
              />
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 rounded-lg bg-muted/50 border border-border p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Product data is stored in your browser's local storage. 
            For production use with persistent database storage, enable Lovable Cloud and migrate your data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
