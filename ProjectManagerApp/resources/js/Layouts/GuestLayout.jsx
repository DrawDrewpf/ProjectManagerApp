import { Link } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col lg:flex-row"> 

            {/* Column Left*/}
            <div className="relative flex flex-col justify-center items-center w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen p-6 lg:p-12 text-white">
                {/* Aurora Background Effect - Always visible */}
                <div className="aurora-bg">
                    <div className="aurora aurora-blur"></div>
                    <div className="aurora aurora-2 aurora-blur"></div>
                    <div className="aurora aurora-3 aurora-blur"></div>
                </div>

                <div className="relative z-10 text-center">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white drop-shadow-lg">Welcome to</h1>
                    <Link href="/">
                        <ApplicationLogo variant="horizontal" className="mx-auto mb-6 h-32 w-32 sm:h-44 sm:w-44 lg:h-64 lg:w-64 fill-current drop-shadow-lg" />
                    </Link>
                    <div className='hidden lg:block bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20'>
                        <p className="text-sm lg:text-base text-white font-medium">
                            Streamline project planning, collaboration, and deadlines with intuitive tools and real-time tracking. Empower your team to work smarter and deliver results faster.
                        </p>
                    </div>
                </div>
                
                <div className="absolute bottom-4 left-4 z-10 text-xs opacity-70 text-white drop-shadow hidden lg:block">
                    Andrés Peidro Fernádez
                </div>
            </div>

            {/* Column Right*/}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 lg:p-12 bg-gray-100 dark:bg-gray-900">
                <div className="z-10 w-full max-w-md overflow-hidden rounded-xl bg-white px-6 py-8 shadow-xl dark:bg-gray-800">
                    {children}
                </div>
                
                {/* Mobile author credit */}
                <div className="mt-4 text-xs opacity-70 text-gray-600 dark:text-gray-400 lg:hidden">
                    Andrés Peidro Fernádez
                </div>
            </div>
            {/* Theme Toggle Button*/}
            <div className="fixed top-4 right-4 z-30">
                <ThemeToggle />
            </div>
        </div>
    );
}
