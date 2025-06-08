import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DynamicSelect from '@/Components/DynamicSelect';
import Avatar from '@/Components/Avatar';
import ImageUploaderPreview from '@/Components/ImageUploaderPreview';
import { 
    ArrowLeftIcon, 
    UserIcon, 
    BriefcaseIcon, 
    LockClosedIcon,
    IdentificationIcon,
    EyeIcon,
    PencilIcon
} from '@heroicons/react/24/outline';

export default function Edit({ auth, user }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        phone: user.phone || '',
        bio: user.bio || '',
        position: user.position || '',
        department: user.department || '',
        role: user.role || 'user',
        status: user.status || 'active',
        timezone: user.timezone || 'UTC',
        avatar: null,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formData = new FormData();
        
        // Append all form data
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== '' && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        // Use POST with _method=PUT for file uploads
        formData.append('_method', 'PUT');

        post(route('users.update', user.code), {
            data: formData,
            forceFormData: true,
        });
    };

    // Static options for roles (since these are system-defined)
    const roles = [
        { value: 'admin', label: 'Administrator', extra: 'Full system access' },
        { value: 'manager', label: 'Manager', extra: 'Team management' },
        { value: 'user', label: 'User', extra: 'Standard access' },
    ];

    const timezones = [
        { value: 'UTC', label: 'UTC' },
        { value: 'America/New_York', label: 'Eastern Time (US)' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
        { value: 'Europe/London', label: 'London' },
        { value: 'Europe/Madrid', label: 'Madrid' },
        { value: 'Asia/Tokyo', label: 'Tokyo' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link 
                            href={route('users.index')} 
                            className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-1" />
                            Back to Users
                        </Link>
                        <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                            Edit User: {user.name}
                        </h2>
                    </div>
                    <Link
                        href={route('users.show', user.code)}
                        className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Profile
                    </Link>
                </div>
            }
        >
            <Head title={`Edit User: ${user.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <PencilIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit User Information
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update the information for {user.name}
                            </p>
                        </div>

                        {/* Current Avatar Display */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                                <Avatar user={user} size="xl" showStatus={true} />
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Current Profile Picture
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.avatar_url ? 'Upload a new image to replace the current one' : 'No profile picture set - upload one below'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmit} encType="multipart/form-data" className="p-6 space-y-6">
                            {/* Basic Information Section */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center mb-6">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                                        <IdentificationIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Basic Information</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Essential user details and contact information</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="Full Name *" className="font-medium" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-2 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Email Address *" className="font-medium" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-2 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="phone" value="Phone Number" className="font-medium" />
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-2 block w-full"
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="bio" value="Biography" className="font-medium" />
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={data.bio}
                                            className="mt-2 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                            rows={3}
                                            onChange={(e) => setData('bio', e.target.value)}
                                            placeholder="Brief description about the user..."
                                        />
                                        <InputError message={errors.bio} className="mt-2" />
                                    </div>
                                </div>                                {/* Avatar Upload */}
                                <div className="mt-6">
                                    <ImageUploaderPreview
                                        id="avatar"
                                        name="avatar"
                                        value={data.avatar}
                                        onChange={(e) => setData('avatar', e.target.files[0] || null)}
                                        currentImageUrl={user.avatar_url}
                                        currentImageAlt={`${user.name}'s current avatar`}
                                        label="Update Profile Picture (Optional)"
                                        description="Upload a new image to replace the current avatar - leave empty to keep current"
                                        acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                        maxSizeInMB={2}
                                        placeholder="Click to upload or drag and drop a new avatar"
                                        subtitle="PNG, JPG, GIF, WebP up to 2MB - Leave empty to keep current image"
                                        aspectRatio="square"
                                        showZoom={true}
                                        showRemove={true}
                                        error={errors.avatar}
                                    />
                                </div>
                            </div>

                            {/* Professional Information Section */}
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                <div className="flex items-center mb-6">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                                        <BriefcaseIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Professional Information</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Work-related details and organizational structure</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="position" value="Position" className="font-medium" />
                                        <DynamicSelect
                                            id="position"
                                            name="position"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            apiEndpoint="/api/users/positions"
                                            placeholder="Select a position..."
                                            allowEmpty={true}
                                            emptyLabel="No specific position"
                                            className="mt-2"
                                        />
                                        <InputError message={errors.position} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="department" value="Department" className="font-medium" />
                                        <DynamicSelect
                                            id="department"
                                            name="department"
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            apiEndpoint="/api/users/departments"
                                            placeholder="Select a department..."
                                            allowEmpty={true}
                                            emptyLabel="No specific department"
                                            className="mt-2"
                                        />
                                        <InputError message={errors.department} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="role" value="Role *" className="font-medium" />
                                        <DynamicSelect
                                            id="role"
                                            name="role"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            staticOptions={roles}
                                            placeholder="Select user role..."
                                            allowEmpty={false}
                                            required
                                            className="mt-2"
                                        />
                                        <InputError message={errors.role} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="status" value="Status *" className="font-medium" />
                                        <DynamicSelect
                                            id="status"
                                            name="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            apiEndpoint="/api/users/statuses"
                                            placeholder="Select user status..."
                                            allowEmpty={false}
                                            required
                                            className="mt-2"
                                        />
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="timezone" value="Timezone" className="font-medium" />
                                        <DynamicSelect
                                            id="timezone"
                                            name="timezone"
                                            value={data.timezone}
                                            onChange={(e) => setData('timezone', e.target.value)}
                                            staticOptions={timezones}
                                            placeholder="Select timezone..."
                                            allowEmpty={false}
                                            className="mt-2"
                                        />
                                        <InputError message={errors.timezone} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Security Section */}
                            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                                <div className="flex items-center mb-6">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
                                        <LockClosedIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Change Password (Optional)</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Leave empty to keep current password</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="password" value="New Password" className="font-medium" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-2 block w-full"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Leave empty to keep current password
                                        </p>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Confirm New Password" className="font-medium" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-2 block w-full"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route('users.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton disabled={processing} className="inline-flex items-center px-6 py-2">
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <PencilIcon className="w-4 h-4 mr-2" />
                                            Update User
                                        </>
                                    )}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}