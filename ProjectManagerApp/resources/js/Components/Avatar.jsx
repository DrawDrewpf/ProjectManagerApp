import React from 'react';

export default function Avatar({ 
    user, 
    size = 'md', 
    showStatus = false, 
    className = '',
    onClick = null 
}) {
    const sizeClasses = {
        xs: 'h-4 w-4 sm:h-6 sm:w-6 text-xs',
        sm: 'h-6 w-6 sm:h-8 sm:w-8 text-xs sm:text-sm',
        md: 'h-8 w-8 sm:h-10 sm:w-10 text-sm sm:text-base',
        lg: 'h-12 w-12 sm:h-16 sm:w-16 text-lg sm:text-xl',
        xl: 'h-16 w-16 sm:h-20 sm:w-20 text-xl sm:text-2xl',
        '2xl': 'h-20 w-20 sm:h-24 sm:w-24 text-2xl sm:text-3xl',
    };

    const statusColors = {
        active: 'bg-green-400',
        inactive: 'bg-gray-400',
        suspended: 'bg-red-400',
    };

    const getInitials = (name) => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length === 1) {
            return parts[0].charAt(0).toUpperCase();
        }
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const statusIndicatorSize = {
        xs: 'h-1 w-1 sm:h-1.5 sm:w-1.5',
        sm: 'h-1.5 w-1.5 sm:h-2 sm:w-2',
        md: 'h-2 w-2 sm:h-2.5 sm:w-2.5',
        lg: 'h-3 w-3 sm:h-4 sm:w-4',
        xl: 'h-4 w-4 sm:h-5 sm:w-5',
        '2xl': 'h-5 w-5 sm:h-6 sm:w-6',
    };

    const baseClasses = `
        inline-flex items-center justify-center rounded-full font-medium ring-1 ring-white dark:ring-gray-800 shadow-sm
        ${sizeClasses[size]}
        ${onClick ? 'cursor-pointer hover:opacity-80 transition-all duration-200' : ''}
        ${className}
    `.trim();

    return (
        <div className="relative inline-block flex-shrink-0">
            {user?.avatar_url ? (
                <img
                    src={user.avatar_url}
                    alt={user.name || 'User'}
                    className={`${baseClasses} object-cover`}
                    onClick={onClick}
                    onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
            ) : null}
            
            <div
                className={`${baseClasses} bg-gradient-to-br from-blue-500 to-blue-600 text-white ${user?.avatar_url ? 'hidden' : 'flex'}`}
                onClick={onClick}
                style={{ display: user?.avatar_url ? 'none' : 'flex' }}
            >
                {getInitials(user?.name)}
            </div>

            {showStatus && user?.status && (
                <span 
                    className={`
                        absolute bottom-0 right-0 block rounded-full ring-1 ring-white dark:ring-gray-800 shadow-sm
                        ${statusIndicatorSize[size]}
                        ${statusColors[user.status] || 'bg-gray-400'}
                    `}
                    title={user.status}
                />
            )}
        </div>
    );
}
