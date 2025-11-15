<?php
/**
 * Template part for displaying a message when no content is found
 * 
 * @package Arms_Complex
 */
?>

<section class="no-results not-found bg-card rounded-lg p-8 text-center">
    <header class="page-header mb-6">
        <h1 class="page-title text-3xl font-bold">
            <?php esc_html_e('Nothing Found', 'arms-complex'); ?>
        </h1>
    </header>
    
    <div class="page-content">
        <?php
        if (is_home() && current_user_can('publish_posts')) :
            
            printf(
                '<p class="mb-4">' . wp_kses(
                    __('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'arms-complex'),
                    array('a' => array('href' => array()))
                ) . '</p>',
                esc_url(admin_url('post-new.php'))
            );
            
        elseif (is_search()) :
            ?>
            
            <p class="text-muted-foreground mb-6">
                <?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'arms-complex'); ?>
            </p>
            <?php
            get_search_form();
            
        else :
            ?>
            
            <p class="text-muted-foreground">
                <?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'arms-complex'); ?>
            </p>
            <?php
            get_search_form();
            
        endif;
        ?>
    </div>
</section>
