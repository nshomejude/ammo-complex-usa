<?php
/**
 * Comparison Bar Template Part
 * 
 * Sticky comparison bar for product comparison feature
 * 
 * @package Arms_Complex
 */
?>

<div id="comparison-bar" 
     class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 opacity-0 pointer-events-none"
     style="transform: translateX(-50%) translateY(100%);">
    <div class="bg-card border border-border rounded-full shadow-2xl px-6 py-3 flex items-center gap-4 backdrop-blur-xl">
        <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span class="font-semibold">
                <span id="comparison-count">0</span> of 4 selected
            </span>
        </div>

        <div class="flex items-center gap-2">
            <button id="compare-button" 
                    class="button button-primary button-sm"
                    disabled>
                <?php esc_html_e('Compare Now', 'arms-complex'); ?>
            </button>
            
            <button id="clear-comparison" 
                    class="button button-ghost button-sm">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </div>
</div>

<script>
(function() {
    const COMPARISON_KEY = 'wc_comparison';
    const MAX_COMPARISON = 4;
    
    let comparison = JSON.parse(localStorage.getItem(COMPARISON_KEY) || '[]');
    
    const bar = document.getElementById('comparison-bar');
    const countElement = document.getElementById('comparison-count');
    const compareButton = document.getElementById('compare-button');
    const clearButton = document.getElementById('clear-comparison');
    
    function updateBar() {
        countElement.textContent = comparison.length;
        compareButton.disabled = comparison.length < 2;
        
        if (comparison.length > 0) {
            bar.style.opacity = '1';
            bar.style.pointerEvents = 'auto';
            bar.style.transform = 'translateX(-50%) translateY(0)';
        } else {
            bar.style.opacity = '0';
            bar.style.pointerEvents = 'none';
            bar.style.transform = 'translateX(-50%) translateY(100%)';
        }
    }
    
    function toggleComparison(productId) {
        const index = comparison.indexOf(productId);
        
        if (index > -1) {
            comparison.splice(index, 1);
        } else {
            if (comparison.length >= MAX_COMPARISON) {
                alert('<?php esc_html_e('You can compare up to 4 products at a time.', 'arms-complex'); ?>');
                return false;
            }
            comparison.push(productId);
        }
        
        localStorage.setItem(COMPARISON_KEY, JSON.stringify(comparison));
        updateBar();
        updateButtons();
        return true;
    }
    
    function clearComparison() {
        comparison = [];
        localStorage.setItem(COMPARISON_KEY, JSON.stringify(comparison));
        updateBar();
        updateButtons();
    }
    
    function updateButtons() {
        document.querySelectorAll('.comparison-button').forEach(button => {
            const productId = button.dataset.productId;
            const isInComparison = comparison.includes(productId);
            
            button.classList.toggle('in-comparison', isInComparison);
            button.querySelector('.comparison-icon').innerHTML = isInComparison
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>';
        });
    }
    
    // Event listeners
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.comparison-button');
        if (button) {
            e.preventDefault();
            toggleComparison(button.dataset.productId);
        }
    });
    
    if (clearButton) {
        clearButton.addEventListener('click', clearComparison);
    }
    
    if (compareButton) {
        compareButton.addEventListener('click', function() {
            const compareUrl = '<?php echo esc_url(home_url('/compare/')); ?>?ids=' + comparison.join(',');
            window.location.href = compareUrl;
        });
    }
    
    // Initialize
    updateBar();
    updateButtons();
    
    // Expose functions globally
    window.armsComplex = window.armsComplex || {};
    window.armsComplex.comparison = {
        toggle: toggleComparison,
        clear: clearComparison,
        update: updateButtons
    };
})();
</script>
