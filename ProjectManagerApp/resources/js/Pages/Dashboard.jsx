import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DataTable from '@/Components/DataTables/DataTable';
import TableCell from '@/Components/DataTables/TableCell';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import ActionButton from '@/Components/DataTables/ActionButton'; 

import { 
    ClockIcon, 
    ChartBarIcon, 
    CheckCircleIcon,
    ArrowTrendingUpIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

import { TASK_STATUS_TEXT_MAP } from "@/constants.js";

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalProgressTasks, 
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
}) {
    // Calculate personal task distribution percentages
    const myTotalTasks = myPendingTasks + myProgressTasks + myCompletedTasks;
    const myPendingPercentage = myTotalTasks > 0 ? Math.round((myPendingTasks / myTotalTasks) * 100) : 0;
    const myProgressPercentage = myTotalTasks > 0 ? Math.round((myProgressTasks / myTotalTasks) * 100) : 0;
    const myCompletedPercentage = myTotalTasks > 0 ? Math.round((myCompletedTasks / myTotalTasks) * 100) : 0;
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
                <div className="px-4 sm:px-6 lg:px-8 mb-8 flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Pending Tasks Card */}
                        <div className="group relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-200/50 dark:border-yellow-700/30">
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tl from-orange-400/20 to-yellow-400/20 rounded-full blur-lg group-hover:scale-110 transition-transform duration-700"></div>
                            
                            {/* Card Content */}
                            <div className="relative p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2.5 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg group-hover:shadow-yellow-500/25 transition-shadow duration-300">
                                            <ClockIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors duration-300">
                                                Pending Tasks
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Tasks awaiting action
                                            </p>
                                        </div>
                                    </div>
                                    <SparklesIcon className="w-5 h-5 text-yellow-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                
                                <div className="mb-4">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-105 transition-transform duration-200">
                                            {myPendingTasks}
                                        </span>
                                        <span className="text-lg text-gray-500 dark:text-gray-400">/</span>
                                        <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                            {totalPendingTasks}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="w-full bg-yellow-200/50 dark:bg-yellow-800/20 rounded-full h-2 mb-3">
                                    <div 
                                        className="bg-gradient-to-r from-yellow-500 to-amber-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                        style={{ width: `${myPendingPercentage}%` }}
                                    ></div>
                                </div>
                                
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                    {myPendingPercentage}% of your workload
                                </p>
                            </div>
                        </div>

                        {/* Progress Tasks Card */}
                        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200/50 dark:border-blue-700/30">
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tl from-indigo-400/20 to-blue-400/20 rounded-full blur-lg group-hover:scale-110 transition-transform duration-700"></div>
                            
                            {/* Card Content */}
                            <div className="relative p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300">
                                            <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                                                In Progress
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Tasks being worked on
                                            </p>
                                        </div>
                                    </div>
                                    <ChartBarIcon className="w-5 h-5 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                
                                <div className="mb-4">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-200">
                                            {myProgressTasks}
                                        </span>
                                        <span className="text-lg text-gray-500 dark:text-gray-400">/</span>
                                        <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                            {totalProgressTasks}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="w-full bg-blue-200/50 dark:bg-blue-800/20 rounded-full h-2 mb-3">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                        style={{ width: `${myProgressPercentage}%` }}
                                    ></div>
                                </div>
                                
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                    {myProgressPercentage}% of your workload
                                </p>
                            </div>
                        </div>

                        {/* Completed Tasks Card */}
                        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-200/50 dark:border-emerald-700/30">
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tl from-teal-400/20 to-emerald-400/20 rounded-full blur-lg group-hover:scale-110 transition-transform duration-700"></div>
                            
                            {/* Card Content */}
                            <div className="relative p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-shadow duration-300">
                                            <CheckCircleIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                                                Completed
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Tasks finished
                                            </p>
                                        </div>
                                    </div>
                                    <SparklesIcon className="w-5 h-5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                
                                <div className="mb-4">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform duration-200">
                                            {myCompletedTasks}
                                        </span>
                                        <span className="text-lg text-gray-500 dark:text-gray-400">/</span>
                                        <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                            {totalCompletedTasks}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="w-full bg-emerald-200/50 dark:bg-emerald-800/20 rounded-full h-2 mb-3">
                                    <div 
                                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                        style={{ width: `${myCompletedPercentage}%` }}
                                    ></div>
                                </div>
                                
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                    {myCompletedPercentage}% of your workload
                                </p>
                            </div>
                        </div>
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