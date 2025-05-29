import { Head, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ActionButton from "@/Components/DataTables/ActionButton";

import { 
    ArrowLeftIcon, 
    UserPlusIcon, 
    EnvelopeIcon, 
    LockClosedIcon,
    UserIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

export default function Create({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            data,
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link 
                        href={route('users.index')}
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back to Users
                    </Link>
                    <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New User
                    </h2>
                </div>
            }
        >
            <Head title="Create User" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <UserPlusIcon className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                                New User Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Fill in the details below to create a new user account
                            </p>
                        </div>
                        
                        <form onSubmit={onSubmit} className="p-6">
                            <div className="space-y-8">
                                {/* Basic Information Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                        <UserIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                                        Basic Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="name" value="Full Name" />
                                            <TextInput 
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter user's full name"
                                            />
                                            <InputError className="mt-2">{errors.name}</InputError>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email Address" />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <TextInput 
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-1 block w-full pl-10"
                                                    autoComplete="email"
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="user@example.com"
                                                />
                                            </div>
                                            <InputError className="mt-2">{errors.email}</InputError>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                        <LockClosedIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                                        Security
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="password" value="Password" />
                                            <TextInput 
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Enter a secure password"
                                            />
                                            <InputError className="mt-2">{errors.password}</InputError>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                            <TextInput 
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Confirm the password"
                                            />
                                            <InputError className="mt-2">{errors.password_confirmation}</InputError>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <ActionButton
                                    href={route('users.index')}
                                    variant="secondary"
                                    icon={<XMarkIcon className="w-4 h-4" />}
                                >
                                    Cancel
                                </ActionButton>
                                <ActionButton
                                    type="submit"
                                    variant="primary"
                                    icon={<UserPlusIcon className="w-4 h-4" />}
                                >
                                    Create User
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}