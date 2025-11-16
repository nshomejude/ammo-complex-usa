<?php
/**
 * Template Name: Load Recipes
 * 
 * Template for managing and viewing ammunition load recipes.
 * Users can create, edit, and share their custom load data.
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main load-recipes-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="mb-12 text-center space-y-4">
            <div class="flex justify-center mb-4">
                <div class="rounded-full bg-tactical/10 p-4">
                    <svg class="h-12 w-12 text-tactical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                </div>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold">
                <?php esc_html_e('Load Recipes', 'arms-complex'); ?>
            </h1>
            
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Create, manage, and share your custom ammunition load recipes. Keep detailed records of your handloads for consistency and safety.', 'arms-complex'); ?>
            </p>
        </div>

        <?php if (is_user_logged_in()) : ?>
            <!-- Add New Recipe Button -->
            <div class="mb-8 flex justify-between items-center">
                <div class="flex-1 max-w-md">
                    <input type="text" 
                           id="recipe-search" 
                           placeholder="<?php esc_attr_e('Search recipes...', 'arms-complex'); ?>"
                           class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <button id="add-recipe-btn" class="button button-primary ml-4">
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <?php esc_html_e('Add Recipe', 'arms-complex'); ?>
                </button>
            </div>

            <!-- Recipes Grid -->
            <div id="recipes-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Recipes will be loaded here via AJAX -->
                <div class="col-span-full text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p class="mt-4 text-muted-foreground"><?php esc_html_e('Loading recipes...', 'arms-complex'); ?></p>
                </div>
            </div>

            <!-- Add/Edit Recipe Modal -->
            <div id="recipe-modal" class="modal hidden">
                <div class="modal-overlay"></div>
                <div class="modal-content max-w-2xl">
                    <div class="modal-header">
                        <h3 class="text-2xl font-bold" id="modal-title">
                            <?php esc_html_e('Add New Recipe', 'arms-complex'); ?>
                        </h3>
                        <button class="modal-close" aria-label="<?php esc_attr_e('Close', 'arms-complex'); ?>">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <form id="recipe-form" class="space-y-6">
                        <input type="hidden" id="recipe-id" name="recipe_id">
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Recipe Name', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="name" id="recipe-name" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Caliber', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="caliber" id="recipe-caliber" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Bullet Weight (grains)', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="bullet_weight" id="bullet-weight" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Bullet Type', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="bullet_type" id="bullet-type" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Powder Type', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="powder_type" id="powder-type" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Powder Charge (grains)', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="powder_charge" id="powder-charge" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Primer', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="primer" id="recipe-primer" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Brass', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="brass" id="recipe-brass" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                        </div>

                        <div class="grid md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('COAL (inches)', 'arms-complex'); ?> *
                                </label>
                                <input type="text" name="coal" id="recipe-coal" required 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Muzzle Velocity (fps)', 'arms-complex'); ?>
                                </label>
                                <input type="number" name="muzzle_velocity" id="muzzle-velocity" 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    <?php esc_html_e('Muzzle Energy (ft-lbs)', 'arms-complex'); ?>
                                </label>
                                <input type="number" name="muzzle_energy" id="muzzle-energy" 
                                       class="w-full px-4 py-2 border border-border rounded-lg">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">
                                <?php esc_html_e('Accuracy', 'arms-complex'); ?>
                            </label>
                            <input type="text" name="accuracy" id="recipe-accuracy" 
                                   placeholder="<?php esc_attr_e('e.g., 1 MOA @ 100 yards', 'arms-complex'); ?>"
                                   class="w-full px-4 py-2 border border-border rounded-lg">
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">
                                <?php esc_html_e('Performance Notes', 'arms-complex'); ?>
                            </label>
                            <textarea name="performance_notes" id="performance-notes" rows="3" 
                                      class="w-full px-4 py-2 border border-border rounded-lg"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">
                                <?php esc_html_e('Additional Notes', 'arms-complex'); ?>
                            </label>
                            <textarea name="notes" id="recipe-notes" rows="3" 
                                      class="w-full px-4 py-2 border border-border rounded-lg"></textarea>
                        </div>

                        <div class="flex items-center">
                            <input type="checkbox" name="is_public" id="is-public" class="mr-2">
                            <label for="is-public" class="text-sm">
                                <?php esc_html_e('Make this recipe public (share with community)', 'arms-complex'); ?>
                            </label>
                        </div>

                        <div class="flex gap-4 pt-4">
                            <button type="submit" class="button button-primary flex-1">
                                <?php esc_html_e('Save Recipe', 'arms-complex'); ?>
                            </button>
                            <button type="button" class="button button-outline modal-close">
                                <?php esc_html_e('Cancel', 'arms-complex'); ?>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        <?php else : ?>
            <!-- Not Logged In Message -->
            <div class="max-w-2xl mx-auto text-center py-12">
                <div class="bg-card rounded-lg p-8 border border-border">
                    <svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <h3 class="text-2xl font-bold mb-4">
                        <?php esc_html_e('Login Required', 'arms-complex'); ?>
                    </h3>
                    <p class="text-muted-foreground mb-6">
                        <?php esc_html_e('Please login or create an account to manage your load recipes.', 'arms-complex'); ?>
                    </p>
                    <a href="<?php echo esc_url(wp_login_url(get_permalink())); ?>" class="button button-primary">
                        <?php esc_html_e('Login', 'arms-complex'); ?>
                    </a>
                </div>
            </div>
        <?php endif; ?>

        <!-- Safety Warning -->
        <div class="mt-12 bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-destructive flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div>
                    <h4 class="font-bold text-destructive mb-2">
                        <?php esc_html_e('Safety Warning', 'arms-complex'); ?>
                    </h4>
                    <p class="text-sm text-foreground/80">
                        <?php esc_html_e('Always consult published reloading manuals and start with minimum loads. Never exceed maximum published loads. Improper reloading can result in serious injury or death. By using this tool, you accept full responsibility for your reloading practices.', 'arms-complex'); ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
jQuery(document).ready(function($) {
    // Load recipes on page load
    if ($('#recipes-grid').length && armsComplex.isUserLoggedIn) {
        loadRecipes();
    }

    // Add recipe button
    $('#add-recipe-btn').on('click', function() {
        $('#modal-title').text('<?php esc_js(_e('Add New Recipe', 'arms-complex')); ?>');
        $('#recipe-form')[0].reset();
        $('#recipe-id').val('');
        $('#recipe-modal').removeClass('hidden');
    });

    // Close modal
    $('.modal-close, .modal-overlay').on('click', function() {
        $('#recipe-modal').addClass('hidden');
    });

    // Submit recipe form
    $('#recipe-form').on('submit', function(e) {
        e.preventDefault();
        saveRecipe();
    });

    // Search recipes
    $('#recipe-search').on('input', function() {
        const query = $(this).val().toLowerCase();
        $('.recipe-card').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(query));
        });
    });

    function loadRecipes() {
        $.ajax({
            url: armsComplex.ajaxUrl,
            type: 'POST',
            data: {
                action: 'get_load_recipes',
                nonce: armsComplex.nonce
            },
            success: function(response) {
                if (response.success) {
                    displayRecipes(response.data);
                }
            }
        });
    }

    function displayRecipes(recipes) {
        const $grid = $('#recipes-grid');
        $grid.empty();

        if (recipes.length === 0) {
            $grid.html('<div class="col-span-full text-center py-12"><p class="text-muted-foreground"><?php esc_js(_e('No recipes found. Create your first recipe!', 'arms-complex')); ?></p></div>');
            return;
        }

        recipes.forEach(function(recipe) {
            const card = `
                <div class="recipe-card bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold">${recipe.name}</h3>
                        ${recipe.is_public ? '<span class="badge badge-primary">Public</span>' : ''}
                    </div>
                    <div class="space-y-2 text-sm">
                        <p><strong><?php esc_html_e('Caliber:', 'arms-complex'); ?></strong> ${recipe.caliber}</p>
                        <p><strong><?php esc_html_e('Bullet:', 'arms-complex'); ?></strong> ${recipe.bullet_weight}gr ${recipe.bullet_type}</p>
                        <p><strong><?php esc_html_e('Powder:', 'arms-complex'); ?></strong> ${recipe.powder_charge}gr ${recipe.powder_type}</p>
                        <p><strong><?php esc_html_e('Primer:', 'arms-complex'); ?></strong> ${recipe.primer}</p>
                    </div>
                    <div class="flex gap-2 mt-4 pt-4 border-t border-border">
                        <button class="button button-sm button-outline edit-recipe" data-id="${recipe.id}">
                            <?php esc_html_e('Edit', 'arms-complex'); ?>
                        </button>
                        <button class="button button-sm button-destructive delete-recipe" data-id="${recipe.id}">
                            <?php esc_html_e('Delete', 'arms-complex'); ?>
                        </button>
                    </div>
                </div>
            `;
            $grid.append(card);
        });

        // Attach event handlers
        $('.edit-recipe').on('click', function() {
            const recipeId = $(this).data('id');
            editRecipe(recipeId, recipes);
        });

        $('.delete-recipe').on('click', function() {
            if (confirm('<?php esc_js(_e('Are you sure you want to delete this recipe?', 'arms-complex')); ?>')) {
                deleteRecipe($(this).data('id'));
            }
        });
    }

    function saveRecipe() {
        const formData = $('#recipe-form').serialize();
        
        $.ajax({
            url: armsComplex.ajaxUrl,
            type: 'POST',
            data: formData + '&action=save_load_recipe&nonce=' + armsComplex.nonce,
            success: function(response) {
                if (response.success) {
                    window.showToast('<?php esc_js(_e('Recipe saved successfully!', 'arms-complex')); ?>', 'success');
                    $('#recipe-modal').addClass('hidden');
                    loadRecipes();
                } else {
                    window.showToast(response.data.message || '<?php esc_js(_e('Failed to save recipe', 'arms-complex')); ?>', 'error');
                }
            }
        });
    }

    function editRecipe(id, recipes) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;

        $('#modal-title').text('<?php esc_js(_e('Edit Recipe', 'arms-complex')); ?>');
        $('#recipe-id').val(recipe.id);
        $('#recipe-name').val(recipe.name);
        $('#recipe-caliber').val(recipe.caliber);
        $('#bullet-weight').val(recipe.bullet_weight);
        $('#bullet-type').val(recipe.bullet_type);
        $('#powder-type').val(recipe.powder_type);
        $('#powder-charge').val(recipe.powder_charge);
        $('#recipe-primer').val(recipe.primer);
        $('#recipe-brass').val(recipe.brass);
        $('#recipe-coal').val(recipe.coal);
        $('#muzzle-velocity').val(recipe.muzzle_velocity || '');
        $('#muzzle-energy').val(recipe.muzzle_energy || '');
        $('#recipe-accuracy').val(recipe.accuracy || '');
        $('#performance-notes').val(recipe.performance_notes || '');
        $('#recipe-notes').val(recipe.notes || '');
        $('#is-public').prop('checked', recipe.is_public);
        
        $('#recipe-modal').removeClass('hidden');
    }

    function deleteRecipe(id) {
        $.ajax({
            url: armsComplex.ajaxUrl,
            type: 'POST',
            data: {
                action: 'delete_load_recipe',
                recipe_id: id,
                nonce: armsComplex.nonce
            },
            success: function(response) {
                if (response.success) {
                    window.showToast('<?php esc_js(_e('Recipe deleted successfully!', 'arms-complex')); ?>', 'success');
                    loadRecipes();
                }
            }
        });
    }
});
</script>

<?php
get_footer();
