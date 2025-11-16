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
            
            <!-- Hero Text Slider -->
            <div class="relative animate-fade-in animation-delay-200">
                <div class="hero-slider aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-border/50 shadow-2xl">
                    <!-- Slide 1 -->
                    <div class="hero-slide active flex flex-col items-center justify-center p-12 text-center h-full">
                        <div class="space-y-6">
                            <div class="text-6xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                <?php esc_html_e('500+', 'arms-complex'); ?>
                            </div>
                            <h3 class="text-3xl font-bold"><?php esc_html_e('Premium Products', 'arms-complex'); ?></h3>
                            <p class="text-lg text-muted-foreground max-w-md">
                                <?php esc_html_e('Extensive selection of firearms, ammunition, and accessories from top brands', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Slide 2 -->
                    <div class="hero-slide flex flex-col items-center justify-center p-12 text-center h-full">
                        <div class="space-y-6">
                            <div class="text-6xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                <?php esc_html_e('24/7', 'arms-complex'); ?>
                            </div>
                            <h3 class="text-3xl font-bold"><?php esc_html_e('Expert Support', 'arms-complex'); ?></h3>
                            <p class="text-lg text-muted-foreground max-w-md">
                                <?php esc_html_e('Professional guidance and support whenever you need it', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Slide 3 -->
                    <div class="hero-slide flex flex-col items-center justify-center p-12 text-center h-full">
                        <div class="space-y-6">
                            <div class="text-6xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                <?php esc_html_e('100%', 'arms-complex'); ?>
                            </div>
                            <h3 class="text-3xl font-bold"><?php esc_html_e('Quality Guaranteed', 'arms-complex'); ?></h3>
                            <p class="text-lg text-muted-foreground max-w-md">
                                <?php esc_html_e('Every product tested and verified for performance and reliability', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Slider Controls -->
                    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                        <button class="slider-dot active" data-slide="0" aria-label="<?php esc_attr_e('Slide 1', 'arms-complex'); ?>"></button>
                        <button class="slider-dot" data-slide="1" aria-label="<?php esc_attr_e('Slide 2', 'arms-complex'); ?>"></button>
                        <button class="slider-dot" data-slide="2" aria-label="<?php esc_attr_e('Slide 3', 'arms-complex'); ?>"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
.hero-slider {
    position: relative;
}

.hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
}

.hero-slide.active {
    opacity: 1;
    position: relative;
}

.slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: hsl(var(--muted));
    border: 2px solid hsl(var(--border));
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-dot:hover {
    background: hsl(var(--primary) / 0.5);
}

.slider-dot.active {
    background: hsl(var(--primary));
    transform: scale(1.2);
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Start auto-sliding
    startAutoSlide();

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
});
</script>
