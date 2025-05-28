import { useState, useEffect, useCallback, useRef } from 'react';
import { router } from '@inertiajs/react';
import Pagination from './Pagination';
import TableHeading from './TableHeading';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

//Function Debounce
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

export default function DataTable({
    fetchUrl, 
    columns, 
    initialQueryParams = {}, 
    createUrl = null, 
    createButtonLabel = 'Create New',
    rowActions = null,
    globalSearchPlaceholder = 'Search...',
    showGlobalSearch = true,
    defaultSortField = 'created_at',
    defaultSortDirection = 'desc',
    fetchStrategy = 'inertia',
    initialData = null,
}) {    const [data, setData] = useState(initialData?.data || []);
    const [meta, setMeta] = useState(initialData?.meta || {});
    const [links, setLinks] = useState(initialData?.meta?.links || []);
    const [loading, setLoading] = useState(!initialData);
    const isInitialMount = useRef(true);
    const lastQueryParams = useRef('');
    const [queryParams, setQueryParams] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            page: params.get('page') || '1',
            sort_field: params.get('sort_field') || defaultSortField,
            sort_direction: params.get('sort_direction') || defaultSortDirection,
            search: params.get('search') || '',
            ...initialQueryParams,
        };
    });

    //Function to handle the Inertia router
    const fetchData = useCallback((currentQueryParams) => {
        setLoading(true);

        if (fetchStrategy === 'json') {
            const url = new URL(fetchUrl, window.location.origin);
            Object.keys(currentQueryParams).forEach(key => url.searchParams.append(key, currentQueryParams[key]));

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(responseData => {
                    if (responseData && responseData.data && responseData.meta) {
                        setData(responseData.data);
                        setMeta(responseData.meta);
                        setLinks(responseData.meta.links || []);
                    } else {
                        setData([]);
                        setMeta({});
                        setLinks([]);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error("DataTable (JSON strategy) onError:", error);
                    setLoading(false);
                    setData([]);
                    setMeta({});
                    setLinks([]);
                });
        } else { 
            if (!router) {
                setTimeout(() => fetchData(currentQueryParams), 100);
                return;
            }

            const queryParamsString = new URLSearchParams(currentQueryParams).toString();
            
            try {
                router.get(
                    `${fetchUrl}?${queryParamsString}`,
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        onSuccess: (page) => {
                            const responseDataKey = Object.keys(page.props).find(key => page.props[key] && page.props[key].data && page.props[key].meta);
                            const responseData = responseDataKey ? page.props[responseDataKey] : null;

                            if (responseData) {
                                setData(responseData.data);
                                setMeta(responseData.meta);
                                setLinks(responseData.meta.links || []);
                            } else {
                                if (page.props.data && page.props.meta) {
                                     setData(page.props.data);
                                     setMeta(page.props.meta);
                                     setLinks(page.props.meta.links || []);
                                } else {
                                    setData([]);
                                    setMeta({});
                                    setLinks([]);
                                }
                            }
                            setLoading(false);
                        },
                        onError: (errors) => {
                            setLoading(false);
                            console.error("DataTable (Inertia strategy) onError:", errors);
                        },
                    }
                );
            } catch (error) {
                console.error("DataTable Inertia router error:", error);
                setLoading(false);
                setData([]);
                setMeta({});
                setLinks([]);
            }
        }
    }, [fetchUrl, fetchStrategy]);    useEffect(() => {
        const queryParamsString = JSON.stringify(queryParams);
        if (lastQueryParams.current === queryParamsString) {
            return;
        }
        if (isInitialMount.current && initialData) {
            if (initialData.data) {
                setData(initialData.data);
            }
            if (initialData.meta) {
                setMeta(initialData.meta);
                setLinks(initialData.meta.links || []);
            } else if (initialData.links) {
                setLinks(initialData.links);
            }
            // Set the initial loading state to false
            lastQueryParams.current = queryParamsString;
            isInitialMount.current = false;
            setLoading(false);
            return;
        }
        // If it's not the initial mount and queryParams haven't changed, do nothing
        isInitialMount.current = false;
        lastQueryParams.current = queryParamsString;
        
        const timer = setTimeout(() => {
            fetchData(queryParams);
        }, 50);
        // Cleanup function to clear the timeout
        return () => clearTimeout(timer);
    }, [queryParams])

// Function handleSortChange
// This function toggles the sort direction if the same field is clicked again
    const handleSortChange = (name) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            sort_field: name,
            sort_direction:
                prevParams.sort_field === name && prevParams.sort_direction === 'asc'
                    ? 'desc'
                    : 'asc',
            page: '1', 
        }));
    };

//Function debounceSearch
// Debounced search function to avoid excessive API calls
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            setQueryParams((prevParams) => ({
                ...prevParams,
                search: searchValue,
                page: '1', 
            }));
        }, 500),
        []
    );

// Function handleGlobalSearchChange
// This function handles the global search input change and calls the debounced search function
    const handleGlobalSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

// Function renderCellContent
// This function renders the cell content based on the column definition
    const renderCellContent = (item, column) => {
        if (column.render) {
            return column.render(item);
        }
        const value = column.key.split('.').reduce((o, i) => (o ? o[i] : undefined), item);
        return value;
    };return (
        <div className="data-table-enhanced bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            {/* Header with search and create button */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {showGlobalSearch && (
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <TextInput
                                type="text"
                                placeholder={globalSearchPlaceholder}
                                defaultValue={queryParams.search} 
                                onChange={handleGlobalSearchChange}
                                className="pl-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg shadow-sm"
                            />
                        </div>
                    )}
                    {createUrl && (
                        <Link
                            href={createUrl}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border border-transparent rounded-lg font-medium text-sm text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {createButtonLabel}
                        </Link>
                    )}
                </div>
            </div>            {/* Table container with improved overflow handling */}
            <div className="table-container overflow-x-auto flex-grow">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 h-full"><thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-b-2 border-gray-300 dark:border-gray-600"><tr className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{columns.map((col) => (
                            <TableHeading
                                key={col.key}
                                name={col.key}
                                label={col.label}
                                sortable={col.sortable !== false}
                                sortField={queryParams.sort_field}
                                sortDirection={queryParams.sort_direction}
                                onSortChange={handleSortChange}
                            />
                        ))}{rowActions && <th className="px-6 py-4 text-center font-medium">Actions</th>}</tr></thead><tbody className="divide-y divide-gray-200 dark:divide-gray-700">{loading && <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-12 text-center"><div className="flex flex-col items-center justify-center space-y-3"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div><span className="text-gray-500 dark:text-gray-400 font-medium">Loading...</span></div></td></tr>}{!loading && data.length === 0 && <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-12 text-center"><div className="flex flex-col items-center justify-center space-y-3"><svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg><span className="text-gray-500 dark:text-gray-400 font-medium text-lg">No data found</span><span className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your search criteria</span></div></td></tr>}{!loading && data.map((item, index) => (<tr key={item.id || index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200 group">{columns.map((col) => (<td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{renderCellContent(item, col)}</td>))}{rowActions && <td className="px-6 py-4 whitespace-nowrap text-center"><div className="flex items-center justify-center space-x-2">{rowActions(item)}</div></td>}</tr>))}</tbody></table>
            </div>            
            {/* Footer with pagination */}
            {!loading && meta && meta.links && meta.links.length > 0 && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <Pagination links={links} meta={meta} />
                </div>
            )}
        </div>
    );
}
