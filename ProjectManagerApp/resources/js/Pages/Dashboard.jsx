import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.js";

export default function Dashboard({ auth, totalPendingTasks, myPendingTasks, totalprogressTasks, myProgressTasks, totalCompletedTasks, myCompletedTasks, activeTasks }) {
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

            <div className="py-12 ">
                {/* Tasks status Info */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                        <h3 className='text-yellow-500 text-2xl font-semibold'>Pending Tasks</h3>
                        <p className='text-lg mt-4 font-bold'>
                            <span className='mr-2'>{myPendingTasks}</span>/<span className='ml-2'>{totalPendingTasks}</span>
                        </p>
                    </div>
                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                        <h3 className='text-blue-500 text-2xl font-semibold'>Progress Tasks</h3>
                        <p className='text-lg mt-4 font-bold'>
                            <span className='mr-2'>{myProgressTasks}</span>/<span className='ml-2'>{totalprogressTasks}</span>
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
                <div className="mt-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className='text-white text-3xl font-semibold mb-4'>My Active Tasks</h3>
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="whitespace-nowrap">
                                        <th className="px-3 py-4">ID</th>
                                        <th className="px-3 py-4">Project Name</th>
                                        <th className="px-3 py-4">Task Name</th>
                                        <th className="px-3 py-4">Status</th>
                                        <th className="px-3 py-4">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks.data.length > 0 ? (
                                        activeTasks.data.map(task => (
                                            <tr key={task.id} className="bg-white border-b dark:bg-gray-700 dark:border-gray-700">
                                                <td className="px-3 py-4">{task.id}</td>
                                                <td className="px-3 py-4">{task.project.name}</td>
                                                <td className="px-3 py-4">
                                                    <Link href={route('tasks.show', task.id)} className="hover:underline text-blue-600 dark:text-blue-400">
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className="px-2 py-4">
                                                    <span className={`px-3 py-1.5 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4">{task.due_date || 'Not set'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td colSpan="6" className="px-3 py-4 text-center">No active tasks available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}