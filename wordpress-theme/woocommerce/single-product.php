<?php
/**
 * WooCommerce Single Product Template
 * 
 * Displays individual product details page
 * Converts: src/pages/ProductDetail.tsx and src/pages/FirearmDetail.tsx
 * 
 * @package Arms_Complex
 */

defined('ABSPATH') || exit;

get_header('shop');

while (have_posts()) :
    the_post();
    global $product;
    ?>
    
    <div class="single-product-page">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumbs -->
            <?php
            if (function_exists('woocommerce_breadcrumb')) {
                woocommerce_breadcrumb();
            }
            ?>
            
            <div id="product-<?php the_ID(); ?>" <?php wc_product_class('product-detail-grid grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2', $product); ?>>
                
                <!-- Product Images (Left Column) -->
                <div class="product-images">
                    <?php
                    /**
                     * Hook: woocommerce_before_single_product_summary
                     * 
                     * @hooked woocommerce_show_product_sale_flash - 10
                     * @hooked woocommerce_show_product_images - 20
                     */
                    do_action('woocommerce_before_single_product_summary');
                    ?>
                </div>
                
                <!-- Product Information (Right Column) -->
                <div class="product-summary space-y-0">
                    <?php
                    /**
                     * Hook: woocommerce_single_product_summary
                     * 
                     * @hooked woocommerce_template_single_title - 5
                     * @hooked woocommerce_template_single_rating - 10
                     * @hooked woocommerce_template_single_price - 10
                     * @hooked woocommerce_template_single_excerpt - 20
                     * @hooked woocommerce_template_single_add_to_cart - 30
                     * @hooked woocommerce_template_single_meta - 40
                     * @hooked woocommerce_template_single_sharing - 50
                     */
                    do_action('woocommerce_single_product_summary');
                    ?>
                    
                    <!-- Custom Product Meta (Ballistic Data, Specifications) -->
                    <?php get_template_part('template-parts/product/product-specifications'); ?>
                    
                    <!-- Wishlist & Comparison Buttons -->
                    <div class="product-actions flex gap-2 mt-4">
                        <?php
                        arms_complex_wishlist_button($product->get_id());
                        arms_complex_comparison_button($product->get_id());
                        ?>
                    </div>
                </div>
            </div>
            
            <!-- Product Tabs (Description, Additional Info, Reviews) -->
            <div class="product-tabs mt-8">
                <?php
                /**
                 * Hook: woocommerce_after_single_product_summary
                 * 
                 * @hooked woocommerce_output_product_data_tabs - 10
                 * @hooked woocommerce_upsell_display - 15
                 * @hooked woocommerce_output_related_products - 20
                 */
                do_action('woocommerce_after_single_product_summary');
                ?>
            </div>
        </div>
    </div>
    
<?php endwhile; ?>

<?php
get_footer('shop');
