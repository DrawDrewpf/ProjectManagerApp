import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, ExclamationTriangleIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { 
    ClockIcon, 
    PlayIcon, 
    CheckCircleIcon, 
    ExclamationCircleIcon, 
    ArrowUpIcon,
    MinusIcon,
    FlagIcon,
    SparklesIcon
} from '@heroicons/react/24/solid';
import StatusBadge from '@/Components/DataTables/StatusBadge';

// Mapas de iconos para estados y prioridades (mantenemos los iconos para uso interno)
const STATUS_ICONS = {
    'pending': ClockIcon,
    'in_progress': PlayIcon,
    'completed': CheckCircleIcon,
};

const PRIORITY_ICONS = {
    'low': MinusIcon,
    'medium': ExclamationCircleIcon,
    'high': ArrowUpIcon,
    'extreme': FlagIcon,
};

export default forwardRef(function DynamicSelect({
    // Props básicas del select
    id,
    name,
    value,
    onChange,
    className = '',
    placeholder = 'Select an option...',
    disabled = false,
    required = false,
    
    // Props para configurar la API
    apiEndpoint,
    apiParams = {},
    
    // Props para configurar opciones estáticas
    staticOptions = null,
    
    // Props para personalizar la apariencia
    searchable = true,
    allowEmpty = true,
    emptyLabel = 'Select an option...',
    loadingLabel = 'Loading...',
    errorLabel = 'Error loading options',
    noResultsLabel = 'No options found',
    
    // Props para personalizar el comportamiento
    minSearchLength = 0,
    searchDelay = 300,
    
    // Props para mejorar visualización
    showStatusBadges = false,
    showPriorityBadges = false,
    showIcons = false,
    statusField = 'status',
    priorityField = 'priority',
    
    // Props adicionales
    ...props
}, ref) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [dropDirection, setDropDirection] = useState('down'); // 'up' or 'down'
    
    const selectRef = useRef(null);
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const optionsRefs = useRef([]);
      useImperativeHandle(ref, () => ({
        focus: () => selectRef.current?.focus(),
        blur: () => selectRef.current?.blur(),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }));    // Función para calcular la dirección del dropdown
    const calculateDropDirection = () => {
        if (!selectRef.current) return 'down';

        const rect = selectRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Estimar altura del dropdown basado en número de opciones
        const searchHeight = searchable ? 64 : 0; // altura del campo de búsqueda
        const optionHeight = 48; // altura estimada por opción
        const maxOptions = Math.min(filteredOptions.length + (allowEmpty ? 1 : 0), 6); // máximo 6 opciones visibles
        const estimatedDropdownHeight = searchHeight + (maxOptions * optionHeight) + 16; // padding adicional

        // Si hay más espacio arriba y no hay suficiente espacio abajo
        if (spaceAbove > spaceBelow && spaceBelow < estimatedDropdownHeight && spaceAbove >= estimatedDropdownHeight) {
            return 'up';
        }
        
        return 'down';
    };

    // Verificar que tenemos las props necesarias
    useEffect(() => {
        if (!apiEndpoint && !staticOptions) {
            console.error('DynamicSelect: apiEndpoint or staticOptions is required');
        }
    }, [apiEndpoint, staticOptions]);    // Función para obtener datos de la API o usar opciones estáticas
    const fetchOptions = async (searchQuery = '') => {
        if (staticOptions) {
            return staticOptions;
        }

        if (!apiEndpoint) {
            return [];
        }

        try {
            setLoading(true);
            setError(null);
            
            const params = new URLSearchParams({
                ...apiParams,
                ...(searchQuery && { search: searchQuery })
            });
            
            const response = await fetch(`${apiEndpoint}?${params}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                credentials: 'same-origin',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success && Array.isArray(data.data)) {
                return data.data;
            } else {
                throw new Error('Invalid response format');
            }
            
        } catch (err) {
            console.error('Error fetching options:', err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };    // Cargar opciones iniciales - simplificado
    useEffect(() => {
        if (apiEndpoint && !hasLoaded) {
            fetchOptions().then(data => {
                setOptions(data);
                setFilteredOptions(data);
                setHasLoaded(true);
            });
        } else if (staticOptions && !hasLoaded) {
            setOptions(staticOptions);
            setFilteredOptions(staticOptions);
            setHasLoaded(true);
        }
    }, [apiEndpoint, staticOptions]);

    // Resetear cuando cambia el endpoint
    useEffect(() => {
        if (apiEndpoint) {
            setHasLoaded(false);
            setOptions([]);
            setFilteredOptions([]);
            setError(null);
        }
    }, [apiEndpoint]);    // Manejar búsqueda con debounce - simplificado
    useEffect(() => {
        const handler = setTimeout(() => {
            if (staticOptions) {
                // Para opciones estáticas, filtrar localmente
                const filtered = staticOptions.filter(option =>
                    option.label.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredOptions(filtered);
            } else if (apiEndpoint) {
                // Para API, buscar en servidor
                if (searchTerm.length >= minSearchLength) {
                    fetchOptions(searchTerm).then(data => {
                        setFilteredOptions(data);
                    });
                } else {
                    setFilteredOptions(options);
                }
            }
        }, searchDelay);
        
        return () => clearTimeout(handler);
    }, [searchTerm, options, staticOptions, minSearchLength, searchDelay, apiEndpoint]);// Calcular dirección del dropdown cuando se abre o cambian las opciones
    useEffect(() => {
        if (isOpen) {
            const direction = calculateDropDirection();
            setDropDirection(direction);
        }
    }, [isOpen, filteredOptions.length, searchable, allowEmpty]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
                setFocusedIndex(-1);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Manejar navegación con teclado
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (isOpen) {
                    if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
                        handleSelect(filteredOptions[focusedIndex].value);
                    } else if (allowEmpty && focusedIndex === -1) {
                        handleSelect('');
                    }
                } else {
                    setIsOpen(true);
                    if (searchable && searchInputRef.current) {
                        setTimeout(() => searchInputRef.current?.focus(), 100);
                    }
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    setFocusedIndex(prev => 
                        prev < filteredOptions.length - 1 ? prev + 1 : prev
                    );
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setFocusedIndex(prev => prev > (allowEmpty ? -1 : 0) ? prev - 1 : prev);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSearchTerm('');
                setFocusedIndex(-1);
                selectRef.current?.focus();
                break;
            case ' ':
                if (!isOpen) {
                    e.preventDefault();
                    setIsOpen(true);
                    if (searchable && searchInputRef.current) {
                        setTimeout(() => searchInputRef.current?.focus(), 100);
                    }
                }
                break;
        }
    };    // Obtener la opción seleccionada con mejor manejo de valores
    const selectedOption = options.find(option => {
        // Normalizar valores para comparación
        const optionValue = String(option.value || '');
        const currentValue = String(value || '');
        return optionValue === currentValue && currentValue !== '';
    });
      // Manejar selección de opción - mejorado
    const handleSelect = (optionValue) => {
        // Normalizar el valor
        const normalizedValue = optionValue === null || optionValue === undefined ? '' : optionValue;
        
        onChange({ 
            target: { 
                name, 
                value: normalizedValue 
            } 
        });
        
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        selectRef.current?.focus();
    };// Auto focus en la opción seleccionada cuando se abre
    useEffect(() => {
        if (isOpen && value && value !== '' && value !== null && value !== undefined && filteredOptions.length > 0) {
            const index = filteredOptions.findIndex(option => option.value == value);
            if (index >= 0) {
                setFocusedIndex(index);
            }
        }
    }, [isOpen, value, filteredOptions]);    // Función para renderizar badge de estado usando el componente StatusBadge unificado
    const renderStatusBadge = (status) => {
        if (!showStatusBadges || !status) return null;
        
        const Icon = STATUS_ICONS[status];
        
        return (
            <StatusBadge 
                status={status} 
                size="xs" 
                className="inline-flex items-center"
            >
                <div className="flex items-center">
                    {Icon && <Icon className="w-3 h-3 mr-1" />}
                    <span className="hidden sm:inline">
                        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                    </span>
                </div>
            </StatusBadge>
        );
    };    // Función para renderizar badge de prioridad usando el componente StatusBadge unificado
    const renderPriorityBadge = (priority) => {
        if (!showPriorityBadges || !priority) return null;
        
        const Icon = PRIORITY_ICONS[priority];
        
        return (
            <StatusBadge 
                status={priority} 
                size="xs" 
                className="inline-flex items-center"
            >
                <div className="flex items-center">
                    {Icon && <Icon className="w-3 h-3 mr-1" />}
                    <span className="hidden sm:inline">
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                </div>
            </StatusBadge>
        );
    };// Función para renderizar iconos generales con mejor diseño
    const renderOptionIcon = (option) => {
        if (!showIcons) return null;
        
        // Si la opción tiene un ícono específico
        if (option.icon) {
            return (
                <div className="w-5 h-5 mr-3 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                    <span className="w-3 h-3">{option.icon}</span>
                </div>
            );
        }
        
        // Íconos basados en el tipo de dato con mejor estilo
        if (option[statusField]) {
            const Icon = STATUS_ICONS[option[statusField]];
            if (Icon) {
                return (
                    <div className="w-5 h-5 mr-3 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-md">
                        <Icon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                );
            }
        }
        
        // Ícono por defecto más elegante
        return (
            <div className="w-5 h-5 mr-3 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                <SparklesIcon className="w-3 h-3 text-gray-500 dark:text-gray-400" />
            </div>
        );
    };    const baseButtonStyles = `
        relative w-full min-h-[3.5rem] px-4 py-3 text-left
        bg-white dark:bg-gray-900 
        border-2 border-gray-200 dark:border-gray-700
        rounded-xl shadow-sm
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
        dark:focus:ring-blue-400/20 dark:focus:border-blue-400
        text-sm font-medium text-gray-900 dark:text-gray-100
        hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600
        group
    `;

    const getButtonStateStyles = () => {
        if (disabled) {
            return 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
        }
        if (error) {
            return 'border-red-400 dark:border-red-500 hover:border-red-500 dark:hover:border-red-400 ring-2 ring-red-100 dark:ring-red-900/30';
        }
        if (isOpen) {
            return 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/20 dark:ring-blue-400/20 shadow-lg';
        }
        return 'hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg';
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Campo principal del select */}
            <button
                ref={selectRef}
                type="button"
                id={id}
                name={name}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={`${baseButtonStyles} ${getButtonStateStyles()} ${className}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={id}
                {...props}
            >                <div className="flex items-center justify-between min-h-[1.5rem]">
                    <div className="flex-1 min-w-0 pr-3">                        {selectedOption ? (
                            <div className="flex items-center">
                                {/* Solo mostrar ícono si no hay badges habilitados */}
                                {!(showStatusBadges || showPriorityBadges) && renderOptionIcon(selectedOption)}
                                <div className="flex flex-col flex-1 min-w-0">                                    <div className="flex items-center flex-wrap gap-2">
                                        {/* Solo mostrar texto si no hay badges habilitados */}
                                        {!(showStatusBadges || showPriorityBadges) && (
                                            <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-base">
                                                {selectedOption.label}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-2">
                                            {renderStatusBadge(selectedOption[statusField])}
                                            {renderPriorityBadge(selectedOption[priorityField])}
                                        </div>
                                    </div>
                                    {/* Solo mostrar extra si no hay badges habilitados */}
                                    {!(showStatusBadges || showPriorityBadges) && selectedOption.extra && (
                                        <span className="block truncate text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                                            {selectedOption.extra}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="w-5 h-5 mr-3 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <SparklesIcon className="w-3 h-3 text-gray-400" />
                                </div>
                                <span className="block truncate text-gray-500 dark:text-gray-400 font-medium">
                                    {placeholder}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center ml-4 space-x-2">
                        {loading && (
                            <div className="relative">
                                <div className="animate-spin h-5 w-5 border-2 border-blue-200 border-t-blue-600 rounded-full"></div>
                            </div>
                        )}
                        {error && !loading && (
                            <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <ExclamationTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                        )}
                        {selectedOption && !loading && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect('');
                                }}
                                className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                tabIndex={-1}
                            >
                                <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                            </button>
                        )}
                        <div className="p-1">
                            <ChevronDownIcon 
                                className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 ${
                                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                                }`} 
                            />
                        </div>
                    </div>
                </div>
            </button>            {/* Dropdown mejorado */}
            {isOpen && (
                <div className={`
                    absolute z-50 w-full bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden backdrop-blur-sm
                    ${dropDirection === 'up' 
                        ? 'bottom-full mb-3' 
                        : 'top-full mt-3'
                    }
                    ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10
                `}>
                    {/* Campo de búsqueda mejorado */}
                    {searchable && (
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-600">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search options..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                             dark:bg-gray-700 dark:text-gray-300 text-sm transition-all duration-200
                                             placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Opciones con diseño mejorado */}
                    <div className="max-h-72 overflow-auto custom-scrollbar">
                        {/* Opción vacía mejorada */}
                        {allowEmpty && (
                            <button
                                type="button"
                                onClick={() => handleSelect('')}
                                className={`
                                    w-full px-4 py-3 text-left transition-all duration-200 border-b border-gray-100 dark:border-gray-700
                                    ${focusedIndex === -1 
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }
                                    ${!value ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}
                                `}
                                onMouseEnter={() => setFocusedIndex(-1)}
                            >
                                <div className="flex items-center">
                                    <div className="w-5 h-5 mr-3 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                                        <XMarkIcon className="w-3 h-3 text-gray-400" />
                                    </div>
                                    <span className="block italic text-sm font-medium">
                                        {emptyLabel}
                                    </span>
                                </div>
                            </button>
                        )}                        
                        {/* Estado de carga mejorado */}
                        {loading && (
                            <div className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin h-6 w-6 border-2 border-blue-200 border-t-blue-600 rounded-full mr-3"></div>
                                    <span className="text-sm font-medium">{loadingLabel}</span>
                                </div>
                            </div>
                        )}
                        
                        {/* Estado de error mejorado */}
                        {error && !loading && (
                            <div className="px-6 py-4 text-red-600 dark:text-red-400">
                                <div className="flex items-center">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                                        <ExclamationTriangleIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold block">{errorLabel}</span>
                                        <span className="text-xs text-red-500 dark:text-red-400">{error}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Sin resultados mejorado */}
                        {!loading && !error && filteredOptions.length === 0 && (
                            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col items-center">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                                        <MagnifyingGlassIcon className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-medium">{noResultsLabel}</span>
                                    {searchTerm && (
                                        <span className="text-xs text-gray-400 mt-1">
                                            No matches for "{searchTerm}"
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}                        {/* Opciones disponibles con diseño mejorado */}
                        {!loading && !error && filteredOptions.map((option, index) => (
                            <button
                                key={option.value}
                                type="button"
                                ref={el => optionsRefs.current[index] = el}
                                onClick={() => handleSelect(option.value)}
                                onMouseEnter={() => setFocusedIndex(index)}
                                className={`
                                    w-full px-4 py-4 text-left transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0
                                    ${focusedIndex === index 
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }
                                    ${option.value == value 
                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' 
                                        : 'text-gray-900 dark:text-gray-100'
                                    }
                                `}
                            >                                <div className="flex items-center justify-between">
                                    <div className="flex items-center flex-1 min-w-0 space-x-3">
                                        {/* Solo mostrar ícono si no hay badges habilitados */}
                                        {!(showStatusBadges || showPriorityBadges) && renderOptionIcon(option)}
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <div className="flex items-center flex-wrap gap-2 mb-1">
                                                {/* Solo mostrar texto si no hay badges habilitados */}
                                                {!(showStatusBadges || showPriorityBadges) && (
                                                    <span className={`text-sm truncate ${
                                                        option.value == value ? 'font-bold' : 'font-semibold'
                                                    }`}>
                                                        {option.label}
                                                    </span>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    {renderStatusBadge(option[statusField])}
                                                    {renderPriorityBadge(option[priorityField])}
                                                </div>
                                            </div>
                                            {/* Solo mostrar extra si no hay badges habilitados */}
                                            {!(showStatusBadges || showPriorityBadges) && option.extra && (
                                                <span className="block truncate text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                                                    {option.extra}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Checkmark para opción seleccionada mejorado */}
                                    {option.value == value && (
                                        <div className="p-1 bg-blue-100 dark:bg-blue-900/50 rounded-full ml-3">
                                            <CheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}                    </div>
                </div>
            )}
            
            {/* Estilos para scrollbar personalizado */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(156, 163, 175, 0.5);
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(156, 163, 175, 0.8);
                    }
                    .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(75, 85, 99, 0.5);
                    }
                    .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(75, 85, 99, 0.8);
                    }
                `
            }} />
        </div>
    );
});
