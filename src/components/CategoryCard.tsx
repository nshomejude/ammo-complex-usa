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
        <CardContent className="p-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10 text-tactical transition-colors group-hover:bg-tactical group-hover:text-tactical-foreground">
            <Icon className="h-6 w-6" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold">{name}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{description}</p>
          <p className="text-sm font-medium text-tactical">{count} Products</p>
        </CardContent>
      </Card>
    </Link>
  );
};
