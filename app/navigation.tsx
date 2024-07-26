'use client'

import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "./(components)/button";
import useIsAthenticated from "./hooks/useIsAthentcated";

export default function HomeNav() {
    useIsAthenticated()

    const cookies = useCookies();
    const router = useRouter()
    const pathname = usePathname()

    function logOut() {
        cookies.remove('token')
        router.push('/login')
    }

    const highlight = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    const normal = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

    return <>
        { pathname !== '/login' && <section>
            <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="items-center justify-between w-full flex" id="navbar-sticky">
                        <ul className="flex p-4 font-medium space-x-8 rtl:space-x-reverse mt-0 border-0">
                            <li>
                                <Link href="/" className={pathname === '/'? highlight : normal}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/newGroup" className={pathname === '/newGroup'? highlight : normal}>
                                    adicionar grupo
                                </Link>
                            </li>
                        </ul>
                        <Button onClick={logOut} className="text-black">logout</Button>
                    </div>
                </div>
            </nav>
        </section>}
    </>
    
    
}
