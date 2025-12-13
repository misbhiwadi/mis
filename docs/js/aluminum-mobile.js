// Aluminum page mobile-specific JavaScript functionality

// Sticky header functionality
window.addEventListener('scroll', function () {
    var stickyHeader = document.querySelector('.sticky-header');

    if (stickyHeader) {
        if (window.pageYOffset >= 150) {
            stickyHeader.classList.add('show');
            document.body.classList.add('sticky-active');
        } else {
            stickyHeader.classList.remove('show');
            document.body.classList.remove('sticky-active');
        }

        // Ensure sticky menu doesn't auto-open
        document.querySelectorAll('.sticky-header .navbar-collapse').forEach(function (menu) {
            menu.classList.remove('in');
            menu.style.height = '0px';
            menu.style.overflow = 'hidden';
        });
    }
});

$(document).ready(function() {
    // Auto-close sticky menu on page scroll
    var lastScrollTop = 0;
    var menuOpenTime = 0;
    var initialScrollAfterOpen = true;

    // Track when menu opens
    $('.sticky-header .navbar-collapse').on('shown.bs.collapse', function () {
        menuOpenTime = Date.now();
        initialScrollAfterOpen = true;
    });

    $(window).on('scroll', function () {
        var currentScrollTop = $(this).scrollTop();
        var $stickyMenu = $('.sticky-header .navbar-collapse');

        // Only check if sticky menu is open
        if ($stickyMenu.hasClass('in')) {
            // If user is scrolling down (not up)
            if (currentScrollTop > lastScrollTop) {
                var timeSinceOpen = Date.now() - menuOpenTime;

                // Skip first scroll within 500ms of opening, then close on next scroll
                if (initialScrollAfterOpen && timeSinceOpen < 500) {
                    initialScrollAfterOpen = false; // Mark first scroll as handled
                } else {
                    // Close the menu
                    $stickyMenu.collapse('hide');
                }
            }
        }

        lastScrollTop = currentScrollTop;
    });

    // Close sticky header menu when submenu items are clicked on mobile
    $('.dropdown ul a[href="aluminium-fabrication-bhiwadi.html"]').on('click', function(e) {
        var text = $(this).text().replace(/\s+/g, ' ').trim();
        
        // Only for submenu items (not main dropdown) on mobile
        if (text !== 'Aluminium Fabrication & Glass' && window.innerWidth <= 767) {
            $('.sticky-header .navbar-collapse').collapse('hide');
        }
    });
});
