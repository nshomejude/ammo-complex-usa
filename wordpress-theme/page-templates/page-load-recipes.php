<?php
/**
 * Template Name: Load Recipes
 * 
 * Converts: src/pages/LoadRecipes.tsx
 * Integrated with Supabase load_recipes table
 * 
 * @package Arms_Complex
 */

get_header();

// Check if user is logged in for saving recipes
$is_logged_in = is_user_logged_in();
$user_id = get_current_user_id();
?>

<main id="primary" class="site-main load-recipes-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="page-header text-center mb-12">
            <h1 class="text-5xl font-bold mb-4">
                <?php esc_html_e('Load Recipes Database', 'arms-complex'); ?>
            </h1>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Browse and share proven reloading recipes. Save your favorite loads and track performance.', 'arms-complex'); ?>
            </p>
        </div>

        <div class="recipes-content max-w-6xl mx-auto">
            <!-- Action Buttons -->
            <div class="action-bar flex justify-between items-center mb-8">
                <div class="flex gap-4">
                    <button id="view-all-recipes" class="button">
                        <?php esc_html_e('All Recipes', 'arms-complex'); ?>
                    </button>
                    <?php if ($is_logged_in) : ?>
                        <button id="view-my-recipes" class="button-outline">
                            <?php esc_html_e('My Recipes', 'arms-complex'); ?>
                        </button>
                    <?php endif; ?>
                </div>
                
                <?php if ($is_logged_in) : ?>
                    <button id="add-recipe-btn" class="button">
                        ➕ <?php esc_html_e('Add Recipe', 'arms-complex'); ?>
                    </button>
                <?php else : ?>
                    <a href="<?php echo esc_url(wp_login_url(get_permalink())); ?>" class="button">
                        <?php esc_html_e('Login to Add Recipes', 'arms-complex'); ?>
                    </a>
                <?php endif; ?>
            </div>

            <!-- Filters -->
            <div class="filters bg-card border border-border rounded-lg p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label for="filter-caliber" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Caliber', 'arms-complex'); ?>
                        </label>
                        <select id="filter-caliber" class="w-full px-4 py-2 border border-input rounded-lg bg-background">
                            <option value=""><?php esc_html_e('All Calibers', 'arms-complex'); ?></option>
                            <option value=".223 Remington">.223 Remington</option>
                            <option value=".308 Winchester">.308 Winchester</option>
                            <option value="9mm Luger">9mm Luger</option>
                            <option value=".45 ACP">.45 ACP</option>
                            <option value=".30-06">.30-06 Springfield</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="filter-powder" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Powder Type', 'arms-complex'); ?>
                        </label>
                        <input 
                            type="text" 
                            id="filter-powder" 
                            placeholder="<?php esc_attr_e('e.g., H4895', 'arms-complex'); ?>"
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="filter-bullet-weight" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Bullet Weight', 'arms-complex'); ?>
                        </label>
                        <input 
                            type="text" 
                            id="filter-bullet-weight" 
                            placeholder="<?php esc_attr_e('e.g., 55gr', 'arms-complex'); ?>"
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div class="flex items-end">
                        <button id="apply-filters" class="w-full button">
                            <?php esc_html_e('Apply Filters', 'arms-complex'); ?>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Recipes Grid -->
            <div id="recipes-container" class="recipes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <!-- Populated via JavaScript -->
                <div class="col-span-full text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-tactical"></div>
                    <p class="mt-4 text-muted-foreground"><?php esc_html_e('Loading recipes...', 'arms-complex'); ?></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Recipe Modal -->
    <div id="recipe-modal" class="modal hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="modal-content bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="modal-header bg-card border-b border-border p-6">
                <h2 class="text-2xl font-bold"><?php esc_html_e('Add Load Recipe', 'arms-complex'); ?></h2>
            </div>
            
            <form id="recipe-form" class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="col-span-full">
                        <label for="recipe-name" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Recipe Name', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-name" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('e.g., .223 Match Load', 'arms-complex'); ?>"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-caliber" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Caliber', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-caliber" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-bullet-type" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Bullet Type', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-bullet-type" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('e.g., Hornady BTHP', 'arms-complex'); ?>"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-bullet-weight" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Bullet Weight', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-bullet-weight" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('e.g., 55gr', 'arms-complex'); ?>"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-powder-type" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Powder Type', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-powder-type" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-powder-charge" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Powder Charge', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-powder-charge" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('e.g., 25.0gr', 'arms-complex'); ?>"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-primer" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Primer', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-primer" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-brass" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Brass', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-brass" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-coal" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('COAL (inches)', 'arms-complex'); ?> *
                        </label>
                        <input 
                            type="text" 
                            id="recipe-coal" 
                            required
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('e.g., 2.260', 'arms-complex'); ?>"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-velocity" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Muzzle Velocity (fps)', 'arms-complex'); ?>
                        </label>
                        <input 
                            type="number" 
                            id="recipe-velocity" 
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-energy" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Muzzle Energy (ft-lbs)', 'arms-complex'); ?>
                        </label>
                        <input 
                            type="number" 
                            id="recipe-energy" 
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                        />
                    </div>
                    
                    <div>
                        <label for="recipe-accuracy" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Accuracy (MOA)', 'arms-complex'); ?>
                        </label>
                        <input 
                            type="text" 
                            id="recipe-accuracy" 
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('e.g., 0.75 MOA', 'arms-complex'); ?>"
                        />
                    </div>
                    
                    <div class="col-span-full">
                        <label for="recipe-notes" class="block text-sm font-semibold mb-2">
                            <?php esc_html_e('Notes', 'arms-complex'); ?>
                        </label>
                        <textarea 
                            id="recipe-notes" 
                            rows="4"
                            class="w-full px-4 py-2 border border-input rounded-lg bg-background"
                            placeholder="<?php esc_attr_e('Add any additional notes about this load...', 'arms-complex'); ?>"
                        ></textarea>
                    </div>
                </div>
                
                <div class="flex gap-4 justify-end">
                    <button type="button" id="cancel-recipe" class="button-outline">
                        <?php esc_html_e('Cancel', 'arms-complex'); ?>
                    </button>
                    <button type="submit" class="button">
                        <?php esc_html_e('Save Recipe', 'arms-complex'); ?>
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>

