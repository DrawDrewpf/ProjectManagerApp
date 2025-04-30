import Pagination from "@/Components/DataTables/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/DataTables/TableHeading";
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@headlessui/react";


export default function Index({ auth, users, queryParams = null }) {

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
        router.get(route('users.index', debouncedQueryParams), {}, { preserveState: true });
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

    // Function to delete a user
    // This function will be called when the delete button is clicked
    const deleteUser = (user) => {
        if (!window.confirm('Are you sure you want to delete this user?')) 
        {
            return;
        }
        router.delete(route('users.destroy', user.id));
    }

    return (
        <AuthenticatedLayout
            title={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Users
                    </h2>

                    <Link className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" href={route('users.create')}>
                        Create New User
                    </Link>
                </div>
            } >

            <Head title="Users" />

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
                                            
                                            {/* Table Heading - Name */}
                                            <TableHeading
                                                name="name"
                                                label="Name"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />
                                            {/* Table Heading - Email */}
                                            <TableHeading
                                                name="email"
                                                label="Email"
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
                                            {/* Table Heading - Actions */}
                                            <TableHeading
                                                name="actions"
                                                label="Actions"
                                                sortField={debouncedQueryParams.sort_field}
                                                sortDirection={debouncedQueryParams.sort_direction}
                                                onSortChange={sortChanged}
                                            />        
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="whitespace-nowrap">
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4">
                                                {/* Input for user name */}
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="User Name"
                                                    onChange={e => debouncedSearchfieldsChanged('name', e.target.value)}
                                                />
                                            </th>
                                            <th className="px-3 py-4">
                                                {/* Input for user email */}
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.email}
                                                    placeholder="User Email"
                                                    onChange={e => debouncedSearchfieldsChanged('email', e.target.value)}
                                                />
                                            </th>
                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4"></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map through the user data */}
                                        {users.data.map(user => (
                                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-4">{user.id}</td>
                                                <td className="px-3 py-4">
                                                    <Link href={route('users.show', user.id)} className="hover:underline text-white text-nowrap">
                                                        {user.name}
                                                    </Link>
                                                </td>
                                                <td className="px-2 py-4">{user.email}</td>
                                                <td className="px-3 py-4">{user.created_at}</td>
                                                <td className="px-3 py-4 flex">
                                                    <Link href={route('users.edit', user.id)} className="font-medium text-white bg-blue-500 hover:bg-blue-600 mx-2 p-2 rounded-md">Edit</Link>
                                                    <Button onClick={e => deleteUser(user)} className="font-medium text-white bg-red-500 hover:bg-red-600 mx-2 p-2 rounded-md">Delete</Button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination Component */}
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}