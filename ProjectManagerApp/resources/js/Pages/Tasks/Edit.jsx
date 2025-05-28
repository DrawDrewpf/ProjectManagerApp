import { Head, useForm, Link } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Task "{task.name}"
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <form
                                className=""
                                onSubmit={onSubmit}
                                action="">
                                {/* Preview Image*/}
                                <div className="mb-6">
                                    <img
                                        src={task?.image_path || '/images/default_task.png'}
                                        alt={task.name}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                {/* Project assigned to */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_id" value="Project" />
                                    <SelectInput
                                        id="project_id"
                                        value={data.project_id}
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
                                    <InputError className="text-red-500 text-sm mt-2">{errors.project_id}</InputError>
                                </div>
                                {/* Image*/}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                                    <TextInput id="task_image_path"
                                        type="file"
                                        name="task_image_path"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.image}</InputError>
                                </div>

                                {/* Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Task Name" />
                                    <TextInput id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.name}</InputError>
                                </div>

                                {/* Description */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Task Description" />
                                    <TextAreaInput id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="description"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.description}</InputError>
                                </div>

                                {/* Due Date */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="due_date" value="Task Deadline" />
                                    <TextInput id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        autoComplete="due_date"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.due_date}</InputError>
                                </div>

                                {/* Priority */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_priority" value="Task Priority" />
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        value={data.priority}
                                        className="mt-1 block w-full"
                                        autoComplete="priority"
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="extreme">Extreme</option>
                                    </SelectInput>
                                    <InputError className="text-red-500 text-sm mt-2">{errors.priority}</InputError>
                                </div>

                                {/* Status */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status" />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        autoComplete="status"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError className="text-red-500 text-sm mt-2">{errors.status}</InputError>
                                </div>

                                {/* Assigned user */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="assigned_user_id" value="Assigned user" />
                                    <SelectInput
                                        id="assigned_user_id"
                                        name="assigned_user_id"
                                        value={data.assigned_user_id}
                                        className="mt-1 block w-full"
                                        autoComplete="assigned_user_id"
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    >
                                        <option value="">Select User</option>
                                        {users.data.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}

                                    </SelectInput>
                                    <InputError className="text-red-500 text-sm mt-2">{errors.assigned_user_id}</InputError>
                                </div>

                                {/* Submit/Cancel Button */}
                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        className="inline-flex items-center px-4 py-2 bg-emerald-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-400 active:bg-emerald-600 focus:outline-none focus:border-emerald-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition ease-in-out duration-150"
                                        type="submit"
                                    >
                                        Edit Task
                                    </button>
                                    <Link href={route('tasks.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-500 active:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 disabled:opacity-25 transition ease-in-out duration-150 ml-4"
                                        type="button"
                                    >
                                        Cancel
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}