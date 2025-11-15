<?php
/**
 * Demo Content Import Functionality
 * 
 * Handles automatic import of demo products, pages, and settings when theme is activated.
 * Users are prompted to import demo content through an admin notice.
 * 
 * @package Arms_Complex
 * @author J.Nshome
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Display admin notice to import demo content
 */
function arms_complex_demo_import_notice() {
    // Check if already dismissed or imported
    if (get_option('arms_complex_demo_imported') || get_option('arms_complex_demo_dismissed')) {
        return;
    }
    
    // Check if WooCommerce is active
    if (!class_exists('WooCommerce')) {
        ?>
        <div class="notice notice-warning is-dismissible arms-complex-notice">
            <p>
                <strong><?php esc_html_e('Arms Complex Theme', 'arms-complex'); ?></strong><br>
                <?php esc_html_e('WooCommerce is required for this theme to function properly. Please install and activate WooCommerce.', 'arms-complex'); ?>
            </p>
        </div>
        <?php
        return;
    }
    
    ?>
    <div class="notice notice-info is-dismissible arms-complex-demo-notice">
        <h2><?php esc_html_e('Welcome to Arms Complex Theme!', 'arms-complex'); ?></h2>
        <p>
            <?php esc_html_e('Thank you for choosing Arms Complex. Would you like to import demo products and content to get started quickly?', 'arms-complex'); ?>
        </p>
        <p>
            <strong><?php esc_html_e('This will import:', 'arms-complex'); ?></strong>
        </p>
        <ul style="list-style: disc; margin-left: 20px;">
            <li><?php esc_html_e('Sample ammunition products with variations', 'arms-complex'); ?></li>
            <li><?php esc_html_e('Sample firearms products', 'arms-complex'); ?></li>
            <li><?php esc_html_e('Product categories and attributes', 'arms-complex'); ?></li>
            <li><?php esc_html_e('Required pages (Ballistic Calculator, Reloading Guide, etc.)', 'arms-complex'); ?></li>
            <li><?php esc_html_e('Theme settings and customizations', 'arms-complex'); ?></li>
        </ul>
        <p>
            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin.php?action=arms_complex_import_demo'), 'arms_complex_import_demo')); ?>" class="button button-primary">
                <?php esc_html_e('Import Demo Content', 'arms-complex'); ?>
            </a>
            <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin.php?action=arms_complex_dismiss_notice'), 'arms_complex_dismiss_notice')); ?>" class="button">
                <?php esc_html_e('Skip This Step', 'arms-complex'); ?>
            </a>
        </p>
    </div>
    <?php
}
add_action('admin_notices', 'arms_complex_demo_import_notice');

/**
 * Handle demo import action
 */
function arms_complex_handle_demo_import() {
    // Verify nonce
    if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'arms_complex_import_demo')) {
        wp_die(esc_html__('Security check failed', 'arms-complex'));
    }
    
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        wp_die(esc_html__('You do not have permission to perform this action', 'arms-complex'));
    }
    
    // Import demo content
    $result = arms_complex_import_demo_content();
    
    if ($result) {
        // Set flag that demo is imported
        update_option('arms_complex_demo_imported', true);
        
        // Redirect with success message
        wp_redirect(admin_url('admin.php?page=arms-complex-welcome&demo-imported=true'));
        exit;
    } else {
        // Redirect with error message
        wp_redirect(admin_url('admin.php?page=arms-complex-welcome&demo-import-error=true'));
        exit;
    }
}
add_action('admin_action_arms_complex_import_demo', 'arms_complex_handle_demo_import');

/**
 * Handle notice dismissal
 */
function arms_complex_dismiss_notice() {
    // Verify nonce
    if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'arms_complex_dismiss_notice')) {
        wp_die(esc_html__('Security check failed', 'arms-complex'));
    }
    
    update_option('arms_complex_demo_dismissed', true);
    wp_redirect(admin_url());
    exit;
}
add_action('admin_action_arms_complex_dismiss_notice', 'arms_complex_dismiss_notice');

/**
 * Import demo content
 * 
 * This function imports all demo products, categories, and settings
 * 
 * @return bool True on success, false on failure
 */
function arms_complex_import_demo_content() {
    // Check if WooCommerce is active
    if (!class_exists('WooCommerce')) {
        return false;
    }
    
    // Import product categories
    arms_complex_import_categories();
    
    // Import product attributes
    arms_complex_import_attributes();
    
    // Import ammunition products
    arms_complex_import_ammunition_products();
    
    // Import firearms products
    arms_complex_import_firearms_products();
    
    // Import pages
    arms_complex_create_pages();
    
    // Set theme options
    arms_complex_import_theme_options();
    
    return true;
}

