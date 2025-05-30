import { Head, Link, router } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DataTable from '@/Components/DataTables/DataTable';
import ActionButton from '@/Components/DataTables/ActionButton';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import TableCell from '@/Components/DataTables/TableCell';

import { PROJECT_STATUS_TEXT_MAP } from '@/constants';

export default function Index({ auth, projects, queryParams = null }) {

    const columns = [
        { 
            key: 'code', 
            label: 'Code', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.code} asCell={false} />
        },
        {
            key: 'image',
            label: 'Image',
            sortable: false,
            render: (item) => <TableCell type="image" value={item.image_path} asCell={false} />
        },
        { 
            key: 'name', 
            label: 'Name', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.name} asCell={false} />
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (item) => (
                <StatusBadge status={item.status} size="sm">
                    {PROJECT_STATUS_TEXT_MAP[item.status]}
                </StatusBadge>
            ),
        },
        {
            key: 'created_at',
            label: 'Created Date',
            sortable: true,
            render: (item) => <TableCell type="date" value={item.created_at} asCell={false} />
        },
        {
            key: 'due_date',
            label: 'Due Date',
            sortable: true,
            render: (item) => <TableCell type="date" value={item.due_date} asCell={false} />
        },
    ];

    const rowActions = (projectItem) => (
        <div className="flex items-center justify-center space-x-2">
            <ActionButton
                href={route('projects.edit', projectItem.code)}
                variant="primary"
                size="xs"
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </ActionButton>
            <ActionButton
                href={route('projects.show', projectItem.code)}
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
                onClick={() => {
                    if (confirm('Are you sure you want to delete this project?')) {
                        router.delete(route('projects.destroy', projectItem.code), {
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
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-4 h-full flex flex-col">
                <div className="px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex-grow flex flex-col">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex-grow flex flex-col">
                            <div className="flex-grow">
                                {/* DataTable Projects */}
                                <DataTable
                                    fetchUrl={route('projects.index')}
                                    columns={columns}
                                    initialQueryParams={projects.meta?.current_query_params || queryParams || {}}
                                    createUrl={route('projects.create')}
                                    createButtonLabel="Add New Project"
                                    rowActions={rowActions}
                                    globalSearchPlaceholder="Search projects..."
                                    initialData={projects}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}