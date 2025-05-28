import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

/*
/ * TableHeading Component
/ * Renders a sortable table header with optional sorting functionality
/ * @param {Object} props - Component properties
/ * @param {string} props.name - Unique identifier for the column
/ * @param {string} props.label - Display label for the column
/ * @param {string} props.sortField - Current field used for sorting
/ * @param {string} props.sortDirection - Current sort direction ('asc' or 'desc')
/ * @param {Function} props.onSortChange - Callback function to handle sort changes
/ * @param {boolean} [props.sortable=true] - Whether the column is sortable
*/

export default function TableHeading({ name, label, sortField, sortDirection, onSortChange, sortable = true }) {
    const isActive = sortField === name;
    const getSortIconClass = (direction) => {
        return isActive && sortDirection === direction 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300';
    };

    if (!sortable) {
        return (
            <th className="px-6 py-4 text-left font-medium text-gray-700 dark:text-gray-300">
                {label}
            </th>
        );
    }

    return (
        <th 
            onClick={() => onSortChange(name)} 
            className="px-6 py-4 text-left font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none group hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
            <div className="flex items-center justify-between">
                <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                    {label}
                </span>
                <div className="flex flex-col ml-2 space-y-0">
                    <ChevronUpIcon className={`w-3 h-3 transition-colors duration-200 ${getSortIconClass('asc')}`} />
                    <ChevronDownIcon className={`w-3 h-3 transition-colors duration-200 ${getSortIconClass('desc')}`} />
                </div>
            </div>
        </th>
    );
}
