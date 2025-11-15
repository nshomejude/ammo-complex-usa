<?php
/**
 * Comments Template
 * 
 * @package Arms_Complex
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php if (have_comments()) : ?>
        <h2 class="comments-title text-2xl font-bold mb-6">
            <?php
            $comments_number = get_comments_number();
            if ('1' === $comments_number) {
                printf(esc_html__('One comment', 'arms-complex'));
            } else {
                printf(
                    esc_html(_nx('%1$s comment', '%1$s comments', $comments_number, 'comments title', 'arms-complex')),
                    number_format_i18n($comments_number)
                );
            }
            ?>
        </h2>
        
        <ol class="comment-list space-y-4">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 60,
            ));
            ?>
        </ol>
        
        <?php
        the_comments_navigation();
        
        if (!comments_open()) :
            ?>
            <p class="no-comments text-muted-foreground">
                <?php esc_html_e('Comments are closed.', 'arms-complex'); ?>
            </p>
        <?php endif; ?>
        
    <?php endif; ?>
    
    <?php
    comment_form(array(
        'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title text-2xl font-bold mb-4">',
        'title_reply_after'  => '</h3>',
    ));
    ?>
</div>
