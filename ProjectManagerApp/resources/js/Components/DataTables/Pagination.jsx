import { Link } from "@inertiajs/react";

/*
/ Pagination Component
/ Displays pagination links with active and disabled states
/ Includes previous and next buttons with appropriate styles
/ Usage: <Pagination links={paginationLinks} meta={paginationMeta} />
/ Props:
/ - links: Array of pagination links with properties like url, label, active
/ - meta: Object containing pagination metadata like total, from, to
*/

export default function Pagination({ links, meta }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            {/* Pagination info */}
            {meta && (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">{meta.from || 0}</span> to{' '}
                    <span className="font-medium">{meta.to || 0}</span> of{' '}
                    <span className="font-medium">{meta.total || 0}</span> results
                </div>
            )}
            
            {/* Pagination links */}
            <nav className="flex items-center space-x-1">
                {links.map((link, index) => {
                    const isActive = link.active;
                    const isDisabled = !link.url;
                    const isPrevNext = link.label.includes('Previous') || link.label.includes('Next') || link.label.includes('&laquo;') || link.label.includes('&raquo;');
                    
                    return (
                        <Link
                            preserveScroll
                            href={link.url || ''}
                            key={index}
                            className={`
                                relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg
                                ${isActive 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border border-blue-500' 
                                    : isDisabled 
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-300 dark:border-gray-600' 
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                                }
                                ${isPrevNext ? 'px-4' : ''}
                            `}
                        >
                            {isPrevNext ? (
                                <span>
                                    {link.label.includes('Previous') || link.label.includes('&laquo;') ? '← Previous' : 'Next →'}
                                </span>
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}