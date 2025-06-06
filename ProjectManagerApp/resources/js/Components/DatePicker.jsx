import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { 
    CalendarIcon, 
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';

/**
 * DatePicker Component
 * 
 * A comprehensive date picker component with calendar interface that supports:
 * - Month and year dropdown selectors for easy navigation
 * - Keyboard navigation and accessibility
 * - Dark mode support
 * - Configurable date ranges and restrictions
 * - Customizable appearance and labels
 * - Today and clear buttons
 * 
 * @param {Object} props - Component props
 * @param {string} props.yearRange - Number of years before/after current year (default: 10)
 * @param {number} props.minYear - Minimum selectable year (overrides yearRange)
 * @param {number} props.maxYear - Maximum selectable year (overrides yearRange)
 * @param {string} props.minDate - Minimum selectable date (YYYY-MM-DD format)
 * @param {string} props.maxDate - Maximum selectable date (YYYY-MM-DD format)
 * @param {boolean} props.allowClear - Show clear button (default: true)
 * @param {boolean} props.showToday - Show today button (default: true)
 * 
 * @example
 * <DatePicker
 *   value={date}
 *   onChange={(e) => setDate(e.target.value)}
 *   yearRange={5}
 *   minYear={2020}
 *   maxYear={2030}
 *   placeholder="Select date..."
 * />
 */

export default forwardRef(function DatePicker({
    // Basic input props
    id,
    name,
    value,
    onChange,
    className = '',
    placeholder = 'Select date...',
    disabled = false,
    required = false,
    
    // Date picker specific props
    dateFormat = 'YYYY-MM-DD', // Format for display
    minDate = null,
    maxDate = null,
    allowClear = true,
    showToday = true,
    
    // Year selector configuration
    yearRange = 10, // Number of years before and after current year
    minYear = null, // Minimum selectable year
    maxYear = null, // Maximum selectable year
    
    // Appearance props
    emptyLabel = 'Select date...',
    todayLabel = 'Today',
    clearLabel = 'Clear',
    
    // Additional props
    ...props
}, ref) {    const [isOpen, setIsOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [dropDirection, setDropDirection] = useState('down');
    const [horizontalPosition, setHorizontalPosition] = useState('left');
    const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
    
    const datePickerRef = useRef(null);
    const calendarRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => datePickerRef.current?.focus(),
        blur: () => datePickerRef.current?.blur(),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }));

    // Initialize selected date from value prop
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                setSelectedDate(date);
                setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
                setDisplayValue(formatDateForDisplay(date));
            }
        } else {
            setSelectedDate(null);
            setDisplayValue('');
        }
    }, [value]);    // Calculate dropdown direction and position
    const calculateDropDirection = () => {
        if (!datePickerRef.current) return 'down';

        const rect = datePickerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const spaceRight = viewportWidth - rect.left;
        
        const estimatedCalendarHeight = 380; // estimated calendar height
        const estimatedCalendarWidth = 320; // estimated calendar width

        // Set horizontal position based on available space
        if (spaceRight < estimatedCalendarWidth && rect.right > estimatedCalendarWidth) {
            setHorizontalPosition('right');
        } else {
            setHorizontalPosition('left');
        }

        // Check vertical space
        if (spaceAbove > spaceBelow && spaceBelow < estimatedCalendarHeight && spaceAbove >= estimatedCalendarHeight) {
            return 'up';
        }
        
        return 'down';
    };

    // Format date for display
    const formatDateForDisplay = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    };

    // Format date for input value
    const formatDateForValue = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const formattedValue = formatDateForValue(date);
        setDisplayValue(formatDateForDisplay(date));
        
        // Trigger onChange event
        onChange({
            target: {
                name,
                value: formattedValue
            }
        });
        
        setIsOpen(false);
        datePickerRef.current?.focus();
    };

    // Handle clear selection
    const handleClear = () => {
        setSelectedDate(null);
        setDisplayValue('');
        
        onChange({
            target: {
                name,
                value: ''
            }
        });
        
        setIsOpen(false);
        datePickerRef.current?.focus();
    };

    // Handle today selection
    const handleToday = () => {
        const today = new Date();
        handleDateSelect(today);
    };    // Handle month navigation
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Handle month/year selection
    const handleMonthChange = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    };

    const handleYearChange = (year) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    };    // Generate year options (configurable range)
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = minYear || (currentYear - yearRange);
        const endYear = maxYear || (currentYear + yearRange);
        
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        
        const days = [];
        
        // Add empty cells for days before month start
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        
        return days;
    };

    // Check if date is disabled
    const isDateDisabled = (date) => {
        if (!date) return false;
        
        if (minDate && date < new Date(minDate)) return true;
        if (maxDate && date > new Date(maxDate)) return true;
        
        return false;
    };

    // Check if date is selected
    const isDateSelected = (date) => {
        if (!date || !selectedDate) return false;
        return date.toDateString() === selectedDate.toDateString();
    };

    // Check if date is today
    const isToday = (date) => {
        if (!date) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowMonthYearPicker(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            setDropDirection(calculateDropDirection());
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const baseButtonStyles = `
        relative w-full min-h-[3.5rem] px-4 py-3 text-left
        bg-white dark:bg-gray-900 
        border-2 border-gray-200 dark:border-gray-700
        rounded-full shadow-sm
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
        dark:focus:ring-blue-400/20 dark:focus:border-blue-400
        text-sm font-medium text-gray-900 dark:text-gray-100
        hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600
        group
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isOpen ? 'ring-4 ring-blue-500/20 border-blue-500 dark:ring-blue-400/20 dark:border-blue-400' : ''}
    `;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];    return (
        <div ref={datePickerRef} className={`relative ${className}`}>
            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(156, 163, 175, 0.1);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.8);
                }
            `}</style>

            {/* Date picker button */}
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={baseButtonStyles}
                {...props}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0 flex-1">
                        <div className="w-5 h-5 mr-3 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-full">
                            <CalendarIcon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                            {displayValue ? (
                                <span className="block text-gray-900 dark:text-gray-100 font-medium">
                                    {displayValue}
                                </span>
                            ) : (
                                <span className="block text-gray-500 dark:text-gray-400 italic">
                                    {placeholder}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {allowClear && displayValue && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                            </button>
                        )}
                        
                        <CalendarIcon className={`
                            w-5 h-5 transition-all duration-200 
                            ${isOpen 
                                ? 'text-blue-600 dark:text-blue-400 transform rotate-0' 
                                : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                            }
                        `} />
                    </div>
                </div>
            </button>            {/* Calendar dropdown */}
            {isOpen && (
                <div 
                    ref={calendarRef}
                    className={`
                        absolute z-50 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden backdrop-blur-sm
                        ${dropDirection === 'up' 
                            ? 'bottom-full mb-3' 
                            : 'top-full mt-3'
                        }
                        ${horizontalPosition === 'right' 
                            ? 'right-0' 
                            : 'left-0'
                        }
                        ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
                        w-80 max-w-[calc(100vw-2rem)]
                    `}
                >                    {/* Calendar header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-3 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            {/* Previous Month Button */}
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="group p-1.5 hover:bg-white/60 dark:hover:bg-gray-600/60 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-sm"
                            >
                                <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            </button>
                            
                            {/* Month & Year Display - Clickable */}
                            <div className="flex items-center space-x-0.5">
                                {/* Month Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
                                    className="group relative px-2 py-1 bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 hover:shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                                >
                                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {monthNames[currentDate.getMonth()].slice(0, 3)}
                                    </span>
                                </button>
                                
                                {/* Year Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}
                                    className="group relative px-2 py-1 bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 hover:shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                                >
                                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {currentDate.getFullYear()}
                                    </span>
                                </button>
                            </div>
                            
                            {/* Next Month Button */}
                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="group p-1.5 hover:bg-white/60 dark:hover:bg-gray-600/60 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-sm"
                            >
                                <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            </button>
                        </div>
                        
                        {/* Month & Year Picker Dropdown */}
                        {showMonthYearPicker && (
                            <div className="mt-3 p-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Month Grid */}
                                    <div>
                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Month</p>
                                        <div className="grid grid-cols-3 gap-1">
                                            {monthNames.map((month, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        handleMonthChange(index);
                                                        setShowMonthYearPicker(false);
                                                    }}
                                                    className={`text-xs px-2 py-1 rounded transition-all duration-150 ${
                                                        currentDate.getMonth() === index
                                                            ? 'bg-blue-500 text-white font-semibold shadow-sm'
                                                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-blue-300'
                                                    }`}
                                                >
                                                    {month.slice(0, 3)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Year List */}
                                    <div>
                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Year</p>
                                        <div className="max-h-24 overflow-y-auto custom-scrollbar">
                                            <div className="grid grid-cols-2 gap-1">
                                                {generateYearOptions().map((year) => (
                                                    <button
                                                        key={year}
                                                        type="button"
                                                        onClick={() => {
                                                            handleYearChange(year);
                                                            setShowMonthYearPicker(false);
                                                        }}
                                                        className={`text-xs px-2 py-1 rounded transition-all duration-150 ${
                                                            currentDate.getFullYear() === year
                                                                ? 'bg-blue-500 text-white font-semibold shadow-sm'
                                                                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-blue-300'
                                                        }`}
                                                    >
                                                        {year}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Calendar body */}
                    <div className="p-4">
                        {/* Week days header */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {weekDays.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-1">
                            {generateCalendarDays().map((date, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => date && !isDateDisabled(date) && handleDateSelect(date)}
                                    disabled={!date || isDateDisabled(date)}
                                    className={`
                                        w-10 h-10 text-sm rounded-lg transition-all duration-150
                                        ${!date 
                                            ? 'invisible' 
                                            : isDateDisabled(date)
                                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                                : isDateSelected(date)
                                                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                                                    : isToday(date)
                                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-700'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }
                                    `}
                                >
                                    {date?.getDate()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calendar footer */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-t border-gray-200 dark:border-gray-600 flex justify-between">
                        {showToday && (
                            <button
                                type="button"
                                onClick={handleToday}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                            >
                                {todayLabel}
                            </button>
                        )}
                        
                        {allowClear && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
                            >
                                {clearLabel}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});
