<?php
/**
 * Default Page Template
 * 
 * Displays standard pages
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            
            <article id="post-<?php the_ID(); ?>" <?php post_class('page-content'); ?>>
                <!-- Page Header -->
                <header class="page-header mb-8">
                    <h1 class="page-title text-4xl font-bold mb-4"><?php the_title(); ?></h1>
                    
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="page-thumbnail mb-6">
                            <?php the_post_thumbnail('large', array('class' => 'rounded-lg w-full')); ?>
                        </div>
                    <?php endif; ?>
                </header>
                
                <!-- Page Content -->
                <div class="page-content prose max-w-none">
                    <?php
                    the_content();
                    
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'arms-complex'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
                
                <?php if (comments_open() || get_comments_number()) : ?>
                    <div class="comments-section mt-12">
                        <?php comments_template(); ?>
                    </div>
                <?php endif; ?>
            </article>
            
        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
