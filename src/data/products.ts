export interface Product {
  id: string;
  name: string;
  caliber: string;
  rounds: number;
  price: number;
  inStock: boolean;
  category: string;
  description: string;
}

export const products: Product[] = [
  // Rifle Ammunition
  {
    id: "1",
    name: "Federal Premium .223 Remington",
    caliber: ".223 REM",
    rounds: 20,
    price: 24.99,
    inStock: true,
    category: "rifle",
    description: "Premium rifle ammunition for target shooting and hunting"
  },
  {
    id: "2",
    name: "Winchester .308 Winchester",
    caliber: ".308 WIN",
    rounds: 20,
    price: 32.99,
    inStock: true,
    category: "rifle",
    description: "High-performance hunting ammunition"
  },
  {
    id: "3",
    name: "Hornady 6.5 Creedmoor",
    caliber: "6.5 CM",
    rounds: 20,
    price: 38.99,
    inStock: true,
    category: "rifle",
    description: "Match-grade precision ammunition"
  },
  {
    id: "4",
    name: "Remington .30-06 Springfield",
    caliber: ".30-06",
    rounds: 20,
    price: 34.99,
    inStock: false,
    category: "rifle",
    description: "Classic hunting cartridge"
  },

  // Pistol Ammunition
  {
    id: "5",
    name: "Federal 9mm Luger FMJ",
    caliber: "9MM",
    rounds: 50,
    price: 19.99,
    inStock: true,
    category: "pistol",
    description: "Target and training ammunition"
  },
  {
    id: "6",
    name: "Speer Gold Dot .45 ACP",
    caliber: ".45 ACP",
    rounds: 50,
    price: 42.99,
    inStock: true,
    category: "pistol",
    description: "Premium self-defense ammunition"
  },
  {
    id: "7",
    name: "Winchester .40 S&W",
    caliber: ".40 S&W",
    rounds: 50,
    price: 28.99,
    inStock: true,
    category: "pistol",
    description: "Duty and defense ammunition"
  },
  {
    id: "8",
    name: "Hornady .380 ACP Critical Defense",
    caliber: ".380 ACP",
    rounds: 25,
    price: 26.99,
    inStock: true,
    category: "pistol",
    description: "Compact carry defense rounds"
  },

  // Shotgun Ammunition
  {
    id: "9",
    name: "Federal 12 Gauge Buckshot",
    caliber: "12 GA",
    rounds: 25,
    price: 22.99,
    inStock: true,
    category: "shotgun",
    description: "Home defense buckshot"
  },
  {
    id: "10",
    name: "Remington 20 Gauge Target Load",
    caliber: "20 GA",
    rounds: 25,
    price: 18.99,
    inStock: true,
    category: "shotgun",
    description: "Clay target ammunition"
  },
  {
    id: "11",
    name: "Winchester 12 Gauge Slug",
    caliber: "12 GA",
    rounds: 5,
    price: 12.99,
    inStock: false,
    category: "shotgun",
    description: "High-power rifled slugs"
  },

  // Rimfire Ammunition
  {
    id: "12",
    name: "CCI .22 LR Standard Velocity",
    caliber: ".22 LR",
    rounds: 50,
    price: 8.99,
    inStock: true,
    category: "rimfire",
    description: "Plinking and training ammunition"
  },
  {
    id: "13",
    name: "Federal .22 WMR",
    caliber: ".22 WMR",
    rounds: 50,
    price: 16.99,
    inStock: true,
    category: "rimfire",
    description: "Magnum rimfire ammunition"
  },

  // Specialty Ammunition
  {
    id: "14",
    name: ".50 BMG Match Grade",
    caliber: ".50 BMG",
    rounds: 10,
    price: 89.99,
    inStock: true,
    category: "specialty",
    description: "Long-range precision ammunition"
  },
  {
    id: "15",
    name: "Subsonic .300 Blackout",
    caliber: ".300 BLK",
    rounds: 20,
    price: 29.99,
    inStock: true,
    category: "specialty",
    description: "Suppressor-optimized ammunition"
  },
];
