import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="flex text-center mt-4 ">
            {links.map((link, index) => (
                <Link
                    preserveScroll
                    href={link.url || ''}
                    key={link.label}
                    className={
                        "inline-block py-1 px-4 m-0.5 rounded-lg text-xs" +
                        (link.active ? " bg-blue-500 text-white" : " bg-gray-200 text-gray-500") +
                        (!link.url ? " cursor-not-allowed" : " hover:bg-gray-300")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}