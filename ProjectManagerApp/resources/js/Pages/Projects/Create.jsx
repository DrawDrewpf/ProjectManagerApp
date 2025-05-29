import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm, Link } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import ActionButton from "@/Components/DataTables/ActionButton";

import { 
    ArrowLeftIcon, 
    PhotoIcon, 
    DocumentTextIcon, 
    CalendarIcon,
    ChartBarIcon,
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

export default function Create({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        description: '',
        status: '',
        due_date: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            data,
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link 
                        href={route('projects.index')}
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back to Projects
                    </Link>
                    <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New Project
                    </h2>
                </div>
            }
        >
            <Head title="Create Project" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <PlusIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                New Project Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Fill in the details below to create a new project
                            </p>
                        </div>
                        
                        <form onSubmit={onSubmit} className="p-6">
                            <div className="space-y-8">
                                {/* Project Image Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                        <PhotoIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                                        Project Image
                                    </h4>
                                    <div>
                                        <InputLabel htmlFor="project_image_path" value="Choose Project Image" />
                                        <TextInput 
                                            id="project_image_path"
                                            type="file"
                                            name="project_image_path"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                        />
                                        <InputError className="mt-2">{errors.image}</InputError>
                                    </div>
                                </div>

                                {/* Basic Information Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                        <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                                        Basic Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="name" value="Project Name" />
                                            <TextInput 
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter project name"
                                            />
                                            <InputError className="mt-2">{errors.name}</InputError>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="project_status" value="Project Status" />
                                            <SelectInput 
                                                id="project_status"
                                                name="status"
                                                className="mt-1 block w-full"
                                                autoComplete="status"
                                                onChange={(e) => setData('status', e.target.value)}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                            <InputError className="mt-2">{errors.status}</InputError>
                                        </div>

                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="description" value="Project Description" />
                                            <TextAreaInput 
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                className="mt-1 block w-full"
                                                autoComplete="description"
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Describe the project objectives, scope, and requirements..."
                                                rows={4}
                                            />
                                            <InputError className="mt-2">{errors.description}</InputError>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                        <CalendarIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                                        Timeline
                                    </h4>
                                    <div>
                                        <InputLabel htmlFor="due_date" value="Project Deadline" />
                                        <TextInput 
                                            id="due_date"
                                            type="date"
                                            name="due_date"
                                            value={data.due_date}
                                            className="mt-1 block w-full max-w-md"
                                            autoComplete="due_date"
                                            onChange={(e) => setData('due_date', e.target.value)}
                                        />
                                        <InputError className="mt-2">{errors.due_date}</InputError>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <ActionButton
                                    href={route('projects.index')}
                                    variant="secondary"
                                    icon={<XMarkIcon className="w-4 h-4" />}
                                >
                                    Cancel
                                </ActionButton>
                                <ActionButton
                                    type="submit"
                                    variant="primary"
                                    icon={<PlusIcon className="w-4 h-4" />}
                                >
                                    Create Project
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}