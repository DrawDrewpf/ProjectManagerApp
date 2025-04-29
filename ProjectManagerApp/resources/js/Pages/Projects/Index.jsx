import Pagination from "@/Components/DataTables/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.js";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/DataTables/TableHeading";
import { useState, useEffect, useCallback } from 'react';


export default function Index({ auth, projects, queryParams = null }) {

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

    // Call the router to get the tasks
    useEffect(() => {
        router.get(route('projects.index', debouncedQueryParams), {}, { preserveState: true });
    }, [debouncedQueryParams]);

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
                    Projects
                </h2>
                
                <Link className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" href={route('projects.create')}>
                    Create New Project
                </Link>
            </div>
            } >

            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="whitespace-nowrap">
                                            {/* Table Heading - ID */}
                                            <TableHeading
                                                name="id"
                                                label="ID"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />
                                            <th className="px-3 py-4 text-center">Image</th>
                                            {/* Table Heading - Name */}
                                            <TableHeading
                                                name="name"
                                                label="Name"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />
                                            {/* Table Heading - Status */}
                                            <TableHeading
                                                name="status"
                                                label="Status"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />
                                            {/* Table Heading - Created At */}
                                            <TableHeading
                                                name="created_at"
                                                label="Create Date"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />
                                            {/* Table Heading - Due Date */}
                                            <TableHeading
                                                name="due_date"
                                                label="Due Date"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />
                                            <th className="px-3 py-4">Created By</th>
                                            <th className="px-3 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="whitespace-nowrap">
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4">
                                                {/* Input for project name */}
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Project Name"
                                                    onChange={e => debouncedSearchfieldsChanged('name', e.target.value)}
                                                />
                                            </th>
                                            <th className="px-3 py-4">
                                                {/* Select for project status */}
                                                <SelectInput
                                                    className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={queryParams.status}
                                                    onChange={e => debouncedSearchfieldsChanged('status', e.target.value)}>
                                                    <option value="">All Statuses</option>
                                                    {Object.entries(PROJECT_STATUS_TEXT_MAP).map(([value, text]) => (
                                                        <option key={value} value={value} className="py-2">
                                                            {text}
                                                        </option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map through the project data */}
                                        {projects.data.map(project => (
                                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-4">{project.id}</td>
                                                <td className="px-3 py-4"><img src={project.image_path} alt={project.id} className="w-12 h-12" /></td>
                                                <td className="px-3 py-4">
                                                    <Link href={route('projects.show', project.id)} className="hover:underline text-white text-nowrap">
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <span className={"px-3 py-1.5 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4">{project.created_at}</td>
                                                <td className="px-3 py-4">{project.due_date}</td>
                                                <td className="px-3 py-4">{project.createdBy.name}</td>
                                                <td className="px-3 py-4">
                                                    <Link href={route('projects.edit', project.id)} className="font-medium text-white bg-blue-500 hover:bg-blue-600 mx-2 p-2 rounded-md">Edit</Link>
                                                    <Link href={route('projects.destroy', project.id)} className="font-medium text-white bg-red-500 hover:bg-red-600 mx-2 p-2 rounded-md">Delete</Link>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination Component */}
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}