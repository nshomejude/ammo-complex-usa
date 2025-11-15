# Demo Content for Arms Complex WordPress Theme

This directory contains sample product data for automatic import when the theme is activated.

## Files

### products.json

Contains sample ammunition and firearms products formatted for WordPress/WooCommerce import.

**Structure:**
- 10 ammunition products across different calibers (rifle, pistol, shotgun)
- 10 firearms across different categories (pistols, rifles, shotguns)
- Each product includes:
  - Basic info (name, price, stock status)
  - Product attributes (caliber, bullet type, weight, brand)
  - Quantity variations (bulk pricing)
  - Rich descriptions
  - Technical specifications
  - Manufacturer data
  - Ballistic information (where applicable)

## Product Categories Included

### Ammunition
1. **Rifle Ammo**
   - 5.56 NATO / .223 Remington
   - .308 Winchester
   - .30-06 Springfield

2. **Pistol Ammo**
   - 9mm Luger
   - .45 ACP
   - .40 S&W

3. **Shotgun Ammo**
   - 12 Gauge Target Load
   - 12 Gauge Slugs

### Firearms
1. **Pistols**
   - Full-size (Glock 17, SIG P320, CZ 75)
   - Compact (Springfield Hellcat)

2. **Rifles**
   - AR-15 Platform (Smith & Wesson M&P15, Ruger AR-556)
   - Bolt-Action (Remington 700)
   - Rimfire (.22 LR Ruger 10/22)

3. **Shotguns**
   - Pump-Action (Mossberg 500, Remington 870)

## Import Process

Products are automatically imported when:
1. Theme is first activated
2. User clicks "Import Demo Content" in admin notice
3. User navigates to theme welcome page

The import function creates:
- WooCommerce variable products with quantity variations
- Product categories and subcategories
- Custom product attributes (caliber, bullet type, brand, etc.)
- Product metadata (ballistic data, specifications)
- Product variations for bulk pricing

## Customization

To add more products:
1. Edit `products.json`
2. Follow the existing structure
3. Ensure all required fields are present:
   - id (unique slug)
   - name
   - type (ammunition or firearm)
   - caliber
   - price
   - inStock
   - category
   - description

## Product Variations

Ammunition products include quantity variations for bulk pricing:
- 20-50 rounds (small quantities)
- 100-500 rounds (medium bulk)
- 1000+ rounds (large bulk) where applicable

Variations are automatically created with appropriate pricing tiers.

## Attributes

The import creates these WooCommerce attributes:
- **pa_caliber**: Ammunition/firearm caliber
- **pa_bullet_type**: Bullet construction (FMJ, HP, JHP, etc.)
- **pa_bullet_weight**: Bullet weight in grains
- **pa_brand**: Manufacturer brand
- **pa_action_type**: Firearm action (Semi-Auto, Bolt-Action, etc.)
- **pa_barrel_length**: Firearm barrel length
- **pa_capacity**: Magazine capacity

## Notes

- All prices are in USD
- Stock status set to "in stock" for demo purposes
- Images use placeholder (should be replaced with actual product images)
- Ballistic data included where applicable
- All products are reloadable brass (ammunition)
- Specifications stored as JSON in product meta

## Expanding the Database

To add products from the full React app dataset:
1. Export from `src/data/products.ts` and `src/data/firearms.ts`
2. Convert TypeScript to JSON format
3. Map fields to match this structure
4. Add to `products.json`
5. Re-run import function

## Developer Info

**Import Function**: `inc/demo-import.php` → `arms_complex_import_products_from_json()`  
**Product Creation**: `inc/demo-import.php` → `arms_complex_create_wc_product()`  
**Variation Creation**: `inc/demo-import.php` → `arms_complex_create_product_variations()`
