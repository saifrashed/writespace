import { useState } from "react";

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="absolute top-0 right-0 left-0 z-50">
                <div className="bg-white border-b border-gray-200 p">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <nav className="relative flex items-center justify-between h-16 lg:h-20">
                            {/* <div className="hidden lg:flex lg:items-center lg:space-x-10">
                                <a href="#" title="" className="text-base font-medium text-black"> Docs </a>
                            </div> */}

                            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
                                <div className="flex-shrink-0">
                                    <a href="#" title="" className="flex">
                                        <img className="w-auto h-8 lg:h-10" src="./brand/logo.png" alt="" />
                                    </a>
                                </div>
                            </div>

                            <button type="button" className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100" onClick={() => {
                                setIsOpen(!isOpen)
                            }}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>

                            {/* <div className="hidden lg:flex lg:items-center lg:space-x-10">
                                <a href="#" title="" className="text-base font-medium text-black"> Courses </a>
                            </div> */}
                        </nav>
                    </div>
                </div>

                <nav className={"py-4 bg-white lg:hidden " + (isOpen ? "" : "hidden")}  >
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Menu</p>

                            <button type="button" className={"inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"} onClick={() => {
                                setIsOpen(!isOpen)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6">
                            <hr className="my-4 border-gray-200" />

                            <div className="flex flex-col space-y-2">
                                <a href="#" title="" className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Sign in </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default NavBar