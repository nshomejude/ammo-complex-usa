<?php
/**
 * Front Page Template
 * 
 * Displays the home page with hero section and featured products
 * Converts: src/pages/Index.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <!-- Hero Section -->
    <?php get_template_part('template-parts/home/hero'); ?>
    
    <!-- Featured Products -->
    <section class="featured-products py-16 bg-background">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4"><?php esc_html_e('Featured Products', 'arms-complex'); ?></h2>
                <p class="text-muted-foreground text-lg">
                    <?php esc_html_e('Check out our most popular ammunition and firearms', 'arms-complex'); ?>
                </p>
            </div>
            
            <?php
            if (class_exists('WooCommerce')) :
                // Display featured products
                echo do_shortcode('[products limit="8" columns="4" orderby="popularity" class="featured"]');
            endif;
            ?>
        </div>
    </section>
    
    <!-- Top Categories -->
    <section class="top-categories py-16 bg-muted/30">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4"><?php esc_html_e('Shop by Category', 'arms-complex'); ?></h2>
                <p class="text-muted-foreground text-lg">
                    <?php esc_html_e('Browse our extensive selection', 'arms-complex'); ?>
                </p>
            </div>
            
            <?php get_template_part('template-parts/home/category-grid'); ?>
        </div>
    </section>
    
    <!-- Why Buy From Us -->
    <?php get_template_part('template-parts/home/why-buy'); ?>
    
    <!-- Recent Products -->
    <section class="recent-products py-16 bg-background">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4"><?php esc_html_e('New Arrivals', 'arms-complex'); ?></h2>
                <p class="text-muted-foreground text-lg">
                    <?php esc_html_e('Check out our latest products', 'arms-complex'); ?>
                </p>
            </div>
            
            <?php
            if (class_exists('WooCommerce')) :
                echo do_shortcode('[products limit="8" columns="4" orderby="date" order="desc"]');
            endif;
            ?>
        </div>
    </section>
</main>

<?php
get_footer();
