import Pagination from "@/Components/DataTables/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.js";

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            title={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>} >

            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <table className="w-full text-sm rtl:text.right text-gray-500 dark:text-gray-400">
                                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-4">ID</th>
                                        <th className="px-3 py-4">Image</th>
                                        <th className="px-3 py-4">Name</th>
                                        <th className="px-3 py-4">Status</th>
                                        <th className="px-3 py-4">Create Date</th>
                                        <th className="px-3 py-4">Due Date</th>
                                        <th className="px-3 py-4">Created By</th>
                                        <th className="px-3 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {projects.data.map(project => (
                                        <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-4">{project.id}</td>
                                            <td className="px-3 py-4"><img src={project.image_path} alt={project.id} style={{width:60}} /></td>
                                            <td className="px-3 py-4">{project.name}</td>
                                            <td className={`px-3 py-4 ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>{PROJECT_STATUS_TEXT_MAP[project.status]}</td>
                                            <td className="px-3 py-4">{project.created_at}</td>
                                            <td className="px-3 py-4">{project.due_date}</td>
                                            <td className="px-3 py-4">{project.createdBy.name}</td>
                                            <td className="px-3 py-4">
                                                <Link href={route('projects.edit', project.id)} className="font-medium text-white bg-blue-500 hover:bg-blue-600 mx-2 p-2 rounded-md">Edit</Link>
                                                <Link href={route('projects.destroy', project.id)} className="font-medium text-white bg-red-500 hover:bg-red-600 mx-2 p-2 rounded-md">Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    {/* Pagination Component */}
                                    <Pagination links={projects.meta.links} />
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}