// Theme switching functionality
function initializeThemeSwitcher() {
    const root = document.documentElement;
    const themeButtons = document.querySelectorAll('.theme-btn');

    const savedTheme = localStorage.getItem('preferred-theme') || 'gruvbox-dark';
    root.setAttribute('data-theme', savedTheme);

    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            root.setAttribute('data-theme', theme);
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            localStorage.setItem('preferred-theme', theme);
        });
    });
}

// Initialize theme switcher on DOMContentLoaded for pages that don't use dynamic loading
document.addEventListener('DOMContentLoaded', initializeThemeSwitcher);

// Function to fix navigation links based on current location
function fixNavigationLinks() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip external links (like GitHub)
        if (href.startsWith('http') || href.startsWith('#')) {
            return;
        }
        
        // Determine the correct path based on current location
        let correctPath;
        
        if (path.includes('/blog/zig-lang/') || path.includes('/blog/dwm/')) {
            // For subdirectories in blog/
            if (href === 'index.html') {
                correctPath = '../../index.html';
            } else if (href === 'projects.html') {
                correctPath = '../../projects.html';
            } else if (href === 'blog.html') {
                correctPath = '../../blog.html';
            } else if (href === 'index.html#contact') {
                correctPath = '../../index.html#contact';
            }
        } else if (path.includes('/blog/')) {
            // For files directly in blog/
            if (href === 'index.html') {
                correctPath = '../index.html';
            } else if (href === 'projects.html') {
                correctPath = '../projects.html';
            } else if (href === 'blog.html') {
                correctPath = '../blog.html';
            } else if (href === 'index.html#contact') {
                correctPath = '../index.html#contact';
            }
        } else {
            // For root level files, keep original paths
            correctPath = href;
        }
        
        if (correctPath && correctPath !== href) {
            link.setAttribute('href', correctPath);
        }
    });
}

// Function to load header component
async function loadHeader(customTitle = null) {
    try {
        // Check if header already exists
        const existingHeader = document.querySelector('header');
        if (existingHeader) {
            // Header already exists, fix navigation links and update title if needed
            fixNavigationLinks();
            if (customTitle) {
                const titleElement = document.getElementById('site-title');
                if (titleElement) {
                    titleElement.textContent = customTitle;
                }
            }
            return;
        }

        // Determine the correct path based on current location
        const path = window.location.pathname;
        let headerPath;
        
        if (path.includes('/blog/zig-lang/') || path.includes('/blog/dwm/')) {
            // For subdirectories in blog/
            headerPath = '../../components/header.html';
        } else if (path.includes('/blog/')) {
            // For files directly in blog/
            headerPath = '../components/header.html';
        } else {
            // For root level files
            headerPath = 'components/header.html';
        }
        
        const response = await fetch(headerPath);
        const headerHTML = await response.text();
        
        // Insert header at the very beginning of body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Fix navigation links based on current location
        fixNavigationLinks();
        
        // Set custom title if provided
        if (customTitle) {
            const titleElement = document.getElementById('site-title');
            if (titleElement) {
                titleElement.textContent = customTitle;
            }
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Function to load theme switcher component
async function loadThemeSwitcher() {
    try {
        // Check if theme switcher already exists
        const existingThemeSwitcher = document.querySelector('.theme-switcher');
        if (existingThemeSwitcher) {
            // Theme switcher already exists, just reinitialize
            initializeThemeSwitcher();
            return;
        }

        // Determine the correct path based on current location
        const path = window.location.pathname;
        let themeSwitcherPath;
        
        if (path.includes('/blog/zig-lang/') || path.includes('/blog/dwm/')) {
            // For subdirectories in blog/
            themeSwitcherPath = '../../components/theme-switcher.html';
        } else if (path.includes('/blog/')) {
            // For files directly in blog/
            themeSwitcherPath = '../components/theme-switcher.html';
        } else {
            // For root level files
            themeSwitcherPath = 'components/theme-switcher.html';
        }
        
        const response = await fetch(themeSwitcherPath);
        const themeSwitcherHTML = await response.text();
        
        // Insert theme switcher at the very beginning of body
        document.body.insertAdjacentHTML('afterbegin', themeSwitcherHTML);
        
        // Initialize theme switcher functionality for the newly loaded buttons
        initializeThemeSwitcher();
    } catch (error) {
        console.error('Error loading theme switcher:', error);
    }
}

// Function to load both components
async function loadComponents(customTitle = null) {
    await loadHeader(customTitle);
    await loadThemeSwitcher();
}
