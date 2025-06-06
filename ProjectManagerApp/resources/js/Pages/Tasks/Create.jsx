import { Head, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
    UserIcon,
    FlagIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Create({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        description: '',
        status: '',
        due_date: '',
        priority: '',
        project_id: null,
        assigned_user_id: null
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
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
                        href={route('tasks.index')} 
                        className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back to Tasks
                    </Link>
                    <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                        Create New Task
                    </h2>
                </div>
            }
        >
            <Head title="Create New Task" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Task Details
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Fill in the information below to create a new task
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmit} className="p-6 space-y-6">
                            {/* Project Selection */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                                        <DocumentTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="project_id" value="Project Assignment" className="font-semibold text-gray-900 dark:text-white" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Choose the project this task belongs to</p>
                                    </div>
                                </div>
                                <DynamicSelect
                                    id="project_id"
                                    name="project_id"
                                    value={data.project_id}
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    apiEndpoint="/api/projects"
                                    placeholder="Select a project..."
                                    className="w-full"
                                    searchable={true}
                                    allowEmpty={true}
                                    emptyLabel="No project"
                                />
                                <InputError className="mt-2">{errors.project_id}</InputError>
                            </div>

                            {/* Basic Information */}
                            <div className="space-y-6">
                                {/* Task Name */}
                                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                                            <DocumentTextIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="name" value="Task Name" className="font-semibold text-gray-900 dark:text-white" />
                                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">A clear, descriptive task name</p>
                                        </div>
                                    </div>
                                    <TextInput 
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter task name..."
                                        error={errors.name}
                                    />
                                    <InputError className="mt-2">{errors.name}</InputError>
                                </div>

                                {/* Task Image */}
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-3">
                                            <PhotoIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="task_image" value="Task Image" className="font-semibold text-gray-900 dark:text-white" />
                                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Upload a visual representation of this task</p>
                                        </div>
                                    </div>
                                    
                                    <ImageUploaderPreview
                                        id="task_image"
                                        name="image"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        error={errors.image}
                                        acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                        maxSizeInMB={5}
                                        aspectRatio="square"
                                        showZoom={true}
                                        placeholder="Click to upload a task image or drag and drop"
                                        description="PNG, JPG, GIF up to 5MB"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                    <DocumentTextIcon className="w-5 h-5 text-gray-500 mr-2" />
                                    <InputLabel htmlFor="description" value="Task Description" className="font-medium" />
                                </div>
                                <TextAreaInput 
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    rows="4"
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the task details, requirements, and objectives..."
                                />
                                <InputError className="mt-2">{errors.description}</InputError>
                            </div>

                            {/* Task Configuration */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Due Date */}
                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3">
                                            <CalendarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="due_date" value="Due Date" className="font-semibold text-gray-900 dark:text-white" />
                                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-0.5">Task deadline</p>
                                        </div>
                                    </div>
                                    <DatePicker
                                        id="due_date"
                                        name="due_date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        className="w-full"
                                        placeholder="Select task deadline..."
                                        allowClear={true}
                                        showToday={true}
                                        todayLabel="Today"
                                        clearLabel="Clear Date"
                                    />
                                    <InputError className="mt-2">{errors.due_date}</InputError>
                                </div>

                                {/* Priority */}
                                <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
                                            <FlagIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="task_priority" value="Priority" className="font-semibold text-gray-900 dark:text-white" />
                                            <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">Task urgency level</p>
                                        </div>
                                    </div>
                                    <DynamicSelect
                                        id="task_priority"
                                        name="priority"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        apiEndpoint="/api/priorities"
                                        placeholder="Select priority..."
                                        className="w-full"
                                        searchable={false}
                                        allowEmpty={true}
                                        emptyLabel="No priority"
                                        showPriorityBadges={true}
                                        showIcons={true}
                                        priorityField="value"
                                    />
                                    <InputError className="mt-2">{errors.priority}</InputError>
                                </div>

                                {/* Status */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                                            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="task_status" value="Status" className="font-semibold text-gray-900 dark:text-white" />
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">Current task state</p>
                                        </div>
                                    </div>
                                    <DynamicSelect
                                        id="task_status"
                                        name="status"
                                        apiEndpoint="/api/statuses"
                                        apiParams={{ type: 'task' }}
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full"
                                        searchable={false}
                                        placeholder="Select status..."
                                        allowEmpty={true}
                                        emptyLabel="No status"
                                        showStatusBadges={true}
                                        showIcons={true}
                                        statusField="value"
                                    />
                                    <InputError className="mt-2">{errors.status}</InputError>
                                </div>
                            </div>

                            {/* Assigned User - Full Width */}
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                                        <UserIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="assigned_user_id" value="Assigned User" className="font-semibold text-gray-900 dark:text-white" />
                                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">User responsible for this task</p>
                                    </div>
                                </div>
                                <DynamicSelect
                                    id="assigned_user_id"
                                    name="assigned_user_id"
                                    apiEndpoint="/api/users"
                                    placeholder="Search and assign user..."
                                    value={data.assigned_user_id}
                                    onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    searchable={true}
                                    allowEmpty={true}
                                    emptyLabel="Unassigned"
                                    className="w-full"
                                />
                                <InputError className="mt-2">{errors.assigned_user_id}</InputError>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <ActionButton
                                    variant="secondary"
                                    size="md"
                                    href={route('tasks.index')}
                                >
                                    Cancel
                                </ActionButton>
                                <ActionButton
                                    type="submit"
                                    variant="success"
                                    size="md"
                                    className="min-w-[120px]"
                                >
                                    Create Task
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}