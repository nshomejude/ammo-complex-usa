<?php
/**
 * Footer Template
 * 
 * Displays the site footer
 * Converts: src/components/Footer.tsx
 * 
 * @package Arms_Complex
 */
?>

<footer class="site-footer bg-card border-t border-border mt-16">
    <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php if (is_active_sidebar('footer-1')) : ?>
                <div class="footer-widget">
                    <?php dynamic_sidebar('footer-1'); ?>
                </div>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-2')) : ?>
                <div class="footer-widget">
                    <?php dynamic_sidebar('footer-2'); ?>
                </div>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-3')) : ?>
                <div class="footer-widget">
                    <?php dynamic_sidebar('footer-3'); ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="footer-bottom text-center mt-8 pt-8 border-t border-border">
            <p class="text-muted-foreground">
                &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. 
                Developed by <a href="https://opesware.com" class="text-tactical">J.Nshome</a>
            </p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
