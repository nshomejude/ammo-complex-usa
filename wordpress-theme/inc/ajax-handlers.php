<?php
/**
 * AJAX Handler Functions
 * 
 * Contains all AJAX callback functions
 * 
 * @package Arms_Complex
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * AJAX: Get Quick View Product
 * Returns formatted HTML for product quick view modal
 */
function arms_complex_get_quick_view_product() {
    check_ajax_referer('arms-complex-nonce', 'nonce');
    
    $product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
    
    if (!$product_id) {
        wp_send_json_error(array('message' => __('Invalid product ID', 'arms-complex')));
    }
    
    $product = wc_get_product($product_id);
    
    if (!$product) {
        wp_send_json_error(array('message' => __('Product not found', 'arms-complex')));
    }
    
    // Build quick view HTML
    ob_start();
    ?>
    <div class="quick-view-content grid md:grid-cols-2 gap-6">
        <!-- Product Image -->
        <div class="product-image">
            <?php
            $image_id = $product->get_image_id();
            if ($image_id) {
                echo wp_get_attachment_image($image_id, 'large', false, array(
                    'class' => 'w-full h-auto rounded-lg'
                ));
            } else {
                echo wc_placeholder_img('large');
            }
            ?>
        </div>
        
        <!-- Product Details -->
        <div class="product-details space-y-4">
            <h2 class="text-2xl font-bold"><?php echo esc_html($product->get_name()); ?></h2>
            
            <div class="product-price text-tactical text-2xl font-bold">
                <?php echo $product->get_price_html(); ?>
            </div>
            
            <?php if ($product->get_short_description()) : ?>
                <div class="product-excerpt text-muted-foreground">
                    <?php echo wp_kses_post($product->get_short_description()); ?>
                </div>
            <?php endif; ?>
            
            <!-- Product Attributes -->
            <?php
            $attributes = array('pa_caliber', 'pa_brand', 'pa_bullet_weight');
            $has_attributes = false;
            
            foreach ($attributes as $attr) {
                if ($product->get_attribute($attr)) {
                    $has_attributes = true;
                    break;
                }
            }
            
            if ($has_attributes) :
            ?>
                <div class="product-attributes space-y-2">
                    <?php
                    $caliber = $product->get_attribute('pa_caliber');
                    if ($caliber) :
                    ?>
                        <p class="text-sm"><span class="font-semibold">Caliber:</span> <?php echo esc_html($caliber); ?></p>
                    <?php endif; ?>
                    
                    <?php
                    $brand = $product->get_attribute('pa_brand');
                    if ($brand) :
                    ?>
                        <p class="text-sm"><span class="font-semibold">Brand:</span> <?php echo esc_html($brand); ?></p>
                    <?php endif; ?>
                    
                    <?php
                    $weight = $product->get_attribute('pa_bullet_weight');
                    if ($weight) :
                    ?>
                        <p class="text-sm"><span class="font-semibold">Bullet Weight:</span> <?php echo esc_html($weight); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <!-- Stock Status -->
            <div class="product-stock">
                <?php if ($product->is_in_stock()) : ?>
                    <span class="badge bg-accent text-accent-foreground">
                        <?php esc_html_e('In Stock', 'arms-complex'); ?>
                    </span>
                <?php else : ?>
                    <span class="badge bg-destructive text-destructive-foreground">
                        <?php esc_html_e('Out of Stock', 'arms-complex'); ?>
                    </span>
                <?php endif; ?>
            </div>
            
            <!-- Add to Cart Form -->
            <div class="product-actions">
                <?php if ($product->is_type('simple')) : ?>
                    <a 
                        href="<?php echo esc_url($product->add_to_cart_url()); ?>" 
                        class="button add_to_cart_button w-full bg-tactical text-tactical-foreground hover:opacity-90 px-4 py-3 rounded-lg font-semibold transition-all text-center inline-block"
                        data-product_id="<?php echo esc_attr($product->get_id()); ?>"
                        data-product_sku="<?php echo esc_attr($product->get_sku()); ?>"
                    >
                        <?php echo esc_html($product->add_to_cart_text()); ?>
                    </a>
                <?php else : ?>
                    <a 
                        href="<?php echo esc_url($product->get_permalink()); ?>" 
                        class="button w-full bg-tactical text-tactical-foreground hover:opacity-90 px-4 py-3 rounded-lg font-semibold transition-all text-center inline-block"
                    >
                        <?php esc_html_e('Select Options', 'arms-complex'); ?>
                    </a>
                <?php endif; ?>
            </div>
            
            <!-- View Full Details Link -->
            <a 
                href="<?php echo esc_url($product->get_permalink()); ?>" 
                class="text-tactical hover:underline text-sm inline-block"
            >
                <?php esc_html_e('View Full Details →', 'arms-complex'); ?>
            </a>
        </div>
    </div>
    <?php
    $html = ob_get_clean();
    
    wp_send_json_success(array('html' => $html));
}
add_action('wp_ajax_get_quick_view_product', 'arms_complex_get_quick_view_product');
add_action('wp_ajax_nopriv_get_quick_view_product', 'arms_complex_get_quick_view_product');

/**
 * AJAX: Filter products
 */
