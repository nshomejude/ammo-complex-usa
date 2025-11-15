<?php
/**
 * Template Helper Functions
 * 
 * Contains helper functions used throughout template files
 * 
 * @package Arms_Complex
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get product specifications
 * 
 * @param int $product_id Product ID
 * @return array Product specifications
 */
function arms_complex_get_product_specifications($product_id) {
    $specifications = get_post_meta($product_id, '_specifications', true);
    
    if (empty($specifications)) {
        return array();
    }
    
    if (is_string($specifications)) {
        $specifications = json_decode($specifications, true);
    }
    
    return is_array($specifications) ? $specifications : array();
}

/**
 * Display product specifications
 * 
 * @param int $product_id Product ID
 */
function arms_complex_display_product_specifications($product_id) {
    $specs = arms_complex_get_product_specifications($product_id);
    
    if (empty($specs)) {
        return;
    }
    
    ?>
    <div class="product-specifications bg-muted/30 rounded-lg p-4 mt-4">
        <h3 class="text-lg font-semibold mb-3"><?php esc_html_e('Specifications', 'arms-complex'); ?></h3>
        <dl class="specifications-list grid grid-cols-2 gap-2">
            <?php foreach ($specs as $key => $value) : ?>
                <dt class="font-medium"><?php echo esc_html(ucfirst($key)); ?>:</dt>
                <dd class="text-muted-foreground">
                    <?php
                    if (is_array($value)) {
                        echo esc_html(implode(', ', $value));
                    } else {
                        echo esc_html($value);
                    }
                    ?>
                </dd>
            <?php endforeach; ?>
        </dl>
    </div>
    <?php
}

/**
 * Display ballistic data
 * 
 * @param int $product_id Product ID
 */
function arms_complex_display_ballistic_data($product_id) {
    $muzzle_velocity = get_post_meta($product_id, '_muzzle_velocity', true);
    $muzzle_energy = get_post_meta($product_id, '_muzzle_energy', true);
    
    if (empty($muzzle_velocity) && empty($muzzle_energy)) {
        return;
    }
    
    ?>
    <div class="ballistic-data bg-card border border-border rounded-lg p-4 mt-4">
        <h3 class="text-lg font-semibold mb-3"><?php esc_html_e('Ballistic Performance', 'arms-complex'); ?></h3>
        <div class="grid grid-cols-2 gap-4">
            <?php if ($muzzle_velocity) : ?>
                <div>
                    <dt class="text-sm text-muted-foreground"><?php esc_html_e('Muzzle Velocity', 'arms-complex'); ?></dt>
                    <dd class="text-xl font-bold text-tactical"><?php echo esc_html($muzzle_velocity); ?> fps</dd>
                </div>
            <?php endif; ?>
            
            <?php if ($muzzle_energy) : ?>
                <div>
                    <dt class="text-sm text-muted-foreground"><?php esc_html_e('Muzzle Energy', 'arms-complex'); ?></dt>
                    <dd class="text-xl font-bold text-tactical"><?php echo esc_html($muzzle_energy); ?> ft-lbs</dd>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php
}

/**
 * Get estimated reading time
 * 
 * @param string $content Post content
 * @return int Reading time in minutes
 */
function arms_complex_reading_time($content) {
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // Average reading speed
    return $reading_time;
}

/**
 * Display post meta information
 */
function arms_complex_post_meta() {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    
    $time_string = sprintf(
        $time_string,
        esc_attr(get_the_date(DATE_W3C)),
        esc_html(get_the_date())
    );
    
    $posted_on = sprintf(
        esc_html_x('Posted on %s', 'post date', 'arms-complex'),
        '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
    );
    
    $byline = sprintf(
        esc_html_x('by %s', 'post author', 'arms-complex'),
        '<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
    );
    
    echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>';
}

/**
 * Check if page is a shop page
 * 
 * @return bool
 */
function arms_complex_is_shop_page() {
    if (!class_exists('WooCommerce')) {
        return false;
    }
    
    return is_shop() || is_product_category() || is_product_tag() || is_product();
}

/**
 * Get page layout
 * 
 * @return string Layout type
 */
function arms_complex_get_layout() {
    if (arms_complex_is_shop_page()) {
        return get_theme_mod('arms_complex_shop_layout', 'sidebar-left');
    }
    
    return 'full-width';
}

/**
 * Display featured badge
 * 
 * @param int $product_id Product ID
 */
function arms_complex_featured_badge($product_id) {
    $product = wc_get_product($product_id);
    
    if (!$product || !$product->is_featured()) {
        return;
    }
    
    ?>
    <span class="featured-badge absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded font-semibold">
        <?php esc_html_e('Featured', 'arms-complex'); ?>
    </span>
    <?php
}

/**
 * Convert hex color to RGB
 * 
 * @param string $hex Hex color code
 * @return array RGB values
 */
function arms_complex_hex_to_rgb($hex) {
    $hex = str_replace('#', '', $hex);
    
    if (strlen($hex) == 3) {
        $r = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
        $g = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
        $b = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));
    } else {
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
    }
    
    return array($r, $g, $b);
}
