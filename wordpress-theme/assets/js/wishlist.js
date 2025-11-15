/**
 * Arms Complex - Wishlist
 * 
 * Handles wishlist functionality matching React useWishlist hook
 * 
 * @package Arms_Complex
 */

(function($) {
    'use strict';

    class Wishlist {
        constructor() {
            this.storageKey = 'arms_complex_wishlist';
            this.items = this.loadFromStorage();
            
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateAllButtons();
            this.updateCounter();
        }

        bindEvents() {
            const self = this;

            // Wishlist button click
            $(document).on('click', '.wishlist-button', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const $button = $(this);
                const productId = $button.data('product-id');
                
                if (productId) {
                    self.toggle(productId, $button);
                }
            });

            // Remove from wishlist page
            $(document).on('click', '.remove-from-wishlist', function(e) {
                e.preventDefault();
                
                const productId = $(this).data('product-id');
                self.remove(productId);
                
                // Remove the row from wishlist page
                $(this).closest('.wishlist-item').fadeOut(300, function() {
                    $(this).remove();
                    
                    // Show empty message if no items left
                    if ($('.wishlist-item').length === 0) {
                        $('.wishlist-empty').show();
                        $('.wishlist-items').hide();
                    }
                });
            });

            // Clear all
            $(document).on('click', '.clear-wishlist', function(e) {
                e.preventDefault();
                
                if (confirm('Are you sure you want to clear your wishlist?')) {
                    self.clear();
                    $('.wishlist-item').fadeOut(300);
                    setTimeout(() => {
                        $('.wishlist-empty').show();
                        $('.wishlist-items').hide();
                    }, 300);
                }
            });
        }

        toggle(productId, $button) {
            const exists = this.has(productId);
            
            if (exists) {
                this.remove(productId);
                this.showToast('Removed from wishlist', 'info');
            } else {
                this.add(productId);
                this.showToast('Added to wishlist', 'success');
            }
            
            if ($button) {
                this.updateButton($button, !exists);
            }
            
            this.updateCounter();
            this.saveToStorage();
        }

        add(productId) {
            if (!this.has(productId)) {
                this.items.push(productId.toString());
                this.saveToStorage();
                this.updateAllButtons();
                this.updateCounter();
                
                // Trigger custom event
                $(document).trigger('wishlist_item_added', [productId]);
                
                // AJAX sync with server if logged in
                if (armsComplex.isLoggedIn) {
                    this.syncWithServer('add', productId);
                }
            }
        }

        remove(productId) {
            const index = this.items.indexOf(productId.toString());
            if (index > -1) {
                this.items.splice(index, 1);
                this.saveToStorage();
                this.updateAllButtons();
                this.updateCounter();
                
                // Trigger custom event
                $(document).trigger('wishlist_item_removed', [productId]);
                
                // AJAX sync with server if logged in
                if (armsComplex.isLoggedIn) {
                    this.syncWithServer('remove', productId);
                }
            }
        }

        has(productId) {
            return this.items.includes(productId.toString());
        }

        clear() {
            this.items = [];
            this.saveToStorage();
            this.updateAllButtons();
            this.updateCounter();
            
            // Trigger custom event
            $(document).trigger('wishlist_cleared');
            
            // AJAX sync with server if logged in
            if (armsComplex.isLoggedIn) {
                this.syncWithServer('clear');
            }
        }

        getCount() {
            return this.items.length;
        }

        getItems() {
            return this.items;
        }

        updateButton($button, isInWishlist) {
            const $icon = $button.find('.wishlist-icon');
            const $text = $button.find('.wishlist-text');
            
            if (isInWishlist) {
                $button.addClass('in-wishlist');
                $button.attr('aria-label', 'Remove from wishlist');
                
                // Update icon
                if ($icon.length) {
                    $icon.html(`
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    `);
                }
                
                if ($text.length) {
                    $text.text('Saved');
                }
            } else {
                $button.removeClass('in-wishlist');
                $button.attr('aria-label', 'Add to wishlist');
                
                // Update icon
                if ($icon.length) {
                    $icon.html(`
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    `);
                }
                
                if ($text.length) {
                    $text.text('Save');
                }
            }
        }

        updateAllButtons() {
            const self = this;
            
            $('.wishlist-button').each(function() {
                const $button = $(this);
                const productId = $button.data('product-id');
                
                if (productId) {
                    self.updateButton($button, self.has(productId));
                }
            });
        }

        updateCounter() {
            const count = this.getCount();
            
            $('.wishlist-count').each(function() {
                $(this).text(count);
                
                if (count > 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            
            // Update wishlist link badge
            $('.wishlist-badge').text(count);
            
            if (count > 0) {
                $('.wishlist-badge').show();
            } else {
                $('.wishlist-badge').hide();
            }
        }

        loadFromStorage() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.error('Error loading wishlist from storage:', e);
                return [];
            }
        }

        saveToStorage() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            } catch (e) {
                console.error('Error saving wishlist to storage:', e);
            }
        }

        syncWithServer(action, productId = null) {
            $.ajax({
                url: armsComplex.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'sync_wishlist',
                    wishlist_action: action,
                    product_id: productId,
                    items: this.items,
                    nonce: armsComplex.nonce
                }
            });
        }

        showToast(message, type) {
            if (typeof window.showToast === 'function') {
                window.showToast(message, type);
            }
        }
    }

    // Initialize wishlist
    let wishlistInstance;
    
    $(document).ready(function() {
        wishlistInstance = new Wishlist();
        
        // Expose globally
        window.armsComplexWishlist = wishlistInstance;
    });

})(jQuery);
