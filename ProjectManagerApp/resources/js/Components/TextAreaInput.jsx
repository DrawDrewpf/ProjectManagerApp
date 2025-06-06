import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
    { 
        className = '', 
        name, 
        value, 
        onChange, 
        placeholder, 
        required, 
        isFocused, 
        rows = 4,
        disabled = false,
        error = null,
        children, 
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            ref={input}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            disabled={disabled}
            className={`
                w-full px-4 py-3 text-sm font-medium
                border-2 rounded-xl
                transition-all duration-200 ease-in-out
                resize-none
                ${disabled 
                    ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400' 
                    : error
                        ? 'bg-red-50 border-red-300 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20 dark:border-red-600 dark:text-red-100 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400'
                }
                focus:ring-2 focus:ring-opacity-20 focus:outline-none
                shadow-sm hover:shadow-md focus:shadow-md
                ${className}
            `}
            {...props}
        >
            {children}
        </textarea>
    );
});