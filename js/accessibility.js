// Accessibility Menu
class AccessibilityMenu {
    constructor() {
        this.menu = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        // Create menu structure
        this.createMenu();
        this.addEventListeners();
        this.setupKeyboardNavigation();
    }

    createMenu() {
        const menu = document.createElement('div');
        menu.className = 'accessibility-menu';
        menu.setAttribute('role', 'dialog');
        menu.setAttribute('aria-label', 'Accessibility Options');
        menu.innerHTML = `
            <button class="accessibility-toggle" aria-expanded="false">
                <i class="fas fa-universal-access"></i>
                <span>Accessibility</span>
            </button>
            <div class="accessibility-panel">
                <h2>Accessibility Options</h2>
                <div class="accessibility-options">
                    <div class="option-group">
                        <h3>Text Size</h3>
                        <div class="text-size-controls">
                            <button class="decrease-text" aria-label="Decrease text size">A-</button>
                            <button class="reset-text" aria-label="Reset text size">A</button>
                            <button class="increase-text" aria-label="Increase text size">A+</button>
                        </div>
                    </div>
                    <div class="option-group">
                        <h3>Color Contrast</h3>
                        <div class="contrast-controls">
                            <button class="high-contrast" aria-label="Toggle high contrast">High Contrast</button>
                            <button class="dark-mode" aria-label="Toggle dark mode">Dark Mode</button>
                        </div>
                    </div>
                    <div class="option-group">
                        <h3>Reading Guide</h3>
                        <button class="reading-guide" aria-label="Toggle reading guide">Enable Reading Guide</button>
                    </div>
                    <div class="option-group">
                        <h3>Screen Reader</h3>
                        <button class="screen-reader" aria-label="Toggle screen reader mode">Screen Reader Mode</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(menu);
        this.menu = menu;
    }

    addEventListeners() {
        const toggle = this.menu.querySelector('.accessibility-toggle');
        const panel = this.menu.querySelector('.accessibility-panel');
        
        // Toggle menu
        toggle.addEventListener('click', () => this.toggleMenu());
        
        // Text size controls
        this.menu.querySelector('.decrease-text').addEventListener('click', () => this.adjustTextSize(-1));
        this.menu.querySelector('.increase-text').addEventListener('click', () => this.adjustTextSize(1));
        this.menu.querySelector('.reset-text').addEventListener('click', () => this.resetTextSize());
        
        // Contrast controls
        this.menu.querySelector('.high-contrast').addEventListener('click', () => this.toggleHighContrast());
        this.menu.querySelector('.dark-mode').addEventListener('click', () => this.toggleDarkMode());
        
        // Reading guide
        this.menu.querySelector('.reading-guide').addEventListener('click', () => this.toggleReadingGuide());
        
        // Screen reader mode
        this.menu.querySelector('.screen-reader').addEventListener('click', () => this.toggleScreenReaderMode());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menu.contains(e.target) && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    setupKeyboardNavigation() {
        // Add keyboard navigation to all interactive elements
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Add skip links
        this.addSkipLinks();
    }

    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
        `;
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        const toggle = this.menu.querySelector('.accessibility-toggle');
        const panel = this.menu.querySelector('.accessibility-panel');
        
        toggle.setAttribute('aria-expanded', this.isOpen);
        panel.style.display = this.isOpen ? 'block' : 'none';
        
        if (this.isOpen) {
            panel.querySelector('button').focus();
        }
    }

    closeMenu() {
        this.isOpen = false;
        const toggle = this.menu.querySelector('.accessibility-toggle');
        const panel = this.menu.querySelector('.accessibility-panel');
        
        toggle.setAttribute('aria-expanded', 'false');
        panel.style.display = 'none';
    }

    adjustTextSize(direction) {
        const html = document.documentElement;
        const currentSize = parseFloat(getComputedStyle(html).fontSize);
        const newSize = currentSize + (direction * 2);
        
        if (newSize >= 12 && newSize <= 24) {
            html.style.fontSize = `${newSize}px`;
            this.savePreference('textSize', newSize);
        }
    }

