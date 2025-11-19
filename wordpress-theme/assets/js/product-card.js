/**
 * Product Card Interactions
 * 
 * Handles Add to Cart AJAX, Quick View modal, and integrates with 
 * Wishlist and Comparison functionality
 * 
 * @package Arms_Complex
 */

(function($) {
  'use strict';

  /**
   * Product Card Handler
   */
  class ProductCard {
    constructor() {
      this.init();
    }

    /**
     * Initialize all interactions
     */
    init() {
      this.bindAddToCartAjax();
      this.bindQuickView();
      // Wishlist and Comparison are handled by their own scripts
      console.log('Product Card initialized');
    }

    /**
     * AJAX Add to Cart
     */
    bindAddToCartAjax() {
      $(document).on('click', '.add_to_cart_button:not(.product_type_variable)', (e) => {
        e.preventDefault();
        
        const $button = $(e.currentTarget);
        const productId = $button.data('product_id');
        const productSku = $button.data('product_sku');
        const originalText = $button.text();
        
        // Button loading state
        $button.addClass('loading').text('Adding...');
        
        // AJAX request
        $.ajax({
          type: 'POST',
          url: wc_add_to_cart_params.ajax_url,
          data: {
            action: 'woocommerce_ajax_add_to_cart',
            product_id: productId,
            product_sku: productSku,
            quantity: 1,
          },
          success: (response) => {
            if (response.error) {
              this.showToast(response.error, 'error');
              $button.removeClass('loading').text(originalText);
              return;
            }

            // Update cart fragments
            $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $button]);
            
            // Success state
            $button
              .removeClass('loading')
              .addClass('added')
              .text(armsComplexProductCard.addedText);
            
            this.showToast('Product added to cart', 'success');
            
            // Reset button after delay
            setTimeout(() => {
              $button.removeClass('added').text(originalText);
            }, 2000);
          },
          error: (xhr, status, error) => {
            console.error('Add to cart error:', error);
            this.showToast('Failed to add product to cart', 'error');
            $button.removeClass('loading').text(originalText);
          }
        });
      });
    }

    /**
     * Quick View Modal
     */
    bindQuickView() {
      $(document).on('click', '.quick-view-btn', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const $button = $(e.currentTarget);
        const productId = $button.data('product-id');
        
        this.openQuickView(productId);
      });
      
      // Close modal on overlay click
      $(document).on('click', '#quick-view-modal-overlay', (e) => {
        if (e.target === e.currentTarget) {
          this.closeQuickView();
        }
      });
      
      // Close modal on close button
      $(document).on('click', '#quick-view-close', () => {
        this.closeQuickView();
      });
      
      // Close on ESC key
      $(document).on('keydown', (e) => {
        if (e.key === 'Escape' && $('#quick-view-modal').length) {
          this.closeQuickView();
        }
      });
    }

    /**
     * Open Quick View Modal
     */
    openQuickView(productId) {
      // Create modal structure
      const modal = `
        <div id="quick-view-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div id="quick-view-modal-overlay" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div class="relative bg-card border border-border rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button id="quick-view-close" class="absolute top-4 right-4 z-10 bg-background hover:bg-muted rounded-full p-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div id="quick-view-content" class="p-6">
              <div class="flex items-center justify-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-tactical"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      $('body').append(modal).addClass('overflow-hidden');
      
      // Load product content via AJAX
      $.ajax({
        type: 'POST',
        url: armsComplexProductCard.ajaxUrl,
        data: {
          action: 'get_quick_view_product',
          nonce: armsComplexProductCard.nonce,
          product_id: productId,
        },
        success: (response) => {
          if (response.success) {
            $('#quick-view-content').html(response.data.html);
          } else {
            $('#quick-view-content').html('<p class="text-destructive">Failed to load product details.</p>');
          }
        },
        error: () => {
          $('#quick-view-content').html('<p class="text-destructive">An error occurred. Please try again.</p>');
        }
      });
    }

    /**
     * Close Quick View Modal
     */
    closeQuickView() {
      $('#quick-view-modal').fadeOut(200, function() {
        $(this).remove();
        $('body').removeClass('overflow-hidden');
      });
    }

    /**
     * Show Toast Notification
     */
    showToast(message, type = 'success') {
      const bgColor = type === 'success' ? 'bg-accent' : 'bg-destructive';
      const toast = `
        <div class="arms-toast fixed bottom-4 right-4 ${bgColor} text-${type === 'success' ? 'accent' : 'destructive'}-foreground px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ${message}
        </div>
      `;
      
      const $toast = $(toast);
      $('body').append($toast);
      
      setTimeout(() => {
        $toast.fadeOut(300, function() {
          $(this).remove();
        });
      }, 3000);
    }
  }

  /**
   * Initialize on DOM ready
   */
  $(document).ready(function() {
    window.productCardInstance = new ProductCard();
  });

  // Expose globally
  window.armsComplexProductCard = window.productCardInstance;

})(jQuery);
