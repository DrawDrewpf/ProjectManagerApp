/* StatusBadge.jsx
/
/ This component renders a badge for displaying status information with customizable styles.
/ It supports different sizes and variants, and can display a status text or children content.
*/

export default function StatusBadge({ 
    status, 
    variant = 'default', 
    size = 'sm', 
    className = '',
    children 
}) {
    const baseClasses = "inline-flex items-center font-medium ring-1 ring-inset";
    
    const sizeClasses = {
        xs: "px-2 py-0.5 text-xs rounded-full",
        sm: "px-2.5 py-1 text-xs rounded-full",
        md: "px-3 py-1.5 text-sm rounded-full",
        lg: "px-4 py-2 text-base rounded-lg"
    };
    
    const variantClasses = {
        default: "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-400/30",
        primary: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-400/30",
        success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-400/30",
        danger: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-400/30",
        warning: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-yellow-400/30",
        info: "bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-900/30 dark:text-cyan-300 dark:ring-cyan-400/30",
        purple: "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-400/30",
        pink: "bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-900/30 dark:text-pink-300 dark:ring-pink-400/30"
    };
    
    // Status-specific mappings
    const statusVariants = {
        // Project/Task statuses
        'pending': 'warning',
        'in_progress': 'info',
        'completed': 'success',
        'cancelled': 'danger',
        'on_hold': 'default',
        
        // Priority levels
        'low': 'success',
        'medium': 'warning',
        'high': 'danger',
        'urgent': 'purple',
        
        // General statuses
        'active': 'success',
        'inactive': 'default',
        'draft': 'warning',
        'published': 'success',
        'archived': 'default'
    };
    
    const finalVariant = status && statusVariants[status] ? statusVariants[status] : variant;
    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[finalVariant]} ${className}`;
    
    return (
        <span className={classes}>
            {children || status}
        </span>
    );
}