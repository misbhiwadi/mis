// Mobile Chat Widget JavaScript - Simple Version
(function() {
    'use strict';
    
    // Add error handling
    try {
        // Configuration
        const config = {
            phoneNumber: '+919636055399',
            whatsappNumber: '+919636055399',
            whatsappMessage: 'Hi! I am interested in your industrial services. Please provide more information.',
            companyName: 'MicroTech Industrial Solutions'
        };
        
        // Simple initialization
        function init() {
            console.log('Mobile chat widget init - Screen width:', window.innerWidth);
            
            if (window.innerWidth <= 767) {
                console.log('Creating mobile chat widget...');
                addWidget();
            }
        }
        
        function addWidget() {
            // Remove existing widget if any
            const existing = document.querySelector('.mobile-chat-widget');
            if (existing) existing.remove();
            
            const widget = document.createElement('div');
            widget.className = 'mobile-chat-widget';
            widget.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                background: red !important;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: space-between;
                padding: 10px 15px;
                gap: 10px;
                height: 60px;
            `;
            
            widget.innerHTML = `
                <a href="tel:${config.phoneNumber}" style="
                    flex: 1;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 25px;
                    padding: 12px 15px;
                    font-size: 14px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                ">📞 Call Now</a>
                <a href="#" onclick="openWhatsApp()" style="
                    flex: 1;
                    background: #25D366;
                    color: white;
                    border: none;
                    border-radius: 25px;
                    padding: 12px 15px;
                    font-size: 14px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                ">💬 WhatsApp</a>
            `;
            
            document.body.appendChild(widget);
            document.body.style.paddingBottom = '70px';
            console.log('Chat widget added to page');
            
            // Add WhatsApp function to global scope
            window.openWhatsApp = function() {
                const message = encodeURIComponent(config.whatsappMessage);
                const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
                window.open(whatsappUrl, '_blank');
            };
        }
        
        // Initialize immediately or on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        // Handle resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 767) {
                if (!document.querySelector('.mobile-chat-widget')) {
                    addWidget();
                }
            } else {
                const widget = document.querySelector('.mobile-chat-widget');
                if (widget) widget.remove();
                document.body.style.paddingBottom = '';
            }
        });
        
    } catch (error) {
        console.error('Mobile chat widget error:', error);
    }
    
})();
