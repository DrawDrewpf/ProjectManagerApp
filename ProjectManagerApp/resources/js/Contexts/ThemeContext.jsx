import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function ThemeProvider({ children }) {
    
    const initializeTheme = () => {
        if (typeof window === 'undefined') return 'light';
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
            return savedTheme;
        }
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        applyTheme(initialTheme);
        return initialTheme;
    };

    const applyTheme = (theme) => {
        if (typeof window === 'undefined') return;
        
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
        

        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme, timestamp: Date.now() } 
        }));
    };    // Optimized function for theme change
    const setTheme = (newTheme) => {
        applyTheme(newTheme);
    };

    // Get current theme without state
    const getCurrentTheme = () => {
        if (typeof window === 'undefined') return 'light';
        return localStorage.getItem('theme') || 'light';
    };

    // Initialize only once
    useEffect(() => {
        initializeTheme();
        
        // Listener for system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            // Only apply if no saved theme
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);    const contextValue = {
        setTheme,
        getCurrentTheme,
        // Utility functions
        isDark: () => getCurrentTheme() === 'dark',
        isLight: () => getCurrentTheme() === 'light',
        toggle: () => {
            const current = getCurrentTheme();
            setTheme(current === 'light' ? 'dark' : 'light');
        }
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
