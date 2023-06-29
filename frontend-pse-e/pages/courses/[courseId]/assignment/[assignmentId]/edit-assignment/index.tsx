import Head from "next/head";
import { useRouter } from "next/router";
import useCourse from "@/lib/hooks/useCourse";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { motion } from "framer-motion";
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Context } from '@/Context';
import { Assignment } from "@/lib/types";
import NavBar from "@/components/NavBar";
import useAssignment from "@/lib/hooks/useAssignment";


/**
 * The edit assignment page component.
 *
 * @component
 * @returns {JSX.Element} The rendered edit assignment page.
 */
const EditAssignment = () => {
    const router = useRouter();
    const { courseId, assignmentId } = router.query;
    const { token } = useAuthentication();
    const { updateAssignment } = useAssignment();

    const { course: contextCourse } = useContext(Context);
    const { course: fetchedCourse, getCourse } = useCourse(token, courseId?.toString());
    const course = contextCourse || fetchedCourse;

    const { assignment: contextAssignment } = useContext(Context);
    const { assignment: fetchedAssignment, getAssignment } = useAssignment(token, courseId?.toString(), assignmentId?.toString(),);
    const assignmentData = contextAssignment || fetchedAssignment;

    const [assignment, setAssignment] = useState<Assignment>({
        name: "",
        description: "",
        points_possible: 0,
        grading_type: "points",
        omit_from_final_grade: false,
        anonymous_grading: false,
        allowed_attempts: "Unlimited",
        due_at: "",
        ...assignmentData,
    });


    useEffect(() => {
        if (assignmentData) {
            setAssignment({
                ...assignmentData,
                allowed_attempts: assignmentData.allowed_attempts === -1 ? "Unlimited" : assignmentData.allowed_attempts,
                due_at: assignmentData.due_at && new Date(assignmentData.due_at)?.toISOString().slice(0, -1),
            })
        }
    }, [assignmentData]);

    const handleUpdateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAssignment: Assignment = {
            ...assignment,
            due_at: assignment.due_at && new Date(assignment.due_at)?.toISOString(),
            allowed_attempts: assignment.allowed_attempts === "Unlimited" ? -1 : assignment.allowed_attempts,
        }

        if (courseId && assignmentId) {
            await updateAssignment(courseId.toString(), assignmentId.toString(), newAssignment, token)
            router.back()
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        let inputValue: any = type === "checkbox" ? checked : value;

        if (name === "allowed_attempts") {
            inputValue = inputValue === "" || parseInt(inputValue) < 1 ? "Unlimited" : parseInt(inputValue);
        }
        if (name === "points_possible") {
            inputValue = inputValue === "" || parseInt(inputValue) < 0 ? 0 : parseInt(inputValue);
        }

        setAssignment((prevAssignment) => ({
            ...prevAssignment,
            [name]: inputValue
        }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let inputValue: any = value;

        if (name === "allowed_attempts") {
            inputValue = inputValue === "" || parseInt(inputValue) < 1 ? "Unlimited" : parseInt(inputValue);
        }
        if (name === "points_possible") {
            inputValue = inputValue === "" || parseInt(inputValue) < 0 ? 0 : parseInt(inputValue);
        }

        setAssignment((prevAssignment) => ({
            ...prevAssignment,
            [name]: inputValue
        }));
    };

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let inputValue: any = value;

        if (name === "allowed_attempts") {
            inputValue = inputValue === "" || parseInt(inputValue) < 1 ? "Unlimited" : parseInt(inputValue);
        }
        if (name === "points_possible") {
            inputValue = inputValue === "" || parseInt(inputValue) < 0 ? 0 : parseInt(inputValue);
        }

        setAssignment((prevAssignment) => ({
            ...prevAssignment,
            [name]: inputValue
        }));
    };

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
                            {course?.name || "Course Name"}
                        </h5>
                        <span
                            className="mb-2 text-sm text-center text-white opacity-60">
                            {course?.course_code || "Course Code"}
                        </span>
                    </motion.div>
                </div>
                <div className="w-full relative overflow-x-auto shadow-md p-4 lg:p-8 md:w-4/5">
                    <form className="w-full" onSubmit={handleUpdateAssignment}>
                        <div className="mb-6">
                            <label htmlFor="assignment-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Assignment Name
                            </label>
                            <input
                                type="text"
                                id="assignment-name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder={assignment?.name}
                                required
                                name="name"
                                value={assignment?.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <label htmlFor="assignment-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <textarea
                            id="assignment-description"
                            rows={4}
                            className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={assignment?.description}
                            name="description"
                            value={assignment?.description}
                            onChange={handleTextAreaChange}
                        ></textarea>
                        <label htmlFor="assignment_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment Type</label>
                        <select disabled id="assignment_type" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Written Assignment</option>
                        </select>
                        <label htmlFor="grading_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Grading Type
                        </label>
                        <select
                            value={assignment?.grading_type || "points"}
                            id="grading_type"
                            name="grading_type"
                            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleSelectChange}
                        >
                            <option value="pass_fail">Pass/Fail</option>
                            <option value="percent">Percent</option>
                            <option value="points">Points</option>
                            <option value="letter_grade">Letter Grade</option>
                            <option value="gpa_scale">GPA Scale</option>
                            <option value="not_graded">Not Graded</option>
                        </select>
                        <div className="mb-6">
                            <label htmlFor="assignment-points" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Points
                            </label>
                            <input
                                type="number"
                                id="assignment-points"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="0"
                                required
                                name="points_possible"
                                value={assignment?.points_possible}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="assignment-attempts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attempts</label>
                            <input
                                type="number"
                                id="assignment-attempts"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Unlimited"
                                name="allowed_attempts"
                                value={assignment?.allowed_attempts}
                                onChange={handleInputChange}
                            />
                        </div>
                        <label htmlFor="assignment-deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </div>
                            <input
                                type="datetime-local"
                                id="assignment-deadline"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="dd-mm-yyyy"
                                name="due_at"
                                value={assignment?.due_at}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="assignment-points-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    name="omit_from_final_grade"
                                    checked={assignment?.omit_from_final_grade}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <label htmlFor="assignment-points-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Do not count this assignment towards the final grade
                            </label>
                        </div>

                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="assignment-anonymous-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    name="anonymous_grading"
                                    checked={assignment?.anonymous_grading}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <label htmlFor="assignment-anonymous-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Graders cannot view student names
                            </label>
                        </div>
                        <div className="mb-6"></div>
                        <button
                            type="submit"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <i className="fa-solid fa-floppy-disk me-2"></i>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default EditAssignment;
