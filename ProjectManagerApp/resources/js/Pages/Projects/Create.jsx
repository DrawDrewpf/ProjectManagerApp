import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm, Link } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

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
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New Project
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className=""
                                onSubmit={ onSubmit }
                                action="">

                                {/* Image*/}
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput id="project_image_path"
                                        type="file"
                                        name="project_image_path"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.image}</InputError>
                                </div>

                                {/* Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Project Name" />
                                    <TextInput id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.name}</InputError>
                                </div>

                                {/* Description */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Project Description" />
                                    <TextAreaInput id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="description"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.description}</InputError>
                                </div>

                                {/* Due Date */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="due_date" value="Project Deadline" />
                                    <TextInput id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        autoComplete="due_date"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.due_date}</InputError>
                                </div>

                                {/* Status */}
                                <div className="mt-4">
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
                                    <InputError className="text-red-500 text-sm mt-2">{errors.status}</InputError>
                                </div>

                                

                                {/* Submit/Cancel Button */}
                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        className="inline-flex items-center px-4 py-2 bg-emerald-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-400 active:bg-emerald-600 focus:outline-none focus:border-emerald-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition ease-in-out duration-150"
                                        type="submit"
                                    >
                                        Create Project
                                    </button>
                                    <Link href={route('projects.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-500 active:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 disabled:opacity-25 transition ease-in-out duration-150 ml-4"
                                        type="button"
                                    >
                                        Cancel
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}