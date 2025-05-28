import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Contexts/ToastContext';

export default function FlashMessages() {
    const { flash } = usePage().props;
    const { success, error, warning, info } = useToast();
    const processedMessages = useRef(new Set());

    useEffect(() => {
        // Only process if there are messages
        const hasMessages = flash.success || flash.error || flash.warning || flash.info;
        if (!hasMessages) return;

        // Create message array with their handlers
        const messages = [];
        if (flash.success) messages.push({ type: 'success', message: flash.success, handler: success });
        if (flash.error) messages.push({ type: 'error', message: flash.error, handler: error });
        if (flash.warning) messages.push({ type: 'warning', message: flash.warning, handler: warning });
        if (flash.info) messages.push({ type: 'info', message: flash.info, handler: info });

        // Show only messages that haven't been processed
        messages.forEach(({ type, message, handler }) => {
            const messageId = `${type}:${message}`;
            if (!processedMessages.current.has(messageId)) {
                handler(message);
                processedMessages.current.add(messageId);
                
                // Clear message after 6 seconds (slightly longer than toast auto-close)
                setTimeout(() => {
                    processedMessages.current.delete(messageId);
                }, 6000);
            }
        });
        
    }, [flash.success, flash.error, flash.warning, flash.info, success, error, warning, info]);

    return null;
}
