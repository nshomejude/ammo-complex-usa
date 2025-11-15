<?php
/**
 * Template Name: Reloading Guide
 * 
 * Converts: src/pages/ReloadingGuide.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main reloading-guide-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="page-header text-center mb-12">
            <h1 class="text-5xl font-bold mb-4">
                <?php esc_html_e('Complete Reloading Guide', 'arms-complex'); ?>
            </h1>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Learn the art and science of ammunition reloading. From beginner basics to advanced techniques.', 'arms-complex'); ?>
            </p>
        </div>

        <!-- Table of Contents -->
        <div class="toc bg-card border border-border rounded-lg p-6 mb-12 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold mb-4"><?php esc_html_e('Table of Contents', 'arms-complex'); ?></h2>
            <nav class="toc-nav space-y-2">
                <a href="#getting-started" class="block text-tactical hover:underline">
                    1. <?php esc_html_e('Getting Started', 'arms-complex'); ?>
                </a>
                <a href="#equipment" class="block text-tactical hover:underline">
                    2. <?php esc_html_e('Essential Equipment', 'arms-complex'); ?>
                </a>
                <a href="#components" class="block text-tactical hover:underline">
                    3. <?php esc_html_e('Reloading Components', 'arms-complex'); ?>
                </a>
                <a href="#process" class="block text-tactical hover:underline">
                    4. <?php esc_html_e('The Reloading Process', 'arms-complex'); ?>
                </a>
                <a href="#safety" class="block text-tactical hover:underline">
                    5. <?php esc_html_e('Safety Guidelines', 'arms-complex'); ?>
                </a>
                <a href="#troubleshooting" class="block text-tactical hover:underline">
                    6. <?php esc_html_e('Troubleshooting', 'arms-complex'); ?>
                </a>
                <a href="#advanced" class="block text-tactical hover:underline">
                    7. <?php esc_html_e('Advanced Techniques', 'arms-complex'); ?>
                </a>
            </nav>
        </div>

        <!-- Content Sections -->
        <div class="guide-content max-w-4xl mx-auto space-y-12">
            
            <!-- Getting Started -->
            <section id="getting-started" class="guide-section">
                <div class="bg-card border border-border rounded-lg p-8">
                    <h2 class="text-3xl font-bold mb-6 flex items-center">
                        <span class="bg-tactical text-tactical-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4">1</span>
                        <?php esc_html_e('Getting Started', 'arms-complex'); ?>
                    </h2>
                    <div class="prose max-w-none">
                        <p class="text-lg mb-4">
                            <?php esc_html_e('Reloading your own ammunition can be rewarding, cost-effective, and allows you to customize loads for your specific firearms. This guide will walk you through everything you need to know.', 'arms-complex'); ?>
                        </p>
                        
                        <h3 class="text-xl font-semibold mt-6 mb-3"><?php esc_html_e('Why Reload?', 'arms-complex'); ?></h3>
                        <ul class="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><?php esc_html_e('Cost savings - Save 40-60% on ammunition costs', 'arms-complex'); ?></li>
                            <li><?php esc_html_e('Custom loads - Tailor ammunition to your specific needs', 'arms-complex'); ?></li>
                            <li><?php esc_html_e('Better accuracy - Fine-tune for maximum precision', 'arms-complex'); ?></li>
                            <li><?php esc_html_e('Availability - Make ammunition when factory options are scarce', 'arms-complex'); ?></li>
                            <li><?php esc_html_e('Satisfaction - Pride in creating your own ammunition', 'arms-complex'); ?></li>
                        </ul>

                        <div class="bg-tactical/10 border border-tactical rounded-lg p-4 mt-6">
                            <p class="font-semibold text-tactical mb-2">⚠️ <?php esc_html_e('Important', 'arms-complex'); ?></p>
                            <p class="text-sm">
                                <?php esc_html_e('Reloading requires attention to detail and strict adherence to safety protocols. Always follow published load data and never exceed maximum recommended charges.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Equipment -->
            <section id="equipment" class="guide-section">
                <div class="bg-card border border-border rounded-lg p-8">
                    <h2 class="text-3xl font-bold mb-6 flex items-center">
                        <span class="bg-tactical text-tactical-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4">2</span>
                        <?php esc_html_e('Essential Equipment', 'arms-complex'); ?>
                    </h2>
                    
                    <div class="equipment-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Reloading Press -->
                        <div class="equipment-item bg-muted/30 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-3">🔧 <?php esc_html_e('Reloading Press', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3">
                                <?php esc_html_e('The heart of your reloading setup. Choose between:', 'arms-complex'); ?>
                            </p>
                            <ul class="list-disc list-inside space-y-1 text-sm">
                                <li><?php esc_html_e('Single Stage - Best for beginners and precision loading', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Turret Press - Good balance of speed and precision', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Progressive - Highest volume production', 'arms-complex'); ?></li>
                            </ul>
                        </div>

                        <!-- Dies -->
                        <div class="equipment-item bg-muted/30 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-3">🔩 <?php esc_html_e('Dies', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3">
                                <?php esc_html_e('Essential for resizing and bullet seating:', 'arms-complex'); ?>
                            </p>
                            <ul class="list-disc list-inside space-y-1 text-sm">
                                <li><?php esc_html_e('Sizing die - Resizes brass to proper dimensions', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Seating die - Seats bullet to correct depth', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Crimp die - Applies crimp (if needed)', 'arms-complex'); ?></li>
                            </ul>
                        </div>

                        <!-- Scale -->
                        <div class="equipment-item bg-muted/30 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-3">⚖️ <?php esc_html_e('Powder Scale', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground text-sm">
                                <?php esc_html_e('Accurate powder measurement is critical. Digital scales offer convenience, but beam scales are proven reliable. Calibrate regularly.', 'arms-complex'); ?>
                            </p>
                        </div>

                        <!-- Calipers -->
                        <div class="equipment-item bg-muted/30 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-3">📏 <?php esc_html_e('Calipers', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground text-sm">
                                <?php esc_html_e('Measure case length, overall cartridge length, and verify dimensions. Digital calipers are recommended for ease of use.', 'arms-complex'); ?>
                            </p>
                        </div>

                        <!-- Case Prep Tools -->
                        <div class="equipment-item bg-muted/30 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-3">🛠️ <?php esc_html_e('Case Prep Tools', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3"><?php esc_html_e('For cleaning and preparing brass:', 'arms-complex'); ?></p>
                            <ul class="list-disc list-inside space-y-1 text-sm">
                                <li><?php esc_html_e('Tumbler or ultrasonic cleaner', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Case trimmer', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Deburring tool', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Primer pocket cleaner', 'arms-complex'); ?></li>
                            </ul>
                        </div>

                        <!-- Powder Measure -->
                        <div class="equipment-item bg-muted/30 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-3">⚗️ <?php esc_html_e('Powder Measure', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground text-sm">
                                <?php esc_html_e('Speeds up powder dispensing. Always verify charges with a scale. Progressive reloaders benefit most from a powder measure.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="mt-6 bg-accent/10 border border-accent rounded-lg p-4">
                        <p class="font-semibold mb-2">💡 <?php esc_html_e('Starter Kit Recommendation', 'arms-complex'); ?></p>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('For beginners, consider a complete starter kit that includes press, dies, scale, and accessories. Budget $300-500 for a quality setup.', 'arms-complex'); ?>
                        </p>
                    </div>
                </div>
            </section>

            <!-- Components -->
            <section id="components" class="guide-section">
                <div class="bg-card border border-border rounded-lg p-8">
                    <h2 class="text-3xl font-bold mb-6 flex items-center">
                        <span class="bg-tactical text-tactical-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4">3</span>
                        <?php esc_html_e('Reloading Components', 'arms-complex'); ?>
                    </h2>
                    
                    <div class="space-y-6">
                        <div class="component-section">
                            <h3 class="text-xl font-semibold mb-3">1. <?php esc_html_e('Brass Cases', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3">
                                <?php esc_html_e('The foundation of your cartridge. Quality brass can be reloaded multiple times.', 'arms-complex'); ?>
                            </p>
                            <ul class="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                                <li><?php esc_html_e('Inspect for cracks, splits, or excessive wear', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Trim to proper length if needed', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Clean thoroughly before reloading', 'arms-complex'); ?></li>
                                <li><?php esc_html_e('Track number of firings for each batch', 'arms-complex'); ?></li>
                            </ul>
                        </div>

                        <div class="component-section">
                            <h3 class="text-xl font-semibold mb-3">2. <?php esc_html_e('Primers', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3">
                                <?php esc_html_e('Ignite the powder charge. Choose the correct type:', 'arms-complex'); ?>
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('Small Rifle', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('.223, .204, etc.', 'arms-complex'); ?></p>
                                </div>
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('Large Rifle', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('.308, .30-06, etc.', 'arms-complex'); ?></p>
                                </div>
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('Small Pistol', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('9mm, .380, etc.', 'arms-complex'); ?></p>
                                </div>
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('Large Pistol', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('.45 ACP, .44 Mag, etc.', 'arms-complex'); ?></p>
                                </div>
                            </div>
                        </div>

                        <div class="component-section">
                            <h3 class="text-xl font-semibold mb-3">3. <?php esc_html_e('Powder', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3">
                                <?php esc_html_e('The propellant that drives the bullet. Critical safety considerations:', 'arms-complex'); ?>
                            </p>
                            <div class="bg-destructive/10 border border-destructive rounded-lg p-4">
                                <ul class="space-y-2 text-sm">
                                    <li><strong><?php esc_html_e('NEVER substitute powders', 'arms-complex'); ?></strong></li>
                                    <li><?php esc_html_e('Always use published load data', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Store powder properly in original containers', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Start at minimum charge and work up', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Keep a reloading log', 'arms-complex'); ?></li>
                                </ul>
                            </div>
                        </div>

                        <div class="component-section">
                            <h3 class="text-xl font-semibold mb-3">4. <?php esc_html_e('Bullets', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground mb-3">
                                <?php esc_html_e('Choose based on your application:', 'arms-complex'); ?>
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ml-4">
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('FMJ', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('Target/Practice', 'arms-complex'); ?></p>
                                </div>
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('HP/JHP', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('Defense/Hunting', 'arms-complex'); ?></p>
                                </div>
                                <div class="bg-muted/30 rounded p-3">
                                    <p class="font-semibold mb-1"><?php esc_html_e('Match', 'arms-complex'); ?></p>
                                    <p class="text-sm text-muted-foreground"><?php esc_html_e('Competition', 'arms-complex'); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Process -->
            <section id="process" class="guide-section">
                <div class="bg-card border border-border rounded-lg p-8">
                    <h2 class="text-3xl font-bold mb-6 flex items-center">
                        <span class="bg-tactical text-tactical-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4">4</span>
                        <?php esc_html_e('The Reloading Process', 'arms-complex'); ?>
                    </h2>
                    
                    <div class="process-steps space-y-6">
                        <?php
                        $steps = array(
                            array(
                                'number' => '1',
                                'title' => 'Case Inspection & Cleaning',
                                'description' => 'Inspect brass for cracks, splits, or damage. Clean thoroughly using tumbler or ultrasonic cleaner. Remove any debris from primer pockets.',
                            ),
                            array(
                                'number' => '2',
                                'title' => 'Decapping & Resizing',
                                'description' => 'Remove spent primer and resize case to proper dimensions using sizing die. Lubricate cases before resizing.',
                            ),
                            array(
                                'number' => '3',
                                'title' => 'Case Trimming',
                                'description' => 'Measure case length with calipers. Trim if exceeding maximum length. Deburr and chamfer case mouth.',
                            ),
                            array(
                                'number' => '4',
                                'title' => 'Primer Seating',
                                'description' => 'Seat new primer flush with case head or slightly below. Never force primers. Feel for smooth, consistent seating.',
                            ),
                            array(
                                'number' => '5',
                                'title' => 'Powder Charging',
                                'description' => 'Measure powder charge carefully. Verify each charge with scale. Check for double charges or empty cases before proceeding.',
                            ),
                            array(
                                'number' => '6',
                                'title' => 'Bullet Seating',
                                'description' => 'Seat bullet to proper overall cartridge length (OAL). Measure with calipers. Apply crimp if required by load data.',
                            ),
                            array(
                                'number' => '7',
                                'title' => 'Final Inspection',
                                'description' => 'Inspect finished cartridges. Check OAL, look for defects. Verify all cases have primers and bullets. Store properly with load information.',
                            ),
                        );
                        
                        foreach ($steps as $step) :
                        ?>
                            <div class="process-step bg-muted/30 rounded-lg p-6">
                                <div class="flex items-start gap-4">
                                    <div class="step-number flex-shrink-0 w-12 h-12 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        <?php echo esc_html($step['number']); ?>
                                    </div>
                                    <div class="step-content flex-1">
                                        <h3 class="text-xl font-semibold mb-2">
                                            <?php echo esc_html($step['title']); ?>
                                        </h3>
                                        <p class="text-muted-foreground">
                                            <?php echo esc_html($step['description']); ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </section>

            <!-- Safety -->
            <section id="safety" class="guide-section">
                <div class="bg-destructive/10 border-2 border-destructive rounded-lg p-8">
                    <h2 class="text-3xl font-bold mb-6 flex items-center text-destructive">
                        <span class="bg-destructive text-destructive-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4">⚠️</span>
                        <?php esc_html_e('Critical Safety Guidelines', 'arms-complex'); ?>
                    </h2>
                    
                    <div class="space-y-4">
                        <div class="safety-rule bg-background rounded-lg p-4">
                            <p class="font-semibold mb-2">🚫 <?php esc_html_e('NEVER mix powders or substitute loads', 'arms-complex'); ?></p>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Different powders have dramatically different burn rates. Using the wrong powder can cause catastrophic pressure.', 'arms-complex'); ?>
                            </p>
                        </div>
                        
                        <div class="safety-rule bg-background rounded-lg p-4">
                            <p class="font-semibold mb-2">📖 <?php esc_html_e('Always use published load data', 'arms-complex'); ?></p>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Start at minimum charges and work up carefully. Never exceed maximum loads.', 'arms-complex'); ?>
                            </p>
                        </div>
                        
                        <div class="safety-rule bg-background rounded-lg p-4">
                            <p class="font-semibold mb-2">⚖️ <?php esc_html_e('Verify every powder charge', 'arms-complex'); ?></p>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Use a scale to verify charges. Check for double charges or empty cases.', 'arms-complex'); ?>
                            </p>
                        </div>
                        
                        <div class="safety-rule bg-background rounded-lg p-4">
                            <p class="font-semibold mb-2">🎯 <?php esc_html_e('Maintain focus and eliminate distractions', 'arms-complex'); ?></p>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Reloading requires concentration. Work in a clean, organized space without interruptions.', 'arms-complex'); ?>
                            </p>
                        </div>
                        
                        <div class="safety-rule bg-background rounded-lg p-4">
                            <p class="font-semibold mb-2">📝 <?php esc_html_e('Keep detailed records', 'arms-complex'); ?></p>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Document all loads including components, charges, and performance. Essential for troubleshooting and reproducing accurate loads.', 'arms-complex'); ?>
                            </p>
                        </div>
                        
                        <div class="safety-rule bg-background rounded-lg p-4">
                            <p class="font-semibold mb-2">👓 <?php esc_html_e('Wear safety glasses', 'arms-complex'); ?></p>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Protect your eyes from primers and debris during the reloading process.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <div class="cta-section bg-gradient-to-r from-tactical/10 to-tactical/5 rounded-lg p-8 text-center">
                <h2 class="text-2xl font-bold mb-4">
                    <?php esc_html_e('Ready to Start Reloading?', 'arms-complex'); ?>
                </h2>
                <p class="text-muted-foreground mb-6">
                    <?php esc_html_e('Browse our selection of reloading components and equipment', 'arms-complex'); ?>
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>" class="button">
                        <?php esc_html_e('Shop Components', 'arms-complex'); ?>
                    </a>
                    <a href="<?php echo esc_url(get_permalink(get_page_by_path('load-recipes'))); ?>" class="button-outline">
                        <?php esc_html_e('View Load Recipes', 'arms-complex'); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
