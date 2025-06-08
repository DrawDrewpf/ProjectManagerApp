import React from 'react';
import Avatar from '@/Components/Avatar';
import StatusBadge from '@/Components/DataTables/StatusBadge';
import { USER_STATUS_TEXT_MAP } from '@/constants';

export default function UserCard({ user, showStats = false, className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
            <div className="flex items-start space-x-4">
                <Avatar user={user} size="lg" showStatus={true} />
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {user.name}
                            </h3>
                            {user.position && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.position}
                                </p>
                            )}
                            {user.department && (
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {user.department}
                                </p>
                            )}
                        </div>
                        
                        <StatusBadge status={user.status} size="sm">
                            {USER_STATUS_TEXT_MAP[user.status]}
                        </StatusBadge>
                    </div>

                    <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                        </p>
                        {user.phone && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user.phone}
                            </p>
                        )}
                    </div>

                    {user.bio && (
                        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                            {user.bio}
                        </p>
                    )}

                    {showStats && user.task_stats && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.task_stats.total}
                                </div>
                                <div className="text-xs text-gray-500">Total</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-yellow-600">
                                    {user.task_stats.pending}
                                </div>
                                <div className="text-xs text-gray-500">Pending</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-blue-600">
                                    {user.task_stats.in_progress}
                                </div>
                                <div className="text-xs text-gray-500">Progress</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-green-600">
                                    {user.task_stats.completed}
                                </div>
                                <div className="text-xs text-gray-500">Done</div>
                            </div>
                        </div>
                    )}

                    {user.last_login_at && (
                        <div className="mt-3 text-xs text-gray-500">
                            Last login: {user.last_login_at}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
