import { Link } from '@inertiajs/react';

 /*
 * ActionButton.jsx
 * 
 * A reusable button component that can be used for actions in data tables.
 * Supports different variants, sizes, and can be used as a link or button.
 */

export default function ActionButton({ 
    type = 'button', 
    variant = 'primary', 
    size = 'sm', 
    href = null, 
    onClick = null, 
    children, 
    className = '', 
    disabled = false,
    ...props 
}) {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    
    const sizeClasses = {
        xs: "px-2 py-1 text-xs rounded",
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-sm rounded-md",
        lg: "px-6 py-3 text-base rounded-lg"
    };
    
    const variantClasses = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg focus:ring-blue-500",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white shadow-md hover:shadow-lg focus:ring-gray-500",
        success: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg focus:ring-emerald-500",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg focus:ring-red-500",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg focus:ring-yellow-500",
        info: "bg-cyan-500 hover:bg-cyan-600 text-white shadow-md hover:shadow-lg focus:ring-cyan-500",
        outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500",
        ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus:ring-gray-500"
    };
    
    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    
    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                {...props}
            >
                {children}
            </Link>
        );
    }
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
} 