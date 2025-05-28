import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Dropdown from '@/Components/Dropdown';
import { useTheme } from '@/Contexts/ThemeContext';

export default function ThemeToggle({ className = '' }) {    const { setTheme, getCurrentTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(() => getCurrentTheme());

    // Only re-render this component when theme changes
    useEffect(() => {
        const handleThemeChange = (event) => {
            setCurrentTheme(event.detail.theme);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, []);

    // Optimized function for theme change
    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <div className={`fixed top-5 right-5 z-30 ${className}`}>
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800 dark:text-white relative overflow-hidden">                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                            <SunIcon className={`h-6 w-6 transition-transform duration-300 ${currentTheme === 'dark' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                            <MoonIcon className={`h-6 w-6 transition-transform duration-300 ${currentTheme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
                        </div>
                    </button>
                </Dropdown.Trigger>
               <Dropdown.Content align="right" width="48" className="mb-2 bottom-full">
                    <div className="p-1">                        <button
                            onClick={() => toggleTheme('light')}
                            className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                                currentTheme === 'light'
                                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                            } rounded-md transition-colors duration-200`}
                        >
                            <SunIcon className="mr-2 h-5 w-5" />
                            Light Mode
                        </button>
                        <button
                            onClick={() => toggleTheme('dark')}
                            className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                                currentTheme === 'dark'
                                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                            } rounded-md transition-colors duration-200`}
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