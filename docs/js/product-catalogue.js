// Product Catalogue Lightbox JavaScript
$(document).ready(function() {
    // Gallery functionality for product images
    $('.gallery-dot').click(function() {
        var imageNum = $(this).data('image');
        var productCard = $(this).closest('.product-card');
        var productImage = productCard.find('.product-image');
        var productName = productCard.find('.product-title').text().toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Update active dot
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        
        // Try webp first, fallback to jpg
        var productFolder = getProductFolder(productName);
        var webpSrc = 'images/product/' + productFolder + '/image' + imageNum + '.webp';
        var jpgSrc = 'images/product/' + productFolder + '/image' + imageNum + '.jpg';
        
        // Check if webp exists, fallback to jpg
        checkImageExists(webpSrc, function(exists) {
            var newImageSrc = exists ? webpSrc : jpgSrc;
            productImage.attr('src', newImageSrc);
        });
    });
    
    // Add lightbox functionality like gallery.html
    $('.product-gallery').click(function() {
        var productCard = $(this).closest('.product-card');
        var productName = productCard.find('.product-title').text();
        var productFolder = getProductFolder(productName.toLowerCase().replace(/[^a-z0-9]/g, '-'));
        
        // Create image array for this product with fallback support
        var images = [
            'images/product/' + productFolder + '/image1.webp',
            'images/product/' + productFolder + '/image2.webp',
            'images/product/' + productFolder + '/image3.webp'
        ];
        
        // Check if webp images exist, fallback to jpg
        checkImageExists(images[0], function(exists) {
            if (!exists) {
                images = [
                    'images/product/' + productFolder + '/image1.jpg',
                    'images/product/' + productFolder + '/image2.jpg',
                    'images/product/' + productFolder + '/image3.jpg'
                ];
            }
            openLightbox(images, 0, productName);
        });
    });
    
    // Function to check if image exists
    function checkImageExists(url, callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }
    
    // Function to map product names to folder names
    function getProductFolder(productName) {
        var folderMap = {
            // Windows products
            'aluminium-sliding-window--2-track---3-track-': 'Aluminium-Windows/sliding-window-2-3-track',
            'aluminium-sliding-window-with-glass': 'Aluminium-Windows/sliding-window-glass',
            'aluminium-sliding-window-with-mesh': 'Aluminium-Windows/sliding-window-mesh',
            'aluminium-sliding-window-with-grill': 'Aluminium-Windows/sliding-window-grill',
            'aluminium-sliding-window-with-acp-panel': 'Aluminium-Windows/sliding-window-acp-panel',
            'aluminium-casement-window--side-hung-': 'Aluminium-Windows/casement-window-side-hung',
            'aluminium-fixed-window': 'Aluminium-Windows/fixed-window',
            'aluminium-openable-window': 'Aluminium-Windows/openable-window',
            'aluminium-fixed-window-with-glass': 'Aluminium-Windows/fixed-window-glass',
            'aluminium-customizable-window': 'Aluminium-Windows/customizable-window',
            // Gates & Doors products
            'aluminium-gates---doors-with-acp-sheet': 'acp-sheet-gates-doors',
            'aluminium-gates---doors-with-ms---ss-mesh': 'ms-ss-mesh-gates-doors',
            'aluminium-sliding-gates---doors': 'sliding-gates-doors',
            'aluminium-folding-gates---doors': 'folding-gates-doors',
            'aluminium-motorized-gates---doors': 'motorized-gates-doors',
            'aluminium-single-gates---doors': 'single-gates-doors',
            'aluminium-double-gates---doors': 'double-gates-doors',
            'aluminium-hinged-gates---doors--top-hung---side-hung-': 'hinged-gates-doors',
            'aluminium-gates---doors-with-glass': 'glass-gates-doors',
            'aluminium-gates---doors-with-grill': 'grill-gates-doors',
            'aluminium-gates---doors-with-mesh': 'mesh-gates-doors',
            'aluminium-top-hung-sliding-gates---doors': 'top-hung-sliding-gates-doors',
            'aluminium-multi-fold-gates---doors': 'multi-fold-gates-doors',
            'aluminium-bathroom-gates---doors': 'bathroom-gates-doors',
            'aluminium-bathroom-gates---doors-with-frosted-glass': 'bathroom-frosted-glass-gates-doors',
            'aluminium-shop-front-system': 'shop-front-system'
        };
        
        return folderMap[productName] || 'acp-sheet-gates-doors';
    }
    
    // Lightbox functionality (same as gallery.html)
    function openLightbox(images, currentIndex, productName) {
        // Create lightbox if it doesn't exist
        if (!$('#productLightbox').length) {
            $('body').append(`
                <div id="productLightbox" class="lightbox">
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <div class="lightbox-header">
                            <h3 id="lightbox-title"></h3>
                        </div>
                        <div class="lightbox-body">
                            <img id="lightbox-image" src="" alt="">
                            <div class="lightbox-nav">
                                <button class="lightbox-prev">&#8249;</button>
                                <button class="lightbox-next">&#8250;</button>
                            </div>
                        </div>
                        <div class="lightbox-footer">
                            <span id="lightbox-counter"></span>
                        </div>
                    </div>
                </div>
            `);
            
            // Add lightbox styles
            $('head').append(`
                <style>
                .lightbox {
                    display: none;
                    position: fixed;
                    z-index: 9999;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                }
                .lightbox-content {
                    position: relative;
                    margin: 2% auto;
                    width: 90%;
                    max-width: 800px;
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .lightbox-close {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    font-size: 30px;
                    font-weight: bold;
                    color: white;
                    cursor: pointer;
                    z-index: 10000;
                }
                .lightbox-header {
                    background: linear-gradient(135deg, #e31d23, #1E3F73);
                    color: white;
                    padding: 15px 20px;
                    text-align: center;
                }
                .lightbox-body {
                    position: relative;
                    text-align: center;
                    padding: 20px;
                }
                #lightbox-image {
                    max-width: 100%;
                    max-height: 500px;
                    object-fit: contain;
                }
                .lightbox-nav button {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #e31d23;
                    color: white;
                    border: none;
                    font-size: 30px;
                    padding: 10px 15px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .lightbox-prev { left: 10px; }
                .lightbox-next { right: 10px; }
                .lightbox-footer {
                    background: #f8f9fa;
                    padding: 10px;
                    text-align: center;
                    color: #666;
                }
                </style>
            `);
        }
        
        // Show lightbox
        $('#productLightbox').show();
        $('#lightbox-title').text(productName);
        showLightboxImage(images, currentIndex);
        
        // Navigation handlers
        $('.lightbox-prev').off('click').on('click', function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showLightboxImage(images, currentIndex);
        });
        
        $('.lightbox-next').off('click').on('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            showLightboxImage(images, currentIndex);
        });
        
        // Close handlers
        $('.lightbox-close, #productLightbox').off('click').on('click', function(e) {
            if (e.target === this) {
                $('#productLightbox').hide();
            }
        });
    }
    
    function showLightboxImage(images, index) {
        $('#lightbox-image').attr('src', images[index]);
        $('#lightbox-counter').text(`${index + 1} of ${images.length}`);
    }
    
    // Smooth scroll for call-to-action buttons
    $('.btn-primary, .btn-secondary').click(function(e) {
        if ($(this).attr('href').startsWith('#')) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        }
    });
    
    // Desktop call button functionality
    $('.btn-primary[href^="tel:"]').click(function(e) {
        // Check if it's desktop (screen width > 768px)
        if (window.innerWidth > 768) {
            e.preventDefault();
            
            // Show phone number popup for desktop
            if (!$('#phonePopup').length) {
                $('body').append(`
                    <div id="phonePopup" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:30px; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.3); z-index:10000; text-align:center; min-width:300px;">
                        <h3 style="color:#e31d23; margin-bottom:20px;">Call Us Now</h3>
                        <p style="font-size:1.1rem; font-weight:bold; color:#333; margin-bottom:5px;">+91-9636-055399</p>
                        <p style="font-size:1.1rem; font-weight:bold; color:#333; margin-bottom:20px;">+91-9828-612100</p>
                        <div>
                            <button onclick="window.open('tel:+919636055399', '_self')" style="background:#e31d23; color:white; border:none; padding:10px 20px; border-radius:5px; margin-right:10px; cursor:pointer;">Call Now</button>
                            <button onclick="$('#phonePopup').hide(); $('#phoneOverlay').hide();" style="background:#666; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Close</button>
                        </div>
                    </div>
                    <div id="phoneOverlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999;" onclick="$('#phonePopup').hide(); $(this).hide();"></div>
                `);
            }
            
            $('#phoneOverlay, #phonePopup').show();
        }
        // On mobile, let the tel: link work normally
    });
    
    // Add loading animation delay
    $('.product-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });
});

// SEO and Analytics tracking
function trackProductView(productName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_item', {
            'item_name': productName,
            'item_category': 'Aluminium Gates Doors',
            'item_brand': 'MicroTech Industrial'
        });
    }
}

// Track product interactions
$(document).on('click', '.product-card', function() {
    var productName = $(this).find('.product-title').text();
    trackProductView(productName);
});
