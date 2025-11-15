<?php
/**
 * Search Form Template
 * 
 * Converts: src/components/Search.tsx
 * 
 * @package Arms_Complex
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <div class="search-form-inner flex gap-2">
        <input 
            type="search" 
            class="search-field flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" 
            placeholder="<?php echo esc_attr_x('Search products...', 'placeholder', 'arms-complex'); ?>" 
            value="<?php echo get_search_query(); ?>" 
            name="s"
        />
        <button 
            type="submit" 
            class="search-submit px-6 py-2 bg-tactical text-tactical-foreground rounded-lg hover:bg-tactical-hover transition-colors font-semibold"
        >
            <?php echo esc_html_x('Search', 'submit button', 'arms-complex'); ?>
        </button>
    </div>
</form>
