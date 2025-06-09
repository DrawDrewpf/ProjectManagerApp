import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Avatar from '@/Components/Avatar';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import ProfileTabs from '@/Components/ProfileTabs';

import { 
    UserIcon, 
    CogIcon,
    CalendarIcon,
    ClockIcon,
    EnvelopeIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const [activeTab, setActiveTab] = useState('profile');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                );
            case 'security':
                return <UpdatePasswordForm />;
            case 'danger':
                return <DeleteUserForm />;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                            <UserIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                                Profile Settings
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Manage your account settings and preferences
                            </p>
                        </div>
                    </div>
                    
                    <div className="hidden sm:flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user.email}
                            </p>
                        </div>
                        <Avatar user={user} size="lg" showStatus={true} className="ring-2 ring-white dark:ring-gray-800 shadow-lg" />
                    </div>
                </div>
            }
        >
            <Head title="Profile Settings" />

            {/* Page Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
                {/* User Info Header - Mobile/Quick View */}
                <div className="lg:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex items-center space-x-4">
                            <Avatar user={user} size="xl" showStatus={true} className="ring-4 ring-white dark:ring-gray-800 shadow-xl" />
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                    {user.name}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                    {user.email}
                                </p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <StatusBadge status={user.status} size="sm">
                                        {user.status}
                                    </StatusBadge>
                                    {user.created_at && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                            <CalendarIcon className="w-3 h-3 mr-1" />
                                            Member since {new Date(user.created_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Sidebar - User Info & Navigation */}
                            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                                {/* User Profile Card */}
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50 p-6">
                                    <div className="text-center">
                                        <Avatar user={user} size="2xl" className="mx-auto ring-white dark:ring-gray-800 shadow-xl mb-4" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {user.name}
                                        </h3>
                                        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            <EnvelopeIcon className="w-4 h-4 mr-2" />
                                            {user.email}
                                        </div>
                                        
                                        {user.phone && (
                                            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                <PhoneIcon className="w-4 h-4 mr-2" />
                                                {user.phone}
                                            </div>
                                        )}
                                        
                                        <StatusBadge status={user.status} size="md" className="mb-4">
                                            {user.status}
                                        </StatusBadge>
                                    </div>
                                </div>

                                {/* Account Details */}
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50 p-6">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <CogIcon className="w-4 h-4 mr-2" />
                                        Account Details
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        {user.created_at && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                                    Member since
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                        {user.last_login_at && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                                    <ClockIcon className="w-4 h-4 mr-2" />
                                                    Last active
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(user.last_login_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                        {user.timezone && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                                    <ClockIcon className="w-4 h-4 mr-2" />
                                                    Timezone
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {user.timezone}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Navigation Tabs */}
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50 p-6">
                                    <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-8 xl:col-span-9">
                                <div className="transition-all duration-300 ease-in-out">
                                    {renderTabContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
