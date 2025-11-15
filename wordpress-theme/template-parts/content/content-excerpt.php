<?php
/**
 * Content Excerpt Template Part
 * 
 * Used in archive/blog grid layouts
 * 
 * @package Arms_Complex
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('medium', array('class' => 'w-full h-48 object-cover')); ?>
            </a>
        </div>
    <?php endif; ?>
    
    <div class="post-content p-6">
        <header class="entry-header mb-4">
            <?php the_title('<h2 class="entry-title text-xl font-bold mb-2"><a href="' . esc_url(get_permalink()) . '" class="hover:text-tactical transition-colors">', '</a></h2>'); ?>
            
            <?php if ('post' === get_post_type()) : ?>
                <div class="entry-meta text-sm text-muted-foreground">
                    <span class="post-date"><?php echo get_the_date(); ?></span>
                    <span class="mx-2">•</span>
                    <span class="post-author"><?php the_author(); ?></span>
                </div>
            <?php endif; ?>
        </header>
        
        <div class="entry-excerpt text-muted-foreground mb-4">
            <?php the_excerpt(); ?>
        </div>
        
        <a href="<?php the_permalink(); ?>" class="read-more inline-flex items-center text-tactical hover:underline font-semibold">
            <?php esc_html_e('Read More', 'arms-complex'); ?>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </a>
    </div>
</article>
