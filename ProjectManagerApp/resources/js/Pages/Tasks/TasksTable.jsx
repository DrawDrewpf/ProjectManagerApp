import Pagination from "@/Components/DataTables/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.js";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/DataTables/TableHeading";
import { Link } from "@inertiajs/react";

export default function TasksTable({ tasks = {},
    queryParams = null,
    debouncedQueryParams = {},
    debouncedSearchfieldsChanged = () => { },
    sortChanged = () => { },
    hideProjectColumn = false }) {

    queryParams = queryParams || {};

    // Handle case where tasks is undefined by providing default empty values
    const taskData = tasks?.data || [];
    const taskLinks = tasks?.meta?.links || [];

    return (
        <>
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
                            {!hideProjectColumn && (
                                <TableHeading
                                    name="project.name"
                                    label="Project Name"
                                    sortField={debouncedQueryParams.sort_field}
                                    sortDirection={debouncedQueryParams.sort_direction}
                                    onSortChange={sortChanged}
                                />
                            )}
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
                            {!hideProjectColumn && <th className="px-3 py-4"></th>}
                            <th className="px-3 py-4"></th>
                            <th className="px-3 py-4">
                                {/* Input for task name */}
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="task Name"
                                    onChange={e => debouncedSearchfieldsChanged('name', e.target.value)}
                                />
                            </th>
                            <th className="px-3 py-4">
                                {/* Select for task status */}
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={e => debouncedSearchfieldsChanged('status', e.target.value)} >
                                    <option value="">Select Status</option>
                                    {Object.entries(TASK_STATUS_TEXT_MAP).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
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
                        {/* Map through the task data */}
                        {taskData.length > 0 ? (
                            taskData.map(task => (
                                <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-3 py-4">{task.id}</td>
                                    {!hideProjectColumn && <td className="px-3 py-4">{task.project.name}</td>}
                                    <td className="px-3 py-4"><img src={task.image_path} alt={task.id} className="w-15 h-auto" /></td>
                                    <td className="px-3 py-4">{task.name}</td>
                                    <td className="px-2 py-4">
                                        <span className={"px-3 py-1.5 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4">{task.created_at}</td>
                                    <td className="px-3 py-4">{task.due_date}</td>
                                    <td className="px-3 py-4">{task.createdBy?.name || 'Not specified'}</td>
                                    <td className="px-3 py-4">
                                        <Link href={route('tasks.edit', task.id)} className="font-medium text-white bg-blue-500 hover:bg-blue-600 mx-2 p-2 rounded-md">Edit</Link>
                                        <Link href={route('tasks.destroy', task.id)} className="font-medium text-white bg-red-500 hover:bg-red-600 mx-2 p-2 rounded-md">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={hideProjectColumn ? "7" : "8"} className="px-3 py-4 text-center">No tasks available for this project.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Component */}
            {taskLinks.length > 0 && <Pagination links={taskLinks} />}
        </>
    )
}