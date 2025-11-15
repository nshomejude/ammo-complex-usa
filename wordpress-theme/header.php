<?php
/**
 * Header Template
 * 
 * Displays the site header including navigation
 * Converts: src/components/Navigation.tsx and src/components/Header.tsx
 * 
 * @package Arms_Complex
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header bg-background border-b border-border sticky top-0 z-50">
    <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between py-4">
            <!-- Logo -->
            <div class="site-logo">
                <?php
                if (has_custom_logo()) {
                    the_custom_logo();
                } else {
                    ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="text-2xl font-bold text-tactical">
                        <?php bloginfo('name'); ?>
                    </a>
                    <?php
                }
                ?>
            </div>

            <!-- Primary Navigation -->
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class'     => 'primary-menu flex gap-6',
                'container'      => false,
                'fallback_cb'    => false,
            ));
            ?>

            <!-- Cart, Wishlist, Search -->
            <div class="header-actions flex items-center gap-4">
                <?php if (class_exists('WooCommerce')) : ?>
                    <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="cart-icon relative">
                        <span class="cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
                    </a>
                <?php endif; ?>
            </div>
        </nav>
    </div>
</header>
