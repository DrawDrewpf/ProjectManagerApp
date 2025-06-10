import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Avatar from '@/Components/Avatar';
import ImageUploaderPreview from '@/Components/ImageUploaderPreview';

import { 
    UserIcon, 
    EnvelopeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            avatar: null,
        });

    const submit = (e) => {
        e.preventDefault();

        // Create FormData to handle file uploads
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('_method', 'PATCH');
        
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        router.post(route('profile.update'), formData, {
            forceFormData: true,
            onSuccess: (page) => {
                // Reset the avatar field after successful upload
                setData('avatar', null);
                // Reload to get the updated user data including new avatar
                router.reload();
            }
        });
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg border border-blue-200/50 dark:border-blue-700/30">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-lg"></div>
            
            {/* Content */}
            <div className="relative p-8">
                <header className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg mr-4">
                            <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Profile Information
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Manage your account details and profile picture
                            </p>
                        </div>
                    </div>
                </header>

                <form onSubmit={submit} className="space-y-8">
                    {/* Profile Picture Section */}
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Profile Picture
                        </h3>
                        
                        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                            {/* Current Avatar Display */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <Avatar 
                                        user={user} 
                                        size="2xl" 
                                        className="ring-4 ring-white dark:ring-gray-800 shadow-xl transition-all duration-300 group-hover:shadow-2xl" 
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all duration-300 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            Current
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {user.avatar_url ? 'Custom picture' : 'Default avatar'}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Upload Area */}
                            <div className="flex-1 w-full">
                                <ImageUploaderPreview
                                    id="avatar"
                                    name="avatar"
                                    value={data.avatar}
                                    onChange={(event) => {
                                        const file = event.target.files?.[0] || event.target.value;
                                        setData('avatar', file);
                                    }}
                                    currentImageUrl={user.avatar_url}
                                    currentImageAlt={`${user.name}'s profile picture`}
                                    label=""
                                    description="Choose a new profile picture to update your avatar"
                                    placeholder="Click to upload or drag and drop your image here"
                                    subtitle="Supported formats: PNG, JPG, GIF, WebP • Maximum size: 2MB • Recommended: Square images for best results"
                                    aspectRatio="square"
                                    maxSizeInMB={2}
                                    showZoom={true}
                                    showRemove={true}
                                    className="h-full"
                                    error={errors.avatar}
                                    acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                            Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Full Name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <TextInput
                                        id="name"
                                        className="pl-12"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email Address (Read Only)" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="pl-12 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                        value={data.email}
                                        disabled
                                        readOnly
                                        autoComplete="username"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Email address cannot be changed from this form. Contact support if you need to update your email.
                                </p>
                                <InputError className="mt-2" message={errors.email} />
                            </div>
                        </div>
                    </div>

                    {/* Email Verification Section */}
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6 border-l-4 border-yellow-400">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div className="ml-3 flex-1">
                                    <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                                        Email Verification Required
                                    </h3>
                                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                        Your email address is unverified. Please check your inbox and click the verification link.
                                    </p>
                                    <div className="mt-3">
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                        >
                                            Resend Verification Email
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {status === 'verification-link-sent' && (
                                <div className="mt-4 flex items-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                        A new verification link has been sent to your email address.
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4">
                            <PrimaryButton 
                                disabled={processing}
                                className="px-8 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
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
                                        Profile updated successfully!
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
