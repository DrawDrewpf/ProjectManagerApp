import { useState, useEffect } from 'react';
import { useTheme } from '@/Contexts/ThemeContext';

/**
 * Hook for components that need to re-render when theme changes
 * Only use when you really need the component to react to theme change
 */
export function useThemeState() {
    const { getCurrentTheme } = useTheme();
    const [theme, setTheme] = useState(() => getCurrentTheme());

    useEffect(() => {
        const handleThemeChange = (event) => {
            setTheme(event.detail.theme);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, []);

    return theme;
}

/**
 * Hook to apply CSS classes dynamically based on theme
 * More efficient than re-rendering components
 */
export function useThemeClasses(lightClasses = '', darkClasses = '') {
    const { getCurrentTheme } = useTheme();
    const [classes, setClasses] = useState(() => {
        const currentTheme = getCurrentTheme();
        return currentTheme === 'dark' ? darkClasses : lightClasses;
    });

    useEffect(() => {
        const handleThemeChange = (event) => {
            setClasses(event.detail.theme === 'dark' ? darkClasses : lightClasses);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, [lightClasses, darkClasses]);

    return classes;
}

/**
 * Hook for DOM elements that need to change without re-rendering React
 */
export function useThemeEffect(callback, dependencies = []) {
    const { getCurrentTheme } = useTheme();

    useEffect(() => {
        // Execute immediately
        callback(getCurrentTheme());

        const handleThemeChange = (event) => {
            callback(event.detail.theme);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, dependencies);
}
