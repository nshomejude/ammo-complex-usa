<?php
/**
 * WooCommerce Product Card in Loop
 * 
 * Displays a single product in the shop grid
 * Converts: src/components/ProductCard.tsx
 * 
 * @package Arms_Complex
 */

defined('ABSPATH') || exit;

global $product;

// Ensure visibility
if (empty($product) || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('product-card group', $product); ?>>
    <div class="product-card-inner bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-tactical/50 transition-all duration-300">
        
        <!-- Product Image with aspect-square ratio -->
        <div class="product-image relative aspect-square overflow-hidden">
            <a href="<?php echo esc_url(get_permalink($product->get_id())); ?>" class="block w-full h-full">
                <?php
                // Get product thumbnail with specific size
                $image_size = 'woocommerce_thumbnail';
                $image_id = $product->get_image_id();
                
                if ($image_id) {
                    echo wp_get_attachment_image($image_id, $image_size, false, array(
                        'class' => 'w-full h-full object-cover',
                        'alt' => esc_attr($product->get_name())
                    ));
                } else {
                    echo wc_placeholder_img($image_size, array(
                        'class' => 'w-full h-full object-cover'
                    ));
                }
                
                // Sale flash
                if ($product->is_on_sale()) :
                ?>
                    <span class="onsale absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                        <?php esc_html_e('Sale!', 'arms-complex'); ?>
                    </span>
                <?php endif; ?>
            </a>
            
            <!-- Quick View Button -->
            <button 
                type="button"
                class="quick-view-btn absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                data-product-id="<?php echo esc_attr($product->get_id()); ?>"
            >
                <span class="bg-tactical text-tactical-foreground px-4 py-2 rounded-lg font-semibold">
                    <?php esc_html_e('Quick View', 'arms-complex'); ?>
                </span>
            </button>
        </div>
        
        <!-- Product Info with consistent padding -->
        <div class="product-info p-4 space-y-2">
            <!-- Product Title -->
            <h3 class="product-title text-lg font-semibold mb-1">
                <a href="<?php echo esc_url(get_permalink($product->get_id())); ?>" class="hover:text-tactical transition-colors">
                    <?php echo esc_html($product->get_name()); ?>
                </a>
            </h3>
            
            <!-- Caliber (Custom Attribute) -->
            <?php
            $caliber = $product->get_attribute('pa_caliber');
            if ($caliber) :
            ?>
                <p class="product-caliber text-sm text-muted-foreground mb-1">
                    <?php echo esc_html($caliber); ?>
                </p>
            <?php endif; ?>
            
            <!-- Brand Badge -->
            <?php
            $brand = $product->get_attribute('pa_brand');
            if ($brand) :
            ?>
                <div class="product-brand mb-2">
                    <span class="badge inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                        <?php echo esc_html($brand); ?>
                    </span>
                </div>
            <?php endif; ?>
            
            <!-- Price -->
            <div class="product-price mb-3">
                <?php
                /**
                 * Hook: woocommerce_after_shop_loop_item_title
                 * 
                 * @hooked woocommerce_template_loop_rating - 5
                 * @hooked woocommerce_template_loop_price - 10
                 */
                do_action('woocommerce_after_shop_loop_item_title');
                ?>
            </div>
            
            <!-- Stock Status -->
            <div class="product-stock mb-3">
                <?php if ($product->is_in_stock()) : ?>
                    <span class="badge inline-block bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                        <?php esc_html_e('In Stock', 'arms-complex'); ?>
                    </span>
                <?php else : ?>
                    <span class="badge inline-block bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                        <?php esc_html_e('Out of Stock', 'arms-complex'); ?>
                    </span>
                <?php endif; ?>
            </div>
            
            <!-- Add to Cart Button -->
            <div class="product-actions mb-3">
                <?php
                // Custom Add to Cart button with proper styling
                $add_to_cart_url = $product->add_to_cart_url();
                $add_to_cart_text = $product->add_to_cart_text();
                ?>
                <a 
                    href="<?php echo esc_url($add_to_cart_url); ?>" 
                    class="button add_to_cart_button w-full bg-tactical text-tactical-foreground hover:opacity-90 px-4 py-2 rounded-lg font-semibold transition-all text-center inline-block"
                    data-product_id="<?php echo esc_attr($product->get_id()); ?>"
                    data-product_sku="<?php echo esc_attr($product->get_sku()); ?>"
                    aria-label="<?php echo esc_attr($add_to_cart_text); ?>"
                >
                    <?php echo esc_html($add_to_cart_text); ?>
                </a>
            </div>
            
            <!-- Wishlist & Comparison Buttons -->
            <div class="product-secondary-actions flex gap-2">
                <!-- Wishlist Button -->
                <button 
                    type="button"
                    class="wishlist-button flex-1 border border-border text-foreground hover:border-tactical hover:bg-tactical/10 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    data-product-id="<?php echo esc_attr($product->get_id()); ?>"
                    aria-label="<?php esc_attr_e('Add to Wishlist', 'arms-complex'); ?>"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                
                <!-- Comparison Button -->
                <button 
                    type="button"
                    class="comparison-button flex-1 border border-border text-foreground hover:border-tactical hover:bg-tactical/10 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    data-product-id="<?php echo esc_attr($product->get_id()); ?>"
                    aria-label="<?php esc_attr_e('Add to Comparison', 'arms-complex'); ?>"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</li>