<script>
jQuery(document).ready(function($) {
    let currentView = 'all';
    
    // Load recipes on page load
    loadRecipes();
    
    // View toggles
    $('#view-all-recipes').on('click', function() {
        currentView = 'all';
        $(this).removeClass('button-outline').addClass('button');
        $('#view-my-recipes').removeClass('button').addClass('button-outline');
        loadRecipes();
    });
    
    $('#view-my-recipes').on('click', function() {
        currentView = 'my';
        $(this).removeClass('button-outline').addClass('button');
        $('#view-all-recipes').removeClass('button').addClass('button-outline');
        loadRecipes();
    });
    
    // Open add recipe modal
    $('#add-recipe-btn').on('click', function() {
        $('#recipe-modal').removeClass('hidden');
        $('#recipe-form')[0].reset();
    });
    
    // Close modal
    $('#cancel-recipe, #recipe-modal').on('click', function(e) {
        if (e.target === this) {
            $('#recipe-modal').addClass('hidden');
        }
    });
    
    // Submit recipe form
    $('#recipe-form').on('submit', function(e) {
        e.preventDefault();
        
        const recipeData = {
            name: $('#recipe-name').val(),
            caliber: $('#recipe-caliber').val(),
            bullet_type: $('#recipe-bullet-type').val(),
            bullet_weight: $('#recipe-bullet-weight').val(),
            powder_type: $('#recipe-powder-type').val(),
            powder_charge: $('#recipe-powder-charge').val(),
            primer: $('#recipe-primer').val(),
            brass: $('#recipe-brass').val(),
            coal: $('#recipe-coal').val(),
            muzzle_velocity: $('#recipe-velocity').val() || null,
            muzzle_energy: $('#recipe-energy').val() || null,
            accuracy: $('#recipe-accuracy').val() || null,
            notes: $('#recipe-notes').val() || null
        };
        
        // In a real implementation, this would save to Supabase via AJAX
        console.log('Saving recipe:', recipeData);
        
        // Close modal and reload
        $('#recipe-modal').addClass('hidden');
        alert('<?php esc_html_e('Recipe saved successfully!', 'arms-complex'); ?>');
        loadRecipes();
    });
    
    // Apply filters
    $('#apply-filters').on('click', function() {
        loadRecipes();
    });
    
    function loadRecipes() {
        const $container = $('#recipes-container');
        $container.html('<div class="col-span-full text-center py-12"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-tactical"></div></div>');
        
        // Sample recipes (in production, load from Supabase)
        const sampleRecipes = [
            {
                id: 1,
                name: '.223 Match Load',
                caliber: '.223 Remington',
                bullet_type: 'Hornady 55gr BTHP',
                bullet_weight: '55gr',
                powder_type: 'H4895',
                powder_charge: '25.0gr',
                primer: 'CCI 400',
                brass: 'Lake City',
                coal: '2.260"',
                muzzle_velocity: 3240,
                accuracy: '0.75 MOA'
            },
            // Add more sample recipes...
        ];
        
        setTimeout(function() {
            if (sampleRecipes.length === 0) {
                $container.html('<div class="col-span-full text-center py-12"><p class="text-muted-foreground"><?php esc_html_e('No recipes found', 'arms-complex'); ?></p></div>');
                return;
            }
            
            let html = '';
            sampleRecipes.forEach(function(recipe) {
                html += '<div class="recipe-card bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">';
                html += '<h3 class="text-xl font-bold mb-3">' + recipe.name + '</h3>';
                html += '<div class="space-y-2 text-sm">';
                html += '<div class="flex justify-between"><span class="text-muted-foreground"><?php esc_html_e('Caliber:', 'arms-complex'); ?></span><span class="font-semibold">' + recipe.caliber + '</span></div>';
                html += '<div class="flex justify-between"><span class="text-muted-foreground"><?php esc_html_e('Bullet:', 'arms-complex'); ?></span><span class="font-semibold">' + recipe.bullet_type + '</span></div>';
                html += '<div class="flex justify-between"><span class="text-muted-foreground"><?php esc_html_e('Powder:', 'arms-complex'); ?></span><span class="font-semibold">' + recipe.powder_type + ' ' + recipe.powder_charge + '</span></div>';
                html += '<div class="flex justify-between"><span class="text-muted-foreground"><?php esc_html_e('Primer:', 'arms-complex'); ?></span><span class="font-semibold">' + recipe.primer + '</span></div>';
                if (recipe.muzzle_velocity) {
                    html += '<div class="flex justify-between"><span class="text-muted-foreground"><?php esc_html_e('Velocity:', 'arms-complex'); ?></span><span class="font-semibold">' + recipe.muzzle_velocity + ' fps</span></div>';
                }
                if (recipe.accuracy) {
                    html += '<div class="flex justify-between"><span class="text-muted-foreground"><?php esc_html_e('Accuracy:', 'arms-complex'); ?></span><span class="font-semibold">' + recipe.accuracy + '</span></div>';
                }
                html += '</div>';
                html += '<div class="mt-4 flex gap-2">';
                html += '<button class="button-outline flex-1"><?php esc_html_e('View Details', 'arms-complex'); ?></button>';
                html += '</div>';
                html += '</div>';
            });
            
            $container.html(html);
        }, 500);
    }
});
</script>

<?php
get_footer();
