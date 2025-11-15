<?php
/**
 * Single Post Template
 * 
 * Displays individual blog posts
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
            
            <article id="post-<?php the_ID(); ?>" <?php post_class('single-post'); ?>>
                <!-- Post Header -->
                <header class="post-header mb-8">
                    <h1 class="post-title text-4xl font-bold mb-4"><?php the_title(); ?></h1>
                    
                    <div class="post-meta flex gap-4 text-muted-foreground mb-6">
                        <span class="post-date">
                            <?php echo get_the_date(); ?>
                        </span>
                        <span class="post-author">
                            <?php esc_html_e('by', 'arms-complex'); ?> <?php the_author(); ?>
                        </span>
                        <span class="post-categories">
                            <?php the_category(', '); ?>
                        </span>
                    </div>
                    
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail mb-6">
                            <?php the_post_thumbnail('large', array('class' => 'rounded-lg w-full')); ?>
                        </div>
                    <?php endif; ?>
                </header>
                
                <!-- Post Content -->
                <div class="post-content prose max-w-none">
                    <?php
                    the_content();
                    
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'arms-complex'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
                
                <!-- Post Footer -->
                <footer class="post-footer mt-8 pt-8 border-t border-border">
                    <?php if (has_tag()) : ?>
                        <div class="post-tags mb-4">
                            <?php the_tags('<span class="tags-label">' . esc_html__('Tags:', 'arms-complex') . '</span> ', ', '); ?>
                        </div>
                    <?php endif; ?>
                    
                    <!-- Post Navigation -->
                    <div class="post-navigation grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="prev-post">
                            <?php previous_post_link('%link', '← %title'); ?>
                        </div>
                        <div class="next-post text-right">
                            <?php next_post_link('%link', '%title →'); ?>
                        </div>
                    </div>
                </footer>
                
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
