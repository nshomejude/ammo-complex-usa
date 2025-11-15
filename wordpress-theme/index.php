<?php
/**
 * Main Template File
 * 
 * This is the most generic template file and is used as a fallback
 * when a more specific template is not available.
 * Converts: src/pages/Index.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <?php
        if (have_posts()) :
            
            // Start the Loop
            while (have_posts()) :
                the_post();
                
                // Include the post content template
                get_template_part('template-parts/content/content', get_post_type());
                
            endwhile;
            
            // Pagination
            the_posts_pagination(array(
                'mid_size'  => 2,
                'prev_text' => __('Previous', 'arms-complex'),
                'next_text' => __('Next', 'arms-complex'),
            ));
            
        else :
            
            // No content found
            get_template_part('template-parts/content/content', 'none');
            
        endif;
        ?>
    </div>
</main>

<?php
get_footer();
