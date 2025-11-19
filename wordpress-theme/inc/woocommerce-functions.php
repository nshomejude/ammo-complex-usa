<?php
/**
 * WooCommerce Customization Functions
 * 
 * Contains all WooCommerce-specific customizations and hooks
 * 
 * @package Arms_Complex
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Customize WooCommerce product loop columns
 */
function arms_complex_loop_columns() {
    return 4; // 4 columns
}
add_filter('loop_shop_columns', 'arms_complex_loop_columns');

/**
 * Customize products per page
 */
function arms_complex_products_per_page() {
    return get_option('arms_complex_products_per_page', 12);
}
add_filter('loop_shop_per_page', 'arms_complex_products_per_page', 20);

/**
 * Add wishlist button HTML
 * 
 * @param int $product_id Product ID
 */
function arms_complex_wishlist_button($product_id) {
    $wishlist = isset($_COOKIE['arms_complex_wishlist']) ? json_decode(stripslashes($_COOKIE['arms_complex_wishlist']), true) : array();
    $in_wishlist = in_array($product_id, $wishlist);
    
    $class = $in_wishlist ? 'in-wishlist' : '';
    $icon = $in_wishlist ? '❤️' : '🤍';
    
    ?>
    <button 
        type="button"
        class="wishlist-button <?php echo esc_attr($class); ?> inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-tactical transition-colors"
        data-product-id="<?php echo esc_attr($product_id); ?>"
        aria-label="<?php esc_attr_e('Add to wishlist', 'arms-complex'); ?>"
    >
        <span class="wishlist-icon"><?php echo esc_html($icon); ?></span>
        <span class="wishlist-text"><?php esc_html_e('Wishlist', 'arms-complex'); ?></span>
    </button>
    <?php
}

/**
 * Add comparison button HTML
 * 
 * @param int $product_id Product ID
 */
function arms_complex_comparison_button($product_id) {
    ?>
    <button 
        type="button"
        class="comparison-button inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-tactical transition-colors"
        data-product-id="<?php echo esc_attr($product_id); ?>"
        aria-label="<?php esc_attr_e('Add to comparison', 'arms-complex'); ?>"
    >
        <span class="comparison-icon">⚖️</span>
        <span class="comparison-text"><?php esc_html_e('Compare', 'arms-complex'); ?></span>
    </button>
    <?php
}

/**
 * Customize add to cart button text
 */
function arms_complex_add_to_cart_text() {
    return __('Add to Cart', 'arms-complex');
}
add_filter('woocommerce_product_add_to_cart_text', 'arms_complex_add_to_cart_text');
add_filter('woocommerce_product_single_add_to_cart_text', 'arms_complex_add_to_cart_text');

/**
 * Modify WooCommerce breadcrumb defaults
 */
function arms_complex_breadcrumb_defaults($defaults) {
    $defaults['delimiter']   = '<span class="breadcrumb-separator mx-2">/</span>';
    $defaults['wrap_before'] = '<nav class="woocommerce-breadcrumb text-sm text-muted-foreground mb-6" aria-label="breadcrumb">';
    $defaults['wrap_after']  = '</nav>';
    $defaults['home']        = _x('Home', 'breadcrumb', 'arms-complex');
    return $defaults;
}
add_filter('woocommerce_breadcrumb_defaults', 'arms_complex_breadcrumb_defaults');

/**
 * Customize WooCommerce image sizes
 */
function arms_complex_woocommerce_image_dimensions() {
    $catalog = array(
        'width'  => '300',
        'height' => '300',
        'crop'   => 1,
    );
    
    $single = array(
        'width'  => '600',
        'height' => '600',
        'crop'   => 1,
    );
    
    $thumbnail = array(
        'width'  => '150',
        'height' => '150',
        'crop'   => 1,
    );
    
    update_option('shop_catalog_image_size', $catalog);
    update_option('shop_single_image_size', $single);
    update_option('shop_thumbnail_image_size', $thumbnail);
}
add_action('after_switch_theme', 'arms_complex_woocommerce_image_dimensions');

/**
 * Remove default WooCommerce wrappers
 */
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

/**
 * Add custom WooCommerce wrappers
 */
