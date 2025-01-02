"use client";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";

export default function Footer() {

    const pathname = usePathname();
    if (pathname.includes("/auth")) {
        return null;
    }

    return (
        <footer className="m-10">
            <div className="py-16 border-t-[1px] border-gray-500">
                <div className="size-8">
                    <span className="sr-only">Slovene Step By Step</span>
                    <img alt="Company Logo" src={`/Logo.svg`} />
                </div>
                <p className="my-8 text-gray-700 dark:text-gray-300">
                    The best way to learn Slovene and make your dreams a reality.
                </p>
                <div className="flex gap-x-5">
                    <a href="#" className="size-6" target="_blank">
                        <span className="sr-only">Slovene Step By Step | Facebook</span>
                        <img src={"/social-link-face.svg"} alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/slovenscina_korakzakorakom/" className="size-6" target="_blank">
                        <span className="sr-only">Slovene Step By Step | Instagram</span>
                        <img src={"/social-link-inst.svg"} alt="Instagram" />
                    </a>
                    <a href="#" className="size-6" target="_blank">
                        <span className="sr-only">Slovene Step By Step | X</span>
                        <img src={"/social-link-x.svg"} alt="X" />
                    </a>
                    <a href="https://t.me/slovenscina_korak_za_korakom" className="size-6" target="_blank">
                        <span className="sr-only">Slovene Step By Step | Telegram</span>
                        <img src={"/social-link-tele.svg"} alt="Telegram" />
                    </a>
                    <a href="https://www.tiktok.com/@slovenina.korak.z5" className="size-6" target="_blank">
                        <span className="sr-only">Slovene Step By Step | Tik Tok</span>
                        <img src={"/social-link-tik.svg"} alt="Tik Tok" />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5">
                <div className="flex flex-col">
                    <h1 className="mb-5 text-gray-900 dark:text-gray-200 font-semibold">Title 1</h1>
                    <div><Link href="#" className="text-gray-500 dark:text-gray-400">Link1</Link></div>
                    <div><Link href="#" className="text-gray-500 dark:text-gray-400">Link2</Link></div>
                    <div><Link href="#" className="text-gray-500 dark:text-gray-400">Link3</Link></div>
                </div>
                <div className="flex flex-col">
                    <h1 className="mb-5 text-gray-900 dark:text-gray-200 font-semibold">Quick Links</h1>
                    <div><Link href={"/"} className="hover:underline text-gray-500 dark:text-gray-400">Home</Link></div>
                    <div><Link href={"/courses"} className="hover:underline text-gray-500 dark:text-gray-400">Courses</Link></div>
                    <div><Link href={"/pricing"} className="hover:underline text-gray-500 dark:text-gray-400">Pricing</Link></div>
                </div>
                <div className="flex flex-col">
                    <h1 className="mb-5 text-gray-900 dark:text-gray-200 font-semibold">Company</h1>
                    <div><Link href={"/about-us"} className="hover:underline text-gray-500 dark:text-gray-400">About</Link></div>
                    <div><Link href={"/info/contact-us"} className="hover:underline text-gray-500 dark:text-gray-400">Contact us</Link></div>
                    <div><Link href={"/info/faq"} className="hover:underline text-gray-500 dark:text-gray-400">FAQ</Link></div>
                </div>
                <div className="flex flex-col">
                    <h1 className="mb-5 text-gray-900 dark:text-gray-200 font-semibold">Legal</h1>
                    <div><Link href="#" className="text-gray-500 dark:text-gray-400">Terms of service</Link></div>
                    <div><Link href="#" className="text-gray-500 dark:text-gray-400">Privacy policy</Link></div>
                    <div><Link href="#" className="text-gray-500 dark:text-gray-400">License</Link></div>
                </div>
            </div>
            <div className="mt-10">
                <p>&copy; 2024 Slovene Step By Step. All rights reserved.</p>
            </div>
        </footer>
    );
}
