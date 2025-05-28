import { Head, Link, router } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import DataTable from '@/Components/DataTables/DataTable';

import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";

export default function Show({ auth, project, tasks, queryParams = null }) {

    // projectname make sure it's not null or undefined
    const projectName = project?.name || 'Unknown Project';

    // Function formattedDueDate makes sure the date is formatted correctly
    const formattedDueDate = project?.due_date ?
        new Date(project.due_date).toLocaleDateString() :
        'Not specified';

    // Format creation date
    const formattedCreatedDate = project?.created_at ?
        new Date(project.created_at).toLocaleDateString() :
        'Not specified';

    // Format updated date
    const formattedUpdatedDate = project?.updated_at ?
        new Date(project.updated_at).toLocaleDateString() :
        'Not specified';

    // Get status text and class from constants
    const statusText = project?.status ? PROJECT_STATUS_TEXT_MAP[project.status] : 'Unknown';
    const statusClass = project?.status ? PROJECT_STATUS_CLASS_MAP[project.status] : 'bg-gray-400';

    const taskColumns = [
        { key: 'code', label: 'Code', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (item) => (
                <span
                    className={[
                        "px-2 py-1 rounded text-white text-xs",
                        TASK_STATUS_CLASS_MAP[item.status],
                    ].join(" ")}
                >
                    {TASK_STATUS_TEXT_MAP[item.status]}
                </span>
            ),
        },
        {
            key: 'priority',
            label: 'Priority',
            sortable: true,
            render: (item) => (
                <span
                    className={[
                        "px-2 py-1 rounded text-white text-xs",
                        TASK_PRIORITY_CLASS_MAP[item.priority],
                    ].join(" ")}
                >
                    {TASK_PRIORITY_TEXT_MAP[item.priority]}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Created Date',
            sortable: true,
            render: (item) => new Date(item.created_at).toLocaleDateString(),
        },
        {
            key: 'due_date',
            label: 'Due Date',
            sortable: true,
            render: (item) => item.due_date ? new Date(item.due_date).toLocaleDateString() : 'N/A',
        },
    ];

    const taskRowActions = (taskItem) => (
        <div className="space-x-2 whitespace-nowrap">
            <Link
                href={route('tasks.edit', taskItem.code)}
                className="text-blue-600 hover:text-blue-900"
            >
                Edit
            </Link>
            <Link
                href={route('tasks.show', taskItem.code)}
                className="text-green-600 hover:text-green-900"
            >
                View
            </Link>
            <button
                onClick={() => {
                    if (confirm('Are you sure you want to delete this task?')) {
                        router.delete(route('tasks.destroy', taskItem.code), {
                            preserveScroll: true,
                        });
                    }
                }}
                className="text-red-600 hover:text-red-900"
            >
                Delete
            </button>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Project: ${project.name}`}</h2>}
        >
            <Head title={`Project: ${project.name}`} />
            {/* Project details */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Project Image */}
                            <div className="mb-6">
                                <img
                                    src={project?.image_path || '/images/default_project.png'}
                                    alt={projectName}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-6 border-b pb-2 dark:border-gray-700">
                                <h3 className="text-xl font-bold">Project Details</h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Code: {project?.code || 'N/A'}</span>
                            </div>

                            {/* Project details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Name</h4>
                                    <p className="text-lg font-medium">{projectName}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Status</h4>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
                                        {statusText}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Due Date</h4>
                                    <p>{formattedDueDate}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Created By</h4>
                                    <p>{project?.createdBy?.name || 'Not specified'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Created On</h4>
                                    <p>{formattedCreatedDate}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Updated By</h4>
                                    <p>{project?.updatedBy?.name || 'Not specified'}</p>
                                </div>

                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                                <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded shadow-inner">
                                    {project?.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Table */}
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl font-bold mb-4">Project Tasks</h3>
                            {/* DataTable for tasks */}
                            <DataTable
                                fetchUrl={route('projects.show', project.code)}
                                columns={taskColumns}
                                initialQueryParams={{ 
                                    ...queryParams,
                                    project_code: project.code 
                                }}
                                rowActions={taskRowActions}
                                globalSearchPlaceholder="Search tasks in this project..."
                                initialData={tasks}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}