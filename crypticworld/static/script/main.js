// Theme detection and management class
class ThemeManager {
    constructor() {
        this.root = document.body;
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Initialize theme
        this.setTheme();

        // Watch for system theme changes
        this.mediaQuery.addEventListener('change', () => this.setTheme());
    }

    setTheme() {
        const isDarkMode = this.mediaQuery.matches;

        // Remove existing theme classes
        this.root.classList.remove('light', 'dark');

        // Add appropriate theme class
        this.root.classList.add(isDarkMode ? 'dark' : 'light');

        // Optionally store theme preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: isDarkMode ? 'dark' : 'light' }
        }));
    }

    // Method to manually set theme
    setManualTheme(theme) {
        this.root.classList.remove('light', 'dark');
        this.root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }

    // Get current theme
    getCurrentTheme() {
        return this.root.classList.contains('dark') ? 'dark' : 'light';
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// toogleTheme button
const toogleButton = document.getElementById('toogle-theme-button')
toogleButton.addEventListener('click', function () {
    console.log("Is function running...")
    if (themeManager.getCurrentTheme() == 'dark') {
        themeManager.setManualTheme('light');
    } else {
        themeManager.setManualTheme('dark');
    }
})