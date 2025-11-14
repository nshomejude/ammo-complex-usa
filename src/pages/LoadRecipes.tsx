import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Plus, Trash2, Edit, BookOpen, Lock, Unlock, AlertCircle, LogIn } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface LoadRecipe {
  id: string;
  name: string;
  caliber: string;
  bullet_weight: string;
  bullet_type: string;
  powder_type: string;
  powder_charge: string;
  primer: string;
  brass: string;
  coal: string;
  muzzle_velocity: number | null;
  muzzle_energy: number | null;
  accuracy: string | null;
  notes: string | null;
  performance_notes: string | null;
  is_public: boolean;
  created_at: string;
  user_id: string;
}

const LoadRecipes = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [recipes, setRecipes] = useState<LoadRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<LoadRecipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    caliber: "",
    bullet_weight: "",
    bullet_type: "",
    powder_type: "",
    powder_charge: "",
    primer: "",
    brass: "",
    coal: "",
    muzzle_velocity: "",
    muzzle_energy: "",
    accuracy: "",
    notes: "",
    performance_notes: "",
    is_public: false
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchRecipes(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        fetchRecipes(session.user.id);
      } else {
        setRecipes([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRecipes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("load_recipes")
        .select("*")
        .or(`user_id.eq.${userId},is_public.eq.true`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      toast.error("Failed to load recipes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      caliber: "",
      bullet_weight: "",
      bullet_type: "",
      powder_type: "",
      powder_charge: "",
      primer: "",
      brass: "",
      coal: "",
      muzzle_velocity: "",
      muzzle_energy: "",
      accuracy: "",
      notes: "",
      performance_notes: "",
      is_public: false
    });
    setEditingRecipe(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      const recipeData = {
        ...formData,
        muzzle_velocity: formData.muzzle_velocity ? parseInt(formData.muzzle_velocity) : null,
        muzzle_energy: formData.muzzle_energy ? parseInt(formData.muzzle_energy) : null,
        user_id: session.user.id
      };

      if (editingRecipe) {
        const { error } = await supabase
          .from("load_recipes")
          .update(recipeData)
          .eq("id", editingRecipe.id);

        if (error) throw error;
        toast.success("Recipe updated successfully!");
      } else {
        const { error } = await supabase
          .from("load_recipes")
          .insert([recipeData]);

        if (error) throw error;
        toast.success("Recipe created successfully!");
      }

      fetchRecipes(session.user.id);
      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error("Failed to save recipe: " + error.message);
    }
  };

  const handleEdit = (recipe: LoadRecipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      caliber: recipe.caliber,
      bullet_weight: recipe.bullet_weight,
      bullet_type: recipe.bullet_type,
      powder_type: recipe.powder_type,
      powder_charge: recipe.powder_charge,
      primer: recipe.primer,
      brass: recipe.brass,
      coal: recipe.coal,
      muzzle_velocity: recipe.muzzle_velocity?.toString() || "",
      muzzle_energy: recipe.muzzle_energy?.toString() || "",
      accuracy: recipe.accuracy || "",
      notes: recipe.notes || "",
      performance_notes: recipe.performance_notes || "",
      is_public: recipe.is_public
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const { error } = await supabase
        .from("load_recipes")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Recipe deleted successfully!");
      if (session) fetchRecipes(session.user.id);
    } catch (error: any) {
      toast.error("Failed to delete recipe: " + error.message);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.caliber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.bullet_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Alert className="max-w-2xl mx-auto">
            <LogIn className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <div className="flex items-center justify-between">
                <span>Please log in to view and manage your load recipes</span>
                <Button onClick={() => navigate("/auth")} className="ml-4">
                  Login
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-tactical" />
            Load Recipe Library
          </h1>
          <p className="text-muted-foreground">
            Save, organize, and share your custom reloading recipes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-tactical hover:bg-tactical/90">
                <Plus className="mr-2 h-4 w-4" />
                New Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingRecipe ? "Edit Recipe" : "Create New Recipe"}
                </DialogTitle>
                <DialogDescription>
                  {editingRecipe ? "Update your load recipe details" : "Add a new reloading recipe to your library"}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="name">Recipe Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caliber">Caliber *</Label>
                    <Input
                      id="caliber"
                      value={formData.caliber}
                      onChange={(e) => setFormData({...formData, caliber: e.target.value})}
                      placeholder="e.g., .308 Win"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bullet_weight">Bullet Weight *</Label>
                    <Input
                      id="bullet_weight"
                      value={formData.bullet_weight}
                      onChange={(e) => setFormData({...formData, bullet_weight: e.target.value})}
                      placeholder="e.g., 168gr"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bullet_type">Bullet Type *</Label>
                    <Input
                      id="bullet_type"
                      value={formData.bullet_type}
                      onChange={(e) => setFormData({...formData, bullet_type: e.target.value})}
                      placeholder="e.g., Sierra MatchKing"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="powder_type">Powder Type *</Label>
                    <Input
                      id="powder_type"
                      value={formData.powder_type}
                      onChange={(e) => setFormData({...formData, powder_type: e.target.value})}
                      placeholder="e.g., Varget"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="powder_charge">Powder Charge *</Label>
                    <Input
                      id="powder_charge"
                      value={formData.powder_charge}
                      onChange={(e) => setFormData({...formData, powder_charge: e.target.value})}
                      placeholder="e.g., 43.5gr"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primer">Primer *</Label>
                    <Input
                      id="primer"
                      value={formData.primer}
                      onChange={(e) => setFormData({...formData, primer: e.target.value})}
                      placeholder="e.g., CCI BR-2"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brass">Brass *</Label>
                    <Input
                      id="brass"
                      value={formData.brass}
                      onChange={(e) => setFormData({...formData, brass: e.target.value})}
                      placeholder="e.g., Lapua"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coal">COAL *</Label>
                    <Input
                      id="coal"
                      value={formData.coal}
                      onChange={(e) => setFormData({...formData, coal: e.target.value})}
                      placeholder="e.g., 2.800in"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="muzzle_velocity">Muzzle Velocity (fps)</Label>
                    <Input
                      id="muzzle_velocity"
                      type="number"
                      value={formData.muzzle_velocity}
                      onChange={(e) => setFormData({...formData, muzzle_velocity: e.target.value})}
                      placeholder="e.g., 2650"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="muzzle_energy">Muzzle Energy (ft-lbs)</Label>
                    <Input
                      id="muzzle_energy"
                      type="number"
                      value={formData.muzzle_energy}
                      onChange={(e) => setFormData({...formData, muzzle_energy: e.target.value})}
                      placeholder="e.g., 2620"
                    />
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="accuracy">Accuracy (MOA or Group Size)</Label>
                    <Input
                      id="accuracy"
                      value={formData.accuracy}
                      onChange={(e) => setFormData({...formData, accuracy: e.target.value})}
                      placeholder="e.g., 0.5 MOA @ 100yds"
                    />
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Additional notes about this load..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="performance_notes">Performance Notes</Label>
                    <Textarea
                      id="performance_notes"
                      value={formData.performance_notes}
                      onChange={(e) => setFormData({...formData, performance_notes: e.target.value})}
                      placeholder="Describe how this load performs..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="col-span-2 flex items-center space-x-2">
                    <Switch
                      id="is_public"
                      checked={formData.is_public}
                      onCheckedChange={(checked) => setFormData({...formData, is_public: checked})}
                    />
                    <Label htmlFor="is_public" className="cursor-pointer">
                      Make this recipe public (share with community)
                    </Label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-tactical hover:bg-tactical/90">
                    {editingRecipe ? "Update Recipe" : "Create Recipe"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading recipes...</div>
        ) : filteredRecipes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {searchQuery ? "No recipes found matching your search" : "No recipes yet. Create your first load recipe!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {recipe.name}
                        {recipe.is_public ? (
                          <Unlock className="h-4 w-4 text-tactical" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </CardTitle>
                      <CardDescription>{recipe.caliber}</CardDescription>
                    </div>
                    {recipe.user_id === session.user.id && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(recipe)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Bullet:</span>
                      <p className="font-medium">{recipe.bullet_weight} {recipe.bullet_type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Powder:</span>
                      <p className="font-medium">{recipe.powder_charge} {recipe.powder_type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Primer:</span>
                      <p className="font-medium">{recipe.primer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">COAL:</span>
                      <p className="font-medium">{recipe.coal}</p>
                    </div>
                  </div>
                  
                  {(recipe.muzzle_velocity || recipe.muzzle_energy) && (
                    <div className="flex gap-2">
                      {recipe.muzzle_velocity && (
                        <Badge variant="secondary">{recipe.muzzle_velocity} fps</Badge>
                      )}
                      {recipe.muzzle_energy && (
                        <Badge variant="secondary">{recipe.muzzle_energy} ft-lbs</Badge>
                      )}
                    </div>
                  )}
                  
                  {recipe.accuracy && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Accuracy: </span>
                      <span className="font-medium text-tactical">{recipe.accuracy}</span>
                    </div>
                  )}
                  
                  {recipe.performance_notes && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.performance_notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LoadRecipes;