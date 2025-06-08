import { Head, Link, router } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DataTable from '@/Components/DataTables/DataTable'; 
import ActionButton from '@/Components/DataTables/ActionButton';
import TableCell from '@/Components/DataTables/TableCell';
import Avatar from '@/Components/Avatar';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import { USER_STATUS_TEXT_MAP } from '@/constants';

export default function Index({ auth, users, queryParams = null }) { 

    const columns = [
        { 
            key: 'code', 
            label: 'Code', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.code} asCell={false} />
        },
        { 
            key: 'user', 
            label: 'User', 
            sortable: false,
            render: (item) => (
                <div className="flex items-center space-x-3">
                    <Avatar user={item} size="sm" showStatus={true} />
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                        </div>
                        {item.position && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.position}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        { 
            key: 'email', 
            label: 'Email', 
            sortable: true,
            render: (item) => <TableCell type="email" value={item.email} asCell={false} />
        },
        {
            key: 'department',
            label: 'Department',
            sortable: true,
            render: (item) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.department || 'N/A'}
                </span>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (item) => (
                <StatusBadge status={item.status} size="sm">
                    {USER_STATUS_TEXT_MAP[item.status]}
                </StatusBadge>
            )
        },
        {
            key: 'last_login_at',
            label: 'Last Login',
            sortable: true,
            render: (item) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.last_login_at || 'Never'}
                </span>
            )
        },
        {
            key: 'created_at',
            label: 'Created At',
            sortable: true,
            render: (item) => <TableCell type="date" value={item.created_at} asCell={false} />
        },
    ];

    const rowActions = (userItem) => (
        <div className="flex items-center justify-center space-x-2">
            <ActionButton
                href={route('users.show', userItem.code)}
                variant="info"
                size="xs"
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
            </ActionButton>
            <ActionButton
                href={userItem.code ? route('users.edit', userItem.code) : '#'}
                variant="primary"
                size="xs"
                disabled={!userItem.code}
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </ActionButton>
            <ActionButton
                onClick={() => {
                    if (confirm('Are you sure you want to delete this user?')) {
                        router.delete(route('users.destroy', userItem.code), {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-4 h-full flex flex-col">
                <div className="px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex-grow flex flex-col">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex-grow flex flex-col">
                            <div className="flex-grow">
                                {/* DataTable Users */}
                                <DataTable
                                    fetchUrl={route('users.index')}
                                    columns={columns}
                                    initialQueryParams={users.meta?.current_query_params || queryParams || {}}
                                    createUrl={route('users.create')}
                                    createButtonLabel="Add New User"
                                    rowActions={rowActions}
                                    globalSearchPlaceholder="Search users..."
                                    initialData={users}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}