<?php
/**
 * Search Results Template
 * 
 * Displays search results
 * Converts: src/pages/SearchResults.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <!-- Search Header -->
        <header class="search-header mb-12">
            <h1 class="search-title text-4xl font-bold mb-4">
                <?php
                printf(
                    esc_html__('Search Results for: %s', 'arms-complex'),
                    '<span class="text-tactical">' . get_search_query() . '</span>'
                );
                ?>
            </h1>
            
            <?php if (have_posts()) : ?>
                <p class="search-count text-muted-foreground">
                    <?php
                    printf(
                        esc_html(_n('Found %s result', 'Found %s results', $wp_query->found_posts, 'arms-complex')),
                        '<strong>' . number_format_i18n($wp_query->found_posts) . '</strong>'
                    );
                    ?>
                </p>
            <?php endif; ?>
            
            <!-- Search Form -->
            <div class="search-form-wrapper mt-6">
                <?php get_search_form(); ?>
            </div>
        </header>
        
        <?php if (have_posts()) : ?>
            <div class="search-results">
                <?php
                while (have_posts()) :
                    the_post();
                    
                    // Check post type and load appropriate template
                    if (get_post_type() === 'product') {
                        wc_get_template_part('content', 'product');
                    } else {
                        get_template_part('template-parts/content/content', 'search');
                    }
                    
                endwhile;
                ?>
            </div>
            
            <!-- Pagination -->
            <div class="pagination mt-12">
                <?php
                the_posts_pagination(array(
                    'mid_size'  => 2,
                    'prev_text' => __('← Previous', 'arms-complex'),
                    'next_text' => __('Next →', 'arms-complex'),
                ));
                ?>
            </div>
            
        <?php else : ?>
            <div class="no-results bg-card rounded-lg p-8 text-center">
                <h2 class="text-2xl font-bold mb-4">
                    <?php esc_html_e('Nothing Found', 'arms-complex'); ?>
                </h2>
                <p class="text-muted-foreground mb-6">
                    <?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with different keywords.', 'arms-complex'); ?>
                </p>
                <?php get_search_form(); ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
