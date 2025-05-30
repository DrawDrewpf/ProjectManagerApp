import { Head, Link, router } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import DataTable from '@/Components/DataTables/DataTable';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import ActionButton from '@/Components/DataTables/ActionButton';

import { 
    ArrowLeftIcon, 
    CalendarIcon,
    UserIcon,
    ClockIcon,
    DocumentTextIcon,
    BriefcaseIcon,
    ListBulletIcon
} from '@heroicons/react/24/outline';

import { PROJECT_STATUS_TEXT_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";

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

    // Get status text from constants
    const statusText = project?.status ? PROJECT_STATUS_TEXT_MAP[project.status] : 'Unknown';

    const taskColumns = [
        { key: 'code', label: 'Code', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (item) => (
                <StatusBadge status={item.status} size="sm">
                    {TASK_STATUS_TEXT_MAP[item.status]}
                </StatusBadge>
            ),
        },
        {
            key: 'priority',
            label: 'Priority',
            sortable: true,
            render: (item) => (
                <StatusBadge status={item.priority} size="sm">
                    {TASK_PRIORITY_TEXT_MAP[item.priority]}
                </StatusBadge>
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
        <div className="flex items-center justify-center space-x-2">
            <ActionButton
                href={route('tasks.show', taskItem.code)}
                variant="success"
                size="xs"
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
            </ActionButton>
            <ActionButton
                href={route('tasks.edit', taskItem.code)}
                variant="primary"
                size="xs"
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </ActionButton>
            <ActionButton
                onClick={() => {
                    if (confirm('Are you sure you want to delete this task?')) {
                        router.delete(route('tasks.destroy', taskItem.code), {
                            preserveScroll: true,
                        });
                    }
                }}
                variant="danger"
                size="xs"
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
            </ActionButton>
        </div>
    );

    const deleteProject = () => {
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            router.delete(route('projects.destroy', project.code));
        }
    };

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
                        Project Details
                    </h2>
                </div>
            }
        >
            <Head title={`Project: ${project.name}`} />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Project Image */}
                        <div className="lg:col-span-1">
                            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={project?.image_path || '/images/default_project.png'}
                                    alt={projectName}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Project Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <BriefcaseIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Code: {project?.code || 'N/A'}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {projectName}
                                </h1>
                                <div className="flex items-center space-x-4 mb-4">
                                    <StatusBadge status={project?.status} size="sm">
                                        {PROJECT_STATUS_TEXT_MAP[project?.status]}
                                    </StatusBadge>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <ActionButton
                                    href={route('projects.edit', project.code)}
                                    variant="primary"
                                >
                                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Project
                                </ActionButton>
                                <ActionButton
                                    onClick={deleteProject}
                                    variant="danger"
                                >
                                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Project
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Details */}
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                Project Information
                            </h3>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formattedDueDate}</dd>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{project?.createdBy?.name || 'Not specified'}</dd>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created On</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formattedCreatedDate}</dd>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated By</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{project?.updatedBy?.name || 'Not specified'}</dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</dt>
                                <dd className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    {project?.description || 'No description provided.'}
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Tasks */}
            <div className="pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <ListBulletIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                Project Tasks
                            </h3>
                        </div>
                        
                        <div className="p-6">
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