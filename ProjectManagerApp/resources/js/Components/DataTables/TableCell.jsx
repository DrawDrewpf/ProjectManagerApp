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
                            alt="Task image" 
                            className="w-10 h-10 rounded-full object-cover mx-auto border border-gray-200 dark:border-gray-600"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.nextElementSibling;
                                if (fallback) {
                                    fallback.style.display = 'flex';
                                }
                            }}
                        />
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto border border-gray-200 dark:border-gray-600" style={{display: 'none'}}>
                            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto border border-indigo-200 dark:border-indigo-600 shadow-sm">
                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
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