    resetTextSize() {
        document.documentElement.style.fontSize = '16px';
        this.savePreference('textSize', 16);
    }

    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        this.savePreference('highContrast', document.body.classList.contains('high-contrast'));
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        this.savePreference('darkMode', document.body.classList.contains('dark-mode'));
    }

    toggleReadingGuide() {
        const guide = document.querySelector('.reading-guide-line');
        if (guide) {
            guide.remove();
        } else {
            this.createReadingGuide();
        }
        this.savePreference('readingGuide', !guide);
    }

    createReadingGuide() {
        const guide = document.createElement('div');
        guide.className = 'reading-guide-line';
        document.body.appendChild(guide);
        
        document.addEventListener('mousemove', (e) => {
            guide.style.top = `${e.clientY}px`;
        });
    }

    toggleScreenReaderMode() {
        document.body.classList.toggle('screen-reader-mode');
        this.savePreference('screenReaderMode', document.body.classList.contains('screen-reader-mode'));
        
        // Add ARIA labels and roles for screen reader mode
        if (document.body.classList.contains('screen-reader-mode')) {
            this.enhanceScreenReaderSupport();
        }
    }

    enhanceScreenReaderSupport() {
        // Add ARIA labels to images
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', 'Image');
        });
        
        // Add ARIA labels to buttons
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });
        
        // Add ARIA landmarks
        document.querySelectorAll('main, nav, aside, footer').forEach(element => {
            if (!element.getAttribute('role')) {
                element.setAttribute('role', element.tagName.toLowerCase());
            }
        });

        // Add ARIA live regions for dynamic content
        this.addLiveRegions();
        
        // Enhance form accessibility
        this.enhanceFormAccessibility();
        
        // Add keyboard shortcuts
        this.addKeyboardShortcuts();
    }

    addLiveRegions() {
        // Add live region for notifications
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
        
        // Store reference to live region
        this.liveRegion = liveRegion;
    }

    enhanceFormAccessibility() {
        // Add error handling for forms
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                const requiredFields = form.querySelectorAll('[required]');
                let hasError = false;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        hasError = true;
                        field.setAttribute('aria-invalid', 'true');
                        
                        // Add error message
                        const errorId = `${field.id}-error`;
                        let errorElement = document.getElementById(errorId);
                        
                        if (!errorElement) {
                            errorElement = document.createElement('div');
                            errorElement.id = errorId;
                            errorElement.className = 'error-message';
                            errorElement.setAttribute('role', 'alert');
                            field.parentNode.appendChild(errorElement);
                        }
                        
                        errorElement.textContent = 'This field is required';
                    } else {
                        field.removeAttribute('aria-invalid');
                        const errorElement = document.getElementById(`${field.id}-error`);
                        if (errorElement) {
                            errorElement.remove();
                        }
                    }
                });
                
                if (hasError) {
                    e.preventDefault();
                    this.announceToScreenReader('Please fix the errors in the form');
                }
            });
        });
    }

    addKeyboardShortcuts() {
        // Add keyboard shortcuts help
        const shortcuts = {
            'Alt + 1': 'Go to main content',
            'Alt + 2': 'Go to navigation',
            'Alt + M': 'Toggle accessibility menu',
            'Alt + H': 'Toggle high contrast',
            'Alt + D': 'Toggle dark mode',
            'Alt + R': 'Toggle reading guide',
            'Alt + S': 'Toggle screen reader mode'
        };
        
        // Create keyboard shortcuts help panel
        const helpPanel = document.createElement('div');
        helpPanel.className = 'keyboard-shortcuts-help';
        helpPanel.setAttribute('role', 'dialog');
        helpPanel.setAttribute('aria-label', 'Keyboard Shortcuts');
        helpPanel.innerHTML = `
            <h2>Keyboard Shortcuts</h2>
            <ul>
                ${Object.entries(shortcuts).map(([key, description]) => `
                    <li><kbd>${key}</kbd> - ${description}</li>
                `).join('')}
            </ul>
            <button class="close-help">Close</button>
        `;
        
        document.body.appendChild(helpPanel);
        
        // Add keyboard shortcut listener
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.querySelector('main').focus();
                        break;
                    case '2':
                        e.preventDefault();
                        document.querySelector('nav').focus();
                        break;
                    case 'm':
                        e.preventDefault();
                        this.toggleMenu();
                        break;
                    case 'h':
                        e.preventDefault();
                        this.toggleHighContrast();
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleDarkMode();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.toggleReadingGuide();
                        break;
                    case 's':
                        e.preventDefault();
                        this.toggleScreenReaderMode();
                        break;
                    case '?':
                        e.preventDefault();
                        this.toggleKeyboardShortcutsHelp();
                        break;
                }
            }
        });
    }

    toggleKeyboardShortcutsHelp() {
        const helpPanel = document.querySelector('.keyboard-shortcuts-help');
        const isVisible = helpPanel.style.display === 'block';
        
        helpPanel.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            helpPanel.querySelector('.close-help').focus();
        }
        
        this.announceToScreenReader(
            isVisible ? 'Keyboard shortcuts help closed' : 'Keyboard shortcuts help opened'
        );
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }

    savePreference(key, value) {
        const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences') || '{}');
        preferences[key] = value;
        localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    }

    loadPreferences() {
        const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences') || '{}');
        
        if (preferences.textSize) {
            document.documentElement.style.fontSize = `${preferences.textSize}px`;
        }
        
        if (preferences.highContrast) {
            document.body.classList.add('high-contrast');
        }
        
        if (preferences.darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        if (preferences.readingGuide) {
            this.createReadingGuide();
        }
        
        if (preferences.screenReaderMode) {
            document.body.classList.add('screen-reader-mode');
            this.enhanceScreenReaderSupport();
        }
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityMenu = new AccessibilityMenu();
    accessibilityMenu.loadPreferences();
}); 