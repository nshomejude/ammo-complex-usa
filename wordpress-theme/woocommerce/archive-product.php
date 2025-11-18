<?php
/**
 * WooCommerce Shop Archive Template
 * 
 * Displays the main shop page with products grid
 * Converts: src/pages/Shop*.tsx (all shop variations)
 * 
 * @package Arms_Complex
 */

defined('ABSPATH') || exit;

get_header('shop');
?>

<div class="woocommerce-shop-page">
    <!-- Page Header -->
    <div class="shop-header bg-gradient-to-r from-tactical/10 to-tactical/5 border-b border-border">
        <div class="container mx-auto px-4 py-12">
            <div class="text-center">
                <?php if (apply_filters('woocommerce_show_page_title', true)) : ?>
                    <h1 class="shop-title text-5xl font-bold mb-4">
                        <?php woocommerce_page_title(); ?>
                    </h1>
                <?php endif; ?>
                
                <?php
                /**
                 * Hook: woocommerce_archive_description
                 * 
                 * @hooked woocommerce_taxonomy_archive_description - 10
                 * @hooked woocommerce_product_archive_description - 10
                 */
                do_action('woocommerce_archive_description');
                ?>
            </div>
        </div>
    </div>
    
    <div class="container mx-auto px-4 py-8">
        <div class="shop-layout flex flex-col lg:flex-row gap-8">
            <!-- Sidebar (Filters) -->
            <aside class="shop-sidebar w-full lg:w-64 flex-shrink-0">
                <?php
                /**
                 * Hook: woocommerce_sidebar
                 * 
                 * @hooked woocommerce_get_sidebar - 10
                 */
                do_action('woocommerce_sidebar');
                ?>
            </aside>
            
            <!-- Main Content Area -->
            <div class="shop-content flex-1">
                <?php
                if (woocommerce_product_loop()) {
                    
                    /**
                     * Hook: woocommerce_before_shop_loop
                     * 
                     * @hooked woocommerce_output_all_notices - 10
                     * @hooked woocommerce_result_count - 20
                     * @hooked woocommerce_catalog_ordering - 30
                     */
                    do_action('woocommerce_before_shop_loop');
                    
                    // Add custom search and filter bar
                    get_template_part('template-parts/shop/toolbar');
                    ?>
                    
                    <!-- Product Grid with exact React layout: grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -->
                    <ul class="products grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <?php
                        if (wc_get_loop_prop('total')) {
                            while (have_posts()) {
                                the_post();
                                
                                /**
                                 * Hook: woocommerce_shop_loop
                                 */
                                do_action('woocommerce_shop_loop');
                                
                                wc_get_template_part('content', 'product');
                            }
                        }
                        ?>
                    </ul>
                    
                    <?php
                    /**
                     * Hook: woocommerce_after_shop_loop
                     * 
                     * @hooked woocommerce_pagination - 10
                     */
                    do_action('woocommerce_after_shop_loop');
                    
                } else {
                    /**
                     * Hook: woocommerce_no_products_found
                     * 
                     * @hooked wc_no_products_found - 10
                     */
                    do_action('woocommerce_no_products_found');
                }
                ?>
            </div>
        </div>
    </div>
</div>

<!-- Comparison Bar (sticky bottom) -->
<?php get_template_part('template-parts/shop/comparison-bar'); ?>

<?php
get_footer('shop');
