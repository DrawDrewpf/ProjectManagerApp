import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef , useState } from 'react';


import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import { 
    LockClosedIcon, 
    KeyIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';


export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };
        
        let strength = 0;
        const checks = [
            password.length >= 8,
            /[a-z]/.test(password),
            /[A-Z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
        ];
        
        strength = checks.filter(Boolean).length;
        
        const levels = {
            0: { label: 'Very Weak', color: 'bg-red-500' },
            1: { label: 'Weak', color: 'bg-red-400' },
            2: { label: 'Fair', color: 'bg-yellow-500' },
            3: { label: 'Good', color: 'bg-blue-500' },
            4: { label: 'Strong', color: 'bg-green-500' },
            5: { label: 'Very Strong', color: 'bg-green-600' },
        };
        
        return { strength, ...levels[strength] };
    };

    const passwordStrength = getPasswordStrength(data.password);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-2xl shadow-lg border border-green-200/50 dark:border-green-700/30">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tl from-teal-400/20 to-cyan-400/20 rounded-full blur-lg"></div>
            
            {/* Content */}
            <div className="relative p-8">
                <header className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg mr-4">
                            <LockClosedIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Update Password
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Ensure your account uses a strong password to stay secure
                            </p>
                        </div>
                    </div>
                </header>

                <form onSubmit={updatePassword} className="space-y-8">
                    {/* Security Tips */}
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Security Guidelines
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                                <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                Use at least 8 characters
                            </div>
                            <div className="flex items-center">
                                <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                Include uppercase letters
                            </div>
                            <div className="flex items-center">
                                <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                Include lowercase letters
                            </div>
                            <div className="flex items-center">
                                <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                Include numbers and symbols
                            </div>
                        </div>
                    </div>

                    {/* Password Fields */}
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                            Password Information
                        </h3>
                        
                        {/* Current Password */}
                        <div>
                            <InputLabel 
                                htmlFor="current_password" 
                                value="Current Password" 
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" 
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <KeyIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    type={showPasswords.current ? 'text' : 'password'}
                                    className="pl-12 pr-12"
                                    autoComplete="current-password"
                                    placeholder="Enter your current password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => togglePasswordVisibility('current')}
                                >
                                    {showPasswords.current ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.current_password} className="mt-2" />
                        </div>

                        {/* New Password */}
                        <div>
                            <InputLabel 
                                htmlFor="password" 
                                value="New Password" 
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" 
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    type={showPasswords.new ? 'text' : 'password'}
                                    className="pl-12 pr-12"
                                    autoComplete="new-password"
                                    placeholder="Enter your new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => togglePasswordVisibility('new')}
                                >
                                    {showPasswords.new ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {data.password && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">Password Strength:</span>
                                        <span className={`font-medium ${
                                            passwordStrength.strength <= 2 ? 'text-red-600' :
                                            passwordStrength.strength <= 3 ? 'text-yellow-600' :
                                            'text-green-600'
                                        }`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel 
                                htmlFor="password_confirmation" 
                                value="Confirm Password" 
                                className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" 
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    className="pl-12 pr-12"
                                    autoComplete="new-password"
                                    placeholder="Confirm your new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {showPasswords.confirm ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Match Indicator */}
                            {data.password_confirmation && data.password && (
                                <div className="mt-2 flex items-center">
                                    {data.password === data.password_confirmation ? (
                                        <div className="flex items-center text-green-600">
                                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                                            <span className="text-sm">Passwords match</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-600">
                                            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">Passwords don't match</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4">
                            <PrimaryButton 
                                disabled={processing}
                                className="px-8 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {processing ? 'Updating...' : 'Update Password'}
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out duration-300"
                                enterFrom="opacity-0 translate-x-4"
                                enterTo="opacity-100 translate-x-0"
                                leave="transition ease-in-out duration-300"
                                leaveFrom="opacity-100 translate-x-0"
                                leaveTo="opacity-0 translate-x-4"
                            >
                                <div className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                        Password updated successfully!
                                    </span>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
