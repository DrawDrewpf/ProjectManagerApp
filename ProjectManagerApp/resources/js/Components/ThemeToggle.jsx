import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Dropdown from '@/Components/Dropdown';

export default function ThemeToggle({ className = '' }) {
    const [theme, setTheme] = useState(() => {
       
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

    /// Load theme from localStorage on initial render
    useEffect(() => {
        const root = window.document.documentElement;
        
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        // Save the theme to localStorage
        localStorage.setItem('theme', theme);
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    }, [theme]);

    // Change theme 
    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <div className={`fixed top-5 right-5 z-30 ${className}`}>
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:text-white">
                        {theme === 'dark' ? (
                            <MoonIcon className="h-6 w-6" />
                        ) : (
                            <SunIcon className="h-6 w-6" />
                        )}
                    </button>
                </Dropdown.Trigger>
               <Dropdown.Content align="right" width="48" className="mb-2 bottom-full">
    <div className="p-1">
        <button
            onClick={() => toggleTheme('light')}
            className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                theme === 'light'
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            } rounded-md`}
        >
            <SunIcon className="mr-2 h-5 w-5" />
            Light Mode
        </button>
        <button
            onClick={() => toggleTheme('dark')}
            className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                theme === 'dark'
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            } rounded-md`}
        >
            <MoonIcon className="mr-2 h-5 w-5" />
            Dark Mode
        </button>
    </div>
</Dropdown.Content>
            </Dropdown>
        </div>
    );
}