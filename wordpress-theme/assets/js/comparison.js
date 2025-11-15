/**
 * Arms Complex - Product Comparison
 * 
 * Handles product comparison functionality matching React useComparison hook
 * 
 * @package Arms_Complex
 */

(function($) {
    'use strict';

    class Comparison {
        constructor() {
            this.storageKey = 'arms_complex_comparison';
            this.maxComparison = 4;
            this.items = this.loadFromStorage();
            
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateAllButtons();
            this.updateBar();
        }

        bindEvents() {
            const self = this;

            // Comparison button click
            $(document).on('click', '.comparison-button', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const $button = $(this);
                const productId = $button.data('product-id');
                
                if (productId) {
                    self.toggle(productId, $button);
                }
            });

            // Compare now button (from bar)
            $(document).on('click', '#compare-button', function(e) {
                e.preventDefault();
                
                if (self.items.length >= 2) {
                    window.location.href = armsComplex.compareUrl + '?ids=' + self.items.join(',');
                }
            });

            // Clear comparison
            $(document).on('click', '#clear-comparison, .clear-comparison', function(e) {
                e.preventDefault();
                
                if (confirm('Clear all products from comparison?')) {
                    self.clear();
                }
            });

            // Remove single item from comparison page
            $(document).on('click', '.remove-from-comparison', function(e) {
                e.preventDefault();
                
                const productId = $(this).data('product-id');
                self.remove(productId);
                
                // Remove column from comparison table
                $(this).closest('.comparison-column').fadeOut(300, function() {
                    $(this).remove();
                    
                    // Redirect if less than 2 items
                    if (self.items.length < 2) {
                        window.location.href = armsComplex.shopUrl;
                    }
                });
            });
        }

        toggle(productId, $button) {
            const exists = this.has(productId);
            
            if (exists) {
                this.remove(productId);
                this.showToast('Removed from comparison', 'info');
            } else {
                if (this.items.length >= this.maxComparison) {
                    this.showToast(`You can compare up to ${this.maxComparison} products`, 'error');
                    return false;
                }
                
                this.add(productId);
                this.showToast('Added to comparison', 'success');
            }
            
            if ($button) {
                this.updateButton($button, !exists);
            }
            
            this.updateBar();
            this.saveToStorage();
            
            return true;
        }

        add(productId) {
            if (!this.has(productId) && this.items.length < this.maxComparison) {
                this.items.push(productId.toString());
                this.saveToStorage();
                this.updateAllButtons();
                this.updateBar();
                
                // Trigger custom event
                $(document).trigger('comparison_item_added', [productId]);
            }
        }

        remove(productId) {
            const index = this.items.indexOf(productId.toString());
            if (index > -1) {
                this.items.splice(index, 1);
                this.saveToStorage();
                this.updateAllButtons();
                this.updateBar();
                
                // Trigger custom event
                $(document).trigger('comparison_item_removed', [productId]);
            }
        }

        has(productId) {
            return this.items.includes(productId.toString());
        }

        clear() {
            this.items = [];
            this.saveToStorage();
            this.updateAllButtons();
            this.updateBar();
            
            // Trigger custom event
            $(document).trigger('comparison_cleared');
            
            this.showToast('Comparison cleared', 'info');
        }

        getCount() {
            return this.items.length;
        }

        getItems() {
            return this.items;
        }

        canAddMore() {
            return this.items.length < this.maxComparison;
        }

        updateButton($button, isInComparison) {
            const $icon = $button.find('.comparison-icon');
            const $text = $button.find('.comparison-text');
            
            if (isInComparison) {
                $button.addClass('in-comparison');
                $button.attr('aria-label', 'Remove from comparison');
                
                // Update icon (checkmark)
                if ($icon.length) {
                    $icon.html(`
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    `);
                }
                
                if ($text.length) {
                    $text.text('In Comparison');
                }
            } else {
                $button.removeClass('in-comparison');
                $button.attr('aria-label', 'Add to comparison');
                
                // Update icon (chart)
                if ($icon.length) {
                    $icon.html(`
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                    `);
                }
                
                if ($text.length) {
                    $text.text('Compare');
                }
            }
        }

        updateAllButtons() {
            const self = this;
            
            $('.comparison-button').each(function() {
                const $button = $(this);
                const productId = $button.data('product-id');
                
                if (productId) {
                    self.updateButton($button, self.has(productId));
                }
                
                // Disable if max reached and not in comparison
                if (self.items.length >= self.maxComparison && !self.has(productId)) {
                    $button.addClass('disabled').prop('disabled', true);
                } else {
                    $button.removeClass('disabled').prop('disabled', false);
                }
            });
        }

        updateBar() {
            const $bar = $('#comparison-bar');
            const $countElement = $('#comparison-count');
            const $compareButton = $('#compare-button');
            const count = this.getCount();
            
            if (!$bar.length) return;
            
            // Update count
            $countElement.text(count);
            
            // Enable/disable compare button
            if (count >= 2) {
                $compareButton.prop('disabled', false).removeClass('disabled');
            } else {
                $compareButton.prop('disabled', true).addClass('disabled');
            }
            
            // Show/hide bar with animation
            if (count > 0) {
                $bar.css({
                    'opacity': '1',
                    'pointer-events': 'auto',
                    'transform': 'translateX(-50%) translateY(0)'
                });
            } else {
                $bar.css({
                    'opacity': '0',
                    'pointer-events': 'none',
                    'transform': 'translateX(-50%) translateY(100%)'
                });
            }
        }

        loadFromStorage() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.error('Error loading comparison from storage:', e);
                return [];
            }
        }

        saveToStorage() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            } catch (e) {
                console.error('Error saving comparison to storage:', e);
            }
        }

        showToast(message, type) {
            if (typeof window.showToast === 'function') {
                window.showToast(message, type);
            }
        }
    }

    // Initialize comparison
    let comparisonInstance;
    
    $(document).ready(function() {
        comparisonInstance = new Comparison();
        
        // Expose globally
        window.armsComplexComparison = comparisonInstance;
    });

})(jQuery);
