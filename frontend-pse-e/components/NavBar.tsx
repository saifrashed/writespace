import useAuthentication from "@/lib/hooks/useAuthentication";
import Link from "next/link";

const NavBar = ({ showLogout = true }) => {
    const { logout } = useAuthentication();

    return (
        <>
            <header className="absolute top-0 right-0 left-0 z-40">
                <div className="bg-white border-b border-gray-200 p">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <nav className="relative h-16 lg:h-20">
                            <div className="absolute -translate-x-1/2 inset-y-5 left-1/2">
                                <div className="flex-shrink-0">
                                    <Link href="/">
                                        <img className="w-auto h-8 lg:h-10" src="/brand/logo.png" alt="" />
                                    </Link>
                                </div>
                            </div>

                            {showLogout && (
                                <button type="button" className=" absolute -translate-x-0 inset-y-5 right-0 inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100" onClick={() => {
                                    logout()
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                </button>
                            )}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default NavBar