import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';

const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
};

const colors = {
    success: {
        container: 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 shadow-lg shadow-green-100',
        text: 'text-green-800',
        icon: 'text-green-500',
        button: 'text-green-400 hover:text-green-600 hover:bg-green-100 focus:ring-green-500',
        ring: 'ring-green-200',
    },
    error: {
        container: 'bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 shadow-lg shadow-red-100',
        text: 'text-red-800',
        icon: 'text-red-500',
        button: 'text-red-400 hover:text-red-600 hover:bg-red-100 focus:ring-red-500',
        ring: 'ring-red-200',
    },
    warning: {
        container: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 shadow-lg shadow-yellow-100',
        text: 'text-yellow-800',
        icon: 'text-yellow-500',
        button: 'text-yellow-400 hover:text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-500',
        ring: 'ring-yellow-200',
    },
    info: {
        container: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 shadow-lg shadow-blue-100',
        text: 'text-blue-800',
        icon: 'text-blue-500',
        button: 'text-blue-400 hover:text-blue-600 hover:bg-blue-100 focus:ring-blue-500',
        ring: 'ring-blue-200',
    },
};

export default function Toast({ type = 'success', message, show, onClose, autoClose = true }) {
    const [isVisible, setIsVisible] = useState(show);
    
    // Get the appropriate icon and color scheme for the toast type
    const Icon = icons[type] || icons.success;
    const colorScheme = colors[type] || colors.success;    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        if (show && autoClose) {
            const timer = setTimeout(() => {
                handleClose();
            }, 5000); // Auto close after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [show, autoClose, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose && onClose();
        }, 300); // Wait for animation to complete
    };

    return (
        <Transition
            show={isVisible}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`max-w-sm w-full ${colorScheme.container} rounded-lg pointer-events-auto ring-1 ${colorScheme.ring} overflow-hidden`}>
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Icon className={`h-6 w-6 ${colorScheme.icon}`} aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className={`text-sm font-medium ${colorScheme.text}`}>
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">                            <button
                                className={`${colorScheme.button} rounded-md inline-flex p-1.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                onClick={handleClose}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
