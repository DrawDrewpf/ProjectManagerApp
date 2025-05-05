import { useState, useEffect } from 'react';

export default function ApplicationLogo({ variant = 'horizontal', mode, className = '', ...props }) {
    // variant options: 'horizontal', 'vertical', 'icon'
    // mode options: 'dark', 'light' (now optional as it will be detected automatically if not provided)
    
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Use provided mode if it exists
        if (mode !== undefined) {
            return mode;
        }
        
        // Otherwise autodetect from system
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme) {
                return savedTheme;
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    // Update theme when system theme changes or localStorage changes
    useEffect(() => {
        if (mode !== undefined) {
            return; 
        }

        // Listen for theme changes from ThemeToggle
        const handleThemeChange = (event) => {
            setCurrentTheme(event.detail);
        };

        // Listen for changes in localStorage
        const handleStorageChange = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setCurrentTheme(savedTheme);
            }
        };

        // Listen for the custom event from ThemeToggle
        window.addEventListener('themeChanged', handleThemeChange);
        
        // Listen for changes in localStorage (when changed from another tab)
        window.addEventListener('storage', handleStorageChange);
        
        // Initial setup and cleanup
        return () => {
            window.removeEventListener('themeChanged', handleThemeChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [mode]);
    
    const getLogoPath = () => {
        // Define the base path and color prefix based on mode and variant
        const basePath = '/images/Logos/';
        const colorPrefix = currentTheme === 'dark' ? 'LogoDarkDrew' : 'LogoWhiteDrew';
        
        switch (variant) {
            case 'horizontal':
                return `${basePath}${colorPrefix}Hor.png`;
            case 'icon':
                return `${basePath}${colorPrefix}Mono.png`;
            case 'vertical':
                return `${basePath}${colorPrefix}Ver.png`;
            default:
                return `${basePath}${colorPrefix}Mono.png`;
        }
    };

    return (
        <img 
            src={getLogoPath()} 
            alt="DrewApp Logo" 
            className={className}
            {...props}
        />
    );
}