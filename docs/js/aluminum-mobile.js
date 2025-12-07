/* Aluminum Page Mobile JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Sticky header functionality
    window.addEventListener('scroll', function () {
        var stickyHeader = document.querySelector('.sticky-header');
        
        if (window.pageYOffset >= 150) {
            stickyHeader.classList.add('show');
            document.body.classList.add('sticky-active');
        } else {
            stickyHeader.classList.remove('show');
            document.body.classList.remove('sticky-active');
        }
    });

    // Mobile menu toggle functionality
    const navToggle = document.querySelector('.navbar-toggle');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    if (navToggle && navCollapse) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the 'in' class for Bootstrap collapse
            if (navCollapse.classList.contains('in')) {
                navCollapse.classList.remove('in');
                navCollapse.style.height = '0px';
                navCollapse.style.overflow = 'hidden';
            } else {
                navCollapse.classList.add('in');
                navCollapse.style.height = 'auto';
                navCollapse.style.overflow = 'visible';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navCollapse.contains(e.target)) {
                navCollapse.classList.remove('in');
                navCollapse.style.height = '0px';
                navCollapse.style.overflow = 'hidden';
            }
        });
    }

    // Mobile dropdown functionality - COPY from about.html mobile-menu.js
    const dropdownItems = document.querySelectorAll('.navigation li.dropdown');
    
    dropdownItems.forEach(function(dropdown) {
        const dropdownLink = dropdown.querySelector('> a');
        const dropdownMenu = dropdown.querySelector('> ul');
        
        if (dropdownLink && dropdownMenu) {
            // Add click handler for dropdown toggle
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Immediately prevent any URL change
                const currentUrl = window.location.href.split('#')[0];
                window.history.replaceState(null, null, currentUrl);
                
                // Toggle active class
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    dropdownMenu.style.display = 'none';
                } else {
                    // Close other dropdowns
                    dropdownItems.forEach(function(otherDropdown) {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('> ul');
                            if (otherMenu) otherMenu.style.display = 'none';
                        }
                    });
                    
                    // Open this dropdown
                    dropdown.classList.add('active');
                    dropdownMenu.style.display = 'block';
                }
                
                // Double-check URL cleanup
                setTimeout(function() {
                    const cleanUrl = window.location.href.split('#')[0];
                    if (window.location.href !== cleanUrl) {
                        window.history.replaceState(null, null, cleanUrl);
                    }
                }, 10);
                
                return false;
            });
        }
    });

    // Handle second level dropdowns
    const secondLevelDropdowns = document.querySelectorAll('.navigation li.dropdown ul li.dropdown');
    
    secondLevelDropdowns.forEach(function(dropdown) {
        const dropdownLink = dropdown.querySelector('> a');
        const dropdownMenu = dropdown.querySelector('> ul');
        
        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    dropdownMenu.style.display = 'none';
                } else {
                    // Close other second level dropdowns
                    secondLevelDropdowns.forEach(function(otherDropdown) {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('> ul');
                            if (otherMenu) otherMenu.style.display = 'none';
                        }
                    });
                    
                    dropdown.classList.add('active');
                    dropdownMenu.style.display = 'block';
                }
            });
        }
    });

    // Close dropdowns when clicking on non-dropdown menu items
    const regularMenuLinks = document.querySelectorAll('.navigation li:not(.dropdown) > a');
    regularMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navCollapse.classList.remove('in');
            navCollapse.style.height = '0px';
            navCollapse.style.overflow = 'hidden';
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
