import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 aurora-container">
            {/* Aurora Background Effect */}
            <div className="aurora-bg">
                <div className="aurora aurora-blur"></div>
                <div className="aurora aurora-2 aurora-blur"></div>
                <div className="aurora aurora-3 aurora-blur"></div>
            </div>
            
            <div className="relative z-10">
                <Link href="/">
                    <ApplicationLogo variant="horizontal" className="h-72 w-72 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white bg-opacity-70 backdrop-blur-sm px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800 dark:bg-opacity-70 relative z-10">
                {children}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />
        </div>
    );
}
