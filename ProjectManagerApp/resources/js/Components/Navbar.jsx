import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Avatar from '@/Components/Avatar';

import { 
    SunIcon, 
    MoonIcon, 
    ArrowRightEndOnRectangleIcon, 
    UserIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function Navbar({ toggle, currentTheme, showingNavigationDropdown, setShowingNavigationDropdown }) {
    const user = usePage().props.auth.user;

    const navigationLinks = [
        {
            href: route('dashboard'),
            active: route().current('dashboard'),
            label: 'Dashboard'
        },
        {
            href: route('projects.index'),
            active: route().current('projects.index'),
            label: 'Projects'
        },
        {
            href: route('tasks.index'),
            active: route().current('tasks.index'),
            label: 'All Tasks'
        },
        {
            href: route('users.index'),
            active: route().current('users.index'),
            label: 'Users'
        },
        {
            href: route('tasks.myTasks'),
            active: route().current('tasks.myTasks'),
            label: 'My Tasks'
        }
    ];

    return (
        <nav className="relative border-b border-gray-100 dark:border-gray-700 bg-transparent">
            {/* Aurora Background Effect */}
            <div className="aurora-bg absolute inset-0">
                <div className="aurora aurora-blur"></div>
                <div className="aurora aurora-2 aurora-blur"></div>
                <div className="aurora aurora-3 aurora-blur"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    {/* Left Section - Logo & Navigation */}
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link href="/" className="group">
                                <ApplicationLogo 
                                    variant="mono" 
                                    className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200 transition-transform group-hover:scale-105" 
                                />
                            </Link>
                        </div>                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:ml-10 md:space-x-6 lg:space-x-8">
                            {navigationLinks.map((link) => (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    active={link.active}
                                    className="nav-button px-3 py-2 text-sm font-medium transition-colors relative"
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>                    {/* Right Section - User Menu */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        {/* Theme Toggle Button - Visible on all screen sizes */}
                        <button
                            onClick={toggle}
                            className="nav-button p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        >
                            {currentTheme === 'light' ? (
                                <MoonIcon className="h-5 w-5" />
                            ) : (
                                <SunIcon className="h-5 w-5" />
                            )}
                        </button>

                        {/* Desktop User Menu */}
                        <div className="hidden md:flex md:items-center">
                            {/* User Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button 
                                        type="button"
                                        className="nav-button flex items-center space-x-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <div className="avatar-glow">
                                            <Avatar user={user} size="sm" showStatus={true} />
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <div className="font-medium text-gray-900 dark:text-white truncate max-w-32">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                                                {user.email}
                                            </div>
                                        </div>
                                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                    </button>
                                </Dropdown.Trigger>                                <Dropdown.Content className="dropdown-glass w-56">
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar-glow">
                                                <Avatar user={user} size="md" showStatus={true} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Dropdown.Link href={route('profile.edit')}>
                                        <div className="flex items-center">
                                            <UserIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                                            Profile
                                        </div>
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        <div className="flex items-center">
                                            <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                                            Log Out
                                        </div>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="nav-button inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-200 ${showingNavigationDropdown ? 'mobile-menu-enter-active' : 'mobile-menu-exit-active'} ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                <div className="border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    {/* Navigation Links */}
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigationLinks.map((link) => (
                            <ResponsiveNavLink
                                key={link.href}
                                href={link.href}
                                active={link.active}
                            >
                                {link.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pb-1 pt-4">                        {/* User Info */}
                        <div className="px-4 mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="avatar-glow">
                                    <Avatar user={user} size="lg" showStatus={true} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-base font-medium text-gray-800 dark:text-gray-200 truncate">
                                        {user.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>                        {/* Mobile Menu Actions */}
                        <div className="space-y-1 px-4">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                <div className="flex items-center">
                                    <UserIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                                    Profile
                                </div>
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                <div className="flex items-center">
                                    <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                                    Log Out
                                </div>
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
