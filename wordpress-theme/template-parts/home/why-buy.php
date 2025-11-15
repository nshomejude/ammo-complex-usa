<?php
/**
 * Why Buy From Us Template Part
 * 
 * Displays key benefits and features
 * 
 * @package Arms_Complex
 */

$features = [
    [
        'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
        'title' => __('Licensed & Verified', 'arms-complex'),
        'description' => __('All our firearms are handled through licensed FFL dealers with proper documentation.', 'arms-complex'),
    ],
    [
        'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        'title' => __('Best Price Guarantee', 'arms-complex'),
        'description' => __('Competitive pricing on all products with bulk discounts and regular promotions.', 'arms-complex'),
    ],
    [
        'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>',
        'title' => __('Fast Shipping', 'arms-complex'),
        'description' => __('Quick and secure delivery with professional packaging and tracking.', 'arms-complex'),
    ],
    [
        'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
        'title' => __('Expert Support', 'arms-complex'),
        'description' => __('Knowledgeable staff ready to help with product selection and technical questions.', 'arms-complex'),
    ],
    [
        'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',
        'title' => __('Quality Guaranteed', 'arms-complex'),
        'description' => __('Every product is inspected and backed by manufacturer warranties.', 'arms-complex'),
    ],
    [
        'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
        'title' => __('Educational Resources', 'arms-complex'),
        'description' => __('Access guides, calculators, and resources for reloading and ballistics.', 'arms-complex'),
    ],
];
?>

<section class="py-16 lg:py-24">
    <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12 animate-fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                <?php esc_html_e('Why Choose Us', 'arms-complex'); ?>
            </h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
                <?php esc_html_e('We\'re committed to providing the best products, service, and support to the firearms community.', 'arms-complex'); ?>
            </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php foreach ($features as $index => $feature) : ?>
                <div class="card p-6 transition-all hover:shadow-lg hover:border-primary/50 animate-fade-in" 
                     style="animation-delay: <?php echo esc_attr($index * 100); ?>ms;">
                    <div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                        <?php echo $feature['icon']; ?>
                    </div>
                    <h3 class="text-xl font-bold mb-2">
                        <?php echo esc_html($feature['title']); ?>
                    </h3>
                    <p class="text-muted-foreground">
                        <?php echo esc_html($feature['description']); ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
