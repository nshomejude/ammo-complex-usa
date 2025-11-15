<?php
/**
 * Theme Customizer Settings
 * 
 * Adds customizer options for theme settings
 * 
 * @package Arms_Complex
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register customizer settings
 * 
 * @param WP_Customize_Manager $wp_customize Theme Customizer object
 */
function arms_complex_customize_register($wp_customize) {
    
    // Add Arms Complex section
    $wp_customize->add_section('arms_complex_settings', array(
        'title'    => __('Arms Complex Settings', 'arms-complex'),
        'priority' => 30,
    ));
    
    // Primary Color
    $wp_customize->add_setting('arms_complex_primary_color', array(
        'default'           => '#3d5a3d',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'arms_complex_primary_color', array(
        'label'    => __('Primary Color', 'arms-complex'),
        'section'  => 'arms_complex_settings',
        'settings' => 'arms_complex_primary_color',
    )));
    
    // Show Breadcrumbs
    $wp_customize->add_setting('arms_complex_show_breadcrumbs', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('arms_complex_show_breadcrumbs', array(
        'label'    => __('Show Breadcrumbs', 'arms-complex'),
        'section'  => 'arms_complex_settings',
        'type'     => 'checkbox',
    ));
    
    // Products Per Page
    $wp_customize->add_setting('arms_complex_products_per_page', array(
        'default'           => 12,
        'sanitize_callback' => 'absint',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('arms_complex_products_per_page', array(
        'label'       => __('Products Per Page', 'arms-complex'),
        'description' => __('Number of products to display per page in shop', 'arms-complex'),
        'section'     => 'arms_complex_settings',
        'type'        => 'number',
        'input_attrs' => array(
            'min'  => 1,
            'max'  => 50,
            'step' => 1,
        ),
    ));
    
    // Enable Wishlist
    $wp_customize->add_setting('arms_complex_enable_wishlist', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('arms_complex_enable_wishlist', array(
        'label'    => __('Enable Wishlist', 'arms-complex'),
        'section'  => 'arms_complex_settings',
        'type'     => 'checkbox',
    ));
    
    // Enable Product Comparison
    $wp_customize->add_setting('arms_complex_enable_compare', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('arms_complex_enable_compare', array(
        'label'    => __('Enable Product Comparison', 'arms-complex'),
        'section'  => 'arms_complex_settings',
        'type'     => 'checkbox',
    ));
    
    // Shop Layout
    $wp_customize->add_setting('arms_complex_shop_layout', array(
        'default'           => 'sidebar-left',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ));
    
    $wp_customize->add_control('arms_complex_shop_layout', array(
        'label'   => __('Shop Layout', 'arms-complex'),
        'section' => 'arms_complex_settings',
        'type'    => 'select',
        'choices' => array(
            'sidebar-left'  => __('Sidebar Left', 'arms-complex'),
            'sidebar-right' => __('Sidebar Right', 'arms-complex'),
            'full-width'    => __('Full Width', 'arms-complex'),
        ),
    ));
}
add_action('customize_register', 'arms_complex_customize_register');

/**
 * Output custom CSS from customizer
 */
function arms_complex_customizer_css() {
    $primary_color = get_theme_mod('arms_complex_primary_color', '#3d5a3d');
    
    ?>
    <style type="text/css">
        :root {
            --tactical: <?php echo esc_attr($primary_color); ?>;
        }
    </style>
    <?php
}
add_action('wp_head', 'arms_complex_customizer_css');
