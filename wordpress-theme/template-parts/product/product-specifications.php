<?php
/**
 * Product Specifications Template Part
 * 
 * Displays product specifications and ballistic data
 * 
 * @package Arms_Complex
 */

global $product;

if (!$product) {
    return;
}

$product_id = $product->get_id();

// Get specifications
$specs = arms_complex_get_product_specifications($product_id);
$muzzle_velocity = get_post_meta($product_id, '_muzzle_velocity', true);
$muzzle_energy = get_post_meta($product_id, '_muzzle_energy', true);
$manufacturer = get_post_meta($product_id, '_manufacturer', true);

// Get product attributes
$caliber = $product->get_attribute('pa_caliber');
$bullet_type = $product->get_attribute('pa_bullet_type');
$bullet_weight = $product->get_attribute('pa_bullet_weight');
?>

<div class="product-specifications-section mt-0">
    <?php if ($manufacturer) : ?>
        <div class="product-manufacturer mb-0">
            <span class="text-sm text-muted-foreground">
                <?php esc_html_e('Manufacturer:', 'arms-complex'); ?>
            </span>
            <span class="font-semibold ml-1"><?php echo esc_html($manufacturer); ?></span>
        </div>
    <?php endif; ?>
    
    <?php if ($caliber || $bullet_type || $bullet_weight) : ?>
        <div class="product-attributes mt-0 pt-0 border-t-0 border-border space-y-1">
            <?php if ($caliber) : ?>
                <div class="attribute-row flex justify-between">
                    <span class="text-muted-foreground"><?php esc_html_e('Caliber:', 'arms-complex'); ?></span>
                    <span class="font-semibold"><?php echo esc_html($caliber); ?></span>
                </div>
            <?php endif; ?>
            
            <?php if ($bullet_type) : ?>
                <div class="attribute-row flex justify-between">
                    <span class="text-muted-foreground"><?php esc_html_e('Bullet Type:', 'arms-complex'); ?></span>
                    <span class="font-semibold"><?php echo esc_html($bullet_type); ?></span>
                </div>
            <?php endif; ?>
            
            <?php if ($bullet_weight) : ?>
                <div class="attribute-row flex justify-between">
                    <span class="text-muted-foreground"><?php esc_html_e('Bullet Weight:', 'arms-complex'); ?></span>
                    <span class="font-semibold"><?php echo esc_html($bullet_weight); ?></span>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    
    <?php if ($muzzle_velocity || $muzzle_energy) : ?>
        <div class="ballistic-data mt-0 pt-0 border-t-0 border-border">
            <h3 class="text-base font-semibold mb-1"><?php esc_html_e('Ballistic Performance', 'arms-complex'); ?></h3>
            <div class="grid grid-cols-2 gap-2">
                <?php if ($muzzle_velocity) : ?>
                    <div>
                        <span class="text-xs text-muted-foreground block"><?php esc_html_e('Muzzle Velocity', 'arms-complex'); ?></span>
                        <span class="text-lg font-bold text-tactical"><?php echo esc_html($muzzle_velocity); ?> fps</span>
                    </div>
                <?php endif; ?>
                
                <?php if ($muzzle_energy) : ?>
                    <div>
                        <span class="text-xs text-muted-foreground block"><?php esc_html_e('Muzzle Energy', 'arms-complex'); ?></span>
                        <span class="text-lg font-bold text-tactical"><?php echo esc_html($muzzle_energy); ?> ft-lbs</span>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>
    
    <?php if (!empty($specs)) : ?>
        <div class="additional-specs mt-0 pt-0 border-t-0 border-border">
            <h3 class="text-base font-semibold mb-1"><?php esc_html_e('Additional Specifications', 'arms-complex'); ?></h3>
            <dl class="space-y-1">
                <?php foreach ($specs as $key => $value) : ?>
                    <div class="flex justify-between">
                        <dt class="text-muted-foreground"><?php echo esc_html(ucfirst(str_replace('_', ' ', $key))); ?>:</dt>
                        <dd class="font-semibold">
                            <?php
                            if (is_array($value)) {
                                echo esc_html(implode(', ', $value));
                            } else {
                                echo esc_html($value);
                            }
                            ?>
                        </dd>
                    </div>
                <?php endforeach; ?>
            </dl>
        </div>
    <?php endif; ?>
</div>
