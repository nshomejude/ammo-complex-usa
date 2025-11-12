import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface TopSellingCardProps {
  name: string;
  icon: LucideIcon;
  salesCount: string;
  slug: string;
  trending: boolean;
}

export const TopSellingCard = ({ name, icon: Icon, salesCount, slug, trending }: TopSellingCardProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="group relative cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:border-tactical/50 hover:scale-105">
        {trending && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-0">
            <TrendingUp className="h-3 w-3 mr-1" />
            Hot
          </Badge>
        )}
        
        <CardContent className="p-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tactical/10 text-tactical transition-all group-hover:bg-tactical group-hover:text-tactical-foreground group-hover:scale-110">
            <Icon className="h-8 w-8" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold">{name}</h3>
          <p className="text-2xl font-bold text-tactical">{salesCount}</p>
          <p className="text-sm text-muted-foreground">Units Sold</p>
        </CardContent>
      </Card>
    </Link>
  );
};
