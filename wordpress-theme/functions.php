<?php
/**
 * Arms Complex Theme Functions
 * 
 * Main theme setup and configuration file. This file handles:
 * - Theme setup and support features
 * - Enqueuing scripts and styles
 * - WooCommerce integration
 * - Custom post types and taxonomies
 * - Demo content import
 * - Theme customizer options
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
 * Define theme constants
 */
define('ARMS_COMPLEX_VERSION', '1.0.0');
define('ARMS_COMPLEX_THEME_DIR', get_template_directory());
define('ARMS_COMPLEX_THEME_URI', get_template_directory_uri());

/**
 * Theme Setup
 * 
 * Sets up theme defaults and registers support for various WordPress features.
 * This function is hooked into the after_setup_theme hook, which runs
 * before the init hook.
 */
function arms_complex_setup() {
    // Make theme available for translation
    load_theme_textdomain('arms-complex', ARMS_COMPLEX_THEME_DIR . '/languages');
    
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');
    
    // Let WordPress manage the document title
    add_theme_support('title-tag');
    
    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 800, true);
    
    // Add custom image sizes for products
    add_image_size('arms-complex-product-thumbnail', 300, 300, true);
    add_image_size('arms-complex-product-single', 600, 600, true);
    add_image_size('arms-complex-product-gallery', 800, 800, true);
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'arms-complex'),
        'footer'  => esc_html__('Footer Menu', 'arms-complex'),
    ));
    
    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
    
    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');
    
    // Add support for core custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-width'  => true,
        'flex-height' => true,
    ));
    
    // Add support for Block Styles
    add_theme_support('wp-block-styles');
    
    // Add support for full and wide align images
    add_theme_support('align-wide');
    
    // Add support for editor styles
    add_theme_support('editor-styles');
    
    // Enqueue editor styles
    add_editor_style('assets/css/editor-style.css');
    
    // Add support for responsive embedded content
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'arms_complex_setup');

/**
 * WooCommerce Support
 * 
 * Declares WooCommerce support and configures theme-specific WooCommerce features
 */
function arms_complex_woocommerce_setup() {
    // Add WooCommerce support
    add_theme_support('woocommerce');
    
    // Add support for WC features
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'arms_complex_woocommerce_setup');

/**
 * Enqueue Scripts and Styles
 * 
 * Loads theme CSS and JavaScript files
 */
function arms_complex_scripts() {
    // Main stylesheet (Tailwind CSS compiled)
    wp_enqueue_style(
        'arms-complex-style',
        ARMS_COMPLEX_THEME_URI . '/assets/css/main.css',
        array(),
        ARMS_COMPLEX_VERSION
    );
    
    // Main JavaScript file
    wp_enqueue_script(
        'arms-complex-main',
        ARMS_COMPLEX_THEME_URI . '/assets/js/main.js',
        array('jquery'),
        ARMS_COMPLEX_VERSION,
        true
    );
    
    // Product variations JavaScript
    wp_enqueue_script(
        'arms-complex-variations',
        ARMS_COMPLEX_THEME_URI . '/assets/js/product-variations.js',
        array('jquery', 'arms-complex-main'),
        ARMS_COMPLEX_VERSION,
        true
    );
    
    // Wishlist JavaScript
    wp_enqueue_script(
        'arms-complex-wishlist',
        ARMS_COMPLEX_THEME_URI . '/assets/js/wishlist.js',
        array('jquery', 'arms-complex-main'),
        ARMS_COMPLEX_VERSION,
        true
    );
    
    // Comparison JavaScript
    wp_enqueue_script(
        'arms-complex-comparison',
        ARMS_COMPLEX_THEME_URI . '/assets/js/comparison.js',
        array('jquery', 'arms-complex-main'),
        ARMS_COMPLEX_VERSION,
        true
    );
    
    // Ballistic Calculator JavaScript (only on ballistic calculator page)
    if (is_page_template('page-templates/page-ballistic-calculator.php')) {
        wp_enqueue_script(
            'arms-complex-ballistic-calculator',
            ARMS_COMPLEX_THEME_URI . '/assets/js/ballistic-calculator.js',
            array('jquery'),
            ARMS_COMPLEX_VERSION,
            true
        );
    }
    
    // Localize script for AJAX and settings
    wp_localize_script('arms-complex-main', 'armsComplex', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('arms-complex-nonce'),
        'homeUrl' => home_url('/'),
        'themeUrl' => ARMS_COMPLEX_THEME_URI,
        'userId' => get_current_user_id(),
        'isUserLoggedIn' => is_user_logged_in(),
        'woocommerce' => array(
            'currency' => get_woocommerce_currency(),
            'currencySymbol' => get_woocommerce_currency_symbol(),
            'priceDecimals' => wc_get_price_decimals(),
            'priceDecimalSeparator' => wc_get_price_decimal_separator(),
            'priceThousandSeparator' => wc_get_price_thousand_separator(),
        ),
        'i18n' => array(
            'addToCart' => __('Add to Cart', 'arms-complex'),
            'addedToCart' => __('Added to Cart', 'arms-complex'),
            'addToWishlist' => __('Add to Wishlist', 'arms-complex'),
            'addedToWishlist' => __('Added to Wishlist', 'arms-complex'),
            'removeFromWishlist' => __('Remove from Wishlist', 'arms-complex'),
            'addToCompare' => __('Add to Compare', 'arms-complex'),
            'addedToCompare' => __('Added to Compare', 'arms-complex'),
            'removeFromCompare' => __('Remove from Compare', 'arms-complex'),
            'selectOptions' => __('Select Options', 'arms-complex'),
            'outOfStock' => __('Out of Stock', 'arms-complex'),
            'error' => __('An error occurred', 'arms-complex'),
            'loading' => __('Loading...', 'arms-complex'),
        ),
    ));
    
    // Comments script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'arms_complex_scripts');

