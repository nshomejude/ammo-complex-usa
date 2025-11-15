# Arms Complex - Product Import Guide

## Overview

This guide explains how to import the demo products into WordPress when the Arms Complex theme is activated.

## Automatic Import Process

### On Theme Activation

1. **Admin Notice Appears**
   - Shows welcome message
   - Prompts user to import demo content
   - Lists what will be imported

2. **User Clicks "Import Demo Content"**
   - Processes `demo-content/products.json`
   - Creates product categories
   - Creates product attributes
   - Imports all products with variations
   - Sets up product metadata

3. **Import Complete**
   - Redirects to theme welcome page
   - Shows success message
   - Products available in WooCommerce

## What Gets Imported

### 20 Sample Products

**Ammunition (10 products):**
- Federal XM193 55gr FMJ (5.56 NATO)
- Hornady American Gunner (.223 Rem)
- Federal Gold Medal Match (.308 Win)
- Federal American Eagle (9mm)
- Hornady Critical Duty (9mm)
- Federal HST (.45 ACP)
- Speer Gold Dot (.40 S&W)
- Federal Target Load (12 Gauge)
- Hornady SST Slug (12 Gauge)
- Winchester Power-Point (.30-06)

**Firearms (10 products):**
- Glock 17 Gen5
- SIG Sauer P320
- Smith & Wesson M&P15 Sport II
- Ruger AR-556
- Remington 700 SPS
- Mossberg 500 Combo
- Remington 870 Express
- Ruger 10/22 Carbine
- Springfield Hellcat
- CZ 75 SP-01

### Product Categories

```
Ammunition
├── Rifle Ammo
├── Pistol Ammo
└── Shotgun Ammo

Firearms
├── Pistols
├── Rifles
└── Shotguns
```

### Product Attributes

All products are tagged with these attributes:
- Caliber (pa_caliber)
- Bullet Type (pa_bullet_type) - for ammunition
- Bullet Weight (pa_bullet_weight) - for ammunition
- Brand (pa_brand)
- Action Type (pa_action_type) - for firearms
- Barrel Length (pa_barrel_length) - for firearms
- Capacity (pa_capacity) - for firearms

## Product Variations

### Ammunition Variations

Each ammunition product has multiple quantity options:

**Example: 9mm Federal American Eagle**
- 50 rounds: $19.99
- 100 rounds: $37.99
- 500 rounds: $179.99
- 1000 rounds: $349.99

### Variation Implementation

```php
// WooCommerce creates these as product variations
// Each variation has its own:
// - SKU
// - Price
// - Stock quantity
// - Attributes (quantity)
```

## Product Metadata

Each product includes:

### Ammunition Metadata
- `_muzzle_velocity` - Velocity in FPS
- `_muzzle_energy` - Energy in ft-lbs
- `_manufacturer` - Brand name
- `_specifications` - JSON with:
  - casing type
  - primer type
  - reloadable status
  - use cases

### Firearm Metadata
- `_manufacturer` - Brand name
- `_weight` - Unloaded weight
- `_finish` - Surface finish
- `_specifications` - JSON with:
  - safety features
  - sight type
  - stock/frame type
  - use cases

## Manual Import (If Needed)

If automatic import fails or you want to re-import:

### Via WordPress Admin

1. Go to **Tools → Import**
2. Select **WooCommerce Products**
3. Upload `demo-content/products.json`
4. Map fields to WooCommerce fields
5. Run import

### Via PHP Function

```php
// In functions.php or custom plugin
require_once get_template_directory() . '/inc/demo-import.php';
arms_complex_import_products_from_json();
```

### Via WP-CLI

```bash
wp eval-file wp-content/themes/arms-complex/inc/demo-import.php
wp eval 'arms_complex_import_products_from_json();'
```

## Expanding the Product Database

### Add More Products

1. Open `demo-content/products.json`
2. Add new product objects following the structure:

```json
{
  "id": "unique-product-slug",
  "name": "Product Name",
  "type": "ammunition",
  "caliber": ".308 Winchester",
  "bulletType": "BTHP",
  "bulletWeight": "168gr",
  "brand": "Federal",
  "rounds": 20,
  "price": 34.99,
  "quantityVariations": [
    { "quantity": 20, "price": 34.99 },
    { "quantity": 50, "price": 82.99 }
  ],
  "inStock": true,
  "image": "placeholder-product.jpg",
  "category": "rifle-ammo",
  "description": "Full description...",
  "shortDescription": "Brief description...",
  "manufacturer": "Federal",
  "specifications": {}
}
```

3. Re-run import function

### Convert React Data

To convert products from React app:

```javascript
// In React project
const fs = require('fs');
const products = require('./src/data/products').products;
const firearms = require('./src/data/firearms').firearms;

// Convert to WordPress format
const wpProducts = products.map(p => ({
  id: p.id,
  name: p.name,
  type: 'ammunition',
  caliber: p.caliber,
  bulletType: p.bulletType || 'FMJ',
  bulletWeight: p.grainWeight || p.bulletWeight,
  brand: p.manufacturer,
  rounds: p.rounds,
  price: p.price,
  quantityVariations: p.quantityVariations,
  inStock: p.inStock,
  image: 'placeholder-product.jpg',
  category: p.categorySlug,
  description: p.longDescription || p.description,
  shortDescription: p.shortDescription || p.description,
  manufacturer: p.manufacturer,
  specifications: {
    casing: 'Brass',
    primer: 'Boxer',
    reloadable: true
  }
}));

fs.writeFileSync(
  'wordpress-theme/demo-content/all-products.json',
  JSON.stringify([...wpProducts, ...wpFirearms], null, 2)
);
```

## Product Images

### Default Behavior
- All products use `placeholder-product.jpg` initially
- Located in `assets/` folder

### Adding Real Images

1. **Upload to WordPress Media Library**
2. **Update Product**:
   ```php
   // Get product
   $product = wc_get_product($product_id);
   
   // Set image
   $image_id = attachment_url_to_postid($image_url);
   $product->set_image_id($image_id);
   $product->save();
   ```

3. **Or update JSON before import**:
   ```json
   {
     "image": "https://example.com/product-image.jpg"
   }
   ```

## Troubleshooting

### Import Fails
- Check WooCommerce is activated
- Verify `demo-content/products.json` exists
- Check PHP error logs
- Ensure write permissions

### Products Missing Variations
- Verify `quantityVariations` array in JSON
- Check WooCommerce variation settings
- Re-save product in admin to regenerate

### Attributes Not Showing
- Go to WooCommerce → Settings → Products → Attributes
- Verify attributes exist
- Re-configure if needed

### Images Not Loading
- Check image paths
- Upload images to media library
- Update product image IDs

## Database Tables

Products are stored in standard WordPress/WooCommerce tables:

```
wp_posts (type: product, product_variation)
wp_postmeta (product metadata)
wp_terms (categories, tags, attributes)
wp_term_taxonomy (taxonomy definitions)
wp_term_relationships (product-term associations)
wp_wc_product_meta_lookup (WC product data)
```

## Security Notes

- Import only runs on theme activation
- Requires admin capabilities
- Nonce verification included
- SQL injection protection via WC functions
- Sanitized inputs throughout

## Performance

- Import typically takes 30-60 seconds
- Creates 20 products
- Generates ~80 product variations
- Sets up ~50 attribute terms
- No timeout with default PHP settings

## Support

For issues or questions:
- Check theme documentation
- Review WooCommerce logs
- Contact: nshomejude@gmail.com
- Website: https://opesware.com
