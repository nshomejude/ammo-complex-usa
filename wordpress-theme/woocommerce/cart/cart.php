<?php
/**
 * WooCommerce Cart Page
 * 
 * Displays the shopping cart
 * Converts: src/pages/Cart.tsx
 * 
 * @package Arms_Complex
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_cart');
?>

<div class="cart-page">
    <div class="container mx-auto px-4 py-8">
        <h1 class="cart-title text-4xl font-bold mb-8">
            <?php esc_html_e('Shopping Cart', 'arms-complex'); ?>
        </h1>
        
        <form class="woocommerce-cart-form" action="<?php echo esc_url(wc_get_cart_url()); ?>" method="post">
            <?php do_action('woocommerce_before_cart_table'); ?>
            
            <div class="cart-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Cart Items (Left Side - 2/3) -->
                <div class="cart-items lg:col-span-2">
                    <div class="bg-card border border-border rounded-lg overflow-hidden">
                        <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents w-full">
                            <thead>
                                <tr class="bg-muted/50">
                                    <th class="product-remove">&nbsp;</th>
                                    <th class="product-thumbnail">&nbsp;</th>
                                    <th class="product-name"><?php esc_html_e('Product', 'arms-complex'); ?></th>
                                    <th class="product-price"><?php esc_html_e('Price', 'arms-complex'); ?></th>
                                    <th class="product-quantity"><?php esc_html_e('Quantity', 'arms-complex'); ?></th>
                                    <th class="product-subtotal"><?php esc_html_e('Subtotal', 'arms-complex'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php do_action('woocommerce_before_cart_contents'); ?>
                                
                                <?php
                                foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                                    $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                                    $product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);
                                    
                                    if ($_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters('woocommerce_cart_item_visible', true, $cart_item, $cart_item_key)) {
                                        $product_permalink = apply_filters('woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink($cart_item) : '', $cart_item, $cart_item_key);
                                        ?>
                                        <tr class="woocommerce-cart-form__cart-item <?php echo esc_attr(apply_filters('woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key)); ?>">
                                            
                                            <!-- Remove Button -->
                                            <td class="product-remove">
                                                <?php
                                                echo apply_filters(
                                                    'woocommerce_cart_item_remove_link',
                                                    sprintf(
                                                        '<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
                                                        esc_url(wc_get_cart_remove_url($cart_item_key)),
                                                        esc_attr__('Remove this item', 'arms-complex'),
                                                        esc_attr($product_id),
                                                        esc_attr($_product->get_sku())
                                                    ),
                                                    $cart_item_key
                                                );
                                                ?>
                                            </td>
                                            
                                            <!-- Product Thumbnail -->
                                            <td class="product-thumbnail">
                                                <?php
                                                $thumbnail = apply_filters('woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key);
                                                
                                                if (!$product_permalink) {
                                                    echo wp_kses_post($thumbnail);
                                                } else {
                                                    printf('<a href="%s">%s</a>', esc_url($product_permalink), wp_kses_post($thumbnail));
                                                }
                                                ?>
                                            </td>
                                            
                                            <!-- Product Name -->
                                            <td class="product-name" data-title="<?php esc_attr_e('Product', 'arms-complex'); ?>">
                                                <?php
                                                if (!$product_permalink) {
                                                    echo wp_kses_post(apply_filters('woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key) . '&nbsp;');
                                                } else {
                                                    echo wp_kses_post(apply_filters('woocommerce_cart_item_name', sprintf('<a href="%s">%s</a>', esc_url($product_permalink), $_product->get_name()), $cart_item, $cart_item_key));
                                                }
                                                
                                                do_action('woocommerce_after_cart_item_name', $cart_item, $cart_item_key);
                                                
                                                // Meta data
                                                echo wc_get_formatted_cart_item_data($cart_item);
                                                
                                                // Backorder notification
                                                if ($_product->backorders_require_notification() && $_product->is_on_backorder($cart_item['quantity'])) {
                                                    echo wp_kses_post(apply_filters('woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__('Available on backorder', 'arms-complex') . '</p>', $product_id));
                                                }
                                                ?>
                                            </td>
                                            
                                            <!-- Product Price -->
                                            <td class="product-price" data-title="<?php esc_attr_e('Price', 'arms-complex'); ?>">
                                                <?php
                                                echo apply_filters('woocommerce_cart_item_price', WC()->cart->get_product_price($_product), $cart_item, $cart_item_key);
                                                ?>
                                            </td>
                                            
                                            <!-- Product Quantity -->
                                            <td class="product-quantity" data-title="<?php esc_attr_e('Quantity', 'arms-complex'); ?>">
                                                <?php
                                                if ($_product->is_sold_individually()) {
                                                    $product_quantity = sprintf('1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key);
                                                } else {
                                                    $product_quantity = woocommerce_quantity_input(
                                                        array(
                                                            'input_name'   => "cart[{$cart_item_key}][qty]",
                                                            'input_value'  => $cart_item['quantity'],
                                                            'max_value'    => $_product->get_max_purchase_quantity(),
                                                            'min_value'    => '0',
                                                            'product_name' => $_product->get_name(),
                                                        ),
                                                        $_product,
                                                        false
                                                    );
                                                }
                                                
                                                echo apply_filters('woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item);
                                                ?>
                                            </td>
                                            
                                            <!-- Product Subtotal -->
                                            <td class="product-subtotal" data-title="<?php esc_attr_e('Subtotal', 'arms-complex'); ?>">
                                                <?php
                                                echo apply_filters('woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal($_product, $cart_item['quantity']), $cart_item, $cart_item_key);
                                                ?>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                }
                                ?>
                                
                                <?php do_action('woocommerce_cart_contents'); ?>
                                
                                <tr>
                                    <td colspan="6" class="actions">
                                        <div class="flex justify-between items-center p-4">
                                            <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>" class="button">
                                                <?php esc_html_e('Continue Shopping', 'arms-complex'); ?>
                                            </a>
                                            
                                            <button type="submit" class="button" name="update_cart" value="<?php esc_attr_e('Update cart', 'arms-complex'); ?>">
                                                <?php esc_html_e('Update cart', 'arms-complex'); ?>
                                            </button>
                                            
                                            <?php do_action('woocommerce_cart_actions'); ?>
                                            
                                            <?php wp_nonce_field('woocommerce-cart', 'woocommerce-cart-nonce'); ?>
                                        </div>
                                    </td>
                                </tr>
                                
                                <?php do_action('woocommerce_after_cart_contents'); ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Cart Totals (Right Side - 1/3) -->
                <div class="cart-collaterals lg:col-span-1">
                    <div class="cart-totals-wrapper bg-card border border-border rounded-lg p-6 sticky top-4">
                        <?php
                        /**
                         * Cart collaterals hook.
                         *
                         * @hooked woocommerce_cross_sell_display
                         * @hooked woocommerce_cart_totals - 10
                         */
                        do_action('woocommerce_cart_collaterals');
                        ?>
                    </div>
                </div>
            </div>
            
            <?php do_action('woocommerce_after_cart_table'); ?>
        </form>
    </div>
</div>

<?php do_action('woocommerce_after_cart'); ?>
