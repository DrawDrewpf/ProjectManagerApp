import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function TableHeading({ name, label, sortField, sortDirection, onSortChange }) {
    const getSortIconClass = (direction) => {
        return sortField === name && sortDirection === direction ? 'text-white' : '';
    };

    return (
        <th onClick={() => onSortChange(name)} className="px-3 py-4 cursor-pointer text-center">
            <div className="flex items-center justify-center">
                <span>{label}</span>
                <div className="flex flex-col ml-2">
                    <ChevronUpIcon className={`w-4 h-4 ${getSortIconClass('asc')}`} />
                    <ChevronDownIcon className={`w-4 h-4 ${getSortIconClass('desc')}`} />
                </div>
            </div>
        </th>
    );
}
