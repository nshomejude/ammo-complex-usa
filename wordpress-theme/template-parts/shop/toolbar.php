<?php
/**
 * Shop Toolbar Template Part
 * 
 * Custom search and filter bar for shop page
 * 
 * @package Arms_Complex
 */

$current_category = get_queried_object();
$is_category = is_tax('product_cat');
?>

<div class="bg-card border border-border rounded-lg p-4 mb-6">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search Form -->
        <div class="w-full md:w-auto md:flex-1 max-w-md">
            <form role="search" method="get" class="relative" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" 
                       name="s" 
                       placeholder="<?php esc_attr_e('Search products...', 'arms-complex'); ?>"
                       value="<?php echo get_search_query(); ?>"
                       class="input w-full pr-12">
                <input type="hidden" name="post_type" value="product">
                <button type="submit" 
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </form>
        </div>
        
        <!-- Filter Buttons -->
        <div class="flex flex-wrap gap-2">
            <?php if ($is_category) : ?>
                <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" 
                   class="button button-outline button-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <?php esc_html_e('Clear Category', 'arms-complex'); ?>
                </a>
            <?php endif; ?>
            
            <!-- Price Filter Toggle -->
            <button type="button" 
                    class="button button-outline button-sm"
                    onclick="togglePriceFilter()">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                </svg>
                <?php esc_html_e('Price Filter', 'arms-complex'); ?>
            </button>
            
            <!-- View Toggle -->
            <div class="flex border border-border rounded-lg overflow-hidden">
                <button type="button" 
                        class="px-3 py-2 hover:bg-accent transition-colors view-toggle active"
                        data-view="grid"
                        onclick="toggleView('grid')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                </button>
                <button type="button" 
                        class="px-3 py-2 hover:bg-accent transition-colors view-toggle"
                        data-view="list"
                        onclick="toggleView('list')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
    <!-- Price Filter Panel (Hidden by default) -->
    <div id="price-filter-panel" class="mt-4 pt-4 border-t border-border hidden">
        <?php
        if (class_exists('WC_Widget_Price_Filter')) {
            the_widget('WC_Widget_Price_Filter');
        }
        ?>
    </div>
</div>

<script>
function togglePriceFilter() {
    const panel = document.getElementById('price-filter-panel');
    panel.classList.toggle('hidden');
}

function toggleView(view) {
    const buttons = document.querySelectorAll('.view-toggle');
    const productList = document.querySelector('.products');
    
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    if (productList) {
        if (view === 'list') {
            productList.classList.remove('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
            productList.classList.add('grid-cols-1');
        } else {
            productList.classList.remove('grid-cols-1');
            productList.classList.add('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
        }
    }
    
    // Store preference
    localStorage.setItem('shop-view', view);
}

// Restore view preference on load
document.addEventListener('DOMContentLoaded', function() {
    const savedView = localStorage.getItem('shop-view');
    if (savedView) {
        toggleView(savedView);
    }
});
</script>

<style>
.view-toggle.active {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
}
</style>
