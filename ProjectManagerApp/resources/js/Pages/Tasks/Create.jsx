import { Head, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
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

export default function Create({ auth, projects, users }) {

    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        description: '',
        status: '',
        due_date: '',
        priority: '',
        project_id: '',
        assigned_user_id: ''
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
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                    <DocumentTextIcon className="w-5 h-5 text-blue-500 mr-2" />
                                    <InputLabel htmlFor="project_id" value="Project Assignment" className="font-medium" />
                                </div>
                                <SelectInput
                                    id="project_id"
                                    name="project_id"
                                    className="mt-1 block w-full"
                                    autoComplete="project_id"
                                    onChange={(e) => setData('project_id', e.target.value)}
                                >
                                    <option value="">Select Project</option>
                                    {projects.data.map((project) => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError className="mt-2">{errors.project_id}</InputError>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Task Image */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <PhotoIcon className="w-5 h-5 text-emerald-500 mr-2" />
                                        <InputLabel htmlFor="task_image_path" value="Task Image" className="font-medium" />
                                    </div>
                                    <TextInput 
                                        id="task_image_path"
                                        type="file"
                                        name="task_image_path"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError className="mt-2">{errors.image}</InputError>
                                </div>

                                {/* Task Name */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <DocumentTextIcon className="w-5 h-5 text-purple-500 mr-2" />
                                        <InputLabel htmlFor="name" value="Task Name" className="font-medium" />
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
                                    />
                                    <InputError className="mt-2">{errors.name}</InputError>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Due Date */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <CalendarIcon className="w-5 h-5 text-orange-500 mr-2" />
                                        <InputLabel htmlFor="due_date" value="Due Date" className="font-medium text-sm" />
                                    </div>
                                    <TextInput 
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError className="mt-2">{errors.due_date}</InputError>
                                </div>

                                {/* Priority */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <FlagIcon className="w-5 h-5 text-red-500 mr-2" />
                                        <InputLabel htmlFor="task_priority" value="Priority" className="font-medium text-sm" />
                                    </div>
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="extreme">Extreme</option>
                                    </SelectInput>
                                    <InputError className="mt-2">{errors.priority}</InputError>
                                </div>

                                {/* Status */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                                        <InputLabel htmlFor="task_status" value="Status" className="font-medium text-sm" />
                                    </div>
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError className="mt-2">{errors.status}</InputError>
                                </div>

                                {/* Assigned User */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <UserIcon className="w-5 h-5 text-blue-500 mr-2" />
                                        <InputLabel htmlFor="assigned_user_id" value="Assigned To" className="font-medium text-sm" />
                                    </div>
                                    <SelectInput
                                        id="assigned_user_id"
                                        name="assigned_user_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {users.data.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError className="mt-2">{errors.assigned_user_id}</InputError>
                                </div>
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