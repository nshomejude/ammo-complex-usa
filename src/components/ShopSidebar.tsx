import { Link, useLocation } from "react-router-dom";
import { Package, Grid3x3, Shield, Home, Filter } from "lucide-react";
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

interface ShopSidebarProps {
  type?: "products" | "categories" | "firearms";
}

export function ShopSidebar({ type = "products" }: ShopSidebarProps) {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

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
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-tactical" />
            <span className="font-semibold">Shop Navigation</span>
          </div>
        )}
      </SidebarHeader>

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
      </SidebarContent>
    </Sidebar>
  );
}
