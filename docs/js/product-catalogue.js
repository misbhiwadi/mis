// Product Catalogue Lightbox JavaScript
$(document).ready(function() {
    console.log('Product catalogue script starting...');
    
    // Gallery functionality for product images
    $('.gallery-dot').click(function() {
        console.log('Gallery dot clicked');
        var imageNum = $(this).data('image');
        var productCard = $(this).closest('.product-card');
        var productImage = productCard.find('.product-image');
        var productName = productCard.find('.product-title').text().toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Update active dot
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        
        // Simple image switching without complex checking
        var productFolder = getProductFolder(productName);
        var newImageSrc = 'images/product/' + productFolder + '/image' + imageNum + '.webp';
        productImage.attr('src', newImageSrc);
        
        // Fallback to jpg if webp fails (only once)
        productImage.off('error').on('error', function() {
            if (!$(this).data('fallback-attempted')) {
                $(this).data('fallback-attempted', true);
                $(this).attr('src', 'images/product/' + productFolder + '/image' + imageNum + '.jpg');
            }
        });
    });
    
    // Simplified lightbox functionality
    $('.product-gallery').click(function() {
        console.log('Product gallery clicked');
        var productCard = $(this).closest('.product-card');
        var productName = productCard.find('.product-title').text();
        var productFolder = getProductFolder(productName.toLowerCase().replace(/[^a-z0-9]/g, '-'));
        
        // Create simple image array
        var images = [
            'images/product/' + productFolder + '/image1.webp',
            'images/product/' + productFolder + '/image2.webp',
            'images/product/' + productFolder + '/image3.webp'
        ];
        
        openLightbox(images, 0, productName);
    });
    
    console.log('Product catalogue script loaded successfully');
    
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
    
    // Function to map product names to folder names
    function getProductFolder(productName) {
        console.log('Getting folder for:', productName);
        var folderMap = {
            // False Ceiling products
            'gypsum-false-ceiling': 'false_ceiling/gypsum-false-ceiling',
            'pop--plaster-of-paris--false-ceiling': 'false_ceiling/pop',
            'pvc-false-ceiling': 'false_ceiling/pvc',
            'false-ceiling-with-led-lights': 'false_ceiling/light',
            'metal-false-ceiling': 'false_ceiling/metal',
            'grid---modular-false-ceiling': 'false_ceiling/grid',
            'acoustic-false-ceiling': 'false_ceiling/Acoustic',
            'wooden-false-ceiling': 'false_ceiling/Wooden',
            'glass-false-ceiling': 'false_ceiling/glass',
            'cement-board-false-ceiling': 'false_ceiling/cement',
            'outdoor---exterior-false-ceiling': 'false_ceiling/outdoor',
            'floating---island-false-ceiling': 'false_ceiling/floating',
            'coffered-false-ceiling': 'false_ceiling/coffered',
            'baffle-false-ceiling': 'false_ceiling/baffle',
            'fabric---stretch-false-ceiling': 'false_ceiling/fabric',
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
            // Doors & Gates products - Fixed to match actual HTML titles
            'aluminium-doors---gates--with-acp-sheet': 'acp-sheet-gates-doors',
            'aluminium-doors---gates--with-ms---ss-mesh': 'ms-ss-mesh-gates-doors',
            'aluminium-sliding-doors---gates-': 'sliding-gates-doors',
            'aluminium-folding-doors---gates-': 'folding-gates-doors',
            'aluminium-motorized-doors---gates-': 'motorized-gates-doors',
            'aluminium-single-doors---gates-': 'single-gates-doors',
            'aluminium-double-doors---gates-': 'double-gates-doors',
            'aluminium-hinged-doors---gates---top-hung---side-hung-': 'hinged-gates-doors',
            'aluminium-doors---gates--with-glass': 'glass-gates-doors',
            'aluminium-doors---gates--with-grill': 'grill-gates-doors',
            'aluminium-doors---gates--with-mesh': 'mesh-gates-doors',
            'aluminium-top-hung-sliding-doors---gates-': 'top-hung-sliding-gates-doors',
            'aluminium-multi-fold-doors---gates-': 'multi-fold-gates-doors',
            'aluminium-bathroom-doors---gates-': 'bathroom-gates-doors',
            'aluminium-bathroom-doors---gates--with-frosted-glass': 'bathroom-frosted-glass-gates-doors',
            'aluminium-shop-front-system': 'shop-front-system'
        };
        
        var result = folderMap[productName] || 'acp-sheet-gates-doors';
        console.log('Folder result:', result);
        return result;
    }
    
    // Simplified lightbox functionality
    function openLightbox(images, currentIndex, productName) {
        console.log('Opening lightbox for:', productName);
        
        // Show lightbox
        $('#productLightbox').show();
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
        
        // Fallback to jpg if webp fails
        $('#lightbox-image').on('error', function() {
            var jpgSrc = images[index].replace('.webp', '.jpg');
            $(this).attr('src', jpgSrc);
        });
    }
});
