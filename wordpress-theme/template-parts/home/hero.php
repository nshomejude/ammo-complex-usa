<?php
/**
 * Hero Section Template Part
 * 
 * Displays the main hero banner on the home page
 * 
 * @package Arms_Complex
 */
?>

<section class="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--foreground)) 35px, hsl(var(--foreground)) 36px);"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Hero Content -->
            <div class="space-y-6 animate-fade-in">
                <div class="inline-block">
                    <span class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        <?php esc_html_e('Premium Quality Firearms & Ammunition', 'arms-complex'); ?>
                    </span>
                </div>
                
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    <?php esc_html_e('Your Trusted Source for', 'arms-complex'); ?>
                    <span class="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        <?php esc_html_e('Precision & Power', 'arms-complex'); ?>
                    </span>
                </h1>
                
                <p class="text-lg md:text-xl text-muted-foreground max-w-2xl">
                    <?php esc_html_e('Discover top-quality firearms, ammunition, and accessories. Whether you\'re a professional or enthusiast, we have everything you need.', 'arms-complex'); ?>
                </p>
                
                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" 
                       class="button button-primary text-center">
                        <?php esc_html_e('Shop Now', 'arms-complex'); ?>
                    </a>
                    <a href="<?php echo esc_url(home_url('/firearms/')); ?>" 
                       class="button button-outline text-center">
                        <?php esc_html_e('Browse Firearms', 'arms-complex'); ?>
                    </a>
                </div>
                
                <!-- Stats -->
                <div class="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                    <div>
                        <div class="text-3xl font-bold text-primary">500+</div>
                        <div class="text-sm text-muted-foreground"><?php esc_html_e('Products', 'arms-complex'); ?></div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-primary">50+</div>
                        <div class="text-sm text-muted-foreground"><?php esc_html_e('Brands', 'arms-complex'); ?></div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-primary">10k+</div>
                        <div class="text-sm text-muted-foreground"><?php esc_html_e('Customers', 'arms-complex'); ?></div>
                    </div>
                </div>
            </div>
            
            <!-- Hero Image -->
            <div class="relative animate-fade-in animation-delay-200">
                <div class="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <?php 
                    $hero_image = get_theme_mod('hero_image');
                    if ($hero_image) : ?>
                        <img src="<?php echo esc_url($hero_image); ?>" 
                             alt="<?php esc_attr_e('Hero Image', 'arms-complex'); ?>"
                             class="w-full h-full object-cover">
                    <?php else : ?>
                        <div class="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <svg class="w-48 h-48 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Floating Badge -->
                <div class="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-xl">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="font-bold"><?php esc_html_e('Licensed Dealer', 'arms-complex'); ?></div>
                            <div class="text-sm text-muted-foreground"><?php esc_html_e('FFL Verified', 'arms-complex'); ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
