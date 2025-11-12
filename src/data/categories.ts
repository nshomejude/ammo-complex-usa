import { Target, Crosshair, Shell, Circle, Sparkles } from "lucide-react";

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: typeof Target;
  count: number;
}

export const categories: Category[] = [
  {
    name: "Rifle Ammunition",
    slug: "rifle",
    description: "High-performance rifle cartridges for hunting and target shooting",
    icon: Target,
    count: 4,
  },
  {
    name: "Pistol Ammunition",
    slug: "pistol",
    description: "Handgun ammunition for defense, duty, and practice",
    icon: Crosshair,
    count: 4,
  },
  {
    name: "Shotgun Ammunition",
    slug: "shotgun",
    description: "Shotshells for hunting, home defense, and clay sports",
    icon: Shell,
    count: 3,
  },
  {
    name: "Rimfire Ammunition",
    slug: "rimfire",
    description: "Affordable ammunition for training and small game",
    icon: Circle,
    count: 2,
  },
  {
    name: "Specialty Ammunition",
    slug: "specialty",
    description: "Specialized cartridges for unique applications",
    icon: Sparkles,
    count: 2,
  },
];