function arms_complex_filter_products() {
    check_ajax_referer('arms-complex-nonce', 'nonce');
    
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => get_option('arms_complex_products_per_page', 12),
        'paged'          => isset($_POST['page']) ? intval($_POST['page']) : 1,
    );
    
    // Price filter
    if (isset($_POST['min_price']) && isset($_POST['max_price'])) {
        $args['meta_query'][] = array(
            'key'     => '_price',
            'value'   => array(floatval($_POST['min_price']), floatval($_POST['max_price'])),
            'type'    => 'NUMERIC',
            'compare' => 'BETWEEN',
        );
    }
    
    // Category filter
    if (isset($_POST['category']) && !empty($_POST['category'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'product_cat',
            'field'    => 'slug',
            'terms'    => sanitize_text_field($_POST['category']),
        );
    }
    
    // Brand filter
    if (isset($_POST['brands']) && is_array($_POST['brands'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'pa_brand',
            'field'    => 'slug',
            'terms'    => array_map('sanitize_text_field', $_POST['brands']),
        );
    }
    
    // Search query
    if (isset($_POST['search']) && !empty($_POST['search'])) {
        $args['s'] = sanitize_text_field($_POST['search']);
    }
    
    // Sorting
    if (isset($_POST['orderby'])) {
        switch ($_POST['orderby']) {
            case 'price':
                $args['orderby']  = 'meta_value_num';
                $args['meta_key'] = '_price';
                $args['order']    = 'ASC';
                break;
            case 'price-desc':
                $args['orderby']  = 'meta_value_num';
                $args['meta_key'] = '_price';
                $args['order']    = 'DESC';
                break;
            case 'popularity':
                $args['orderby'] = 'meta_value_num';
                $args['meta_key'] = 'total_sales';
                $args['order']    = 'DESC';
                break;
            case 'date':
                $args['orderby'] = 'date';
                $args['order']   = 'DESC';
                break;
            default:
                $args['orderby'] = 'menu_order';
                $args['order']   = 'ASC';
        }
    }
    
    $query = new WP_Query($args);
    
    ob_start();
    
    if ($query->have_posts()) {
        woocommerce_product_loop_start();
        
        while ($query->have_posts()) {
            $query->the_post();
            wc_get_template_part('content', 'product');
        }
        
        woocommerce_product_loop_end();
    } else {
        echo '<p class="woocommerce-info">' . esc_html__('No products found', 'arms-complex') . '</p>';
    }
    
    $html = ob_get_clean();
    
    wp_reset_postdata();
    
    wp_send_json_success(array(
        'html'       => $html,
        'found'      => $query->found_posts,
        'max_pages'  => $query->max_num_pages,
    ));
}
add_action('wp_ajax_filter_products', 'arms_complex_filter_products');
add_action('wp_ajax_nopriv_filter_products', 'arms_complex_filter_products');

/**
 * AJAX: Calculate ballistics
 */
function arms_complex_calculate_ballistics() {
    check_ajax_referer('arms-complex-nonce', 'nonce');
    
    // Get input values
    $bullet_weight = isset($_POST['bullet_weight']) ? floatval($_POST['bullet_weight']) : 0;
    $muzzle_velocity = isset($_POST['muzzle_velocity']) ? floatval($_POST['muzzle_velocity']) : 0;
    $distance = isset($_POST['distance']) ? floatval($_POST['distance']) : 0;
    
    if (!$bullet_weight || !$muzzle_velocity || !$distance) {
        wp_send_json_error(array('message' => __('Invalid input values', 'arms-complex')));
    }
    
    // Perform ballistic calculations
    // Note: This is a simplified example. Real ballistic calculations are complex.
    $muzzle_energy = ($bullet_weight * $muzzle_velocity * $muzzle_velocity) / 450240;
    
    // Simplified drop calculation
    $time_of_flight = $distance / ($muzzle_velocity * 12); // Convert to seconds
    $drop = 0.5 * 32.174 * $time_of_flight * $time_of_flight * 12; // Gravity in inches
    
    wp_send_json_success(array(
        'muzzle_energy' => round($muzzle_energy, 2),
        'drop'          => round($drop, 2),
        'time_of_flight' => round($time_of_flight, 3),
    ));
}
add_action('wp_ajax_calculate_ballistics', 'arms_complex_calculate_ballistics');
add_action('wp_ajax_nopriv_calculate_ballistics', 'arms_complex_calculate_ballistics');

/**
 * AJAX: Get comparison data
 */
function arms_complex_get_comparison_data() {
    check_ajax_referer('arms-complex-nonce', 'nonce');
    
    $product_ids = isset($_POST['product_ids']) ? array_map('intval', $_POST['product_ids']) : array();
    
    if (empty($product_ids)) {
        wp_send_json_error(array('message' => __('No products to compare', 'arms-complex')));
    }
    
    $products_data = array();
    
    foreach ($product_ids as $product_id) {
        $product = wc_get_product($product_id);
        
        if (!$product) {
            continue;
        }
        
        $products_data[] = array(
            'id'               => $product_id,
            'name'             => $product->get_name(),
            'price'            => $product->get_price(),
            'image'            => wp_get_attachment_url($product->get_image_id()),
            'caliber'          => $product->get_attribute('pa_caliber'),
            'bullet_type'      => $product->get_attribute('pa_bullet_type'),
            'bullet_weight'    => $product->get_attribute('pa_bullet_weight'),
            'brand'            => $product->get_attribute('pa_brand'),
            'muzzle_velocity'  => get_post_meta($product_id, '_muzzle_velocity', true),
            'muzzle_energy'    => get_post_meta($product_id, '_muzzle_energy', true),
            'in_stock'         => $product->is_in_stock(),
            'permalink'        => get_permalink($product_id),
        );
    }
    
    wp_send_json_success(array('products' => $products_data));
}
add_action('wp_ajax_get_comparison_data', 'arms_complex_get_comparison_data');
add_action('wp_ajax_nopriv_get_comparison_data', 'arms_complex_get_comparison_data');
