import React from 'react';

export default function Avatar({ 
    user, 
    size = 'md', 
    showStatus = false, 
    className = '',
    onClick = null 
}) {
    const sizeClasses = {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-16 w-16 text-xl',
        xl: 'h-20 w-20 text-2xl',
        '2xl': 'h-24 w-24 text-3xl',
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
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-4 w-4',
        xl: 'h-5 w-5',
        '2xl': 'h-6 w-6',
    };

    const baseClasses = `
        inline-flex items-center justify-center rounded-full font-medium
        ${sizeClasses[size]}
        ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
        ${className}
    `;

    return (
        <div className="relative inline-block">
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
                className={`${baseClasses} bg-blue-500 text-white ${user?.avatar_url ? 'hidden' : 'flex'}`}
                onClick={onClick}
                style={{ display: user?.avatar_url ? 'none' : 'flex' }}
            >
                {getInitials(user?.name)}
            </div>

            {showStatus && user?.status && (
                <span 
                    className={`
                        absolute bottom-0 right-0 block rounded-full ring-2 ring-white
                        ${statusIndicatorSize[size]}
                        ${statusColors[user.status] || 'bg-gray-400'}
                    `}
                    title={user.status}
                />
            )}
        </div>
    );
}
