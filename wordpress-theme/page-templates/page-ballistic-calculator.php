<?php
/**
 * Template Name: Ballistic Calculator
 * 
 * Converts: src/pages/BallisticCalculator.tsx
 * 
 * @package Arms_Complex
 */

get_header();
?>

<main id="primary" class="site-main ballistic-calculator-page">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="page-header text-center mb-12">
            <h1 class="text-5xl font-bold mb-4">
                <?php esc_html_e('Ballistic Calculator', 'arms-complex'); ?>
            </h1>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
                <?php esc_html_e('Calculate bullet trajectory, energy, and drop for precise shooting. Enter your ammunition specifications below.', 'arms-complex'); ?>
            </p>
        </div>

        <div class="calculator-content max-w-4xl mx-auto">
            <!-- Calculator Form -->
            <div class="calculator-form bg-card border border-border rounded-lg p-8 mb-8">
                <form id="ballistic-calculator-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Caliber Selection -->
                        <div class="form-group">
                            <label for="caliber" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Caliber', 'arms-complex'); ?>
                            </label>
                            <select 
                                id="caliber" 
                                name="caliber" 
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value=""><?php esc_html_e('Select Caliber', 'arms-complex'); ?></option>
                                <option value=".223">.223 Remington</option>
                                <option value="5.56">5.56x45mm NATO</option>
                                <option value=".308">.308 Winchester</option>
                                <option value="7.62">7.62x51mm NATO</option>
                                <option value=".30-06">.30-06 Springfield</option>
                                <option value="9mm">9mm Luger</option>
                                <option value=".45">.45 ACP</option>
                                <option value=".40">.40 S&W</option>
                                <option value="custom"><?php esc_html_e('Custom', 'arms-complex'); ?></option>
                            </select>
                        </div>

                        <!-- Bullet Weight -->
                        <div class="form-group">
                            <label for="bullet_weight" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Bullet Weight (grains)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="bullet_weight" 
                                name="bullet_weight" 
                                placeholder="55"
                                step="0.1"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </div>

                        <!-- Muzzle Velocity -->
                        <div class="form-group">
                            <label for="muzzle_velocity" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Muzzle Velocity (fps)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="muzzle_velocity" 
                                name="muzzle_velocity" 
                                placeholder="3240"
                                step="1"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </div>

                        <!-- Ballistic Coefficient -->
                        <div class="form-group">
                            <label for="ballistic_coefficient" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Ballistic Coefficient (BC)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="ballistic_coefficient" 
                                name="ballistic_coefficient" 
                                placeholder="0.250"
                                step="0.001"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </div>

                        <!-- Distance -->
                        <div class="form-group">
                            <label for="distance" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Distance (yards)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="distance" 
                                name="distance" 
                                placeholder="100"
                                step="1"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                required
                            />
                        </div>

                        <!-- Zero Distance -->
                        <div class="form-group">
                            <label for="zero_distance" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Zero Distance (yards)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="zero_distance" 
                                name="zero_distance" 
                                placeholder="100"
                                value="100"
                                step="1"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <!-- Sight Height -->
                        <div class="form-group">
                            <label for="sight_height" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Sight Height (inches)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="sight_height" 
                                name="sight_height" 
                                placeholder="1.5"
                                value="1.5"
                                step="0.1"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <!-- Wind Speed -->
                        <div class="form-group">
                            <label for="wind_speed" class="block text-sm font-semibold mb-2">
                                <?php esc_html_e('Wind Speed (mph)', 'arms-complex'); ?>
                            </label>
                            <input 
                                type="number" 
                                id="wind_speed" 
                                name="wind_speed" 
                                placeholder="10"
                                value="0"
                                step="1"
                                class="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex justify-center mt-8">
                        <button 
                            type="submit" 
                            class="px-8 py-3 bg-tactical text-tactical-foreground rounded-lg hover:bg-tactical-hover transition-colors font-semibold text-lg"
                        >
                            <?php esc_html_e('Calculate', 'arms-complex'); ?>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Results Section -->
            <div id="ballistic-results" class="results-section hidden">
                <h2 class="text-3xl font-bold mb-6 text-center">
                    <?php esc_html_e('Calculation Results', 'arms-complex'); ?>
                </h2>

                <!-- Key Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="metric-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="metric-label text-sm text-muted-foreground mb-2">
                            <?php esc_html_e('Muzzle Energy', 'arms-complex'); ?>
                        </div>
                        <div id="result-energy" class="metric-value text-3xl font-bold text-tactical">
                            --
                        </div>
                        <div class="metric-unit text-sm text-muted-foreground mt-1">ft-lbs</div>
                    </div>

                    <div class="metric-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="metric-label text-sm text-muted-foreground mb-2">
                            <?php esc_html_e('Bullet Drop', 'arms-complex'); ?>
                        </div>
                        <div id="result-drop" class="metric-value text-3xl font-bold text-tactical">
                            --
                        </div>
                        <div class="metric-unit text-sm text-muted-foreground mt-1">inches</div>
                    </div>

                    <div class="metric-card bg-card border border-border rounded-lg p-6 text-center">
                        <div class="metric-label text-sm text-muted-foreground mb-2">
                            <?php esc_html_e('Time of Flight', 'arms-complex'); ?>
                        </div>
                        <div id="result-time" class="metric-value text-3xl font-bold text-tactical">
                            --
                        </div>
                        <div class="metric-unit text-sm text-muted-foreground mt-1">seconds</div>
                    </div>
                </div>

                <!-- Detailed Results Table -->
                <div class="detailed-results bg-card border border-border rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-4">
                        <?php esc_html_e('Trajectory Table', 'arms-complex'); ?>
                    </h3>
                    <div class="overflow-x-auto">
                        <table id="trajectory-table" class="w-full">
                            <thead class="bg-muted/50">
                                <tr>
                                    <th class="px-4 py-3 text-left"><?php esc_html_e('Distance (yds)', 'arms-complex'); ?></th>
                                    <th class="px-4 py-3 text-left"><?php esc_html_e('Drop (in)', 'arms-complex'); ?></th>
                                    <th class="px-4 py-3 text-left"><?php esc_html_e('Velocity (fps)', 'arms-complex'); ?></th>
                                    <th class="px-4 py-3 text-left"><?php esc_html_e('Energy (ft-lbs)', 'arms-complex'); ?></th>
                                    <th class="px-4 py-3 text-left"><?php esc_html_e('Time (s)', 'arms-complex'); ?></th>
                                </tr>
                            </thead>
                            <tbody id="trajectory-body" class="divide-y divide-border">
                                <!-- Populated via JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Wind Drift Results -->
                <div id="wind-drift-section" class="wind-drift bg-card border border-border rounded-lg p-6 mt-6 hidden">
                    <h3 class="text-xl font-bold mb-4">
                        <?php esc_html_e('Wind Drift', 'arms-complex'); ?>
                    </h3>
                    <div class="text-center">
                        <div class="text-sm text-muted-foreground mb-2">
                            <?php esc_html_e('Horizontal Drift at Target Distance', 'arms-complex'); ?>
                        </div>
                        <div id="result-wind-drift" class="text-3xl font-bold text-tactical">
                            --
                        </div>
                        <div class="text-sm text-muted-foreground mt-1">inches</div>
                    </div>
                </div>
            </div>

            <!-- Information Section -->
            <div class="info-section mt-12 bg-muted/30 rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">
                    <?php esc_html_e('How to Use This Calculator', 'arms-complex'); ?>
                </h2>
                <div class="prose max-w-none">
                    <ul class="space-y-2 text-muted-foreground">
                        <li><?php esc_html_e('Select your caliber or choose "Custom" to enter specific values', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Enter bullet weight in grains (found on ammunition box)', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Muzzle velocity is typically provided by ammunition manufacturer', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Ballistic Coefficient (BC) can be found in bullet specifications', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Zero distance is where your rifle is sighted in', 'arms-complex'); ?></li>
                        <li><?php esc_html_e('Sight height is the distance from bore centerline to scope centerline', 'arms-complex'); ?></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
