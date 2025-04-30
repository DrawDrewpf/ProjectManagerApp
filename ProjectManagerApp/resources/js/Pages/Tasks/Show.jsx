import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TasksTable from "@/Pages/Tasks/TasksTable";
import { useState, useCallback, useEffect } from 'react';

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
        router.get(route('tasks.show', task.id), debouncedQueryParams, { preserveState: true });
    }, [debouncedQueryParams, task.id]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">{`Task "${taskName}"`}</h2>}
        >
            <Head title={`Task: ${taskName}`} />
            {/* Task details */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Task Image */}
                            <div className="mb-6">
                                <img
                                    src={task?.image_path || '/images/default_task.png'}
                                    alt={taskName}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-6 border-b pb-2 dark:border-gray-700">
                                <h3 className="text-xl font-bold">Task Details</h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">ID: {task?.id || 'N/A'}</span>
                            </div>

                            {/* Task details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Name</h4>
                                    <p className="text-lg font-medium">{taskName}</p>
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
                                    <p>{task?.createdBy?.name || 'Not specified'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Created On</h4>
                                    <p>{formattedCreatedDate}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Updated By</h4>
                                    <p>{task?.updatedBy?.name || 'Not specified'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Priority</h4>
                                    <p>{task?.priority || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Assigned User</h4>
                                    <p>{task?.assignedUser?.name || 'Not assigned'}</p>
                                </div>

                            </div>

                            <div className="mt-8">
                                <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                                <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded shadow-inner">
                                    {task?.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}