<?php
/**
 * Archive Template
 * 
 * Displays archive pages for categories, tags, authors, dates
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <!-- Archive Header -->
        <header class="archive-header mb-12 text-center">
            <?php
            the_archive_title('<h1 class="archive-title text-4xl font-bold mb-4">', '</h1>');
            the_archive_description('<div class="archive-description text-muted-foreground text-lg">', '</div>');
            ?>
        </header>
        
        <?php if (have_posts()) : ?>
            <div class="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php
                while (have_posts()) :
                    the_post();
                    get_template_part('template-parts/content/content', 'excerpt');
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
            <?php get_template_part('template-parts/content/content', 'none'); ?>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
