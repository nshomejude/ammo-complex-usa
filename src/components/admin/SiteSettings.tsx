import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Globe, X } from "lucide-react";

export const SiteSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    site_name: "",
    seo_title: "",
    meta_description: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching settings:", error);
    } else if (data) {
      setSettings({
        site_name: data.site_name,
        seo_title: data.seo_title,
        meta_description: data.meta_description,
        tags: data.tags || [],
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        site_name: settings.site_name,
        seo_title: settings.seo_title,
        meta_description: settings.meta_description,
        tags: settings.tags,
      })
      .eq("id", (await supabase.from("site_settings").select("id").single()).data?.id);

    if (error) {
      toast.error("Failed to save settings");
      console.error(error);
    } else {
      toast.success("Settings saved successfully");
    }
    setLoading(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !settings.tags.includes(tagInput.trim())) {
      setSettings({ ...settings, tags: [...settings.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setSettings({ ...settings, tags: settings.tags.filter(t => t !== tag) });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Site Settings
        </CardTitle>
        <CardDescription>
          Manage your site's basic information and SEO settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="site_name">Site Name</Label>
          <Input
            id="site_name"
            value={settings.site_name}
            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
            placeholder="Arms Complex"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo_title">SEO Title</Label>
          <Input
            id="seo_title"
            value={settings.seo_title}
            onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
            placeholder="Arms Complex - Premium Firearms & Ammunition"
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground">
            {settings.seo_title.length}/60 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            value={settings.meta_description}
            onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
            placeholder="Your trusted source for firearms, ammunition, and tactical gear"
            maxLength={160}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            {settings.meta_description.length}/160 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">SEO Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
            />
            <Button onClick={addTag} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {settings.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};
