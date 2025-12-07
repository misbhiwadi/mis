// Aluminum page mobile-specific JavaScript functionality

$(document).ready(function() {
    // Close sticky header menu when submenu items are clicked on mobile
    $('.dropdown ul a[href="aluminium-fabrication-bhiwadi.html"]').on('click', function(e) {
        var text = $(this).text().replace(/\s+/g, ' ').trim();
        
        // Only for submenu items (not main dropdown) on mobile
        if (text !== 'Aluminium Fabrication & Glass' && window.innerWidth <= 767) {
            $('.sticky-header .navbar-collapse').collapse('hide');
        }
    });
});
