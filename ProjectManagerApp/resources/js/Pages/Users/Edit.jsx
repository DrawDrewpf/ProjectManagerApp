import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, user }) {

    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => {
                reset('password', 'password_confirmation');
                console.log('User updated successfully');
            },
            onError: (errors) => console.log('Errors:', errors),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit User "{user.name}"
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <form
                                className=""
                                onSubmit={onSubmit}
                                action="">

                                {/* Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="User Name" />
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

                                {/* Email */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.email}</InputError>
                                </div>

                                {/* Password */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.password}</InputError>
                                </div>

                                {/* Password Confirmation */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                    <TextInput id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError className="text-red-500 text-sm mt-2">{errors.password_confirmation}</InputError>
                                </div>


                                {/* Submit/Cancel Button */}
                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        className="inline-flex items-center px-4 py-2 bg-emerald-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-400 active:bg-emerald-600 focus:outline-none focus:border-emerald-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition ease-in-out duration-150"
                                        type="submit"
                                    >
                                        Edit User
                                    </button>
                                    <Link href={route('users.index')}
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