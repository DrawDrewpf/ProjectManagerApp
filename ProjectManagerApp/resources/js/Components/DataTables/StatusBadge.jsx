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
    const baseClasses = "inline-flex items-center font-semibold ring-1 ring-inset transition-all duration-200";
    
    const sizeClasses = {
        xs: "px-2 py-0.5 text-xs rounded-full",
        sm: "px-2.5 py-1 text-xs rounded-full",
        md: "px-3 py-1.5 text-sm rounded-full",
        lg: "px-4 py-2 text-base rounded-lg"
    };
    
    const variantClasses = {
        default: "bg-gray-50 text-gray-700 ring-gray-600/20 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-400/30 dark:hover:bg-gray-700",
        primary: "bg-blue-50 text-blue-700 ring-blue-600/20 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-400/30 dark:hover:bg-blue-900/50",
        success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-400/30 dark:hover:bg-emerald-900/50",
        danger: "bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-400/30 dark:hover:bg-red-900/50",
        warning: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-yellow-400/30 dark:hover:bg-yellow-900/50",
        info: "bg-cyan-50 text-cyan-700 ring-cyan-600/20 hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-300 dark:ring-cyan-400/30 dark:hover:bg-cyan-900/50",
        purple: "bg-purple-50 text-purple-700 ring-purple-600/20 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-400/30 dark:hover:bg-purple-900/50",
        pink: "bg-pink-50 text-pink-700 ring-pink-600/20 hover:bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300 dark:ring-pink-400/30 dark:hover:bg-pink-900/50",
        orange: "bg-orange-50 text-orange-700 ring-orange-600/20 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:ring-orange-400/30 dark:hover:bg-orange-900/50",
        green: "bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-400/30 dark:hover:bg-green-900/50"
    };
    
    // Enhanced status-specific mappings
    const statusVariants = {
        // Project/Task statuses
        'pending': 'warning',
        'in_progress': 'info',
        'completed': 'success',
        'cancelled': 'danger',
        'on_hold': 'default',
        'blocked': 'danger',
        'review': 'purple',
        'testing': 'orange',
        
        // Expanded priority levels
        'low': 'success',
        'medium': 'warning',
        'high': 'orange',
        'extreme': 'danger',
        'urgent': 'purple',
        'critical': 'danger',
        
        // User statuses
        'active': 'success',
        'inactive': 'default',
        'suspended': 'danger',
        'verified': 'success',
        'unverified': 'warning',
        
        // General statuses
        'draft': 'warning',
        'published': 'success',
        'archived': 'default',
        'approved': 'success',
        'rejected': 'danger',
        'processing': 'info'
    };
    
    const finalVariant = status && statusVariants[status] ? statusVariants[status] : variant;
    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[finalVariant]} ${className}`;
    
    return (
        <span className={classes}>
            {children || status}
        </span>
    );
}