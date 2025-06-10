import { useState } from 'react';

import { 
    UserIcon, 
    LockClosedIcon, 
    ExclamationTriangleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function ProfileTabs({ activeTab, onTabChange }) {
    const tabs = [
        {
            id: 'profile',
            name: 'Profile Information',
            icon: UserIcon,
            color: 'blue',
            description: 'Update your details'
        },
        {
            id: 'security',
            name: 'Security',
            icon: LockClosedIcon,
            color: 'green',
            description: 'Manage your password'
        },
        {
            id: 'danger',
            name: 'Danger Zone',
            icon: ExclamationTriangleIcon,
            color: 'red',
            description: 'Delete your account'
        }
    ];

    const getTabStyles = (tab, isActive) => {
        const baseStyles = "relative flex items-center p-4 rounded-xl transition-all duration-200 group cursor-pointer w-full h-16";
        
        if (isActive) {
            const colorStyles = {
                blue: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-700 shadow-lg shadow-blue-100 dark:shadow-blue-900/20",
                green: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-700 shadow-lg shadow-green-100 dark:shadow-green-900/20",
                red: "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-2 border-red-200 dark:border-red-700 shadow-lg shadow-red-100 dark:shadow-red-900/20"
            };
            return `${baseStyles} ${colorStyles[tab.color]}`;
        }
        
        return `${baseStyles} bg-white/50 dark:bg-gray-800/50 border-2 border-transparent shadow-sm hover:shadow-md hover:bg-white/70 dark:hover:bg-gray-700/70`;
    };

    const getIconStyles = (tab, isActive) => {
        if (isActive) {
            const colorStyles = {
                blue: "text-blue-600 dark:text-blue-400",
                green: "text-green-600 dark:text-green-400",
                red: "text-red-600 dark:text-red-400"
            };
            return colorStyles[tab.color];
        }
        return "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300";
    };

    const getTextStyles = (tab, isActive) => {
        if (isActive) {
            const colorStyles = {
                blue: "text-blue-900 dark:text-blue-100",
                green: "text-green-900 dark:text-green-100",
                red: "text-red-900 dark:text-red-100"
            };
            return colorStyles[tab.color];
        }
        return "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100";
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center mb-6 w-full">
                <Cog6ToothIcon className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Settings
                </h3>
            </div>
            
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                
                return (

                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={getTabStyles(tab, isActive)}
                    >
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors duration-200 ${
                            isActive ? 'bg-white/70 dark:bg-gray-800/70' : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600'
                        }`}>
                            <Icon className={`w-5 h-5 ${getIconStyles(tab, isActive)}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 text-left min-w-0 overflow-hidden">
                            <div className={`font-semibold text-sm leading-tight line-clamp-1 ${getTextStyles(tab, isActive)}`}>
                                {tab.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight line-clamp-1">
                                {tab.description}
                            </div>
                        </div>
                        
                        {/* Active Indicator */}
                        {isActive && (
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full ml-3 ${
                                tab.color === 'blue' ? 'bg-blue-500' :
                                tab.color === 'green' ? 'bg-green-500' :
                                'bg-red-500'
                            }`} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
