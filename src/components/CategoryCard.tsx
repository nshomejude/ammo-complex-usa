import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  description: string;
  count: number;
  slug: string;
}

export const CategoryCard = ({ name, icon: Icon, description, count, slug }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:border-tactical/50">
        <CardContent className="p-3 sm:p-6">
          <div className="mb-2 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-tactical/10 text-tactical transition-colors group-hover:bg-tactical group-hover:text-tactical-foreground">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          
          <h3 className="mb-1 sm:mb-2 text-base sm:text-xl font-bold">{name}</h3>
          <p className="mb-2 sm:mb-4 text-xs sm:text-sm text-muted-foreground">{description}</p>
          <p className="text-xs sm:text-sm font-medium text-tactical">{count} Products</p>
        </CardContent>
      </Card>
    </Link>
  );
};
