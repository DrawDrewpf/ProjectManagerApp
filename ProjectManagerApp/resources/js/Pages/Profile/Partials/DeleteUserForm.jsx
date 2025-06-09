import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

import { 
    ExclamationTriangleIcon,
    TrashIcon,
    LockClosedIcon,
    ExclamationCircleIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/outline';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-red-900/20 dark:via-rose-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-red-200/50 dark:border-red-700/30">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-400/20 to-rose-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tl from-pink-400/20 to-red-400/20 rounded-full blur-lg"></div>
            
            {/* Content */}
            <div className="relative p-8">
                <header className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg mr-4">
                            <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Delete Account
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Permanently remove your account and all associated data
                            </p>
                        </div>
                    </div>
                </header>

                {/* Warning Section */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <ShieldExclamationIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Before you proceed
                            </h3>
                            
                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-start">
                                    <ExclamationCircleIcon className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>All your projects, tasks, and personal data will be permanently deleted</span>
                                </div>
                                <div className="flex items-start">
                                    <ExclamationCircleIcon className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Your team members will lose access to shared projects</span>
                                </div>
                                <div className="flex items-start">
                                    <ExclamationCircleIcon className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>This action cannot be undone</span>
                                </div>
                                <div className="flex items-start">
                                    <ExclamationCircleIcon className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>You will be immediately logged out</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                    💡 <strong>Tip:</strong> Consider downloading any important data or transferring project ownership before deleting your account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={confirmUserDeletion}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <TrashIcon className="w-5 h-5 mr-2" />
                        Delete My Account
                    </button>
                </div>
            </div>

            {/* Enhanced Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="lg">
                <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-white/20 rounded-lg mr-3">
                                <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">
                                Confirm Account Deletion
                            </h2>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <form onSubmit={deleteUser} className="p-6">
                        <div className="mb-6">
                            <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mx-auto mb-4">
                                <TrashIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
                                Are you absolutely sure?
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
                                This action will permanently delete your account and remove all your data from our servers. 
                                This action is <strong>irreversible</strong>.
                            </p>
                        </div>

                        {/* Password Confirmation */}
                        <div className="mb-6">
                            <InputLabel
                                htmlFor="password"
                                value="Enter your password to confirm"
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                            />

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="pl-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
                                    isFocused
                                    placeholder="Enter your current password"
                                />
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <SecondaryButton 
                                onClick={closeModal}
                                className="px-6 py-2.5 font-medium"
                            >
                                Cancel
                            </SecondaryButton>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`
                                    inline-flex items-center px-6 py-2.5 
                                    bg-gradient-to-r from-red-600 to-rose-600 
                                    hover:from-red-700 hover:to-rose-700 
                                    text-white font-semibold rounded-full 
                                    shadow-lg hover:shadow-xl 
                                    transform hover:-translate-y-0.5 
                                    transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    disabled:transform-none disabled:hover:shadow-lg
                                `}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <TrashIcon className="w-4 h-4 mr-2" />
                                        Delete Account
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
