<?php
/**
 * Template Name: Firearms License Info
 * 
 * Converts: src/pages/FirearmsLicense.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main firearms-license-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="page-header text-center mb-12">
            <h1 class="text-5xl font-bold mb-4">
                <?php esc_html_e('Firearms License Information', 'arms-complex'); ?>
            </h1>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Everything you need to know about obtaining and maintaining your firearms license.', 'arms-complex'); ?>
            </p>
        </div>

        <div class="content max-w-4xl mx-auto space-y-8">
            <!-- Introduction -->
            <div class="intro-section bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-4">
                    <?php esc_html_e('Federal Firearms License (FFL)', 'arms-complex'); ?>
                </h2>
                <p class="text-muted-foreground mb-4">
                    <?php esc_html_e('A Federal Firearms License (FFL) is required for anyone engaging in the business of manufacturing, importing, or dealing in firearms or ammunition. This guide covers the types of licenses, requirements, and application process.', 'arms-complex'); ?>
                </p>
                
                <div class="bg-tactical/10 border border-tactical rounded-lg p-4 mt-6">
                    <p class="font-semibold text-tactical mb-2">
                        ℹ️ <?php esc_html_e('Important Note', 'arms-complex'); ?>
                    </p>
                    <p class="text-sm">
                        <?php esc_html_e('This information is for educational purposes only. Always consult with the ATF and legal counsel for specific guidance regarding firearms licenses.', 'arms-complex'); ?>
                    </p>
                </div>
            </div>

            <!-- License Types -->
            <div class="license-types bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Types of Federal Firearms Licenses', 'arms-complex'); ?>
                </h2>
                
                <div class="space-y-6">
                    <!-- Type 01 -->
                    <div class="license-type bg-muted/30 rounded-lg p-6">
                        <div class="flex items-start gap-4">
                            <div class="license-badge bg-tactical text-tactical-foreground rounded-lg px-4 py-2 font-bold text-xl">
                                01
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold mb-2">
                                    <?php esc_html_e('Type 01 - Dealer in Firearms', 'arms-complex'); ?>
                                </h3>
                                <p class="text-muted-foreground mb-3">
                                    <?php esc_html_e('Allows dealing in firearms other than destructive devices. This is the most common FFL type for gun shops and online retailers.', 'arms-complex'); ?>
                                </p>
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li><?php esc_html_e('Can buy, sell, and transfer firearms', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Can perform background checks', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('3-year license term', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Fee: $200 for 3 years (Renewal: $90)', 'arms-complex'); ?></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Type 02 -->
                    <div class="license-type bg-muted/30 rounded-lg p-6">
                        <div class="flex items-start gap-4">
                            <div class="license-badge bg-tactical text-tactical-foreground rounded-lg px-4 py-2 font-bold text-xl">
                                02
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold mb-2">
                                    <?php esc_html_e('Type 02 - Pawnbroker in Firearms', 'arms-complex'); ?>
                                </h3>
                                <p class="text-muted-foreground mb-3">
                                    <?php esc_html_e('For pawnbrokers who deal in firearms as part of their business.', 'arms-complex'); ?>
                                </p>
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li><?php esc_html_e('Can accept firearms as collateral', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Can buy and sell firearms', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Fee: $200 for 3 years (Renewal: $90)', 'arms-complex'); ?></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Type 03 -->
                    <div class="license-type bg-muted/30 rounded-lg p-6">
                        <div class="flex items-start gap-4">
                            <div class="license-badge bg-tactical text-tactical-foreground rounded-lg px-4 py-2 font-bold text-xl">
                                03
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold mb-2">
                                    <?php esc_html_e('Type 03 - Collector of Curios & Relics', 'arms-complex'); ?>
                                </h3>
                                <p class="text-muted-foreground mb-3">
                                    <?php esc_html_e('For individuals collecting firearms that are curios or relics (generally 50+ years old or certified by ATF).', 'arms-complex'); ?>
                                </p>
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li><?php esc_html_e('Can purchase C&R firearms across state lines', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Cannot deal in firearms commercially', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Fee: $30 for 3 years (Renewal: $30)', 'arms-complex'); ?></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Type 07 -->
                    <div class="license-type bg-muted/30 rounded-lg p-6">
                        <div class="flex items-start gap-4">
                            <div class="license-badge bg-tactical text-tactical-foreground rounded-lg px-4 py-2 font-bold text-xl">
                                07
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold mb-2">
                                    <?php esc_html_e('Type 07 - Manufacturer of Firearms', 'arms-complex'); ?>
                                </h3>
                                <p class="text-muted-foreground mb-3">
                                    <?php esc_html_e('For those manufacturing firearms, ammunition, or ammunition components.', 'arms-complex'); ?>
                                </p>
                                <ul class="list-disc list-inside space-y-1 text-sm">
                                    <li><?php esc_html_e('Can manufacture firearms and ammunition', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Can deal in manufactured products', 'arms-complex'); ?></li>
                                    <li><?php esc_html_e('Fee: $150 for 3 years (Renewal: $150)', 'arms-complex'); ?></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Requirements -->
            <div class="requirements bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Requirements for Obtaining an FFL', 'arms-complex'); ?>
                </h2>
                
                <div class="requirements-list space-y-4">
                    <div class="requirement-item flex gap-4">
                        <div class="requirement-icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Age Requirement', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Must be at least 21 years old (18 for Type 03 C&R license)', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="requirement-item flex gap-4">
                        <div class="requirement-icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Legal Eligibility', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Not prohibited from possessing, shipping, transporting, or receiving firearms or ammunition under federal law', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="requirement-item flex gap-4">
                        <div class="requirement-icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Business Location', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Have a business premises (can be home-based in many cases, subject to local zoning)', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="requirement-item flex gap-4">
                        <div class="requirement-icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Business Intent', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Intend to engage in firearms business (not required for Type 03)', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="requirement-item flex gap-4">
                        <div class="requirement-icon flex-shrink-0 w-10 h-10 bg-tactical/20 rounded-full flex items-center justify-center text-tactical font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                <?php esc_html_e('Compliance with Laws', 'arms-complex'); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Comply with all applicable State and local laws', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Application Process -->
            <div class="application-process bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Application Process', 'arms-complex'); ?>
                </h2>
                
                <div class="steps space-y-6">
                    <?php
                    $steps = array(
                        array(
                            'number' => '1',
                            'title' => 'Complete ATF Form 7',
                            'description' => 'Fill out the Application for Federal Firearms License (ATF Form 7) or Form 7CR for C&R license. Available online through the ATF eForms system.',
                        ),
                        array(
                            'number' => '2',
                            'title' => 'Submit Fingerprints & Photo',
                            'description' => 'Provide two fingerprint cards (Form FD-258) and two 2x2 inch photographs taken within the past year.',
                        ),
                        array(
                            'number' => '3',
                            'title' => 'Pay Application Fee',
                            'description' => 'Submit the appropriate fee based on license type. Fees range from $30 to $200 for initial applications.',
                        ),
                        array(
                            'number' => '4',
                            'title' => 'Background Check',
                            'description' => 'ATF will conduct a background investigation including criminal history check and verification of business premises.',
                        ),
                        array(
                            'number' => '5',
                            'title' => 'Premises Inspection',
                            'description' => 'An ATF Industry Operations Investigator may visit your premises to verify location and compliance with storage requirements.',
                        ),
                        array(
                            'number' => '6',
                            'title' => 'Receive License',
                            'description' => 'If approved, you will receive your FFL. Processing time typically 60-90 days but can vary.',
                        ),
                    );
                    
                    foreach ($steps as $step) :
                    ?>
                        <div class="step flex gap-4">
                            <div class="step-number flex-shrink-0 w-12 h-12 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                <?php echo esc_html($step['number']); ?>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold mb-2">
                                    <?php echo esc_html($step['title']); ?>
                                </h3>
                                <p class="text-muted-foreground">
                                    <?php echo esc_html($step['description']); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Responsibilities -->
            <div class="responsibilities bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('FFL Holder Responsibilities', 'arms-complex'); ?>
                </h2>
                
                <div class="bg-muted/30 rounded-lg p-6 space-y-4">
                    <div class="responsibility">
                        <h3 class="font-semibold mb-2">📝 <?php esc_html_e('Record Keeping', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('Maintain detailed records of all firearms transactions in an Acquisition and Disposition (A&D) book. Records must be kept for 20 years after discontinuing business.', 'arms-complex'); ?>
                        </p>
                    </div>

                    <div class="responsibility">
                        <h3 class="font-semibold mb-2">🔍 <?php esc_html_e('Background Checks', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('Conduct NICS background checks for all firearm transfers to non-licensees using Form 4473.', 'arms-complex'); ?>
                        </p>
                    </div>

                    <div class="responsibility">
                        <h3 class="font-semibold mb-2">📋 <?php esc_html_e('Inventory & Reporting', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('Conduct annual inventory and report multiple handgun sales and theft/loss of firearms to ATF.', 'arms-complex'); ?>
                        </p>
                    </div>

                    <div class="responsibility">
                        <h3 class="font-semibold mb-2">🏛️ <?php esc_html_e('Compliance', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('Comply with all federal, state, and local laws. Allow ATF compliance inspections during business hours.', 'arms-complex'); ?>
                        </p>
                    </div>

                    <div class="responsibility">
                        <h3 class="font-semibold mb-2">🔄 <?php esc_html_e('License Renewal', 'arms-complex'); ?></h3>
                        <p class="text-sm text-muted-foreground">
                            <?php esc_html_e('Renew license before expiration (every 3 years). ATF will send renewal notice 90 days before expiration.', 'arms-complex'); ?>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Resources -->
            <div class="resources bg-gradient-to-r from-tactical/10 to-tactical/5 rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">
                    <?php esc_html_e('Additional Resources', 'arms-complex'); ?>
                </h2>
                
                <div class="space-y-3">
                    <a href="https://www.atf.gov/firearms/apply-license" target="_blank" rel="noopener" class="block text-tactical hover:underline">
                        📄 <?php esc_html_e('ATF - Apply for a Federal Firearms License', 'arms-complex'); ?>
                    </a>
                    <a href="https://www.atf.gov/firearms/docs/guide/federal-firearms-licensee-quick-reference-and-best-practices-guide" target="_blank" rel="noopener" class="block text-tactical hover:underline">
                        📖 <?php esc_html_e('FFL Quick Reference Guide', 'arms-complex'); ?>
                    </a>
                    <a href="https://www.atf.gov/rules-and-regulations/firearms" target="_blank" rel="noopener" class="block text-tactical hover:underline">
                        ⚖️ <?php esc_html_e('Federal Firearms Regulations', 'arms-complex'); ?>
                    </a>
                </div>

                <div class="mt-6 bg-background rounded-lg p-4">
                    <p class="text-sm text-muted-foreground">
                        <?php esc_html_e('For specific questions about your situation, consult with the ATF or a qualified attorney specializing in firearms law.', 'arms-complex'); ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
