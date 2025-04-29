import { forwardRef,useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
    { className, name, value, onChange, placeholder, required, isFocused, children, ...props},
    ref) {
        const input = ref ? ref : useRef();

        useEffect(() => {
            if (isFocused) {
                input.current.focus();
            }
        }   , []);

        return (
            <textarea
                ref={input}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 rounded-md shadow-sm ${className}`}
                {...props}
            >
                {children}
            </textarea>
        );
    }
);