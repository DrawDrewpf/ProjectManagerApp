import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Avatar from '@/Components/Avatar';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import DataTable from '@/Components/DataTables/DataTable';
import TableCell from '@/Components/DataTables/TableCell';
import ActionButton from '@/Components/DataTables/ActionButton';
import { USER_STATUS_TEXT_MAP } from '@/constants';

export default function Show({ auth, user, tasks, queryParams = null }) {
    // Format dates
    const formattedCreatedDate = user?.created_at ?
        new Date(user.created_at).toLocaleDateString() :
        'Not specified';

    const formattedUpdatedDate = user?.updated_at ?
        new Date(user.updated_at).toLocaleDateString() :
        'Not specified';

    const formattedLastLogin = user?.last_login_at ?
        new Date(user.last_login_at).toLocaleDateString() + ' ' + new Date(user.last_login_at).toLocaleTimeString() :
        'Never';

    // Task columns for the tasks table
    const taskColumns = [
        { 
            key: 'code', 
            label: 'Code', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.code} asCell={false} />
        },
        { 
            key: 'name', 
            label: 'Task Name', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.name} asCell={false} />
        },
        { 
            key: 'project', 
            label: 'Project', 
            sortable: false,
            render: (item) => <TableCell type="text" value={item.project?.name || 'N/A'} asCell={false} />
        },
        { 
            key: 'status', 
            label: 'Status', 
            sortable: true,
            render: (item) => (
                <StatusBadge status={item.status} size="sm">
                    {item.status}
                </StatusBadge>
            )
        },
        { 
            key: 'priority', 
            label: 'Priority', 
            sortable: true,
            render: (item) => (
                <StatusBadge status={item.priority} size="sm">
                    {item.priority}
                </StatusBadge>
            )
        },
        { 
            key: 'due_date', 
            label: 'Due Date', 
            sortable: true,
            render: (item) => <TableCell type="date" value={item.due_date} asCell={false} />
        },
    ];

    const taskRowActions = (task) => (
        <div className="flex items-center justify-center space-x-2">
            <ActionButton
                href={route('tasks.show', task.code)}
                variant="info"
                size="xs"
            >
                View
            </ActionButton>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        User Details: {user.name}
                    </h2>                    <Link
                        href={user.code ? route('users.edit', user.code) : '#'}
                        className={`font-bold py-2 px-4 rounded ${
                            user.code 
                                ? 'bg-blue-500 hover:bg-blue-700 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={!user.code ? (e) => e.preventDefault() : undefined}
                    >
                        Edit User
                    </Link>
                </div>
            }
        >
            <Head title={`User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-start space-x-6">
                                <Avatar user={user} size="2xl" showStatus={true} />
                                
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {user.name}
                                            </h1>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Code: {user.code}
                                            </p>
                                        </div>
                                        <StatusBadge status={user.status} size="md">
                                            {USER_STATUS_TEXT_MAP[user.status]}
                                        </StatusBadge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                                Contact Information
                                            </h3>
                                            <dl className="space-y-2">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{user.email}</dd>
                                                </div>
                                                {user.phone && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                                                        <dd className="text-sm text-gray-900 dark:text-white">{user.phone}</dd>
                                                    </div>
                                                )}
                                                {user.timezone && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</dt>
                                                        <dd className="text-sm text-gray-900 dark:text-white">{user.timezone}</dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                                Professional Information
                                            </h3>
                                            <dl className="space-y-2">
                                                {user.position && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</dt>
                                                        <dd className="text-sm text-gray-900 dark:text-white">{user.position}</dd>
                                                    </div>
                                                )}
                                                {user.department && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                                                        <dd className="text-sm text-gray-900 dark:text-white">{user.department}</dd>
                                                    </div>
                                                )}
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{formattedCreatedDate}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{formattedLastLogin}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    {user.bio && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                                About
                                            </h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                {user.bio}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Task Statistics */}
                    {user.task_stats && (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Task Statistics
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {user.task_stats.total}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                            {user.task_stats.pending}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {user.task_stats.in_progress}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {user.task_stats.completed}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Assigned Tasks */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Assigned Tasks
                            </h3>
                            {tasks && tasks.data && tasks.data.length > 0 ? (
                                <DataTable
                                    data={tasks}
                                    columns={taskColumns}
                                    actions={taskRowActions}
                                    queryParams={queryParams}
                                    routeName="users.show"
                                    routeParams={user.code}
                                />
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks assigned</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        This user has no tasks assigned yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}