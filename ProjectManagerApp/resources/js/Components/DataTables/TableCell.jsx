/* StatusBadge.jsx
/
/ This component renders a cell in a data table with various types of content.
/ It supports different sizes and variants, and can display a status text or children content.
*/

export default function TableCell({ 
    type = 'text', 
    value, 
    className = '', 
    children,
    asCell = true,
    ...props 
}) {
    const baseClasses = "px-6 py-4";
    
    const typeClasses = {
        text: "text-sm text-gray-900 dark:text-gray-100",
        number: "text-sm text-gray-900 dark:text-gray-100 font-mono",
        date: "text-sm text-gray-600 dark:text-gray-400",
        currency: "text-sm text-gray-900 dark:text-gray-100 font-medium",
        email: "text-sm text-blue-600 dark:text-blue-400 hover:underline",
        url: "text-sm text-blue-600 dark:text-blue-400 hover:underline",
        image: "flex items-center justify-center",
        action: "text-center space-x-2",
        status: "text-center"
    };
    
    const classes = `${baseClasses} ${typeClasses[type]} ${className}`;
    
    const renderContent = () => {
        if (children) {
            return children;
        }
        
        switch (type) {
            case 'date':
                return value ? new Date(value).toLocaleDateString() : 'N/A';
            
            case 'currency':
                return value ? `$${Number(value).toLocaleString()}` : 'N/A';
            
            case 'number':
                return value ? Number(value).toLocaleString() : '0';
            
            case 'email':
                return value ? (
                    <a href={`mailto:${value}`} className="hover:underline">
                        {value}
                    </a>
                ) : 'N/A';
            
            case 'url':
                return value ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {value}
                    </a>
                ) : 'N/A';
            
            case 'image':
                return value ? (
                    <div className="flex items-center justify-center">
                        <img 
                            src={value} 
                            alt="Table image" 
                            className="w-10 h-10 rounded-full object-cover mx-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.nextElementSibling;
                                if (fallback) {
                                    fallback.style.display = 'flex';
                                }
                            }}
                            onLoad={() => {
                            }}
                        />
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto" style={{display: 'none'}}>
                            <span className="text-xs text-gray-500">No img</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-xs text-gray-500">Debug: {JSON.stringify(value)}</span>
                    </div>
                );
            
            default:
                return value || 'N/A';
        }
    };
      return asCell ? (
        <td className={classes} {...props}>
            {renderContent()}
        </td>
    ) : (
        <div className={className} {...props}>
            {renderContent()}
        </div>
    );
}