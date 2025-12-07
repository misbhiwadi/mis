document.addEventListener('DOMContentLoaded', function() {
    // Handle Aluminium Fabrication submenu clicks
    document.querySelectorAll('.dropdown ul a').forEach(function(link) {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        
        // Only handle Aluminium Fabrication submenu items
        if (href === 'aluminium-fabrication-bhiwadi.html' && text !== 'Aluminium Fabrication & Glass') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close menus
                document.querySelectorAll('.navbar-collapse.in').forEach(function(menu) {
                    menu.classList.remove('in');
                });
                
                // Map text to carousel ID
                let targetId = '#carousel-9'; // default
                
                if (text === 'False Ceiling') targetId = '#carousel-7';
                else if (text === 'Glass Partition') targetId = '#carousel-5';
                else if (text === 'Kitchen Cabinet') targetId = '#carousel-6';
                else if (text === 'Doors & Windows') targetId = '#carousel-1';
                else if (text === 'Sliding Folding') targetId = '#carousel-2';
                else if (text === 'Composite Panel System') targetId = '#carousel-4';
                else if (text === 'Structural Glassing') targetId = '#carousel-8';
                else if (text === 'Glass Film') targetId = '#carousel-glass-film-new';
                else if (text === 'Facade Exterior') targetId = '#carousel-facade';
                else if (text === 'Curtains Window & Door') targetId = '#carousel-curtains';
                else if (text === 'Mosquito Mesh') targetId = '#carousel-mosquito-mesh';
                else if (text === 'Balcony Cover') targetId = '#carousel-balcony-cover';
                
                // Scroll to target
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    });
});
