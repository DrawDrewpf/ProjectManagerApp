import { Link } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col sm:flex-row"> 

            {/* Column Left*/}
            <div className="relative flex flex-col justify-center items-center w-full sm:w-1/2 p-6 bg-transparent text-white sm:text-black sm:dark:text-white sm:p-12">
                {/* Aurora Background Effect - Hidden on mobile, shown on sm and up */}
                <div className="aurora-bg  ">
                    <div className="aurora aurora-blur"></div>
                    <div className="aurora aurora-2 aurora-blur"></div>
                    <div className="aurora aurora-3 aurora-blur"></div>
                </div>

                <div className="relative z-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white sm:text-black sm:dark:text-white">Welcome to</h1>
                    <Link href="/">
                        <ApplicationLogo variant="horizontal" className="mx-auto mb-6 h-44 w-44 md:h-64 md:w-64 lg:h-96 lg:w-96 fill-current" />
                    </Link>
                        <div className='hidden lg:block bg-gray-100 p-4 rounded-lg shadow-lg dark:bg-gray-800'>
                        <p className="text-sm sm:text-lg opacity-80 text-gray-900 dark:text-gray-100  font-bold">
                            Streamline project planning, collaboration, and deadlines with intuitive tools and real-time tracking. Empower your team to work smarter and deliver results faster.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 z-10 text-xs opacity-70 text-gray-800 dark:text-gray-100 hidden sm:block">
                    Andrés Peidro Fernádez
                </div>

                {/* Curved cutout element for the right side of the left column*/}
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 translate-x-[50%] w-20 h-96 bg-gray-100 dark:bg-gray-900 rounded-l-full"></div>
            </div>

            {/* Column Right*/}
            <div className="flex w-full sm:w-1/2 flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 sm:bg-gray-100 sm:dark:bg-gray-900">
                <div className="z-10 w-full max-w-md overflow-hidden rounded-xl bg-white px-6 py-8 shadow-xl dark:bg-gray-800">
                    {children}
                </div>
            </div>
            
            {/* Theme Toggle Button*/}
            <div className="absolute top-4 right-4 z-20">
                <ThemeToggle />
            </div>
        </div>
    );
}
