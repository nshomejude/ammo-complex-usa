/**
 * Arms Complex - Main JavaScript
 * 
 * Core functionality for the theme
 * 
 * @package Arms_Complex
 */

(function($) {
    'use strict';

    // Initialize on document ready
    $(document).ready(function() {
        initMobileMenu();
        initScrollEffects();
        initTooltips();
        initSearchToggle();
        initQuantityButtons();
        initImageZoom();
        initTabs();
        initAccordions();
        initSmoothScroll();
        initBackToTop();
    });

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const mobileMenuToggle = $('.mobile-menu-toggle');
        const mobileMenu = $('.mobile-menu');
        const body = $('body');

        mobileMenuToggle.on('click', function(e) {
            e.preventDefault();
            mobileMenu.toggleClass('active');
            body.toggleClass('menu-open');
            $(this).attr('aria-expanded', mobileMenu.hasClass('active'));
        });

        // Close on overlay click
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.mobile-menu, .mobile-menu-toggle').length) {
                mobileMenu.removeClass('active');
                body.removeClass('menu-open');
                mobileMenuToggle.attr('aria-expanded', 'false');
            }
        });

        // Close on escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.hasClass('active')) {
                mobileMenu.removeClass('active');
                body.removeClass('menu-open');
                mobileMenuToggle.attr('aria-expanded', 'false');
            }
        });
    }

    /**
     * Scroll Effects - Header shrink and fade-in animations
     */
    function initScrollEffects() {
        const header = $('.site-header');
        let lastScroll = 0;

        $(window).on('scroll', function() {
            const currentScroll = $(this).scrollTop();

            // Add/remove scrolled class
            if (currentScroll > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }

            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 500) {
                header.addClass('header-hidden');
            } else {
                header.removeClass('header-hidden');
            }

            lastScroll = currentScroll;

            // Animate elements on scroll
            $('.animate-on-scroll').each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animated');
                }
            });
        });
    }

    /**
     * Initialize Tooltips
     */
    function initTooltips() {
        $('[data-tooltip]').each(function() {
            const $this = $(this);
            const tooltipText = $this.data('tooltip');
            
            $this.on('mouseenter focus', function() {
                const tooltip = $('<div class="tooltip">' + tooltipText + '</div>');
                $('body').append(tooltip);
                
                const position = $this.offset();
                tooltip.css({
                    top: position.top - tooltip.outerHeight() - 10,
                    left: position.left + ($this.outerWidth() / 2) - (tooltip.outerWidth() / 2)
                });
                
                setTimeout(() => tooltip.addClass('visible'), 10);
            });
            
            $this.on('mouseleave blur', function() {
                $('.tooltip').removeClass('visible');
                setTimeout(() => $('.tooltip').remove(), 300);
            });
        });
    }

    /**
     * Search Toggle
     */
    function initSearchToggle() {
        $('.search-toggle').on('click', function(e) {
            e.preventDefault();
            $('.search-form-wrapper').toggleClass('active');
            $('.search-form-wrapper input[type="search"]').focus();
        });

        $(document).on('click', function(e) {
            if (!$(e.target).closest('.search-form-wrapper, .search-toggle').length) {
                $('.search-form-wrapper').removeClass('active');
            }
        });
    }

    /**
     * Quantity Buttons
     */
    function initQuantityButtons() {
        $(document).on('click', '.quantity-button', function(e) {
            e.preventDefault();
            
            const $button = $(this);
            const $input = $button.siblings('input[type="number"]');
            const currentVal = parseFloat($input.val()) || 0;
            const max = parseFloat($input.attr('max')) || Infinity;
            const min = parseFloat($input.attr('min')) || 0;
            const step = parseFloat($input.attr('step')) || 1;
            
            let newVal;
            
            if ($button.hasClass('plus')) {
                newVal = Math.min(currentVal + step, max);
            } else {
                newVal = Math.max(currentVal - step, min);
            }
            
            $input.val(newVal).trigger('change');
        });
    }

    /**
     * Product Image Zoom
     */
    function initImageZoom() {
        $('.product-image-zoom').on('click', function(e) {
            e.preventDefault();
            const imageSrc = $(this).data('full-image') || $(this).attr('src');
            
            const modal = $(`
                <div class="image-zoom-modal">
                    <div class="image-zoom-overlay"></div>
                    <div class="image-zoom-content">
                        <button class="close-zoom" aria-label="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <img src="${imageSrc}" alt="Zoomed product image">
                    </div>
                </div>
            `);
            
            $('body').append(modal);
            setTimeout(() => modal.addClass('active'), 10);
            
            modal.find('.close-zoom, .image-zoom-overlay').on('click', function() {
                modal.removeClass('active');
                setTimeout(() => modal.remove(), 300);
            });
        });
    }

    /**
     * Tabs
     */
    function initTabs() {
        $('.tabs-nav button').on('click', function(e) {
            e.preventDefault();
            
            const $button = $(this);
            const tabId = $button.data('tab');
            const $tabsContainer = $button.closest('.tabs-container');
            
            // Update active button
            $tabsContainer.find('.tabs-nav button').removeClass('active');
            $button.addClass('active');
            
            // Update active content
            $tabsContainer.find('.tab-content').removeClass('active');
            $tabsContainer.find(`#${tabId}`).addClass('active');
        });
    }

    /**
     * Accordions
     */
    function initAccordions() {
        $('.accordion-header').on('click', function() {
            const $header = $(this);
            const $item = $header.closest('.accordion-item');
            const $content = $item.find('.accordion-content');
            const $accordion = $item.closest('.accordion');
            
            // Close others if single-open
            if ($accordion.hasClass('single-open')) {
                $accordion.find('.accordion-item').not($item).removeClass('active');
                $accordion.find('.accordion-content').not($content).slideUp(300);
            }
            
            // Toggle current
            $item.toggleClass('active');
            $content.slideToggle(300);
        });
    }

    /**
     * Smooth Scroll
     */
    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname) {
                
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (target.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800);
                }
            }
        });
    }

    /**
     * Back to Top Button
     */
    function initBackToTop() {
        const $backToTop = $('<button class="back-to-top" aria-label="Back to top"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg></button>');
        $('body').append($backToTop);
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                $backToTop.addClass('visible');
            } else {
                $backToTop.removeClass('visible');
            }
        });
        
        $backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
        });
    }

    /**
     * Toast Notifications
     */
    window.showToast = function(message, type = 'success') {
        const toast = $(`
            <div class="toast toast-${type}">
                <div class="toast-content">
                    <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'}
                    </svg>
                    <span>${message}</span>
                </div>
                <button class="toast-close" aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `);
        
        $('#toast-container').length || $('body').append('<div id="toast-container"></div>');
        $('#toast-container').append(toast);
        
        setTimeout(() => toast.addClass('visible'), 10);
        
        const autoClose = setTimeout(() => {
            toast.removeClass('visible');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
        
        toast.find('.toast-close').on('click', function() {
            clearTimeout(autoClose);
            toast.removeClass('visible');
            setTimeout(() => toast.remove(), 300);
        });
    };

    /**
     * AJAX Add to Cart
     */
    $(document).on('click', '.ajax-add-to-cart', function(e) {
        e.preventDefault();
        
        const $button = $(this);
        const productId = $button.data('product-id');
        const quantity = $button.closest('.product').find('input.qty').val() || 1;
        
        $button.addClass('loading').prop('disabled', true);
        
        $.ajax({
            url: armsComplex.ajaxUrl,
            type: 'POST',
            data: {
                action: 'add_to_cart',
                product_id: productId,
                quantity: quantity,
                nonce: armsComplex.nonce
            },
            success: function(response) {
                if (response.success) {
                    window.showToast('Product added to cart!', 'success');
                    $(document.body).trigger('wc_fragment_refresh');
                } else {
                    window.showToast(response.data.message || 'Error adding to cart', 'error');
                }
            },
            error: function() {
                window.showToast('Error adding to cart', 'error');
            },
            complete: function() {
                $button.removeClass('loading').prop('disabled', false);
            }
        });
    });

    /**
     * Load More Products (AJAX Pagination)
     */
    $(document).on('click', '.load-more-products', function(e) {
        e.preventDefault();
        
        const $button = $(this);
        const page = parseInt($button.data('page')) + 1;
        const maxPages = parseInt($button.data('max-pages'));
        
        $button.addClass('loading').prop('disabled', true);
        
        $.ajax({
            url: armsComplex.ajaxUrl,
            type: 'POST',
            data: {
                action: 'load_more_products',
                page: page,
                nonce: armsComplex.nonce
            },
            success: function(response) {
                if (response.success) {
                    $('.products').append(response.data.html);
                    $button.data('page', page);
                    
                    if (page >= maxPages) {
                        $button.hide();
                    }
                } else {
                    window.showToast('Error loading products', 'error');
                }
            },
            error: function() {
                window.showToast('Error loading products', 'error');
            },
            complete: function() {
                $button.removeClass('loading').prop('disabled', false);
            }
        });
    });

})(jQuery);
