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

// Function to load header component
async function loadHeader(customTitle = null) {
    try {
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
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
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
