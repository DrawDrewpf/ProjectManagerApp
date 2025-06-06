import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { useToast } from '@/Contexts/ToastContext';

export default function TestToasts({ auth }) {
    const { success, error, warning, info } = useToast();

    const testServerToast = (type) => {
        router.post(route('test.toast', type));
    };

    const testClientToast = (type) => {
        const messages = {
            success: 'Client-side success message! This was triggered directly from React.',
            error: 'Client-side error message! This was triggered directly from React.',
            warning: 'Client-side warning message! This was triggered directly from React.',
            info: 'Client-side info message! This was triggered directly from React.'
        };

        const toastMethods = { success, error, warning, info };
        toastMethods[type](messages[type]);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Toast Notifications Test
                </h2>
            }
        >
            <Head title="Test Toasts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Server-side Toasts (Laravel Flash Messages)</h3>                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        These toasts are generated from the backend using Laravel flash messages and are displayed automatically.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <PrimaryButton
                                            onClick={() => testServerToast('success')}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Success Toast
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => testServerToast('error')}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Error Toast
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => testServerToast('warning')}
                                            className="bg-yellow-600 hover:bg-yellow-700"
                                        >
                                            Warning Toast
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => testServerToast('info')}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Info Toast
                                        </PrimaryButton>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Client-side Toasts (React Context)</h3>                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        These toasts are generated directly from React using the ToastContext.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <PrimaryButton
                                            onClick={() => testClientToast('success')}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Client Success
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => testClientToast('error')}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Client Error
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => testClientToast('warning')}
                                            className="bg-yellow-600 hover:bg-yellow-700"
                                        >
                                            Client Warning
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => testClientToast('info')}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Client Info
                                        </PrimaryButton>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">Features:</h4>                                    <ul className="text-sm space-y-1 list-disc list-inside">
                                        <li>Different colors and icons for each message type</li>
                                        <li>Background gradients with accent borders</li>
                                        <li>Solid Heroicons icons</li>
                                        <li>Auto-disappear after 5 seconds</li>
                                        <li>Duplicate prevention</li>
                                        <li>Smooth enter and exit animations</li>
                                        <li>Manual close button</li>
                                        <li>Dark mode support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
