import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useCallback } from 'react';
import { Link } from "@inertiajs/react";

import TasksTable from "@/Pages/Tasks/TasksTable";



export default function Index({ auth, tasks, queryParams = null }) {

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

    const debouncedSearchfieldsChanged = useCallback(debounce(searchfieldsChanged, 300), []);

    // Call the router to get the tasks
    useEffect(() => {
        router.get(route('tasks.index', debouncedQueryParams), {}, { preserveState: true });
    }, [debouncedQueryParams]);

    // sortChanged function
    // This function will be called when the sort fields change
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

    return (
        <AuthenticatedLayout
            title={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Task
                    </h2>

                    <Link className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" href={route('tasks.create')}>
                        Create New Task
                    </Link>
                </div>
            } >

            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* TasksTable */}
                            <TasksTable
                                tasks={tasks}
                                queryParams={queryParams}
                                debouncedQueryParams={debouncedQueryParams}
                                debouncedSearchfieldsChanged={debouncedSearchfieldsChanged}
                                sortChanged={sortChanged}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}