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
 * AJAX: Quick view product
 */
function arms_complex_quick_view_product() {
    check_ajax_referer('arms-complex-nonce', 'nonce');
    
    $product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
    
    if (!$product_id) {
        wp_send_json_error(array('message' => __('Invalid product ID', 'arms-complex')));
    }
    
    $product = wc_get_product($product_id);
    
    if (!$product) {
        wp_send_json_error(array('message' => __('Product not found', 'arms-complex')));
    }
    
    ob_start();
    wc_get_template('quick-view.php', array('product' => $product));
    $html = ob_get_clean();
    
    wp_send_json_success(array('html' => $html));
}
add_action('wp_ajax_quick_view_product', 'arms_complex_quick_view_product');
add_action('wp_ajax_nopriv_quick_view_product', 'arms_complex_quick_view_product');

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