function arms_complex_wrapper_start() {
    echo '<div id="primary" class="content-area">';
}
add_action('woocommerce_before_main_content', 'arms_complex_wrapper_start', 10);

function arms_complex_wrapper_end() {
    echo '</div>';
}
add_action('woocommerce_after_main_content', 'arms_complex_wrapper_end', 10);

/**
 * Enqueue WooCommerce-specific styles and scripts
 */
function arms_complex_woocommerce_styles() {
    wp_enqueue_style(
        'arms-complex-woocommerce',
        ARMS_COMPLEX_THEME_URI . '/assets/css/woocommerce.css',
        array('arms-complex-style'),
        ARMS_COMPLEX_VERSION
    );
    
    // Enqueue product card interactions
    wp_enqueue_script(
        'arms-complex-product-card',
        ARMS_COMPLEX_THEME_URI . '/assets/js/product-card.js',
        array('jquery', 'arms-complex-wishlist', 'arms-complex-comparison'),
        ARMS_COMPLEX_VERSION,
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('arms-complex-product-card', 'armsComplexProductCard', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('arms-complex-nonce'),
        'addToCartText' => __('Add to Cart', 'arms-complex'),
        'addedText' => __('Added!', 'arms-complex'),
        'viewCartText' => __('View Cart', 'arms-complex'),
    ));
}
add_action('wp_enqueue_scripts', 'arms_complex_woocommerce_styles');

/**
 * AJAX: Get wishlist count
 */
function arms_complex_get_wishlist_count() {
    check_ajax_referer('arms-complex-nonce', 'nonce');
    
    if (is_user_logged_in()) {
        $user_id = get_current_user_id();
        $wishlist = get_user_meta($user_id, '_wishlist', true);
        $count = is_array($wishlist) ? count($wishlist) : 0;
    } else {
        $wishlist = isset($_COOKIE['arms_complex_wishlist']) ? json_decode(stripslashes($_COOKIE['arms_complex_wishlist']), true) : array();
        $count = is_array($wishlist) ? count($wishlist) : 0;
    }
    
    wp_send_json_success(array('count' => $count));
}
add_action('wp_ajax_get_wishlist_count', 'arms_complex_get_wishlist_count');
add_action('wp_ajax_nopriv_get_wishlist_count', 'arms_complex_get_wishlist_count');

/**
 * Add custom product attributes on theme activation
 */
function arms_complex_register_product_attributes() {
    $attributes = array(
        'Caliber'       => 'pa_caliber',
        'Bullet Weight' => 'pa_bullet_weight',
        'Bullet Type'   => 'pa_bullet_type',
        'Brand'         => 'pa_brand',
        'Action Type'   => 'pa_action_type',
        'Barrel Length' => 'pa_barrel_length',
        'Capacity'      => 'pa_capacity',
    );
    
    foreach ($attributes as $name => $slug) {
        if (!taxonomy_exists($slug)) {
            wc_create_attribute(array(
                'name'         => $name,
                'slug'         => $slug,
                'type'         => 'select',
                'order_by'     => 'menu_order',
                'has_archives' => true,
            ));
        }
    }
    
    // Clear cache
    delete_transient('wc_attribute_taxonomies');
    WC_Cache_Helper::invalidate_cache_group('woocommerce-attributes');
}
add_action('after_switch_theme', 'arms_complex_register_product_attributes');

/**
 * Modify product price HTML to add tactical color
 */
function arms_complex_price_html($price, $product) {
    $price = str_replace('class="woocommerce-Price-amount amount"', 'class="woocommerce-Price-amount amount text-tactical font-bold"', $price);
    return $price;
}
add_filter('woocommerce_get_price_html', 'arms_complex_price_html', 10, 2);

/**
 * Add "View More" link to product short description
 */
function arms_complex_product_short_description($post_excerpt) {
    if (!is_product()) {
        return $post_excerpt;
    }
    
    $post_excerpt .= sprintf(
        ' <a href="#tab-description" class="text-tactical hover:underline">%s</a>',
        __('Read more', 'arms-complex')
    );
    
    return $post_excerpt;
}
add_filter('woocommerce_short_description', 'arms_complex_product_short_description');
