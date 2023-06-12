import Head from "next/head";
import { useRouter } from "next/router";
import useCourse from "@/lib/hooks/useCourse";
import Link from "next/link";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import { Context } from '@/Context';
import { Enrollment } from "@/lib/types";
import NavBar from "@/components/NavBar";

const CreateAssignment = () => {
    const router = useRouter();

    const { courseId } = router.query;
    const { token } = useAuthentication();

    const { course: contextCourse } = useContext(Context); // When pressing a course
    const { course: fetchedCourse, getCourse } = useCourse(); // When navigating to a course via url
    const course = contextCourse || fetchedCourse;

    useEffect(() => {
        if (courseId && token) {
            getCourse(parseInt(courseId.toString()), token)
        }
    }, [router.query]);

    const isTeacher = course?.enrollments?.some(
        (enrollment: Enrollment) => enrollment?.type === "teacher"
    )

    console.log(course, isTeacher);

    return (
        <>
            <Head>
                <title>Create assignment for {course?.name} - WriteSpace</title>
                <meta name="description" content="Writing. Fun, Intuitive." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <NavBar />

            <div className="flex flex-col md:flex-row pt-20">
                <div className="bg-white lg:border lg:border-gray-200 rounded-lg lg:shadow lg:dark:bg-gray-800 lg:dark:border-gray-700 p-5 md:min-h-screen flex items-center content-center justify-center">
                    <motion.div
                        layoutId={course?.id.toString()}
                        className={`flex flex-col items-center rounded-2xl p-8 ${course?.course_color || "bg-yellow-500"} bg-opacity-50 z-10`}>
                        <h5
                            className="mb-1 text-xl font-medium text-white text-center">
                            {course?.name}
                        </h5>
                        <span
                            className="mb-2 text-sm text-center text-white opacity-60">
                            {course?.course_code}
                        </span>
                    </motion.div>
                </div>
                <div className="w-full relative overflow-x-auto shadow-md sm:p-2 md:p-4 lg:p-8 md:w-4/5">
                    <form className="w-full">
                        <div className="mb-6">
                            <label htmlFor="assignment-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment Name</label>
                            <input type="text" id="assignment-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Assignment Name" required />
                        </div>

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="message" rows={4} className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                        <label htmlFor="assignment_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment Type</label>
                        <select disabled id="assignment_type" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Written Assignment</option>
                        </select>

                        {/* <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div> */}
                        {/* <div className="mb-6">
                            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                            <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div> */}
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                        </div>
                        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Assignment</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default CreateAssignment;
