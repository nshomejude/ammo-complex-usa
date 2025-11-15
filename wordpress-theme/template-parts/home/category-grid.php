<?php
/**
 * Category Grid Template Part
 * 
 * Displays product categories in a grid layout
 * 
 * @package Arms_Complex
 */

// Get product categories
$categories = get_terms([
    'taxonomy' => 'product_cat',
    'hide_empty' => false,
    'exclude' => get_option('default_product_cat'),
    'number' => 6,
]);

if (empty($categories) || is_wp_error($categories)) {
    return;
}
?>

<section class="py-16 lg:py-24 bg-muted/50">
    <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12 animate-fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                <?php esc_html_e('Shop by Category', 'arms-complex'); ?>
            </h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
                <?php esc_html_e('Browse our extensive collection organized by category to find exactly what you need.', 'arms-complex'); ?>
            </p>
        </div>
        
        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($categories as $category) : 
                $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
                $image = $thumbnail_id ? wp_get_attachment_url($thumbnail_id) : wc_placeholder_img_src();
                $count = $category->count;
            ?>
                <a href="<?php echo esc_url(get_term_link($category)); ?>" 
                   class="card group overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 animate-fade-in">
                    <div class="aspect-video overflow-hidden">
                        <img src="<?php echo esc_url($image); ?>" 
                             alt="<?php echo esc_attr($category->name); ?>"
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                    </div>
                    
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-2">
                            <h3 class="text-xl font-bold group-hover:text-primary transition-colors">
                                <?php echo esc_html($category->name); ?>
                            </h3>
                            <span class="badge">
                                <?php echo esc_html($count); ?>
                            </span>
                        </div>
                        
                        <?php if ($category->description) : ?>
                            <p class="text-sm text-muted-foreground mb-4">
                                <?php echo esc_html(wp_trim_words($category->description, 15)); ?>
                            </p>
                        <?php endif; ?>
                        
                        <div class="flex items-center text-primary font-medium text-sm">
                            <?php esc_html_e('Shop Now', 'arms-complex'); ?>
                            <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
        
        <!-- View All Button -->
        <div class="text-center mt-12">
            <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" 
               class="button button-outline">
                <?php esc_html_e('View All Categories', 'arms-complex'); ?>
            </a>
        </div>
    </div>
</section>
