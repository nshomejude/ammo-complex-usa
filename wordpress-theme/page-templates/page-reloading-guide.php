<?php
/**
 * Template Name: Reloading Guide
 * 
 * Comprehensive guide to ammunition reloading covering safety,
 * equipment, and step-by-step process.
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main reloading-guide-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <div class="mb-12 text-center space-y-4">
            <div class="flex justify-center mb-4">
                <div class="rounded-full bg-tactical/10 p-4">
                    <svg class="h-12 w-12 text-tactical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </div>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold">
                <?php esc_html_e('Ammunition Reloading Guide', 'arms-complex'); ?>
            </h1>
            
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Complete guide to reloading ammunition safely and accurately. Learn the equipment, process, and best practices.', 'arms-complex'); ?>
            </p>

            <div class="flex flex-wrap justify-center gap-4 pt-4">
                <span class="badge badge-primary"><?php esc_html_e('Safety First', 'arms-complex'); ?></span>
                <span class="badge badge-primary"><?php esc_html_e('Step-by-Step', 'arms-complex'); ?></span>
                <span class="badge badge-primary"><?php esc_html_e('Expert Tips', 'arms-complex'); ?></span>
            </div>
        </div>

        <!-- Critical Safety Alert -->
        <div class="mb-12 bg-destructive/10 border-2 border-destructive rounded-lg p-6">
            <div class="flex items-start gap-4">
                <svg class="w-8 h-8 text-destructive flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div>
                    <h3 class="text-xl font-bold text-destructive mb-2">
                        <?php esc_html_e('Critical Safety Information', 'arms-complex'); ?>
                    </h3>
                    <p class="text-foreground mb-4">
                        <?php esc_html_e('Reloading ammunition involves working with explosive components and can be dangerous if done improperly. Always:', 'arms-complex'); ?>
                    </p>
                    <ul class="space-y-2">
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span><?php esc_html_e('Consult multiple reloading manuals before starting', 'arms-complex'); ?></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span><?php esc_html_e('Start at minimum loads and work up slowly', 'arms-complex'); ?></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span><?php esc_html_e('Never exceed maximum published loads', 'arms-complex'); ?></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span><?php esc_html_e('Wear safety glasses and work in a dedicated space', 'arms-complex'); ?></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Essential Equipment -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 text-center">
                <?php esc_html_e('Essential Reloading Equipment', 'arms-complex'); ?>
            </h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Reloading Press -->
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Reloading Press', 'arms-complex'); ?></h3>
                    <p class="text-muted-foreground mb-3">
                        <?php esc_html_e('Single-stage or progressive press for resizing cases and seating bullets', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm text-muted-foreground">
                        <strong><?php esc_html_e('Examples:', 'arms-complex'); ?></strong>
                        <?php esc_html_e('RCBS Rock Chucker, Dillon XL750, Lee Classic Cast', 'arms-complex'); ?>
                    </p>
                </div>

                <!-- Powder Scale -->
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Powder Scale', 'arms-complex'); ?></h3>
                    <p class="text-muted-foreground mb-3">
                        <?php esc_html_e('Digital or balance beam scale for precise powder measurement', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm text-muted-foreground">
                        <strong><?php esc_html_e('Examples:', 'arms-complex'); ?></strong>
                        <?php esc_html_e('RCBS ChargeMaster, Frankford Arsenal Intellidropper', 'arms-complex'); ?>
                    </p>
                </div>

                <!-- Calipers -->
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Calipers', 'arms-complex'); ?></h3>
                    <p class="text-muted-foreground mb-3">
                        <?php esc_html_e('Digital or dial calipers for measuring case length and overall length', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm text-muted-foreground">
                        <strong><?php esc_html_e('Examples:', 'arms-complex'); ?></strong>
                        <?php esc_html_e('Mitutoyo Digital, Hornady Digital, Starrett', 'arms-complex'); ?>
                    </p>
                </div>

                <!-- Case Tumbler -->
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Case Tumbler', 'arms-complex'); ?></h3>
                    <p class="text-muted-foreground mb-3">
                        <?php esc_html_e('For cleaning brass cases before reloading', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm text-muted-foreground">
                        <strong><?php esc_html_e('Examples:', 'arms-complex'); ?></strong>
                        <?php esc_html_e('Frankford Arsenal rotary, ultrasonic cleaners', 'arms-complex'); ?>
                    </p>
                </div>

                <!-- Dies Set -->
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Dies Set', 'arms-complex'); ?></h3>
                    <p class="text-muted-foreground mb-3">
                        <?php esc_html_e('Caliber-specific sizing, decapping, and seating dies', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm text-muted-foreground">
                        <strong><?php esc_html_e('Examples:', 'arms-complex'); ?></strong>
                        <?php esc_html_e('Redding, RCBS, Lee, Hornady die sets', 'arms-complex'); ?>
                    </p>
                </div>

                <!-- Case Gauge -->
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Case Gauge', 'arms-complex'); ?></h3>
                    <p class="text-muted-foreground mb-3">
                        <?php esc_html_e('Ensures proper case dimensions and headspace', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm text-muted-foreground">
                        <strong><?php esc_html_e('Examples:', 'arms-complex'); ?></strong>
                        <?php esc_html_e('Wilson case gauges, L.E. Wilson', 'arms-complex'); ?>
                    </p>
                </div>
            </div>
        </section>

        <!-- Safety Rules -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 text-center">
                <?php esc_html_e('Top 10 Safety Rules', 'arms-complex'); ?>
            </h2>
            
            <div class="bg-card rounded-lg border border-border p-8 max-w-4xl mx-auto">
                <ol class="space-y-4">
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                        <p><?php esc_html_e('Always wear safety glasses and follow manufacturer\'s load data exactly', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                        <p><?php esc_html_e('Work in a well-ventilated, organized area free from distractions', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                        <p><?php esc_html_e('Never exceed maximum published loads - start 10% below max', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</span>
                        <p><?php esc_html_e('Use only one powder type at a time and clearly label containers', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</span>
                        <p><?php esc_html_e('Inspect every case for cracks, splits, or defects before loading', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">6</span>
                        <p><?php esc_html_e('Double-check powder charges - never rely on volume alone', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">7</span>
                        <p><?php esc_html_e('Keep detailed records of all loads including date, components, and results', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">8</span>
                        <p><?php esc_html_e('Store primers and powder separately in approved containers', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">9</span>
                        <p><?php esc_html_e('Never smoke or use open flames near reloading components', 'arms-complex'); ?></p>
                    </li>
                    <li class="flex items-start gap-4">
                        <span class="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">10</span>
                        <p><?php esc_html_e('Test fire new loads at reduced velocity first before full-power loads', 'arms-complex'); ?></p>
                    </li>
                </ol>
            </div>
        </section>

        <!-- Reloading Process Steps -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 text-center">
                <?php esc_html_e('Step-by-Step Reloading Process', 'arms-complex'); ?>
            </h2>
            
            <div class="space-y-6 max-w-4xl mx-auto">
                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Case Inspection & Cleaning', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Inspect all cases for cracks, splits, or damage. Clean cases using a tumbler or ultrasonic cleaner.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Lubrication & Sizing', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Lubricate cases and run through sizing die to restore proper dimensions. Deprime spent primers.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Case Trimming & Chamfering', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Measure and trim cases to proper length. Chamfer and deburr case mouths for smooth bullet seating.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">4</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Priming', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Seat new primers using a priming tool. Ensure primers are flush or slightly below case head.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">5</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Powder Charging', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Carefully measure and dispense powder charges. Double-check each charge with a scale.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">6</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Bullet Seating', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Seat bullets to proper overall length (COAL). Ensure consistent seating depth.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">7</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Crimping (Optional)', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Apply crimp if needed for semi-auto or heavy recoil loads. Check case mouth appearance.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>

                <div class="bg-card rounded-lg border border-border p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">8</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2"><?php esc_html_e('Final Inspection & Testing', 'arms-complex'); ?></h3>
                            <p class="text-muted-foreground"><?php esc_html_e('Inspect completed rounds. Use case gauge to verify dimensions. Test fire at reduced loads first.', 'arms-complex'); ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="text-center py-12 bg-primary/5 rounded-lg">
            <h2 class="text-3xl font-bold mb-4">
                <?php esc_html_e('Ready to Start Reloading?', 'arms-complex'); ?>
            </h2>
            <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                <?php esc_html_e('Shop our complete selection of reloading equipment, components, and supplies.', 'arms-complex'); ?>
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="button button-primary">
                    <?php esc_html_e('Shop Reloading Supplies', 'arms-complex'); ?>
                </a>
                <a href="<?php echo esc_url(home_url('/load-recipes/')); ?>" class="button button-outline">
                    <?php esc_html_e('View Load Recipes', 'arms-complex'); ?>
                </a>
            </div>
        </section>
    </div>
</main>

<?php
get_footer();
