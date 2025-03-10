import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TasksTable from "@/Pages/Tasks/TasksTable";
import { useState, useCallback, useEffect } from 'react';

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
        router.get(route('projects.show', project.id), debouncedQueryParams, { preserveState: true });
    }, [debouncedQueryParams, project.id]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">{`Project "${projectName}"`}</h2>}
        >
            <Head title={`Project: ${projectName}`} />
            {/* Project details */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6 border-b pb-2 dark:border-gray-700">
                                <h3 className="text-xl font-bold">Project Details</h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">ID: {project?.id || 'N/A'}</span>
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
                            {/* TasksTable */}
                            <TasksTable
                                tasks={tasks}
                                queryParams={queryParams}
                                debouncedQueryParams={debouncedQueryParams}
                                debouncedSearchfieldsChanged={debouncedSearchfieldsChanged}
                                sortChanged={sortChanged}
                                hideProjectColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}