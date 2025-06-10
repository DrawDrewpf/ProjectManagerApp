import { useState, useEffect } from 'react';

import Navbar from '@/Components/Navbar';
import FlashMessages from '@/Components/FlashMessages';
import { useTheme } from '@/Contexts/ThemeContext';
import { ToastProvider } from '@/Contexts/ToastContext';


export default function AuthenticatedLayout({ header, children }) {
    const { toggle, getCurrentTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(() => getCurrentTheme());
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Only listen to theme changes to update local state
    useEffect(() => {
        const handleThemeChange = (event) => {
            setCurrentTheme(event.detail.theme);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, []);

    return (
        <ToastProvider>
            <div className="min-h-screen flex flex-col">
                <FlashMessages />
                
                <Navbar 
                    toggle={toggle}
                    currentTheme={currentTheme}
                    showingNavigationDropdown={showingNavigationDropdown}
                    setShowingNavigationDropdown={setShowingNavigationDropdown}
                />

                <div className="flex flex-col flex-grow w-full h-full bg-white dark:bg-gray-900">
                    {header && (
                        <header className="shadow bg-gray-50 dark:bg-gray-800">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main className="flex-grow w-full h-full">
                        {children}
                    </main>
                </div>
                
                {/* Flash Messages Component */}
                <FlashMessages />
            </div>
        </ToastProvider>
    );
}
