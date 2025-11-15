/**
 * Arms Complex - Product Variations
 * 
 * Handles product variation selection and quantity-based pricing
 * 
 * @package Arms_Complex
 */

(function($) {
    'use strict';

    class ProductVariations {
        constructor($container) {
            this.$container = $container;
            this.productId = $container.data('product-id');
            this.variations = $container.data('variations') || [];
            this.currentVariation = null;
            
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateVariation();
        }

        bindEvents() {
            const self = this;

            // Quantity selector change
            this.$container.find('.quantity-select').on('change', function() {
                self.updateVariation();
            });

            // Variation attribute change
            this.$container.find('.variation-attribute').on('change', function() {
                self.updateVariation();
            });

            // Quantity buttons
            this.$container.find('.quantity-button').on('click', function(e) {
                e.preventDefault();
                const $input = $(this).siblings('input.qty');
                const currentVal = parseInt($input.val()) || 1;
                const step = parseInt($input.data('step')) || 1;
                
                if ($(this).hasClass('plus')) {
                    $input.val(currentVal + step).trigger('change');
                } else if (currentVal > 1) {
                    $input.val(Math.max(1, currentVal - step)).trigger('change');
                }
                
                self.updateVariation();
            });
        }

        updateVariation() {
            const selectedQuantity = this.getSelectedQuantity();
            const selectedAttributes = this.getSelectedAttributes();
            
            // Find matching variation
            const variation = this.findVariation(selectedQuantity, selectedAttributes);
            
            if (variation) {
                this.currentVariation = variation;
                this.updateDisplay(variation);
                this.updateAddToCartButton(variation);
            }
        }

        getSelectedQuantity() {
            const $quantitySelect = this.$container.find('.quantity-select');
            if ($quantitySelect.length) {
                return parseInt($quantitySelect.val());
            }
            
            const $qtyInput = this.$container.find('input.qty');
            if ($qtyInput.length) {
                return parseInt($qtyInput.val()) || 1;
            }
            
            return 1;
        }

        getSelectedAttributes() {
            const attributes = {};
            
            this.$container.find('.variation-attribute').each(function() {
                const $select = $(this);
                const attributeName = $select.data('attribute-name');
                const value = $select.val();
                
                if (value) {
                    attributes[attributeName] = value;
                }
            });
            
            return attributes;
        }

        findVariation(quantity, attributes) {
            // First, try to find exact quantity match
            let matchingVariation = this.variations.find(v => {
                if (v.quantity && parseInt(v.quantity) === quantity) {
                    return this.attributesMatch(v.attributes, attributes);
                }
                return false;
            });
            
            if (matchingVariation) {
                return matchingVariation;
            }
            
            // If no exact match, find the appropriate price tier
            const sortedVariations = this.variations
                .filter(v => v.quantity)
                .sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
            
            for (let i = sortedVariations.length - 1; i >= 0; i--) {
                const variation = sortedVariations[i];
                if (parseInt(variation.quantity) <= quantity) {
                    if (this.attributesMatch(variation.attributes, attributes)) {
                        return variation;
                    }
                }
            }
            
            // Return default variation if available
            return this.variations.find(v => this.attributesMatch(v.attributes, attributes));
        }

        attributesMatch(variationAttrs, selectedAttrs) {
            if (!variationAttrs) return true;
            
            for (const key in variationAttrs) {
                if (selectedAttrs[key] && variationAttrs[key] !== selectedAttrs[key]) {
                    return false;
                }
            }
            
            return true;
        }

        updateDisplay(variation) {
            const $priceDisplay = this.$container.find('.variation-price');
            const $stockDisplay = this.$container.find('.variation-stock');
            const $descDisplay = this.$container.find('.variation-description');
            const $savingsDisplay = this.$container.find('.savings-badge');
            
            // Update price
            if ($priceDisplay.length && variation.price) {
                const formattedPrice = this.formatPrice(variation.price);
                const formattedRegularPrice = variation.regular_price ? 
                    this.formatPrice(variation.regular_price) : null;
                
                let priceHtml = `<span class="current-price">${formattedPrice}</span>`;
                
                if (formattedRegularPrice && formattedRegularPrice !== formattedPrice) {
                    priceHtml = `<del>${formattedRegularPrice}</del> ${priceHtml}`;
                    
                    // Calculate savings
                    const savings = ((parseFloat(variation.regular_price) - parseFloat(variation.price)) / 
                        parseFloat(variation.regular_price) * 100).toFixed(0);
                    
                    if ($savingsDisplay.length) {
                        $savingsDisplay.text(`Save ${savings}%`).show();
                    }
                } else {
                    if ($savingsDisplay.length) {
                        $savingsDisplay.hide();
                    }
                }
                
                if (variation.quantity) {
                    priceHtml += ` <span class="per-unit">(${this.formatPrice(variation.price / variation.quantity)} each)</span>`;
                }
                
                $priceDisplay.html(priceHtml);
            }
            
            // Update stock status
            if ($stockDisplay.length) {
                if (variation.is_in_stock) {
                    $stockDisplay.html('<span class="in-stock">In Stock</span>').show();
                } else {
                    $stockDisplay.html('<span class="out-of-stock">Out of Stock</span>').show();
                }
            }
            
            // Update description
            if ($descDisplay.length && variation.description) {
                $descDisplay.html(variation.description).show();
            }
            
            // Update SKU
            const $skuDisplay = this.$container.find('.variation-sku');
            if ($skuDisplay.length && variation.sku) {
                $skuDisplay.text(variation.sku);
            }
            
            // Trigger custom event
            this.$container.trigger('variation_updated', [variation]);
        }

        updateAddToCartButton(variation) {
            const $button = this.$container.find('.single_add_to_cart_button');
            
            if (!variation.is_in_stock) {
                $button.prop('disabled', true).text('Out of Stock');
            } else {
                $button.prop('disabled', false).text('Add to Cart');
            }
            
            // Update variation ID
            this.$container.find('input[name="variation_id"]').val(variation.variation_id || '');
        }

        formatPrice(price) {
            const amount = parseFloat(price);
            const currency = armsComplex.currencySymbol || '$';
            const decimals = armsComplex.priceDecimals || 2;
            
            return currency + amount.toFixed(decimals);
        }
    }

    // Initialize on document ready
    $(document).ready(function() {
        $('.variations-form, .product-variations').each(function() {
            new ProductVariations($(this));
        });
    });

    // Expose for external use
    window.ProductVariations = ProductVariations;

})(jQuery);
