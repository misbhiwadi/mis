// Mobile Menu Toggle Functionality
(function($) {
    'use strict';
    
    function isMobile() {
        return window.innerWidth <= 767;
    }
    
    function initMobileMenu() {
        if (!isMobile()) return;
        
        // Add dropdown arrows for mobile - both main and sticky headers
        $('.main-menu .navigation > li.dropdown').each(function() {
            if (!$(this).find('.mobile-arrow').length) {
                $(this).find('> a').append('<span class="mobile-arrow fa fa-angle-down"></span>');
            }
        });
        
        $('.main-menu .navigation > li > ul > li.dropdown').each(function() {
            if (!$(this).find('.mobile-arrow').length) {
                $(this).find('> a').append('<span class="mobile-arrow fa fa-angle-right"></span>');
            }
        });
        
        // Remove hover functionality
        $('.main-menu .navigation > li.dropdown').off('mouseenter mouseleave');
        $('.main-menu .navigation > li > ul > li.dropdown').off('mouseenter mouseleave');
        
        // Main dropdown click handler - works for both headers
        $('.main-menu .navigation > li.dropdown > a').off('click.mobile').on('click.mobile', function(e) {
            if (isMobile()) {
                e.preventDefault();
                var $parent = $(this).parent();
                var $submenu = $parent.find('> ul');
                var $arrow = $(this).find('.mobile-arrow');
                
                // Close siblings
                $parent.siblings('.dropdown').removeClass('active');
                $parent.siblings('.dropdown').find('.mobile-arrow').removeClass('fa-angle-up').addClass('fa-angle-down');
                
                // Toggle current
                if ($parent.hasClass('active')) {
                    $parent.removeClass('active');
                    $arrow.removeClass('fa-angle-up').addClass('fa-angle-down');
                } else {
                    $parent.addClass('active');
                    $arrow.removeClass('fa-angle-down').addClass('fa-angle-up');
                }
            }
        });
        
        // Second level dropdown click handler
        $('.main-menu .navigation > li > ul > li.dropdown > a').off('click.mobile').on('click.mobile', function(e) {
            if (isMobile()) {
                e.preventDefault();
                var $parent = $(this).parent();
                var $submenu = $parent.find('> ul');
                var $arrow = $(this).find('.mobile-arrow');
                
                // Close siblings
                $parent.siblings('.dropdown').removeClass('active');
                $parent.siblings('.dropdown').find('.mobile-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
                
                // Toggle current
                if ($parent.hasClass('active')) {
                    $parent.removeClass('active');
                    $arrow.removeClass('fa-angle-down').addClass('fa-angle-right');
                } else {
                    $parent.addClass('active');
                    $arrow.removeClass('fa-angle-right').addClass('fa-angle-down');
                }
            }
        });
        
        // Close when clicking outside
        $(document).off('click.mobile').on('click.mobile', function(e) {
            if (isMobile() && !$(e.target).closest('.main-menu').length) {
                $('.main-menu .navigation li.dropdown').removeClass('active');
                $('.main-menu .navigation .mobile-arrow').removeClass('fa-angle-up fa-angle-down').addClass('fa-angle-down');
                $('.main-menu .navigation > li > ul .mobile-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
            }
        });
    }
    
    $(document).ready(function() {
        initMobileMenu();
    });
    
    $(window).on('resize', function() {
        if (!isMobile()) {
            $('.main-menu .navigation li.dropdown').removeClass('active');
            $('.main-menu .navigation ul').removeAttr('style');
            $('.mobile-arrow').remove();
        } else {
            initMobileMenu();
        }
    });
    
})(jQuery);

// Footer products toggle function - Available globally across all pages
function toggleFooterProducts(event) {
    event.preventDefault();
    var hiddenItems = document.querySelectorAll('.footer-hidden-items');
    var readMoreBtn = document.querySelector('.footer-read-more');

    if (hiddenItems[0].style.display === 'none') {
        // Show hidden items
        hiddenItems.forEach(function (item) {
            item.style.display = 'list-item';
        });
        readMoreBtn.textContent = 'Show Less';
    } else {
        // Hide items
        hiddenItems.forEach(function (item) {
            item.style.display = 'none';
        });
        readMoreBtn.textContent = 'Read More';
    }
}
