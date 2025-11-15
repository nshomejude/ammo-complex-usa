<?php
/**
 * 404 Error Template
 * 
 * Displayed when a page is not found
 * Converts: src/pages/NotFound.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-16">
        <div class="error-404 text-center max-w-2xl mx-auto">
            <!-- Error Number -->
            <div class="error-number text-9xl font-bold text-tactical/20 mb-8">
                404
            </div>
            
            <!-- Error Message -->
            <h1 class="error-title text-4xl font-bold mb-4">
                <?php esc_html_e('Target Not Found', 'arms-complex'); ?>
            </h1>
            
            <p class="error-description text-muted-foreground text-lg mb-8">
                <?php esc_html_e('The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'arms-complex'); ?>
            </p>
            
            <!-- Search Form -->
            <div class="error-search bg-card rounded-lg p-8 mb-8">
                <h2 class="text-xl font-semibold mb-4">
                    <?php esc_html_e('Try searching for what you need:', 'arms-complex'); ?>
                </h2>
                <?php get_search_form(); ?>
            </div>
            
            <!-- Quick Links -->
            <div class="error-links">
                <h2 class="text-xl font-semibold mb-4">
                    <?php esc_html_e('Or visit these popular pages:', 'arms-complex'); ?>
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="link-card bg-card border border-border rounded-lg p-6 hover:border-tactical transition-all">
                        <h3 class="font-semibold mb-2"><?php esc_html_e('Home', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground"><?php esc_html_e('Return to homepage', 'arms-complex'); ?></p>
                    </a>
                    
                    <?php if (class_exists('WooCommerce')) : ?>
                        <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>" class="link-card bg-card border border-border rounded-lg p-6 hover:border-tactical transition-all">
                            <h3 class="font-semibold mb-2"><?php esc_html_e('Shop', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground"><?php esc_html_e('Browse our products', 'arms-complex'); ?></p>
                        </a>
                    <?php endif; ?>
                    
                    <a href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>" class="link-card bg-card border border-border rounded-lg p-6 hover:border-tactical transition-all">
                        <h3 class="font-semibold mb-2"><?php esc_html_e('Contact', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground"><?php esc_html_e('Get in touch with us', 'arms-complex'); ?></p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
