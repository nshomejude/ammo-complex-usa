import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface FirearmCategoryCardProps {
  name: string;
  icon: LucideIcon;
  description: string;
  salesCount: string;
  slug: string;
  trending: boolean;
  recommendedAmmo: string[];
  ageRequirement: number;
}

export const FirearmCategoryCard = ({ 
  name, 
  icon: Icon, 
  description, 
  salesCount, 
  slug,
  trending,
  recommendedAmmo,
  ageRequirement
}: FirearmCategoryCardProps) => {
  return (
    <Link to={`/firearm-category/${slug}`}>
      <Card className="group relative cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:border-tactical/50 hover:scale-[1.02]">
      {trending && (
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-0 z-10">
          <TrendingUp className="h-3 w-3 mr-1" />
          Hot
        </Badge>
      )}
      
      <CardContent className="p-6">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tactical/10 text-tactical transition-all group-hover:bg-tactical group-hover:text-tactical-foreground group-hover:scale-110">
          <Icon className="h-8 w-8" />
        </div>
        
        <h3 className="mb-2 text-xl font-bold line-clamp-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">{description}</p>
        
        <div className="space-y-3">
          <div>
            <p className="text-2xl font-bold text-tactical">{salesCount}</p>
            <p className="text-xs text-muted-foreground">Units Sold</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Compatible Ammo:</p>
            <div className="flex flex-wrap gap-1">
              {recommendedAmmo.slice(0, 3).map((ammo, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ammo}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Age Requirement: <span className="font-semibold text-foreground">{ageRequirement}+</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};