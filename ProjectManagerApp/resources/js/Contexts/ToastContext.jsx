import { createContext, useContext, useState, useRef } from 'react';
import Toast from '@/Components/Toast';

const ToastContext = createContext();

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const activeToasts = useRef(new Set());

    const addToast = (type, message) => {
        // Create a unique ID for this message
        const messageKey = `${type}:${message}`;
        
        // If a toast with this message already exists, don't create another one
        if (activeToasts.current.has(messageKey)) {
            return;
        }

        const id = Date.now() + Math.random();
        const newToast = {
            id,
            type,
            message,
            show: true,
        };

        // Mark as active
        activeToasts.current.add(messageKey);

        setToasts(prev => [...prev, newToast]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
            activeToasts.current.delete(messageKey);
        }, 5000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message) => addToast('success', message);
    const error = (message) => addToast('error', message);
    const warning = (message) => addToast('warning', message);
    const info = (message) => addToast('info', message);

    return (
        <ToastContext.Provider value={{ success, error, warning, info }}>
            {children}
            
            {/* Toast Container */}
            <div
                aria-live="assertive"
                className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            type={toast.type}
                            message={toast.message}
                            show={toast.show}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>
            </div>
        </ToastContext.Provider>
    );
}