/**
 * Import product categories
 */
function arms_complex_import_categories() {
    $categories = array(
        array(
            'name'        => 'Ammunition',
            'slug'        => 'ammunition',
            'description' => 'High-quality ammunition for all your shooting needs',
        ),
        array(
            'name'        => 'Pistol Ammo',
            'slug'        => 'pistol-ammo',
            'parent'      => 'ammunition',
            'description' => 'Pistol ammunition in various calibers',
        ),
        array(
            'name'        => 'Rifle Ammo',
            'slug'        => 'rifle-ammo',
            'parent'      => 'ammunition',
            'description' => 'Rifle ammunition for hunting and sport shooting',
        ),
        array(
            'name'        => 'Shotgun Ammo',
            'slug'        => 'shotgun-ammo',
            'parent'      => 'ammunition',
            'description' => 'Shotgun shells for various applications',
        ),
        array(
            'name'        => 'Firearms',
            'slug'        => 'firearms',
            'description' => 'Quality firearms from trusted manufacturers',
        ),
        array(
            'name'        => 'Pistols',
            'slug'        => 'pistols',
            'parent'      => 'firearms',
            'description' => 'Handguns for personal defense and sport shooting',
        ),
        array(
            'name'        => 'Rifles',
            'slug'        => 'rifles',
            'parent'      => 'firearms',
            'description' => 'Rifles for hunting and precision shooting',
        ),
        array(
            'name'        => 'Shotguns',
            'slug'        => 'shotguns',
            'parent'      => 'firearms',
            'description' => 'Shotguns for hunting and sport shooting',
        ),
    );
    
    foreach ($categories as $category) {
        // Check if category already exists
        $term = term_exists($category['slug'], 'product_cat');
        
        if (!$term) {
            $parent_id = 0;
            
            // Get parent category ID if specified
            if (isset($category['parent'])) {
                $parent_term = get_term_by('slug', $category['parent'], 'product_cat');
                if ($parent_term) {
                    $parent_id = $parent_term->term_id;
                }
            }
            
            // Insert category
            wp_insert_term(
                $category['name'],
                'product_cat',
                array(
                    'slug'        => $category['slug'],
                    'description' => $category['description'],
                    'parent'      => $parent_id,
                )
            );
        }
    }
}

/**
 * Import product attributes
 * 
 * Creates custom product attributes like Caliber, Bullet Type, etc.
 */
function arms_complex_import_attributes() {
    $attributes = array(
        array(
            'name'         => 'Caliber',
            'slug'         => 'pa_caliber',
            'type'         => 'select',
            'order_by'     => 'menu_order',
            'has_archives' => true,
        ),
        array(
            'name'         => 'Bullet Weight',
            'slug'         => 'pa_bullet_weight',
            'type'         => 'select',
            'order_by'     => 'menu_order',
            'has_archives' => false,
        ),
        array(
            'name'         => 'Bullet Type',
            'slug'         => 'pa_bullet_type',
            'type'         => 'select',
            'order_by'     => 'menu_order',
            'has_archives' => false,
        ),
        array(
            'name'         => 'Brand',
            'slug'         => 'pa_brand',
            'type'         => 'select',
            'order_by'     => 'name',
            'has_archives' => true,
        ),
        array(
            'name'         => 'Action Type',
            'slug'         => 'pa_action_type',
            'type'         => 'select',
            'order_by'     => 'menu_order',
            'has_archives' => false,
        ),
    );
    
    foreach ($attributes as $attribute) {
        // Check if attribute already exists
        $attribute_id = wc_attribute_taxonomy_id_by_name($attribute['slug']);
        
        if (!$attribute_id) {
            wc_create_attribute(array(
                'name'         => $attribute['name'],
                'slug'         => $attribute['slug'],
                'type'         => $attribute['type'],
                'order_by'     => $attribute['order_by'],
                'has_archives' => $attribute['has_archives'],
            ));
        }
    }
    
    // Register taxonomies
    delete_transient('wc_attribute_taxonomies');
    WC_Cache_Helper::invalidate_cache_group('woocommerce-attributes');
}

/**
 * Import sample ammunition products
 * 
 * CONVERSION NOTE FOR CURSOR:
 * This data comes from src/data/products.ts in the React app
 * Each product should be converted to a WooCommerce product with:
 * - Variable product type for quantity variations
 * - Product attributes (caliber, bullet type, brand)
 * - Product variations for different quantities (20, 50, 100, 500 rounds)
 * - Stock management
 * - Pricing per variation
 */
