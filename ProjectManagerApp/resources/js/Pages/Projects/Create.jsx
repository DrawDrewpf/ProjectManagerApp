import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm, Link } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import DynamicSelect from "@/Components/DynamicSelect";
import DatePicker from "@/Components/DatePicker";
import ImageUploaderPreview from "@/Components/ImageUploaderPreview";
import ActionButton from "@/Components/DataTables/ActionButton";

import { 
    ArrowLeftIcon, 
    PhotoIcon, 
    DocumentTextIcon, 
    CalendarIcon,
    ChartBarIcon,
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

export default function Create({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        description: '',
        status: '',
        due_date: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
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
                        href={route('projects.index')}
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back to Projects
                    </Link>
                    <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New Project
                    </h2>
                </div>
            }
        >
            <Head title="Create Project" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <PlusIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                New Project Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Fill in the details below to create a new project
                            </p>
                        </div>
                        
                        <form onSubmit={onSubmit} className="p-6">
                            <div className="space-y-8">
                                {/* Project Image Section */}
                                <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-800/20 dark:to-cyan-900/20 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-sm">
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full flex items-center justify-center">
                                        <PhotoIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                            <PhotoIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Project Image</h4>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                                                Upload a visual representation of your project
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <ImageUploaderPreview
                                        id="project_image_path"
                                        name="image"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value || e.target.files[0])}
                                        label="Project Image"
                                        description="Upload a visual representation of your project (JPG, PNG, GIF, WebP - Max 5MB)"
                                        placeholder="Click to upload project image"
                                        aspectRatio="landscape"
                                        error={errors.image}
                                        maxSizeInMB={5}
                                        acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                        showZoom={true}
                                    />
                                </div>

                                {/* Basic Information Section */}
                                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-800/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                        <DocumentTextIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                            <DocumentTextIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">
                                                Essential project details and configuration
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel htmlFor="name" value="Project Name" className="font-medium text-gray-900 dark:text-white" />
                                            <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Choose a clear, descriptive name for your project</p>
                                            <TextInput 
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter project name"
                                                error={errors.name}
                                            />
                                            <InputError className="mt-2">{errors.name}</InputError>
                                        </div>

                                        <div className="space-y-2">
                                            <InputLabel htmlFor="project_status" value="Project Status" className="font-medium text-gray-900 dark:text-white" />
                                            <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Current status of the project</p>
                                            <DynamicSelect
                                                id="project_status"
                                                name="status"
                                                apiEndpoint="/api/statuses"
                                                apiParams={{ type: 'project' }}
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="mt-1 block w-full "
                                                searchable={false}
                                                placeholder="Select project status..."
                                                showStatusBadges={true}
                                                showIcons={true}
                                                statusField="value"
                                                allowEmpty={true}
                                                emptyLabel="Select Status"
                                            />
                                            <InputError className="mt-2">{errors.status}</InputError>
                                        </div>

                                        <div className="lg:col-span-2 space-y-2">
                                            <InputLabel htmlFor="description" value="Project Description" className="font-medium text-gray-900 dark:text-white" />
                                            <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Detailed description of project objectives, scope, and requirements</p>
                                            <TextAreaInput 
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                className="mt-1 block w-full"
                                                autoComplete="description"
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Describe the project objectives, scope, and requirements..."
                                                rows={4}
                                                error={errors.description}
                                            />
                                            <InputError className="mt-2">{errors.description}</InputError>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Section */}
                                <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/20 dark:via-amber-800/20 dark:to-yellow-900/20 rounded-xl p-6 border border-orange-200/50 dark:border-orange-700/50 shadow-sm">
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500/10 dark:bg-orange-400/10 rounded-full flex items-center justify-center">
                                        <CalendarIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                            <CalendarIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Timeline</h4>
                                            <p className="text-sm text-orange-600 dark:text-orange-400 mt-0.5">
                                                Set project deadlines and milestones
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel htmlFor="due_date" value="Project Deadline" className="font-medium text-gray-900 dark:text-white" />
                                            <p className="text-xs text-orange-600 dark:text-orange-400 mb-2">Set the target completion date for this project</p>
                                            <DatePicker
                                                id="due_date"
                                                name="due_date"
                                                value={data.due_date}
                                                onChange={(e) => setData('due_date', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Select project deadline..."
                                                allowClear={true}
                                                showToday={true}
                                                todayLabel="Today"
                                                clearLabel="Clear Date"
                                                yearRange={5}
                                                minYear={2024}
                                                maxYear={2030}
                                            />
                                            <InputError className="mt-2">{errors.due_date}</InputError>
                                        </div>
                                        
                                        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <CalendarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200">Timeline Tips</h4>
                                                    <div className="mt-2 text-xs text-orange-700 dark:text-orange-300 space-y-1">
                                                        <p>• Consider project complexity when setting deadlines</p>
                                                        <p>• Allow buffer time for unexpected challenges</p>
                                                        <p>• Align with team availability and resources</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <ActionButton
                                    href={route('projects.index')}
                                    variant="secondary"
                                    icon={<XMarkIcon className="w-4 h-4" />}
                                >
                                    Cancel
                                </ActionButton>
                                <ActionButton
                                    type="submit"
                                    variant="primary"
                                    icon={<PlusIcon className="w-4 h-4" />}
                                >
                                    Create Project
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}