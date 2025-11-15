# Arms Complex WordPress Theme Conversion Guide

## For Cursor AI and Developers

This guide provides detailed instructions for converting the React-based Arms Complex application into a fully functional WordPress/WooCommerce theme.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Mapping](#architecture-mapping)
3. [File Structure](#file-structure)
4. [Component Conversion](#component-conversion)
5. [Data Migration](#data-migration)
6. [State Management](#state-management)
7. [Routing](#routing)
8. [Styling](#styling)
9. [JavaScript Functionality](#javascript-functionality)
10. [Testing Checklist](#testing-checklist)

---

## 1. Project Overview

**Source**: React + Vite + TypeScript + Tailwind CSS + React Router + Supabase  
**Target**: WordPress + PHP + WooCommerce + Tailwind CSS + Custom JS

**Key Features to Preserve**:
- Product catalog with variations (quantity-based)
- Firearms catalog
- Product comparison functionality
- Wishlist functionality
- Advanced filtering and sorting
- Ballistic calculator
- Reloading guide and load recipes
- Cart and checkout (via WooCommerce)
- Review system
- Multiple page layouts/variations (Home2-11, Shop2-11, etc.)

---

## 2. Architecture Mapping

### React → WordPress Mapping

| React Concept | WordPress Equivalent | Implementation |
|--------------|---------------------|----------------|
| Components | Template Parts | PHP files in `/template-parts/` |
| Pages | Page Templates | PHP files in theme root |
| Routes | WordPress Pages/Permalinks | Created on theme activation |
| State (useState) | Sessions/Transients | PHP `$_SESSION` or `set_transient()` |
| Context API | Global Variables | `$GLOBALS` or custom class |
| React Hooks | WordPress Hooks | `add_action()`, `add_filter()` |
| Supabase | WooCommerce DB | Use WP/WC database functions |
| LocalStorage | Cookies/User Meta | `setcookie()` or `update_user_meta()` |

---

## 3. File Structure

### WordPress Theme Structure

```
arms-complex/
├── style.css                          # Theme header and basic styles
├── functions.php                      # Theme setup and core functions
├── index.php                          # Main template fallback
├── header.php                         # Site header
├── footer.php                         # Site footer
├── sidebar.php                        # Sidebar template
├── single.php                         # Single post template
├── page.php                           # Page template
├── archive.php                        # Archive template
├── search.php                         # Search results template
├── 404.php                            # 404 error page
│
├── woocommerce/                       # WooCommerce template overrides
│   ├── archive-product.php            # Shop page (from Shop*.tsx)
│   ├── single-product.php             # Product detail (from ProductDetail.tsx)
│   ├── cart/
│   │   └── cart.php                   # Cart page (from Cart.tsx)
│   ├── checkout/
│   │   └── form-checkout.php          # Checkout page
│   ├── content-product.php            # Product card (from ProductCard.tsx)
│   └── product-searchform.php         # Search form (from Search.tsx)
│
├── template-parts/                    # Reusable template parts
│   ├── header/
│   │   ├── navigation.php             # Main nav (from Navigation.tsx)
│   │   └── hero.php                   # Hero section (from Hero.tsx)
│   ├── footer/
│   │   └── footer-widgets.php         # Footer (from Footer*.tsx)
│   ├── product/
│   │   ├── product-card.php           # Product card (from ProductCard.tsx)
│   │   ├── product-comparison.php     # Comparison modal (from ComparisonModal.tsx)
│   │   └── product-quickview.php      # Quick view (from QuickViewModal.tsx)
│   └── shop/
│       └── shop-sidebar.php           # Shop filters (from ShopSidebar.tsx)
│
├── page-templates/                    # Custom page templates
│   ├── page-ballistic-calculator.php  # From BallisticCalculator.tsx
│   ├── page-reloading-guide.php       # From ReloadingGuide.tsx
│   ├── page-load-recipes.php          # From LoadRecipes.tsx
│   ├── page-firearms-license.php      # From FirearmsLicense.tsx
│   ├── page-how-to-buy.php            # From HowToBuy.tsx
│   └── page-about.php                 # From About*.tsx
│
├── inc/                               # PHP includes
│   ├── woocommerce-functions.php      # WooCommerce customizations
│   ├── demo-import.php                # Demo content importer
│   ├── customizer.php                 # Theme customizer options
│   ├── product-attributes.php         # Custom product attributes
│   ├── ballistic-calculator.php       # Calculator functionality
│   ├── template-functions.php         # Helper functions
│   ├── ajax-handlers.php              # AJAX handlers
│   └── class-wishlist.php             # Wishlist functionality
│
├── assets/
│   ├── css/
│   │   ├── main.css                   # Compiled Tailwind CSS
│   │   ├── editor-style.css           # Block editor styles
│   │   └── admin.css                  # Admin styles
│   ├── js/
│   │   ├── main.js                    # Main JavaScript
│   │   ├── product-variations.js      # Variation handling
│   │   ├── comparison.js              # Comparison functionality
│   │   ├── wishlist.js                # Wishlist functionality
│   │   ├── ballistic-calculator.js    # Calculator logic
│   │   └── admin.js                   # Admin JavaScript
│   └── images/
│       ├── logo.png
│       └── placeholder-product.jpg
│
├── languages/                         # Translation files
│   └── arms-complex.pot
│
└── demo-content/                      # Demo import files
    ├── products.xml                   # WooCommerce products
    ├── pages.xml                      # WordPress pages
    └── theme-options.json             # Theme settings
```

---

## 4. Component Conversion

### Priority Conversion Order

1. **Core Layout Components** (Header, Footer, Navigation)
2. **Product Components** (ProductCard, ProductDetail)
3. **Shop Pages** (Archive templates)
4. **Cart & Checkout** (WooCommerce templates)
5. **Custom Pages** (Ballistic Calculator, etc.)
6. **Additional Features** (Wishlist, Comparison)

### Component Conversion Examples

#### Example 1: ProductCard Component

**React Component** (`src/components/ProductCard.tsx`):
```tsx
export const ProductCard = ({ id, name, caliber, price, image, inStock }: ProductCardProps) => {
  const { addItem } = useCart();
  
  return (
    <Card>
      <CardContent>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{caliber}</p>
        <span>${price}</span>
        <Button onClick={() => addItem(id)}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};
```

**WordPress Template Part** (`template-parts/product/product-card.php`):
```php
<?php
/**
 * Product Card Template Part
 * 
 * Displays a single product card in the shop grid
 * Equivalent to React ProductCard.tsx component
 * 
 * @package Arms_Complex
 */

// Get product object
global $product;
if (!$product) {
    return;
}
?>

<div class="product-card card bg-card rounded-lg overflow-hidden hover:shadow-xl transition-all">
    <div class="card-content p-4">
        <!-- Product Image -->
        <a href="<?php echo esc_url(get_permalink($product->get_id())); ?>" class="block mb-4">
            <?php echo wp_kses_post($product->get_image('medium')); ?>
        </a>
        
        <!-- Product Title -->
        <h3 class="text-lg font-semibold mb-2">
            <a href="<?php echo esc_url(get_permalink($product->get_id())); ?>">
                <?php echo esc_html($product->get_name()); ?>
            </a>
        </h3>
        
        <!-- Caliber (Custom Attribute) -->
        <?php
        $caliber = $product->get_attribute('pa_caliber');
        if ($caliber) :
        ?>
            <p class="text-muted-foreground text-sm mb-2"><?php echo esc_html($caliber); ?></p>
        <?php endif; ?>
        
        <!-- Price -->
        <div class="price text-xl font-bold text-tactical mb-4">
            <?php echo wp_kses_post($product->get_price_html()); ?>
        </div>
        
        <!-- Stock Status -->
        <?php if ($product->is_in_stock()) : ?>
            <span class="badge bg-accent text-accent-foreground">In Stock</span>
        <?php else : ?>
            <span class="badge bg-destructive text-destructive-foreground">Out of Stock</span>
        <?php endif; ?>
        
        <!-- Add to Cart Button -->
        <div class="mt-4">
            <?php
            // Use WooCommerce's built-in add to cart button
            woocommerce_template_loop_add_to_cart();
            ?>
        </div>
        
        <!-- Wishlist & Compare Buttons -->
        <div class="flex gap-2 mt-2">
            <?php
            // Custom wishlist button (from inc/class-wishlist.php)
            arms_complex_wishlist_button($product->get_id());
            
            // Custom comparison button
            arms_complex_comparison_button($product->get_id());
            ?>
        </div>
    </div>
</div>
```

#### Example 2: Product Variations

**React Hook** (`src/hooks/useCart.ts`):
```typescript
const [selectedVariation, setSelectedVariation] = useState(variations[0]);

const handleVariationClick = (variation) => {
  setSelectedVariation(variation);
};
```

**WordPress PHP + JavaScript** (`template-parts/product/product-variations.php` + `assets/js/product-variations.js`):

**PHP**:
```php
<?php
/**
 * Product Variations Selector
 * Displays quantity-based variations for ammunition products
 */

global $product;

if (!$product->is_type('variable')) {
    return;
}

$available_variations = $product->get_available_variations();
?>

<div class="product-variations" data-product-id="<?php echo esc_attr($product->get_id()); ?>">
    <label class="text-sm font-semibold mb-2 block">Select Quantity:</label>
    
    <div class="variations-grid grid grid-cols-2 md:grid-cols-4 gap-2">
        <?php foreach ($available_variations as $variation) : 
            $variation_obj = wc_get_product($variation['variation_id']);
            $quantity = $variation['attributes']['attribute_quantity'];
        ?>
            <button 
                type="button"
                class="variation-option border-2 border-border rounded-lg p-3 text-center hover:border-tactical transition-all"
                data-variation-id="<?php echo esc_attr($variation['variation_id']); ?>"
                data-price="<?php echo esc_attr($variation_obj->get_price()); ?>"
                data-quantity="<?php echo esc_attr($quantity); ?>"
            >
                <div class="text-lg font-bold"><?php echo esc_html($quantity); ?> Rounds</div>
                <div class="text-tactical font-semibold">
                    $<?php echo esc_html(number_format($variation_obj->get_price(), 2)); ?>
                </div>
            </button>
        <?php endforeach; ?>
    </div>
    
    <!-- Hidden input for selected variation -->
    <input type="hidden" name="variation_id" id="selected-variation-id" value="">
</div>
```

**JavaScript** (`assets/js/product-variations.js`):
```javascript
/**
 * Product Variations Handler
 * Manages variation selection and price updates
 * Equivalent to React selectedVariation state
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        // Handle variation selection
        $('.variation-option').on('click', function() {
            const $button = $(this);
            const $container = $button.closest('.product-variations');
            const variationId = $button.data('variation-id');
            const price = $button.data('price');
            const quantity = $button.data('quantity');
            
            // Update active state
            $container.find('.variation-option').removeClass('border-tactical bg-tactical/10');
            $button.addClass('border-tactical bg-tactical/10');
            
            // Update hidden input
            $('#selected-variation-id').val(variationId);
            
            // Update displayed price
            $('.product-price .price').html('$' + parseFloat(price).toFixed(2));
            
            // Update add to cart button
            updateAddToCartButton(variationId);
            
            // Show price change indicator
            showPriceChangeIndicator($button, price);
        });
        
        // Auto-select first variation
        $('.variation-option').first().trigger('click');
    });
    
    /**
     * Update add to cart button with variation ID
     */
    function updateAddToCartButton(variationId) {
        const $addToCartBtn = $('.single_add_to_cart_button');
        $addToCartBtn.val(variationId);
        $addToCartBtn.attr('data-variation-id', variationId);
    }
    
    /**
     * Show visual indicator for price changes
     */
    function showPriceChangeIndicator($button, newPrice) {
        const $indicator = $('<div class="price-change-indicator">Updated</div>');
        $button.append($indicator);
        
        setTimeout(function() {
            $indicator.fadeOut(300, function() {
                $(this).remove();
            });
        }, 1000);
    }
    
})(jQuery);
```

---

## 5. Data Migration

### Product Data Conversion

**From**: `src/data/products.ts` (TypeScript array)  
**To**: WooCommerce Products (Database)

#### React Product Structure:
```typescript
export const products: Product[] = [
  {
    id: "223-hornady-american-gunner",
    name: ".223 Rem - Hornady American Gunner",
    caliber: ".223 Remington",
    bulletType: "HP",
    bulletWeight: "55gr",
    brand: "Hornady",
    rounds: 20,
    price: 18.99,
    quantityVariations: [
      { quantity: 20, price: 18.99 },
      { quantity: 50, price: 44.99 },
      { quantity: 100, price: 84.99 },
      { quantity: 500, price: 399.99 }
    ],
    inStock: true,
    image: "/images/products/223-hornady.jpg",
    description: "Hornady American Gunner ammunition...",
    manufacturer: "Hornady Manufacturing",
    muzzleVelocity: 3240,
    muzzleEnergy: 1282,
    specifications: {
      casing: "Brass",
      primer: "Boxer",
      reloadable: true,
      uses: ["Target Shooting", "Plinking"]
    }
  },
  // ... more products
];
```

#### WordPress Import Function:

Create `inc/import-products.php`:

```php
<?php
/**
 * Product Import from JSON/Array
 * 
 * Converts React product data to WooCommerce products
 * Run this once during theme activation
 */

function arms_complex_import_products_from_json() {
    // Load product data from JSON file (exported from React app)
    $json_file = get_template_directory() . '/demo-content/products.json';
    
    if (!file_exists($json_file)) {
        return new WP_Error('file_not_found', 'Products JSON file not found');
    }
    
    $products_json = file_get_contents($json_file);
    $products = json_decode($products_json, true);
    
    if (!$products) {
        return new WP_Error('json_decode_error', 'Failed to decode products JSON');
    }
    
    foreach ($products as $product_data) {
        arms_complex_create_wc_product($product_data);
    }
    
    return true;
}

/**
 * Create WooCommerce Product from React Data
 */
function arms_complex_create_wc_product($data) {
    // Check if product already exists
    $existing = get_page_by_path($data['id'], OBJECT, 'product');
    if ($existing) {
        return $existing->ID; // Skip if exists
    }
    
    // Create variable product (for quantity variations)
    $product = new WC_Product_Variable();
    
    // Basic data
    $product->set_name($data['name']);
    $product->set_slug($data['id']);
    $product->set_description($data['description']);
    $product->set_short_description($data['shortDescription'] ?? '');
    $product->set_sku('AMMO-' . strtoupper($data['id']));
    $product->set_status('publish');
    
    // Stock
    $product->set_stock_status($data['inStock'] ? 'instock' : 'outofstock');
    $product->set_manage_stock(true);
    $product->set_stock_quantity(1000);
    
    // Categories
    $categories = arms_complex_get_product_categories($data['caliber'], $data['category'] ?? '');
    $product->set_category_ids($categories);
    
    // Save product to get ID
    $product_id = $product->save();
    
    // Set custom attributes
    arms_complex_set_product_attributes($product_id, array(
        'pa_caliber' => $data['caliber'],
        'pa_bullet_type' => $data['bulletType'],
        'pa_bullet_weight' => $data['bulletWeight'],
        'pa_brand' => $data['brand'],
    ));
    
    // Create variations for different quantities
    if (isset($data['quantityVariations'])) {
        arms_complex_create_product_variations($product_id, $data['quantityVariations']);
    }
    
    // Set product image
    if (isset($data['image'])) {
        arms_complex_set_product_image($product_id, $data['image']);
    }
    
    // Set custom meta (for ballistic data, etc.)
    update_post_meta($product_id, '_muzzle_velocity', $data['muzzleVelocity'] ?? '');
    update_post_meta($product_id, '_muzzle_energy', $data['muzzleEnergy'] ?? '');
    update_post_meta($product_id, '_manufacturer', $data['manufacturer'] ?? '');
    update_post_meta($product_id, '_specifications', json_encode($data['specifications'] ?? array()));
    
    return $product_id;
}

/**
 * Create product variations for quantity options
 */
function arms_complex_create_product_variations($product_id, $variations) {
    $product = wc_get_product($product_id);
    
    // Set up quantity attribute
    $attribute = new WC_Product_Attribute();
    $attribute->set_name('Quantity');
    $attribute->set_options(array_column($variations, 'quantity'));
    $attribute->set_position(0);
    $attribute->set_visible(true);
    $attribute->set_variation(true);
    
    $product->set_attributes(array($attribute));
    $product->save();
    
    // Create each variation
    foreach ($variations as $var_data) {
        $variation = new WC_Product_Variation();
        $variation->set_parent_id($product_id);
        
        // Set variation attributes
        $variation->set_attributes(array(
            'quantity' => $var_data['quantity']
        ));
        
        // Set prices
        $variation->set_regular_price($var_data['price']);
        $variation->set_price($var_data['price']);
        
        // Set SKU
        $parent_sku = $product->get_sku();
        $variation->set_sku($parent_sku . '-' . $var_data['quantity']);
        
        // Stock
        $variation->set_stock_status('instock');
        $variation->set_manage_stock(true);
        $variation->set_stock_quantity(100);
        
        $variation->save();
    }
}
```

### Export Products from React App

Create a JSON export file:

```bash
# In your React project directory
node -e "
const products = require('./src/data/products.ts').products;
const fs = require('fs');
fs.writeFileSync('./wordpress-theme/demo-content/products.json', JSON.stringify(products, null, 2));
"
```

Or manually create `wordpress-theme/demo-content/products.json`:

```json
[
  {
    "id": "223-hornady-american-gunner",
    "name": ".223 Rem - Hornady American Gunner",
    "caliber": ".223 Remington",
    "bulletType": "HP",
    "bulletWeight": "55gr",
    "brand": "Hornady",
    "rounds": 20,
    "price": 18.99,
    "quantityVariations": [
      { "quantity": 20, "price": 18.99 },
      { "quantity": 50, "price": 44.99 },
      { "quantity": 100, "price": 84.99 },
      { "quantity": 500, "price": 399.99 }
    ],
    "inStock": true,
    "image": "placeholder-product.jpg",
    "description": "Hornady American Gunner ammunition is designed to be affordable and reliable...",
    "manufacturer": "Hornady Manufacturing",
    "muzzleVelocity": 3240,
    "muzzleEnergy": 1282,
    "specifications": {
      "casing": "Brass",
      "primer": "Boxer",
      "reloadable": true,
      "uses": ["Target Shooting", "Plinking"]
    }
  }
]
```

---

## 6. State Management

### React State → WordPress Equivalent

| React State | WordPress Solution | Implementation |
|------------|-------------------|----------------|
| `useState` (component) | AJAX + Transients | Store temporarily with `set_transient()` |
| `useContext` (global) | Global PHP variable | Use `$GLOBALS` or singleton class |
| `localStorage` (client) | Cookies / User Meta | `setcookie()` or `update_user_meta()` |
| Cart state | WooCommerce Session | Handled by WC automatically |
| User preferences | User Meta | `get_user_meta()` / `update_user_meta()` |

#### Example: Wishlist State

**React** (`src/hooks/useWishlist.ts`):
```typescript
export const useWishlist = () => {
  const [items, setItems] = useState<string[]>([]);
  
  const addToWishlist = (productId: string) => {
    setItems([...items, productId]);
    localStorage.setItem('wishlist', JSON.stringify([...items, productId]));
  };
  
  return { items, addToWishlist };
};
```

**WordPress** (`inc/class-wishlist.php` + `assets/js/wishlist.js`):

**PHP Class**:
```php
<?php
/**
 * Wishlist Functionality
 * Manages user wishlist via cookies (guests) or user meta (logged in)
 */

class Arms_Complex_Wishlist {
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // AJAX handlers
        add_action('wp_ajax_add_to_wishlist', array($this, 'add_to_wishlist'));
        add_action('wp_ajax_nopriv_add_to_wishlist', array($this, 'add_to_wishlist'));
        add_action('wp_ajax_remove_from_wishlist', array($this, 'remove_from_wishlist'));
        add_action('wp_ajax_nopriv_remove_from_wishlist', array($this, 'remove_from_wishlist'));
    }
    
    /**
     * Get wishlist items for current user
     */
    public function get_wishlist() {
        if (is_user_logged_in()) {
            $user_id = get_current_user_id();
            $wishlist = get_user_meta($user_id, '_wishlist', true);
            return $wishlist ? $wishlist : array();
        } else {
            // Get from cookie
            if (isset($_COOKIE['arms_complex_wishlist'])) {
                return json_decode(stripslashes($_COOKIE['arms_complex_wishlist']), true);
            }
            return array();
        }
    }
    
    /**
     * Add product to wishlist
     */
    public function add_to_wishlist() {
        check_ajax_referer('arms-complex-nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        $wishlist = $this->get_wishlist();
        
        if (!in_array($product_id, $wishlist)) {
            $wishlist[] = $product_id;
            $this->save_wishlist($wishlist);
        }
        
        wp_send_json_success(array(
            'message' => __('Added to wishlist', 'arms-complex'),
            'count' => count($wishlist)
        ));
    }
    
    /**
     * Remove product from wishlist
     */
    public function remove_from_wishlist() {
        check_ajax_referer('arms-complex-nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        $wishlist = $this->get_wishlist();
        
        $wishlist = array_diff($wishlist, array($product_id));
        $this->save_wishlist($wishlist);
        
        wp_send_json_success(array(
            'message' => __('Removed from wishlist', 'arms-complex'),
            'count' => count($wishlist)
        ));
    }
    
    /**
     * Save wishlist
     */
    private function save_wishlist($wishlist) {
        if (is_user_logged_in()) {
            $user_id = get_current_user_id();
            update_user_meta($user_id, '_wishlist', $wishlist);
        } else {
            // Save to cookie (30 days)
            setcookie(
                'arms_complex_wishlist',
                json_encode($wishlist),
                time() + (30 * DAY_IN_SECONDS),
                COOKIEPATH,
                COOKIE_DOMAIN
            );
        }
    }
}

// Initialize
Arms_Complex_Wishlist::get_instance();
```

**JavaScript** (`assets/js/wishlist.js`):
```javascript
/**
 * Wishlist Frontend Handler
 */

(function($) {
    'use strict';
    
    const Wishlist = {
        init: function() {
            this.bindEvents();
            this.updateCount();
        },
        
        bindEvents: function() {
            $(document).on('click', '.wishlist-button', this.toggleWishlist);
        },
        
        toggleWishlist: function(e) {
            e.preventDefault();
            
            const $button = $(this);
            const productId = $button.data('product-id');
            const isInWishlist = $button.hasClass('in-wishlist');
            
            const action = isInWishlist ? 'remove_from_wishlist' : 'add_to_wishlist';
            
            $.ajax({
                url: armsComplex.ajaxUrl,
                type: 'POST',
                data: {
                    action: action,
                    product_id: productId,
                    nonce: armsComplex.nonce
                },
                beforeSend: function() {
                    $button.prop('disabled', true);
                },
                success: function(response) {
                    if (response.success) {
                        $button.toggleClass('in-wishlist');
                        Wishlist.updateCount();
                        
                        // Show toast notification
                        showToast(response.data.message);
                    }
                },
                complete: function() {
                    $button.prop('disabled', false);
                }
            });
        },
        
        updateCount: function() {
            // Update wishlist count in header
            $.ajax({
                url: armsComplex.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'get_wishlist_count',
                    nonce: armsComplex.nonce
                },
                success: function(response) {
                    if (response.success) {
                        $('.wishlist-count').text(response.data.count);
                    }
                }
            });
        }
    };
    
    $(document).ready(function() {
        Wishlist.init();
    });
    
})(jQuery);
```

---

## 7. Routing

### React Router → WordPress Permalinks

| React Route | WordPress Template | URL Structure |
|------------|-------------------|---------------|
| `/` | `index.php` or `front-page.php` | `example.com/` |
| `/products` | `woocommerce/archive-product.php` | `example.com/shop/` |
| `/product/:id` | `woocommerce/single-product.php` | `example.com/product/slug/` |
| `/cart` | `woocommerce/cart/cart.php` | `example.com/cart/` |
| `/about` | `page-about.php` | `example.com/about/` |
| `/ballistic-calculator` | `page-ballistic-calculator.php` | `example.com/ballistic-calculator/` |

### Custom Page Templates

Create page templates for custom routes:

```php
<?php
/**
 * Template Name: Ballistic Calculator
 * 
 * Converts: src/pages/BallisticCalculator.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8"><?php the_title(); ?></h1>
        
        <!-- Ballistic Calculator Form -->
        <div id="ballistic-calculator" class="bg-card rounded-lg p-6">
            <?php get_template_part('template-parts/calculator/ballistic-form'); ?>
        </div>
        
        <!-- Results -->
        <div id="ballistic-results" class="mt-8"></div>
    </div>
</main>

<?php
get_footer();
```

---

## 8. Styling

### Tailwind CSS Integration

The React app uses Tailwind CSS with custom configuration. To preserve all styles:

1. **Copy Tailwind Config**:

Copy `tailwind.config.ts` → `tailwind.config.js` (convert TS to JS)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.php',
    './assets/**/*.js',
    './template-parts/**/*.php',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        tactical: {
          DEFAULT: 'hsl(var(--tactical))',
          foreground: 'hsl(var(--tactical-foreground))',
          hover: 'hsl(var(--tactical-hover))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
```

2. **Copy CSS Variables**:

Copy all CSS variables from `src/index.css` to `style.css` (already done in theme skeleton)

3. **Build Process**:

Create `package.json` in theme root:

```json
{
  "name": "arms-complex-theme",
  "version": "1.0.0",
  "scripts": {
    "build:css": "tailwindcss -i ./assets/css/source.css -o ./assets/css/main.css --minify",
    "watch:css": "tailwindcss -i ./assets/css/source.css -o ./assets/css/main.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "autoprefixer": "^10.4.16"
  }
}
```

Create `assets/css/source.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import custom component styles */
@import './components.css';
```

Run build:
```bash
npm install
npm run build:css
```

---

## 9. JavaScript Functionality

### Converting React Components to Vanilla JS/jQuery

Many React components use hooks and state. Convert these to jQuery with AJAX:

#### Example: Comparison Feature

**React** (`src/components/ComparisonModal.tsx`):
```tsx
const { items, removeItem } = useComparison();
```

**WordPress** (`assets/js/comparison.js`):
```javascript
(function($) {
    'use strict';
    
    const Comparison = {
        items: [],
        
        init: function() {
            this.loadItems();
            this.bindEvents();
        },
        
        loadItems: function() {
            const stored = localStorage.getItem('comparison_items');
            this.items = stored ? JSON.parse(stored) : [];
            this.updateUI();
        },
        
        addItem: function(productId) {
            if (this.items.length >= 4) {
                alert('You can only compare up to 4 products');
                return;
            }
            
            if (!this.items.includes(productId)) {
                this.items.push(productId);
                this.saveItems();
                this.updateUI();
            }
        },
        
        removeItem: function(productId) {
            this.items = this.items.filter(id => id !== productId);
            this.saveItems();
            this.updateUI();
        },
        
        saveItems: function() {
            localStorage.setItem('comparison_items', JSON.stringify(this.items));
        },
        
        updateUI: function() {
            $('.comparison-count').text(this.items.length);
            
            if (this.items.length > 0) {
                $('.comparison-bar').fadeIn();
            } else {
                $('.comparison-bar').fadeOut();
            }
        },
        
        bindEvents: function() {
            $(document).on('click', '.comparison-button', function(e) {
                e.preventDefault();
                const productId = $(this).data('product-id');
                Comparison.addItem(productId);
            });
            
            $(document).on('click', '.remove-comparison', function(e) {
                e.preventDefault();
                const productId = $(this).data('product-id');
                Comparison.removeItem(productId);
            });
        }
    };
    
    $(document).ready(function() {
        Comparison.init();
    });
    
})(jQuery);
```

---

## 10. Testing Checklist

### Post-Conversion Testing

#### Functionality Tests

- [ ] **Product Display**
  - [ ] Products display correctly in shop grid
  - [ ] Product images load
  - [ ] Product attributes show correctly
  - [ ] Quantity variations work
  - [ ] Price updates when variation selected

- [ ] **Cart & Checkout**
  - [ ] Add to cart works
  - [ ] Cart updates correctly
  - [ ] Quantity adjustments work
  - [ ] Checkout process completes

- [ ] **Wishlist**
  - [ ] Add to wishlist works
  - [ ] Remove from wishlist works
  - [ ] Wishlist persists across sessions
  - [ ] Wishlist count updates

- [ ] **Comparison**
  - [ ] Add to comparison works
  - [ ] Comparison modal displays
  - [ ] Remove from comparison works
  - [ ] Compare up to 4 products

- [ ] **Filtering & Sorting**
  - [ ] Category filters work
  - [ ] Price range filter works
  - [ ] Brand filter works
  - [ ] Sort options work
  - [ ] Search functionality works

- [ ] **Custom Pages**
  - [ ] Ballistic calculator functions
  - [ ] Reloading guide displays
  - [ ] Load recipes save/load
  - [ ] All custom pages accessible

#### Visual Tests

- [ ] **Responsive Design**
  - [ ] Mobile (320px-767px)
  - [ ] Tablet (768px-1023px)
  - [ ] Desktop (1024px+)

- [ ] **Browser Compatibility**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Dark Mode** (if applicable)
  - [ ] All pages display correctly
  - [ ] Contrast is readable

#### Performance Tests

- [ ] Page load times < 3 seconds
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] No console errors

---

## Conversion Process Steps

### Step 1: Setup WordPress Environment

1. Install fresh WordPress
2. Install and activate WooCommerce
3. Install theme from `wordpress-theme/` folder
4. Activate theme

### Step 2: Import Demo Content

1. Theme will show admin notice
2. Click "Import Demo Content"
3. Wait for import to complete
4. Verify products imported correctly

### Step 3: Configure WooCommerce

1. Set up payment gateways
2. Configure shipping methods
3. Set up tax rates (if applicable)
4. Configure email notifications

### Step 4: Customize Theme

1. Go to Appearance → Customize
2. Upload logo
3. Set primary colors
4. Configure layout options

### Step 5: Test All Features

1. Test product browsing
2. Test add to cart
3. Test checkout
4. Test custom pages
5. Test responsive design

---

## Development Tips for Cursor AI

### When Converting Components:

1. **Identify component type**:
   - Layout component → Template part
   - Page component → Page template
   - Reusable UI → Template part
   - Hook/State → PHP class + JS

2. **Map dependencies**:
   - React Router → WordPress permalinks
   - Context → Global PHP variable or singleton class
   - localStorage → Cookies or user meta
   - API calls → AJAX handlers

3. **Preserve functionality**:
   - Keep all user interactions
   - Maintain visual design
   - Ensure data integrity
   - Test edge cases

4. **Use WordPress standards**:
   - Follow WordPress Coding Standards
   - Use WordPress functions (don't reinvent)
   - Sanitize all inputs
   - Escape all outputs
   - Use nonces for security

### Common Patterns:

```php
// Output escaped HTML
echo esc_html($variable);

// Output URL
echo esc_url($url);

// Output attribute
echo esc_attr($attribute);

// Output HTML (when needed)
echo wp_kses_post($html);

// Get option
$option = get_option('option_name');

// Update option
update_option('option_name', $value);

// Get user meta
$meta = get_user_meta($user_id, 'meta_key', true);

// AJAX handler
add_action('wp_ajax_action_name', 'callback_function');
add_action('wp_ajax_nopriv_action_name', 'callback_function'); // For non-logged users
```

---

## Additional Resources

- **WordPress Codex**: https://codex.wordpress.org/
- **WooCommerce Docs**: https://woocommerce.com/documentation/
- **Theme Handbook**: https://developer.wordpress.org/themes/
- **WooCommerce Theme Development**: https://woocommerce.com/document/woocommerce-theme-developer-handbook/

---

## Support

For questions or issues during conversion:

**Developer**: J.Nshome  
**Email**: nshomejude@gmail.com  
**Website**: https://opesware.com

---

**End of Conversion Guide**