function arms_complex_import_ammunition_products() {
    // Sample products data - in production, this would come from an import file
    $products = array(
        array(
            'name'        => '.223 Rem - Hornady American Gunner',
            'slug'        => '223-hornady-american-gunner',
            'description' => 'Hornady American Gunner ammunition is designed to be affordable and reliable for everyday shooting. Features the XTP hollow point bullet for excellent accuracy and performance.',
            'sku'         => 'AMMO-223-HRNDY-001',
            'price'       => 18.99,
            'categories'  => array('rifle-ammo'),
            'attributes'  => array(
                'pa_caliber'      => '.223 Remington',
                'pa_bullet_weight' => '55gr',
                'pa_bullet_type'  => 'HP',
                'pa_brand'        => 'Hornady',
            ),
            'variations'  => array(
                array('quantity' => 20, 'price' => 18.99, 'sku' => 'AMMO-223-HRNDY-001-20'),
                array('quantity' => 50, 'price' => 44.99, 'sku' => 'AMMO-223-HRNDY-001-50'),
                array('quantity' => 100, 'price' => 84.99, 'sku' => 'AMMO-223-HRNDY-001-100'),
                array('quantity' => 500, 'price' => 399.99, 'sku' => 'AMMO-223-HRNDY-001-500'),
            ),
            'stock'       => 'instock',
            'image'       => 'placeholder-product.jpg',
        ),
        // Add more products here...
    );
    
    foreach ($products as $product_data) {
        arms_complex_create_product($product_data);
    }
}

/**
 * Create a WooCommerce product
 * 
 * @param array $product_data Product data array
 * @return int|false Product ID on success, false on failure
 */
function arms_complex_create_product($product_data) {
    // Check if product already exists
    $existing = get_page_by_path($product_data['slug'], OBJECT, 'product');
    if ($existing) {
        return $existing->ID;
    }
    
    // Create product
    $product = new WC_Product_Variable();
    
    // Set product data
    $product->set_name($product_data['name']);
    $product->set_slug($product_data['slug']);
    $product->set_description($product_data['description']);
    $product->set_sku($product_data['sku']);
    $product->set_status('publish');
    $product->set_catalog_visibility('visible');
    $product->set_stock_status($product_data['stock']);
    $product->set_manage_stock(true);
    $product->set_stock_quantity(1000);
    
    // Set categories
    if (isset($product_data['categories'])) {
        $cat_ids = array();
        foreach ($product_data['categories'] as $cat_slug) {
            $term = get_term_by('slug', $cat_slug, 'product_cat');
            if ($term) {
                $cat_ids[] = $term->term_id;
            }
        }
        $product->set_category_ids($cat_ids);
    }
    
    // Save product
    $product_id = $product->save();
    
    // Set attributes
    if (isset($product_data['attributes'])) {
        $attributes = array();
        $position = 0;
        
        foreach ($product_data['attributes'] as $taxonomy => $value) {
            $attribute = new WC_Product_Attribute();
            $attribute->set_id(wc_attribute_taxonomy_id_by_name($taxonomy));
            $attribute->set_name($taxonomy);
            $attribute->set_options(array($value));
            $attribute->set_position($position++);
            $attribute->set_visible(true);
            $attribute->set_variation(false);
            $attributes[] = $attribute;
        }
        
        // Add quantity attribute for variations
        $quantity_attribute = new WC_Product_Attribute();
        $quantity_attribute->set_name('Quantity');
        $quantity_attribute->set_options(array_column($product_data['variations'], 'quantity'));
        $quantity_attribute->set_position($position);
        $quantity_attribute->set_visible(true);
        $quantity_attribute->set_variation(true);
        $attributes[] = $quantity_attribute;
        
        $product->set_attributes($attributes);
        $product->save();
    }
    
    // Create variations
    if (isset($product_data['variations'])) {
        foreach ($product_data['variations'] as $variation_data) {
            $variation = new WC_Product_Variation();
            $variation->set_parent_id($product_id);
            $variation->set_attributes(array('quantity' => $variation_data['quantity']));
            $variation->set_regular_price($variation_data['price']);
            $variation->set_sku($variation_data['sku']);
            $variation->set_stock_status('instock');
            $variation->set_manage_stock(true);
            $variation->set_stock_quantity(100);
            $variation->save();
        }
    }
    
    return $product_id;
}

/**
 * Import firearms products (similar structure to ammunition)
 */
function arms_complex_import_firearms_products() {
    // Similar to ammunition import but for firearms
    // Products would have different attributes like action type, barrel length, etc.
}

/**
 * Import theme options
 */
function arms_complex_import_theme_options() {
    update_option('arms_complex_show_breadcrumbs', true);
    update_option('arms_complex_products_per_page', 12);
    update_option('arms_complex_enable_wishlist', true);
    update_option('arms_complex_enable_compare', true);
}
