import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie, setCookie } from "../lib/cookie";

export default function Cookie(props) {
    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        if (getCookie("writespace-consent")) {
            setIsAccepted(true);
        }
    }, []);

    const acceptCookie = () => {
        setCookie("writespace-consent", true);
        setIsAccepted(true);
    };

    return (
        <>
            {!isAccepted && (
                <div
                    className="w-screen fixed bottom-0 left-0 right-0 flex items-center justify-center w-full bg-gray-50 dark:bg-slate-900 p-5 z-50">
                    <div className="md:flex-col items-center  ">
                        <div className="md:flex-1 w- px-3 mb-5 md:mb-0">
                            <p className="text-center md:text-left leading-tight md:pr-12">
                                Writespace uses cookies to ensure that our website works properly. See our privacy policy for more details.
                            </p>
                        </div>
                        <div className="px-3 mt-5 text-center">
                            <Link href={"/privacy"}>
                                <button
                                    className="w-full md:w-auto py-2 px-8 my-1 bg-gray-800 hover:bg-gray-900 text-white rounded font-bold text-sm mr-3">
                                    Privacy Policy
                                </button>
                            </Link>
                            <button
                                className="w-full md:w-auto py-2 px-8 my-1 bg-blue-500 hover:bg-orange-400 text-white rounded font-bold text-sm"
                                onClick={acceptCookie}>
                                Accept cookies
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}