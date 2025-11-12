import { 
  Target, 
  Crosshair, 
  Shield, 
  Focus, 
  Zap,
  Flame,
  Circle,
  Lock,
  Hammer,
  Award,
  Users,
  Activity,
  Layers,
  Radio,
  Binary,
  Telescope,
  History,
  Star,
  Home,
  Skull
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FirearmCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  salesCount: string;
  trending: boolean;
  recommendedAmmo: string[]; // calibers
  ageRequirement: number;
}

export const firearmCategories: FirearmCategory[] = [
  {
    id: "1",
    name: "Semi-Automatic Pistols",
    slug: "semi-auto-pistols",
    description: "Full-size service pistols for duty, defense, and range use",
    icon: Crosshair,
    salesCount: "24.8K",
    trending: true,
    recommendedAmmo: ["9mm", ".45 ACP", ".40 S&W"],
    ageRequirement: 21
  },
  {
    id: "2",
    name: "Compact & Subcompact Pistols",
    slug: "compact-pistols",
    description: "Concealed-carry pistols for personal defense",
    icon: Shield,
    salesCount: "22.3K",
    trending: true,
    recommendedAmmo: ["9mm", ".380 ACP", ".40 S&W"],
    ageRequirement: 21
  },
  {
    id: "3",
    name: "Revolvers",
    slug: "revolvers",
    description: "Snub-nose, medium & large-frame revolvers",
    icon: Circle,
    salesCount: "15.7K",
    trending: false,
    recommendedAmmo: [".357 Magnum", ".38 Special", ".44 Magnum"],
    ageRequirement: 21
  },
  {
    id: "4",
    name: "Bolt-Action Hunting Rifles",
    slug: "bolt-action-hunting",
    description: "Reliable hunting rifles for big game",
    icon: Target,
    salesCount: "18.9K",
    trending: true,
    recommendedAmmo: [".308 WIN", ".30-06", "6.5 CM"],
    ageRequirement: 18
  },
  {
    id: "5",
    name: "Precision Long-Range Rifles",
    slug: "precision-rifles",
    description: "Match-grade bolt-action rifles for long-distance accuracy",
    icon: Focus,
    salesCount: "12.4K",
    trending: true,
    recommendedAmmo: ["6.5 CM", ".308 WIN", ".300 Win Mag"],
    ageRequirement: 18
  },
  {
    id: "21",
    name: "Tactical Sniper Rifles",
    slug: "tactical-sniper-rifles",
    description: "Military and law enforcement precision rifles for extreme range accuracy",
    icon: Telescope,
    salesCount: "8.9K",
    trending: true,
    recommendedAmmo: [".338 Lapua", ".300 Win Mag", ".50 BMG", ".408 CheyTac"],
    ageRequirement: 18
  },
  {
    id: "6",
    name: "AR-Platform Rifles",
    slug: "ar-platform",
    description: "Modern sporting rifles in 5.56/.223 configurations",
    icon: Zap,
    salesCount: "28.5K",
    trending: true,
    recommendedAmmo: [".223 REM", "5.56 NATO"],
    ageRequirement: 18
  },
  {
    id: "7",
    name: "AK-Pattern Rifles",
    slug: "ak-pattern",
    description: "Intermediate-caliber rifles (7.62×39, 5.45×39)",
    icon: Flame,
    salesCount: "14.2K",
    trending: true,
    recommendedAmmo: ["7.62×39", "5.45×39"],
    ageRequirement: 18
  },
  {
    id: "8",
    name: "Semi-Auto Centerfire Rifles",
    slug: "semi-auto-rifles",
    description: "Non-AR semi-automatic rifles in various calibers",
    icon: Activity,
    salesCount: "11.8K",
    trending: false,
    recommendedAmmo: [".308 WIN", "7.62×51"],
    ageRequirement: 18
  },
  {
    id: "9",
    name: "Rimfire .22 Rifles",
    slug: "rimfire-rifles",
    description: "Training and plinking rifles for beginners",
    icon: Circle,
    salesCount: "19.6K",
    trending: false,
    recommendedAmmo: [".22 LR", ".22 WMR"],
    ageRequirement: 18
  },
  {
    id: "10",
    name: "Rimfire .22 Pistols",
    slug: "rimfire-pistols",
    description: "Training and target pistols for skill development",
    icon: Target,
    salesCount: "13.9K",
    trending: false,
    recommendedAmmo: [".22 LR"],
    ageRequirement: 21
  },
  {
    id: "11",
    name: "Pump-Action Shotguns",
    slug: "pump-shotguns",
    description: "Reliable shotguns for hunting and defense",
    icon: Hammer,
    salesCount: "16.7K",
    trending: false,
    recommendedAmmo: ["12 GA", "20 GA"],
    ageRequirement: 18
  },
  {
    id: "12",
    name: "Semi-Auto Shotguns",
    slug: "semi-auto-shotguns",
    description: "Hunting and sporting shotguns with reduced recoil",
    icon: Radio,
    salesCount: "10.5K",
    trending: false,
    recommendedAmmo: ["12 GA", "20 GA"],
    ageRequirement: 18
  },
  {
    id: "13",
    name: "Break-Action Shotguns",
    slug: "break-action-shotguns",
    description: "Over-under & side-by-side doubles for sporting clays",
    icon: Layers,
    salesCount: "8.3K",
    trending: false,
    recommendedAmmo: ["12 GA", "20 GA", "28 GA"],
    ageRequirement: 18
  },
  {
    id: "14",
    name: "Tactical Shotguns",
    slug: "tactical-shotguns",
    description: "Home-defense shotguns with specialized configurations",
    icon: Shield,
    salesCount: "14.1K",
    trending: true,
    recommendedAmmo: ["12 GA Buckshot", "12 GA Slug"],
    ageRequirement: 18
  },
  {
    id: "15",
    name: "Hunting/Slug Shotguns",
    slug: "slug-shotguns",
    description: "Rifled barrels optimized for slug accuracy",
    icon: Focus,
    salesCount: "7.2K",
    trending: false,
    recommendedAmmo: ["12 GA Slug", "20 GA Slug"],
    ageRequirement: 18
  },
  {
    id: "16",
    name: "Lever-Action Rifles",
    slug: "lever-action",
    description: "Classic hunting and sporting rifles",
    icon: Target,
    salesCount: "9.8K",
    trending: false,
    recommendedAmmo: [".30-30 WIN", ".45-70 GOV"],
    ageRequirement: 18
  },
  {
    id: "17",
    name: "Single-Shot Rifles",
    slug: "single-shot",
    description: "Falling-block and break-action precision rifles",
    icon: Lock,
    salesCount: "5.4K",
    trending: false,
    recommendedAmmo: [".308 WIN", ".223 REM"],
    ageRequirement: 18
  },
  {
    id: "18",
    name: "Pistol-Caliber Carbines",
    slug: "pcc",
    description: "Compact carbines chambered in pistol calibers",
    icon: Binary,
    salesCount: "11.3K",
    trending: true,
    recommendedAmmo: ["9mm", ".45 ACP", ".40 S&W"],
    ageRequirement: 18
  },
  {
    id: "19",
    name: "Competition Pistols",
    slug: "competition-pistols",
    description: "IPSC/USPSA and precision match handguns",
    icon: Award,
    salesCount: "6.9K",
    trending: false,
    recommendedAmmo: ["9mm", ".38 Super", ".45 ACP"],
    ageRequirement: 21
  },
  {
    id: "20",
    name: "Youth & Beginner Firearms",
    slug: "youth-firearms",
    description: "Small-bore training models for safe learning",
    icon: Users,
    salesCount: "8.7K",
    trending: false,
    recommendedAmmo: [".22 LR", ".410 Bore"],
    ageRequirement: 18
  },
  {
    id: "22",
    name: "Black Powder/Muzzleloaders",
    slug: "muzzleloaders",
    description: "Traditional and modern muzzleloading rifles for hunting and historical shooting",
    icon: History,
    salesCount: "16.2K",
    trending: true,
    recommendedAmmo: [".50 CAL", ".45 CAL"],
    ageRequirement: 18
  },
  {
    id: "23",
    name: "1911-Style Pistols",
    slug: "1911-pistols",
    description: "Classic .45 ACP single-action pistols and modern variants",
    icon: Award,
    salesCount: "21.5K",
    trending: true,
    recommendedAmmo: [".45 ACP", "9mm", ".38 Super"],
    ageRequirement: 21
  },
  {
    id: "24",
    name: "Striker-Fired Polymer Pistols",
    slug: "striker-fired-pistols",
    description: "Modern polymer-frame striker-fired duty and carry pistols",
    icon: Zap,
    salesCount: "32.7K",
    trending: true,
    recommendedAmmo: ["9mm", ".40 S&W", ".45 ACP"],
    ageRequirement: 21
  },
  {
    id: "25",
    name: "Cowboy Action/Western Firearms",
    slug: "cowboy-western",
    description: "Single-action revolvers and lever rifles for western shooting sports",
    icon: Star,
    salesCount: "13.8K",
    trending: true,
    recommendedAmmo: [".45 Colt", ".357 Magnum", ".44-40"],
    ageRequirement: 21
  },
  {
    id: "26",
    name: "Home Defense Firearms",
    slug: "home-defense",
    description: "Purpose-built firearms optimized for home protection scenarios",
    icon: Home,
    salesCount: "25.4K",
    trending: true,
    recommendedAmmo: ["9mm", "12 GA", "5.56 NATO"],
    ageRequirement: 21
  },
  {
    id: "27",
    name: "Hunting Handguns",
    slug: "hunting-handguns",
    description: "Powerful revolvers and single-shot pistols for big game hunting",
    icon: Skull,
    salesCount: "9.3K",
    trending: false,
    recommendedAmmo: [".44 Magnum", ".454 Casull", ".500 S&W"],
    ageRequirement: 21
  }
];