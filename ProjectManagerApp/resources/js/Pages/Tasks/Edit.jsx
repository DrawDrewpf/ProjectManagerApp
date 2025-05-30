import { Head, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import DynamicSelect from "@/Components/DynamicSelect";
import ActionButton from "@/Components/DataTables/ActionButton";

import { 
    ArrowLeftIcon,
    PhotoIcon,
    DocumentTextIcon,
    CalendarIcon,
    UserIcon,
    FlagIcon,
    CheckCircleIcon,
    PencilIcon
} from '@heroicons/react/24/outline';

export default function Edit({ auth, task, projects, users }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        image: '',
        name: task.name || '',
        description: task.description || '',
        status: task.status || '',
        priority: task.priority || '',
        project_id: task.project_id || '',
        assigned_user_id: task.assigned_user_id || '',
        due_date: task.due_date || '',
        _method: 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.update', task.code), {
            forceFormData: true,
            onSuccess: () => reset(),
            onError: (errors) => console.log('Errors:', errors),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link 
                        href={route('tasks.show', task.code)} 
                        className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back to Task
                    </Link>
                    <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                        Edit Task: {task.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Task: ${task.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <PencilIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Edit Task Details
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Update the task information below
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Current Task Image Preview */}
                        {task.image_path && (
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-4">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Current Image:</h4>
                                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={task.image_path}
                                            alt={task.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={onSubmit} className="p-6 space-y-6">
                            {/* Project Selection */}
                            <div className="relative bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                    <DocumentTextIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                        <DocumentTextIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="project_id" value="Project Assignment" className="font-semibold text-gray-900 dark:text-white text-base" />
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">
                                            Select the project this task belongs to
                                        </p>
                                    </div>
                                </div>
                                <DynamicSelect
                                    id="project_id"
                                    name="project_id"
                                    value={data.project_id}
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    apiEndpoint="/api/projects"
                                    placeholder="Selecciona un proyecto..."
                                    className="mt-1 block w-full"
                                    searchable={true}
                                    allowEmpty={true}
                                    emptyLabel="Sin proyecto"
                                />
                                <InputError className="mt-2">{errors.project_id}</InputError>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Task Image */}
                                <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-800/20 dark:to-cyan-900/20 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-sm">
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full flex items-center justify-center">
                                        <PhotoIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                            <PhotoIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="task_image_path" value="Update Task Image" className="font-semibold text-gray-900 dark:text-white text-base" />
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                                                Upload a new image for this task
                                            </p>
                                        </div>
                                    </div>
                                    <TextInput 
                                        id="task_image_path"
                                        type="file"
                                        name="task_image_path"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-3 py-2">
                                        💡 Leave empty to keep current image
                                    </p>
                                    <InputError className="mt-2">{errors.image}</InputError>
                                </div>

                                {/* Task Name */}
                                <div className="relative bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-900/20 dark:via-violet-800/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50 shadow-sm">
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500/10 dark:bg-purple-400/10 rounded-full flex items-center justify-center">
                                        <DocumentTextIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                            <DocumentTextIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="name" value="Task Name" className="font-semibold text-gray-900 dark:text-white text-base" />
                                            <p className="text-sm text-purple-600 dark:text-purple-400 mt-0.5">
                                                A clear, descriptive task name
                                            </p>
                                        </div>
                                    </div>
                                    <TextInput 
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter task name..."
                                    />
                                    <InputError className="mt-2">{errors.name}</InputError>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900/20 dark:via-gray-800/20 dark:to-zinc-900/20 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                                <div className="absolute top-4 right-4 w-8 h-8 bg-slate-500/10 dark:bg-slate-400/10 rounded-full flex items-center justify-center">
                                    <DocumentTextIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                                        <DocumentTextIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="description" value="Task Description" className="font-semibold text-gray-900 dark:text-white text-base" />
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                                            Detailed description of the task requirements
                                        </p>
                                    </div>
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
                                    <TextInput 
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="w-full border-orange-200 dark:border-orange-700 focus:border-orange-400 focus:ring-orange-400/20"
                                        onChange={(e) => setData('due_date', e.target.value)}
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
                                        placeholder="Selecciona prioridad..."
                                        className="w-full"
                                        searchable={false}
                                        allowEmpty={true}
                                        emptyLabel="Sin prioridad"
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
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        apiEndpoint="/api/statuses"
                                        apiParams={{ type: 'task' }}
                                        placeholder="Selecciona estado..."
                                        className="w-full"
                                        searchable={false}
                                        allowEmpty={true}
                                        emptyLabel="Sin estado"
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
                                    value={data.assigned_user_id}
                                    onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    apiEndpoint="/api/users"
                                    placeholder="Buscar y asignar usuario..."
                                    className="w-full"
                                    searchable={true}
                                    allowEmpty={true}
                                    emptyLabel="Sin asignar"
                                    minSearchLength={2}
                                    searchDelay={300}
                                />
                                <InputError className="mt-2">{errors.assigned_user_id}</InputError>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <ActionButton
                                    variant="secondary"
                                    size="md"
                                    href={route('tasks.show', task.code)}
                                >
                                    Cancel
                                </ActionButton>
                                <ActionButton
                                    type="submit"
                                    variant="primary"
                                    size="md"
                                    className="min-w-[120px]"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Task'}
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}