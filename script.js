// --- Global JavaScript for Droit Décodé ---

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Get the current page filename (e.g., 'index.html')
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Mobile Menu Toggle (Burger Menu)
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Close menu after clicking a link on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    }

    // 2. Active Link Indicator
    // Adds the 'active' class to the link corresponding to the current page.
    navLinks.forEach(link => {
        // Get the link's filename
        const linkPath = link.getAttribute('href').split('/').pop();

        // Check if the link path matches the current page path
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});