/**
 * Register Widget Areas
 */
function arms_complex_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Shop Sidebar', 'arms-complex'),
        'id'            => 'shop-sidebar',
        'description'   => esc_html__('Add widgets here to appear in your shop sidebar.', 'arms-complex'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Footer 1', 'arms-complex'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Add widgets here to appear in footer column 1.', 'arms-complex'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Footer 2', 'arms-complex'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Add widgets here to appear in footer column 2.', 'arms-complex'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Footer 3', 'arms-complex'),
        'id'            => 'footer-3',
        'description'   => esc_html__('Add widgets here to appear in footer column 3.', 'arms-complex'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'arms_complex_widgets_init');

/**
 * Include Required Files
 * 
 * Loads additional PHP files for theme functionality
 */
require_once ARMS_COMPLEX_THEME_DIR . '/inc/woocommerce-functions.php';
require_once ARMS_COMPLEX_THEME_DIR . '/inc/demo-import.php';
require_once ARMS_COMPLEX_THEME_DIR . '/inc/customizer.php';
require_once ARMS_COMPLEX_THEME_DIR . '/inc/product-attributes.php';
require_once ARMS_COMPLEX_THEME_DIR . '/inc/ballistic-calculator.php';
require_once ARMS_COMPLEX_THEME_DIR . '/inc/template-functions.php';
require_once ARMS_COMPLEX_THEME_DIR . '/inc/ajax-handlers.php';

/**
 * Theme Activation Hook
 * 
 * Runs when theme is activated - creates pages and imports demo content
 */
function arms_complex_activation() {
    // Create required pages
    arms_complex_create_pages();
    
    // Set default theme options
    arms_complex_set_default_options();
    
    // Flush rewrite rules
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'arms_complex_activation');

/**
 * Create Required Pages
 * 
 * Creates necessary pages on theme activation if they don't exist
 */
function arms_complex_create_pages() {
    $pages = array(
        'ballistic-calculator' => array(
            'title'    => 'Ballistic Calculator',
            'template' => 'page-ballistic-calculator.php',
        ),
        'reloading-guide' => array(
            'title'    => 'Reloading Guide',
            'template' => 'page-reloading-guide.php',
        ),
        'load-recipes' => array(
            'title'    => 'Load Recipes',
            'template' => 'page-load-recipes.php',
        ),
        'firearms-license' => array(
            'title'    => 'Firearms License Info',
            'template' => 'page-firearms-license.php',
        ),
        'how-to-buy' => array(
            'title'    => 'How to Buy',
            'template' => 'page-how-to-buy.php',
        ),
    );
    
    foreach ($pages as $slug => $page) {
        // Check if page already exists
        $page_check = get_page_by_path($slug);
        
        if (!$page_check) {
            // Create page
            $page_id = wp_insert_post(array(
                'post_title'   => $page['title'],
                'post_name'    => $slug,
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_content' => '',
            ));
            
            // Set page template
            if ($page_id && isset($page['template'])) {
                update_post_meta($page_id, '_wp_page_template', $page['template']);
            }
        }
    }
}

/**
 * Set Default Theme Options
 */
function arms_complex_set_default_options() {
    $defaults = array(
        'arms_complex_logo'              => '',
        'arms_complex_primary_color'     => '#3d5a3d',
        'arms_complex_show_breadcrumbs'  => true,
        'arms_complex_products_per_page' => 12,
        'arms_complex_enable_wishlist'   => true,
        'arms_complex_enable_compare'    => true,
    );
    
    foreach ($defaults as $option => $value) {
        if (get_option($option) === false) {
            update_option($option, $value);
        }
    }
}

/**
 * Add body classes
 */
function arms_complex_body_classes($classes) {
    // Add class if WooCommerce is active
    if (class_exists('WooCommerce')) {
        $classes[] = 'woocommerce-active';
    }
    
    // Add class for page template
    if (is_page_template()) {
        $template = get_page_template_slug();
        $classes[] = 'page-template-' . sanitize_html_class(str_replace('.php', '', $template));
    }
    
    return $classes;
}
add_filter('body_class', 'arms_complex_body_classes');
