<?php
/**
 * Template Name: How to Buy
 * 
 * Converts: src/pages/HowToBuy.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main how-to-buy-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="page-header text-center mb-12">
            <h1 class="text-5xl font-bold mb-4">
                <?php esc_html_e('How to Buy', 'arms-complex'); ?>
            </h1>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Your complete guide to purchasing firearms and ammunition safely and legally.', 'arms-complex'); ?>
            </p>
        </div>

        <div class="content max-w-4xl mx-auto space-y-12">
            
            <!-- Buying Process -->
            <section class="buying-process">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    <?php esc_html_e('The Purchase Process', 'arms-complex'); ?>
                </h2>
                
                <div class="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <?php
                    $steps = array(
                        array(
                            'number' => '1',
                            'icon' => '🔍',
                            'title' => 'Browse & Select',
                            'description' => 'Explore our extensive catalog and find the perfect firearm or ammunition for your needs.',
                        ),
                        array(
                            'number' => '2',
                            'icon' => '🛒',
                            'title' => 'Add to Cart',
                            'description' => 'Add your selected items to cart and proceed to secure checkout.',
                        ),
                        array(
                            'number' => '3',
                            'icon' => '📋',
                            'title' => 'Complete Forms',
                            'description' => 'Fill out required federal and state forms for firearm purchases.',
                        ),
                        array(
                            'number' => '4',
                            'icon' => '📦',
                            'title' => 'Receive & Enjoy',
                            'description' => 'Pick up at your local FFL or receive ammunition shipment.',
                        ),
                    );
                    
                    foreach ($steps as $step) :
                    ?>
                        <div class="step-card bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <div class="step-number text-4xl mb-3"><?php echo esc_html($step['icon']); ?></div>
                            <div class="step-badge bg-tactical text-tactical-foreground rounded-full w-8 h-8 mx-auto mb-3 flex items-center justify-center font-bold">
                                <?php echo esc_html($step['number']); ?>
                            </div>
                            <h3 class="font-bold mb-2"><?php echo esc_html($step['title']); ?></h3>
                            <p class="text-sm text-muted-foreground"><?php echo esc_html($step['description']); ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Requirements -->
            <section class="requirements bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Purchase Requirements', 'arms-complex'); ?>
                </h2>
                
                <div class="tabs mb-6">
                    <div class="tab-buttons flex gap-2 border-b border-border">
                        <button class="tab-btn active px-4 py-2 font-semibold border-b-2 border-tactical" data-tab="firearms">
                            <?php esc_html_e('Firearms', 'arms-complex'); ?>
                        </button>
                        <button class="tab-btn px-4 py-2 font-semibold border-b-2 border-transparent hover:border-muted" data-tab="ammunition">
                            <?php esc_html_e('Ammunition', 'arms-complex'); ?>
                        </button>
                    </div>
                </div>

                <!-- Firearms Tab -->
                <div id="firearms-tab" class="tab-content">
                    <div class="space-y-4">
                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">🎂 <?php esc_html_e('Age Requirements', 'arms-complex'); ?></h3>
                            <ul class="text-sm text-muted-foreground space-y-1 ml-6">
                                <li>• <?php esc_html_e('21+ years old for handguns', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('18+ years old for rifles and shotguns', 'arms-complex'); ?></li>
                            </ul>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">🪪 <?php esc_html_e('Valid ID Required', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Government-issued photo ID with current address (Driver\'s License, State ID, Passport)', 'arms-complex'); ?>
                            </p>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">✅ <?php esc_html_e('Background Check', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('All firearm purchases require a federal background check (NICS) through ATF Form 4473. Some states have additional requirements.', 'arms-complex'); ?>
                            </p>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">🏛️ <?php esc_html_e('State Residency', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Handguns must be purchased in your state of residence. Long guns can be purchased in any state, subject to both states\' laws.', 'arms-complex'); ?>
                            </p>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">📝 <?php esc_html_e('Eligibility', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground mb-2">
                                <?php esc_html_e('You must not be prohibited from possessing firearms under federal or state law. This includes:', 'arms-complex'); ?>
                            </p>
                            <ul class="text-sm text-muted-foreground space-y-1 ml-6">
                                <li>• <?php esc_html_e('No felony convictions', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('No domestic violence convictions', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('No restraining orders for domestic violence', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('Not adjudicated mentally defective', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('Not an unlawful user of controlled substances', 'arms-complex'); ?></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Ammunition Tab -->
                <div id="ammunition-tab" class="tab-content hidden">
                    <div class="space-y-4">
                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">🎂 <?php esc_html_e('Age Requirements', 'arms-complex'); ?></h3>
                            <ul class="text-sm text-muted-foreground space-y-1 ml-6">
                                <li>• <?php esc_html_e('21+ years old for handgun ammunition', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('18+ years old for rifle/shotgun ammunition', 'arms-complex'); ?></li>
                            </ul>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">🪪 <?php esc_html_e('ID Verification', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Valid government-issued photo ID required to verify age and identity.', 'arms-complex'); ?>
                            </p>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">📦 <?php esc_html_e('Shipping', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Ammunition can be shipped directly to your address in most states. Some states have additional restrictions or prohibitions.', 'arms-complex'); ?>
                            </p>
                        </div>

                        <div class="requirement-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">⚠️ <?php esc_html_e('State Restrictions', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground mb-2">
                                <?php esc_html_e('Some states have additional requirements:', 'arms-complex'); ?>
                            </p>
                            <ul class="text-sm text-muted-foreground space-y-1 ml-6">
                                <li>• <?php esc_html_e('California: Requires FFL transfer or ammunition vendor license', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('New York: Must possess a firearms license', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('Illinois: Requires FOID card', 'arms-complex'); ?></li>
                                <li>• <?php esc_html_e('Massachusetts: Requires FID or LTC', 'arms-complex'); ?></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FFL Transfer Process -->
            <section class="ffl-transfer bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('FFL Transfer Process', 'arms-complex'); ?>
                </h2>
                
                <p class="text-muted-foreground mb-6">
                    <?php esc_html_e('When purchasing firearms online, they must be shipped to a Federal Firearms License (FFL) holder in your state for transfer.', 'arms-complex'); ?>
                </p>

                <div class="process-steps space-y-4">
                    <div class="step flex gap-4">
                        <div class="step-number flex-shrink-0 w-10 h-10 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1"><?php esc_html_e('Choose Your FFL', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Select a local FFL dealer to receive your firearm. Most gun shops offer this service for a fee ($20-50 typical).', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="step flex gap-4">
                        <div class="step-number flex-shrink-0 w-10 h-10 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1"><?php esc_html_e('Provide FFL Information', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('During checkout, provide your FFL\'s contact information. We\'ll verify their license before shipping.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="step flex gap-4">
                        <div class="step-number flex-shrink-0 w-10 h-10 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1"><?php esc_html_e('We Ship to FFL', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('After verification, we ship your firearm securely to your chosen FFL dealer.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="step flex gap-4">
                        <div class="step-number flex-shrink-0 w-10 h-10 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold">
                            4
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1"><?php esc_html_e('FFL Notifies You', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Your FFL will contact you when the firearm arrives and schedule a pickup time.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="step flex gap-4">
                        <div class="step-number flex-shrink-0 w-10 h-10 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold">
                            5
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1"><?php esc_html_e('Complete Background Check', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Visit the FFL with your valid ID. Complete Form 4473 and undergo NICS background check.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>

                    <div class="step flex gap-4">
                        <div class="step-number flex-shrink-0 w-10 h-10 bg-tactical text-tactical-foreground rounded-full flex items-center justify-center font-bold">
                            6
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1"><?php esc_html_e('Take Possession', 'arms-complex'); ?></h3>
                            <p class="text-sm text-muted-foreground">
                                <?php esc_html_e('Once approved, you can take possession of your firearm and pay any FFL transfer fees.', 'arms-complex'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Payment & Shipping -->
            <section class="payment-shipping bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Payment & Shipping', 'arms-complex'); ?>
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">💳 <?php esc_html_e('Payment Options', 'arms-complex'); ?></h3>
                        <ul class="space-y-2 text-sm text-muted-foreground">
                            <li>✓ <?php esc_html_e('Credit/Debit Cards (Visa, Mastercard, Amex, Discover)', 'arms-complex'); ?></li>
                            <li>✓ <?php esc_html_e('PayPal', 'arms-complex'); ?></li>
                            <li>✓ <?php esc_html_e('Money Orders', 'arms-complex'); ?></li>
                            <li>✓ <?php esc_html_e('Wire Transfer', 'arms-complex'); ?></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-xl font-bold mb-4">📦 <?php esc_html_e('Shipping', 'arms-complex'); ?></h3>
                        <ul class="space-y-2 text-sm text-muted-foreground">
                            <li>✓ <?php esc_html_e('Free shipping on orders over $99', 'arms-complex'); ?></li>
                            <li>✓ <?php esc_html_e('Expedited shipping available', 'arms-complex'); ?></li>
                            <li>✓ <?php esc_html_e('All firearms shipped with signature required', 'arms-complex'); ?></li>
                            <li>✓ <?php esc_html_e('Full insurance on all shipments', 'arms-complex'); ?></li>
                        </ul>
                    </div>
                </div>

                <?php
                $shipping_calc_page = get_page_by_path('shipping');
                if ($shipping_calc_page) :
                ?>
                    <div class="mt-6 text-center">
                        <a href="<?php echo esc_url(get_permalink($shipping_calc_page)); ?>" class="button">
                            <?php esc_html_e('Calculate Shipping Cost', 'arms-complex'); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </section>

            <!-- FAQs -->
            <section class="faqs bg-card border border-border rounded-lg p-8">
                <h2 class="text-3xl font-bold mb-6">
                    <?php esc_html_e('Frequently Asked Questions', 'arms-complex'); ?>
                </h2>
                
                <div class="space-y-4">
                    <?php
                    $faqs = array(
                        array(
                            'q' => 'Can I buy a firearm from another state?',
                            'a' => 'Handguns must be purchased in your state of residence and transferred through an FFL. Long guns (rifles/shotguns) can be purchased from dealers in other states if legal in both states.',
                        ),
                        array(
                            'q' => 'How long does a background check take?',
                            'a' => 'Most NICS background checks are completed within minutes. Some may be delayed for further review, which can take up to 3 business days.',
                        ),
                        array(
                            'q' => 'Can I cancel my firearm order?',
                            'a' => 'You may cancel your order before it ships. Once shipped to your FFL, you are responsible for the firearm. Contact us immediately if you need to cancel.',
                        ),
                        array(
                            'q' => 'What if I fail the background check?',
                            'a' => 'If your background check is denied, you cannot take possession of the firearm. You may appeal the denial through the FBI. We will work with you to resolve the situation.',
                        ),
                        array(
                            'q' => 'Do you ship to my state?',
                            'a' => 'We ship firearms to all states except those with complete bans. Ammunition shipping restrictions vary by state. Check our shipping policy or contact us for specific state information.',
                        ),
                    );
                    
                    foreach ($faqs as $index => $faq) :
                    ?>
                        <div class="faq-item bg-muted/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2">
                                <?php echo esc_html(($index + 1) . '. ' . $faq['q']); ?>
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                <?php echo esc_html($faq['a']); ?>
                            </p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- CTA -->
            <div class="cta-section bg-gradient-to-r from-tactical/10 to-tactical/5 rounded-lg p-8 text-center">
                <h2 class="text-2xl font-bold mb-4">
                    <?php esc_html_e('Ready to Make Your Purchase?', 'arms-complex'); ?>
                </h2>
                <p class="text-muted-foreground mb-6">
                    <?php esc_html_e('Browse our extensive selection of firearms and ammunition', 'arms-complex'); ?>
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

<script>
jQuery(document).ready(function($) {
    // Tab switching
    $('.tab-btn').on('click', function() {
        const tab = $(this).data('tab');
        
        // Update buttons
        $('.tab-btn').removeClass('active border-tactical').addClass('border-transparent');
        $(this).removeClass('border-transparent').addClass('active border-tactical');
        
        // Update content
        $('.tab-content').addClass('hidden');
        $('#' + tab + '-tab').removeClass('hidden');
    });
});
</script>

<?php
get_footer();
