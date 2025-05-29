import { Head, router, Link } from "@inertiajs/react";
import { useState, useCallback, useEffect } from 'react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";

import StatusBadge from "@/Components/DataTables/StatusBadge";
import ActionButton from "@/Components/DataTables/ActionButton";

import { 
    CalendarIcon, 
    UserIcon, 
    ClockIcon, 
    DocumentTextIcon,
    TagIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';


export default function Show({ auth, task, tasks, queryParams = null }) {

    // taskname make sure it's not null or undefined
    const taskName = task?.name || 'Unknown Task';

    // Function formattedDueDate makes sure the date is formatted correctly
    const formattedDueDate = task?.due_date ?
        new Date(task.due_date).toLocaleDateString() :
        'Not specified';

    // Format creation date
    const formattedCreatedDate = task?.created_at ?
        new Date(task.created_at).toLocaleDateString() :
        'Not specified';

    // Format updated date
    const formattedUpdatedDate = task?.updated_at ?
        new Date(task.updated_at).toLocaleDateString() :
        'Not specified';

    // Get status text and class from constants
    const statusText = task?.status ? TASK_STATUS_TEXT_MAP[task.status] : 'Unknown';
    const statusClass = task?.status ? TASK_STATUS_CLASS_MAP[task.status] : 'bg-gray-400';

    // Add state and handlers for TasksTable functionality
    queryParams = queryParams || {};
    const [debouncedQueryParams, setDebouncedQueryParams] = useState(queryParams);

    // Debounce function
    // This function will be used to debounce the searchfieldsChanged function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    // searchfieldsChanged function
    // This function will be called when the search fields change
    const searchfieldsChanged = (name, value) => {
        setDebouncedQueryParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // debouncedSearchfieldsChanged function
    // This function will be used to debounce the searchfieldsChanged function
    const debouncedSearchfieldsChanged = useCallback(debounce(searchfieldsChanged, 300), []);

    // sortChanged function
    // This function will be called when the sort field changes
    const sortChanged = (name) => {
        setDebouncedQueryParams(prevState => {
            const sortDirection = prevState.sort_field === name && prevState.sort_direction === 'asc' ? 'desc' : 'asc';
            return {
                ...prevState,
                sort_field: name,
                sort_direction: sortDirection
            };
        });
    };

    // Call the router to get the tasks
    useEffect(() => {
        router.get(route('tasks.show', task.code), debouncedQueryParams, { preserveState: true });
    }, [debouncedQueryParams, task.code]);

    // Delete task function
    const deleteTask = (task) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', task.code));
        }
    };    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
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
                            Task: {taskName}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <ActionButton 
                            variant="primary" 
                            size="sm"
                            href={route('tasks.edit', task.code)}
                        >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </ActionButton>
                        <ActionButton 
                            variant="danger" 
                            size="sm"
                            onClick={() => deleteTask(task)}
                        >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </ActionButton>
                    </div>
                </div>
            }
        >
            <Head title={`Task: ${taskName}`} />
            
            {/* Hero Section with Task Overview */}
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                                {/* Task Image */}
                                <div className="flex-shrink-0 mb-6 lg:mb-0">
                                    <div className="w-full lg:w-48 h-48 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                                        <img
                                            src={task?.image_path || '/images/default_task.png'}
                                            alt={taskName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                
                                {/* Task Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {taskName}
                                            </h1>
                                            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center">
                                                    <TagIcon className="w-4 h-4 mr-1" />
                                                    {task?.code || 'N/A'}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center">
                                                    <DocumentTextIcon className="w-4 h-4 mr-1" />
                                                    {task?.project?.name || 'No Project'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-2">
                                            <StatusBadge status={task?.status} size="md">
                                                {TASK_STATUS_TEXT_MAP[task?.status] || 'Unknown'}
                                            </StatusBadge>
                                            {task?.priority && (
                                                <StatusBadge status={task.priority} size="sm">
                                                    {TASK_PRIORITY_TEXT_MAP[task.priority] || task.priority}
                                                </StatusBadge>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Task Description */}
                                    <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 backdrop-blur-sm">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {task?.description || 'No description provided.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Information Section */}
            <div className="pb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Task Information
                            </h3>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Due Date */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <CalendarIcon className="w-5 h-5 text-blue-500 mr-2" />
                                        <h4 className="font-medium text-gray-900 dark:text-white">Due Date</h4>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {formattedDueDate}
                                    </p>
                                </div>

                                {/* Assigned User */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <UserIcon className="w-5 h-5 text-emerald-500 mr-2" />
                                        <h4 className="font-medium text-gray-900 dark:text-white">Assigned To</h4>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {task?.assignedUser?.name || 'Not assigned'}
                                    </p>
                                </div>

                                {/* Created By */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <UserIcon className="w-5 h-5 text-purple-500 mr-2" />
                                        <h4 className="font-medium text-gray-900 dark:text-white">Created By</h4>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {task?.createdBy?.name || 'Not specified'}
                                    </p>
                                </div>

                                {/* Created Date */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <ClockIcon className="w-5 h-5 text-gray-500 mr-2" />
                                        <h4 className="font-medium text-gray-900 dark:text-white">Created Date</h4>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {formattedCreatedDate}
                                    </p>
                                </div>

                                {/* Last Updated */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <ClockIcon className="w-5 h-5 text-orange-500 mr-2" />
                                        <h4 className="font-medium text-gray-900 dark:text-white">Last Updated</h4>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {formattedUpdatedDate}
                                    </p>
                                </div>

                                {/* Updated By */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <UserIcon className="w-5 h-5 text-red-500 mr-2" />
                                        <h4 className="font-medium text-gray-900 dark:text-white">Updated By</h4>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {task?.updatedBy?.name || 'Not specified'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}