import { Link, useLocation } from "react-router-dom";
import { Package, Grid3x3, Shield, Home, Filter, X, DollarSign, Phone, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContactWidget } from "@/components/ContactWidget";

interface FilterOptions {
  priceRange: [number, number];
  selectedBrands: string[];
  stockStatus: "all" | "inStock" | "outOfStock";
}

interface ShopSidebarProps {
  type?: "products" | "categories" | "firearms";
  filters?: FilterOptions;
  onFiltersChange?: (filters: FilterOptions) => void;
  availableBrands?: string[];
  maxPrice?: number;
}

export function ShopSidebar({ 
  type = "products",
  filters,
  onFiltersChange,
  availableBrands = [],
  maxPrice = 1000
}: ShopSidebarProps) {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  const handlePriceChange = (value: number[]) => {
    if (onFiltersChange && filters) {
      onFiltersChange({
        ...filters,
        priceRange: [value[0], value[1]]
      });
    }
  };

  const handleBrandToggle = (brand: string) => {
    if (onFiltersChange && filters) {
      const newBrands = filters.selectedBrands.includes(brand)
        ? filters.selectedBrands.filter(b => b !== brand)
        : [...filters.selectedBrands, brand];
      onFiltersChange({
        ...filters,
        selectedBrands: newBrands
      });
    }
  };

  const handleStockChange = (status: "all" | "inStock" | "outOfStock") => {
    if (onFiltersChange && filters) {
      onFiltersChange({
        ...filters,
        stockStatus: status
      });
    }
  };

  const clearFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({
        priceRange: [0, maxPrice],
        selectedBrands: [],
        stockStatus: "all"
      });
    }
  };

  const hasActiveFilters = filters && (
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice ||
    filters.selectedBrands.length > 0 ||
    filters.stockStatus !== "all"
  );

  const navigationItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "All Products", url: "/products", icon: Package },
    { title: "Ammo Categories", url: "/categories", icon: Grid3x3 },
    { title: "Firearms", url: "/firearms", icon: Shield },
  ];

  const categoryFilters = [
    { name: "Rifle Ammunition", slug: "/category/rifle", count: 45 },
    { name: "Pistol Ammunition", slug: "/category/pistol", count: 38 },
    { name: "Shotgun Ammunition", slug: "/category/shotgun", count: 22 },
    { name: "Rimfire Ammunition", slug: "/category/rimfire", count: 15 },
    { name: "Specialty Ammunition", slug: "/category/specialty", count: 8 },
  ];

  const popularCalibersProducts = [
    { name: "9mm Luger", slug: "/category/9mm-luger" },
    { name: ".223 Remington", slug: "/category/223-remington" },
    { name: "12 Gauge", slug: "/category/12-gauge" },
    { name: ".308 Winchester", slug: "/category/308-winchester" },
    { name: ".45 ACP", slug: "/category/45-acp" },
  ];

  const popularCalibersCategories = [
    { name: "9mm Luger", slug: "/category/9mm-luger" },
    { name: ".22 LR", slug: "/category/22-lr" },
    { name: "5.56 NATO", slug: "/category/556-nato" },
    { name: ".308 Winchester", slug: "/category/308-winchester" },
    { name: "12 Gauge", slug: "/category/12-gauge" },
  ];

  const firearmCategories = [
    { name: "Semi-Auto Pistols", slug: "/firearm-category/semi-auto-pistol" },
    { name: "AR-15 Style Rifles", slug: "/firearm-category/ar15-rifle" },
    { name: "Bolt Action Rifles", slug: "/firearm-category/bolt-action-rifle" },
    { name: "Pump Shotguns", slug: "/firearm-category/pump-shotgun" },
    { name: "Revolvers", slug: "/firearm-category/revolver" },
  ];

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        {!collapsed && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-tactical" />
              <span className="font-semibold">Filters & Navigation</span>
            </div>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-7 px-2 text-xs"
              >
                Clear
              </Button>
            )}
          </div>
        )}
      </SidebarHeader>

      <ScrollArea className="flex-1">
        <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Advanced Filters */}
        {!collapsed && (type === "products" || type === "firearms") && filters && onFiltersChange && (
          <>
            {/* Price Range Filter */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price Range
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-3 py-4">
                <div className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    max={maxPrice}
                    step={10}
                    min={0}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-2" />

            {/* Stock Status Filter */}
            <SidebarGroup>
              <SidebarGroupLabel>Stock Status</SidebarGroupLabel>
              <SidebarGroupContent className="px-3 py-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stock-all"
                      checked={filters.stockStatus === "all"}
                      onCheckedChange={() => handleStockChange("all")}
                    />
                    <Label htmlFor="stock-all" className="text-sm cursor-pointer">
                      All Items
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stock-in"
                      checked={filters.stockStatus === "inStock"}
                      onCheckedChange={() => handleStockChange("inStock")}
                    />
                    <Label htmlFor="stock-in" className="text-sm cursor-pointer">
                      In Stock Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stock-out"
                      checked={filters.stockStatus === "outOfStock"}
                      onCheckedChange={() => handleStockChange("outOfStock")}
                    />
                    <Label htmlFor="stock-out" className="text-sm cursor-pointer">
                      Out of Stock
                    </Label>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-2" />

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>
                    {type === "firearms" ? "Manufacturer" : "Brand"}
                    {filters.selectedBrands.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.selectedBrands.length}
                      </Badge>
                    )}
                  </SidebarGroupLabel>
                  <SidebarGroupContent className="px-3 py-2">
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-3">
                        {availableBrands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={filters.selectedBrands.includes(brand)}
                              onCheckedChange={() => handleBrandToggle(brand)}
                            />
                            <Label 
                              htmlFor={`brand-${brand}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </SidebarGroupContent>
                </SidebarGroup>
                <Separator className="my-2" />
              </>
            )}
          </>
        )}

        {/* Type-specific content */}
        {type === "products" && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categoryFilters.map((cat) => (
                    <SidebarMenuItem key={cat.slug}>
                      <SidebarMenuButton asChild>
                        <Link to={cat.slug} className="justify-between">
                          {!collapsed && (
                            <>
                              <span className="text-sm">{cat.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {cat.count}
                              </Badge>
                            </>
                          )}
                          {collapsed && <Package className="h-4 w-4" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-2" />

            <SidebarGroup>
              <SidebarGroupLabel>Popular Calibers</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {popularCalibersProducts.map((cal) => (
                    <SidebarMenuItem key={cal.slug}>
                      <SidebarMenuButton asChild>
                        <Link to={cal.slug}>
                          {!collapsed && <span className="text-sm">{cal.name}</span>}
                          {collapsed && <span className="text-xs">•</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {type === "categories" && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Top Calibers</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {popularCalibersCategories.map((cal) => (
                    <SidebarMenuItem key={cal.slug}>
                      <SidebarMenuButton asChild>
                        <Link to={cal.slug}>
                          {!collapsed && <span className="text-sm">{cal.name}</span>}
                          {collapsed && <span className="text-xs">•</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-2" />

            <SidebarGroup>
              <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/categories">
                        {!collapsed && <span className="text-sm">All Categories</span>}
                        {collapsed && <Grid3x3 className="h-4 w-4" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/products">
                        {!collapsed && <span className="text-sm">Browse Products</span>}
                        {collapsed && <Package className="h-4 w-4" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {type === "firearms" && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Firearm Types</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {firearmCategories.map((cat) => (
                    <SidebarMenuItem key={cat.slug}>
                      <SidebarMenuButton asChild>
                        <Link to={cat.slug}>
                          {!collapsed && <span className="text-sm">{cat.name}</span>}
                          {collapsed && <Shield className="h-4 w-4" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-2" />

            <SidebarGroup>
              <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/firearm-categories">
                        {!collapsed && <span className="text-sm">All Categories</span>}
                        {collapsed && <Grid3x3 className="h-4 w-4" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/firearms-license">
                        {!collapsed && <span className="text-sm">License Info</span>}
                        {collapsed && <Shield className="h-4 w-4" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Contact Widget */}
        {!collapsed && (
          <>
            <Separator className="my-4" />
            <div className="px-3 pb-4">
              <ContactWidget variant="sidebar" />
            </div>
          </>
        )}
      </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
