<?php
/**
 * Default Content Template Part
 * 
 * @package Arms_Complex
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('mb-8'); ?>>
    <header class="entry-header mb-4">
        <?php
        if (is_singular()) :
            the_title('<h1 class="entry-title text-4xl font-bold mb-2">', '</h1>');
        else :
            the_title('<h2 class="entry-title text-2xl font-bold mb-2"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
        endif;
        
        if ('post' === get_post_type()) :
            ?>
            <div class="entry-meta text-sm text-muted-foreground">
                <?php arms_complex_post_meta(); ?>
            </div>
        <?php endif; ?>
    </header>
    
    <?php if (has_post_thumbnail()) : ?>
        <div class="entry-thumbnail mb-4">
            <?php the_post_thumbnail('large', array('class' => 'rounded-lg w-full')); ?>
        </div>
    <?php endif; ?>
    
    <div class="entry-content prose max-w-none">
        <?php
        the_content(sprintf(
            wp_kses(
                __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'arms-complex'),
                array('span' => array('class' => array()))
            ),
            wp_kses_post(get_the_title())
        ));
        
        wp_link_pages(array(
            'before' => '<div class="page-links">' . esc_html__('Pages:', 'arms-complex'),
            'after'  => '</div>',
        ));
        ?>
    </div>
    
    <footer class="entry-footer mt-4">
        <?php
        $categories_list = get_the_category_list(esc_html__(', ', 'arms-complex'));
        if ($categories_list) {
            printf('<span class="cat-links">' . esc_html__('Posted in %1$s', 'arms-complex') . '</span>', $categories_list);
        }
        
        $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'arms-complex'));
        if ($tags_list) {
            printf('<span class="tags-links ml-4">' . esc_html__('Tagged %1$s', 'arms-complex') . '</span>', $tags_list);
        }
        ?>
    </footer>
</article>