jQuery(document).ready(function($) {
    $('#ballistic-calculator-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const bulletWeight = parseFloat($('#bullet_weight').val());
        const muzzleVelocity = parseFloat($('#muzzle_velocity').val());
        const ballisticCoef = parseFloat($('#ballistic_coefficient').val());
        const distance = parseFloat($('#distance').val());
        const zeroDistance = parseFloat($('#zero_distance').val()) || 100;
        const sightHeight = parseFloat($('#sight_height').val()) || 1.5;
        const windSpeed = parseFloat($('#wind_speed').val()) || 0;
        
        // Calculate muzzle energy
        const muzzleEnergy = (bulletWeight * Math.pow(muzzleVelocity, 2)) / 450240;
        
        // Simplified ballistic calculations
        const gravity = 32.174; // ft/s²
        
        // Calculate for target distance
        const timeToTarget = (distance * 3) / muzzleVelocity; // Approximate
        const drop = 0.5 * gravity * Math.pow(timeToTarget, 2) * 12; // Convert to inches
        
        // Velocity at distance (simplified)
        const velocityAtDistance = muzzleVelocity * Math.exp(-0.0001 * distance / ballisticCoef);
        const energyAtDistance = (bulletWeight * Math.pow(velocityAtDistance, 2)) / 450240;
        
        // Wind drift (simplified)
        const windDrift = windSpeed > 0 ? (windSpeed * timeToTarget * 10) : 0;
        
        // Display results
        $('#result-energy').text(muzzleEnergy.toFixed(0));
        $('#result-drop').text(drop.toFixed(2));
        $('#result-time').text(timeToTarget.toFixed(3));
        
        if (windSpeed > 0) {
            $('#result-wind-drift').text(windDrift.toFixed(2));
            $('#wind-drift-section').removeClass('hidden');
        } else {
            $('#wind-drift-section').addClass('hidden');
        }
        
        // Generate trajectory table
        const tbody = $('#trajectory-body');
        tbody.empty();
        
        const intervals = [0, 50, 100, 150, 200, 250, 300, 400, 500];
        
        intervals.forEach(function(dist) {
            const time = (dist * 3) / muzzleVelocity;
            const dropAtDist = 0.5 * gravity * Math.pow(time, 2) * 12;
            const velAtDist = muzzleVelocity * Math.exp(-0.0001 * dist / ballisticCoef);
            const energyAtDist = (bulletWeight * Math.pow(velAtDist, 2)) / 450240;
            
            tbody.append(
                '<tr class="hover:bg-muted/50">' +
                '<td class="px-4 py-3">' + dist + '</td>' +
                '<td class="px-4 py-3">' + dropAtDist.toFixed(2) + '</td>' +
                '<td class="px-4 py-3">' + velAtDist.toFixed(0) + '</td>' +
                '<td class="px-4 py-3">' + energyAtDist.toFixed(0) + '</td>' +
                '<td class="px-4 py-3">' + time.toFixed(3) + '</td>' +
                '</tr>'
            );
        });
        
        // Show results section
        $('#ballistic-results').removeClass('hidden');
        
        // Scroll to results
        $('html, body').animate({
            scrollTop: $('#ballistic-results').offset().top - 100
        }, 500);
    });
});
</script>

<?php
get_footer();
