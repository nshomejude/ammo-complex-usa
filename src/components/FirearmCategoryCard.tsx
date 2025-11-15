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
        <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-accent text-accent-foreground border-0 z-10 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
          Hot
        </Badge>
      )}
      
      <CardContent className="p-3 sm:p-6">
        <div className="mb-2 sm:mb-4 inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-tactical/10 text-tactical transition-all group-hover:bg-tactical group-hover:text-tactical-foreground group-hover:scale-110">
          <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        
        <h3 className="mb-1 sm:mb-2 text-base sm:text-xl font-bold line-clamp-1">{name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">{description}</p>
        
        <div className="space-y-2 sm:space-y-3">
          <div>
            <p className="text-lg sm:text-2xl font-bold text-tactical">{salesCount}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Units Sold</p>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground mb-1">Compatible Ammo:</p>
            <div className="flex flex-wrap gap-1">
              {recommendedAmmo.slice(0, 3).map((ammo, index) => (
                <Badge key={index} variant="secondary" className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                  {ammo}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-1.5 sm:pt-2 border-t">
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Age Requirement: <span className="font-semibold text-foreground">{ageRequirement}+</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};