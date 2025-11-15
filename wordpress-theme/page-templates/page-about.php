<?php
/**
 * Template Name: About Us
 * 
 * Converts: src/pages/About.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main about-page">
    <!-- Hero Section -->
    <div class="about-hero bg-gradient-to-r from-tactical/10 to-tactical/5 border-b border-border">
        <div class="container mx-auto px-4 py-16 text-center">
            <h1 class="text-6xl font-bold mb-6">
                <?php esc_html_e('About Arms Complex', 'arms-complex'); ?>
            </h1>
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Your trusted partner for firearms, ammunition, and shooting accessories since 2010.', 'arms-complex'); ?>
            </p>
        </div>
    </div>

    <div class="container mx-auto px-4 py-12">
        <div class="content max-w-4xl mx-auto space-y-12">
            
            <!-- Our Story -->
            <section class="our-story bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Our Story', 'arms-complex'); ?>
                </h2>
                <div class="prose max-w-none space-y-4 text-muted-foreground">
                    <p>
                        <?php esc_html_e('Founded in 2010, Arms Complex began with a simple mission: to provide shooters, hunters, and firearms enthusiasts with access to quality products at fair prices. What started as a small shop has grown into one of the leading firearms and ammunition retailers in the region.', 'arms-complex'); ?>
                    </p>
                    <p>
                        <?php esc_html_e('Our founder, a lifelong shooter and competitive marksman, recognized the need for a firearms retailer that combined extensive product knowledge with exceptional customer service. Today, that vision continues to drive everything we do.', 'arms-complex'); ?>
                    </p>
                    <p>
                        <?php esc_html_e('We\'ve built our reputation on integrity, expertise, and a genuine passion for the shooting sports. Whether you\'re a first-time buyer or a seasoned collector, we\'re here to help you make informed decisions and find exactly what you need.', 'arms-complex'); ?>
                    </p>
                </div>
            </section>

            <!-- Mission & Values -->
            <section class="mission-values">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    <?php esc_html_e('Our Mission & Values', 'arms-complex'); ?>
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="value-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="value-icon text-4xl mb-4">🎯</div>
                        <h3 class="text-xl font-bold mb-3">
                            <?php esc_html_e('Quality First', 'arms-complex'); ?>
                        </h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('We carefully select every product we sell, ensuring it meets our high standards for quality and reliability.', 'arms-complex'); ?>
                        </p>
                    </div>

                    <div class="value-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="value-icon text-4xl mb-4">🤝</div>
                        <h3 class="text-xl font-bold mb-3">
                            <?php esc_html_e('Customer Service', 'arms-complex'); ?>
                        </h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('Your satisfaction is our priority. Our knowledgeable team is always ready to assist with expert advice and support.', 'arms-complex'); ?>
                        </p>
                    </div>

                    <div class="value-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="value-icon text-4xl mb-4">🛡️</div>
                        <h3 class="text-xl font-bold mb-3">
                            <?php esc_html_e('Safety & Education', 'arms-complex'); ?>
                        </h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('We promote responsible gun ownership through education, safety training resources, and community engagement.', 'arms-complex'); ?>
                        </p>
                    </div>
                </div>
            </section>

            <!-- Why Choose Us -->
            <section class="why-choose-us bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Why Choose Arms Complex?', 'arms-complex'); ?>
                </h2>
                
                <div class="space-y-4">
                    <div class="reason flex gap-4">
                        <div class="icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Extensive Selection', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('From popular calibers to hard-to-find specialty rounds, we stock a comprehensive range of firearms and ammunition.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="reason flex gap-4">
                        <div class="icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Competitive Pricing', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('We work directly with manufacturers to bring you the best prices without compromising on quality.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="reason flex gap-4">
                        <div class="icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Expert Knowledge', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Our team includes experienced shooters, hunters, and competitive marksmen who can provide genuine, helpful advice.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="reason flex gap-4">
                        <div class="icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Fast, Secure Shipping', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Quick processing and reliable shipping to your FFL or directly to your door (ammunition).', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="reason flex gap-4">
                        <div class="icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Commitment to Compliance', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('We strictly adhere to all federal, state, and local regulations to ensure legal, responsible transactions.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Our Commitment to Safety -->
            <section class="safety-commitment bg-tactical/10 border border-tactical rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6 text-tactical">
                    <?php esc_html_e('Our Commitment to Safety', 'arms-complex'); ?>
                </h2>
                <div class="prose max-w-none text-muted-foreground space-y-4">
                    <p>
                        <?php esc_html_e('At Arms Complex, we believe that responsible gun ownership starts with education and safety. We\'re committed to promoting safe handling, storage, and use of firearms through:', 'arms-complex'); ?>
                    </p>
                    <ul class="list-disc list-inside space-y-2">
                        <li><?php esc_html_e('Providing comprehensive safety information with every purchase', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Recommending appropriate safety equipment and training resources', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Supporting local firearms safety training programs', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Educating customers on proper storage and child safety', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Strict compliance with all background check and transfer requirements', 'arms-complex'); ?></li>
                    </ul>
                    <p class="font-semibold">
                        <?php esc_html_e('Safety is not optional—it\'s our foundation.', 'arms-complex'); ?>
                    </p>
                </div>
            </section>

            <!-- Stats -->
            <section class="stats">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="stat-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="stat-value text-4xl font-bold text-tactical mb-2">15+</div>
                        <div class="stat-label text-sm text-muted-foreground">
                            <?php esc_html_e('Years in Business', 'arms-complex'); ?>
                        </div>
                    </div>

                    <div class="stat-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="stat-value text-4xl font-bold text-tactical mb-2">50K+</div>
                        <div class="stat-label text-sm text-muted-foreground">
                            <?php esc_html_e('Happy Customers', 'arms-complex'); ?>
                        </div>
                    </div>

                    <div class="stat-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="stat-value text-4xl font-bold text-tactical mb-2">10K+</div>
                        <div class="stat-label text-sm text-muted-foreground">
                            <?php esc_html_e('Products Available', 'arms-complex'); ?>
                        </div>
                    </div>

                    <div class="stat-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="stat-value text-4xl font-bold text-tactical mb-2">4.9</div>
                        <div class="stat-label text-sm text-muted-foreground">
                            <?php esc_html_e('Average Rating', 'arms-complex'); ?>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <div class="cta-section bg-gradient-to-r from-tactical/10 to-tactical/5 rounded-lg p-8 text-center">
                <h2 class="text-2xl font-bold mb-4">
                    <?php esc_html_e('Join the Arms Complex Family', 'arms-complex'); ?>
                </h2>
                <p class="text-muted-foreground mb-6">
                    <?php esc_html_e('Experience the difference that quality, expertise, and dedication can make.', 'arms-complex'); ?>
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <?php if (class_exists('WooCommerce')) : ?>
                        <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>" class="button">
                            <?php esc_html_e('Shop Now', 'arms-complex'); ?>
                        </a>
                    <?php endif; ?>
                    <?php
                    $contact_page = get_page_by_path('contact');
                    if ($contact_page) :
                    ?>
                        <a href="<?php echo esc_url(get_permalink($contact_page)); ?>" class="button-outline">
                            <?php esc_html_e('Contact Us', 'arms-complex'); ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
