import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DataTable from '@/Components/DataTables/DataTable';
import TableCell from '@/Components/DataTables/TableCell';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import ActionButton from '@/Components/DataTables/ActionButton'; 

import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.js";

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalProgressTasks, 
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
}) {
    const activeTaskColumns = [
        { 
            key: 'code', 
            label: 'Code', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.code} asCell={false} />
        },
        {
            key: 'project.name',
            label: 'Project Name',
            sortable: true, 
            render: (item) => <TableCell type="text" value={item.project?.name} asCell={false} />
        },
        { 
            key: 'name', 
            label: 'Task Name', 
            sortable: true,
            render: (item) => <TableCell type="text" value={item.name} asCell={false} />
        },
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
            key: 'due_date',
            label: 'Due Date',
            sortable: true,
            render: (item) => <TableCell type="date" value={item.due_date} asCell={false} />
        },
    ];

    const activeTaskRowActions = (taskItem) => (
        <div className="flex items-center justify-center space-x-2">
            <ActionButton
                href={route('tasks.show', taskItem.code)}
                variant="success"
                size="xs"
            >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
            </ActionButton>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4 h-full flex flex-col">
                {/* Tasks status Info */}
                <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-shrink-0">

                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                        <h3 className='text-yellow-500 text-2xl font-semibold'>Pending Tasks</h3>
                        <p className='text-lg mt-4 font-bold'>
                            <span className='mr-2'>{myPendingTasks}</span>/<span className='ml-2'>{totalPendingTasks}</span>
                        </p>
                    </div>
                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                        <h3 className='text-blue-500 text-2xl font-semibold'>Progress Tasks</h3>
                        <p className='text-lg mt-4 font-bold'>
                            <span className='mr-2'>{myProgressTasks}</span>/<span className='ml-2'>{totalProgressTasks}</span> 
                        </p>
                    </div>
                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                        <h3 className='text-green-500 text-2xl font-semibold'>Completed Tasks</h3>
                        <p className='text-lg mt-4 font-bold'>
                            <span className='mr-2'>{myCompletedTasks}</span>/<span className='ml-2'>{totalCompletedTasks}</span>
                        </p>
                    </div>

                </div>

                {/* My Active Tasks */}
                <div className="px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex-grow flex-col">
                        <h3 className='text-gray-900 dark:text-white text-2xl font-semibold mb-4 flex-shrink-0'>My Active Tasks</h3>
                        <div className="flex-grow">
                            <DataTable
                                fetchUrl={route('dashboard.myActiveTasksData')} 
                                columns={activeTaskColumns}
                                rowActions={activeTaskRowActions}
                                initialQueryParams={{ sort_field: 'due_date', sort_direction: 'asc' }}
                                globalSearchPlaceholder="Search my tasks..."
                                showGlobalSearch={true}
                                fetchStrategy="json" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}