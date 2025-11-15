<?php
/**
 * Sidebar Template
 * 
 * @package Arms_Complex
 */

if (!is_active_sidebar('shop-sidebar')) {
    return;
}
?>

<aside id="secondary" class="widget-area shop-sidebar bg-card border border-border rounded-lg p-6">
    <?php dynamic_sidebar('shop-sidebar'); ?>
</aside>
