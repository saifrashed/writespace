import Head from "next/head";
import { useRouter } from "next/router";
import useCourse from "@/lib/hooks/useCourse";
import Link from "next/link";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { motion } from "framer-motion";
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Context } from '@/Context';
import { Assignment, Enrollment } from "@/lib/types";
import NavBar from "@/components/NavBar";
import useAssignment from "@/lib/hooks/useAssignment";

const EditAssignment = () => {

    const router = useRouter();
    const { courseId, assignmentId } = router.query;
    const { token } = useAuthentication();
    const { updateAssignment } = useAssignment();

    const { course: contextCourse } = useContext(Context);
    const { course: fetchedCourse, getCourse } = useCourse();
    const course = contextCourse || fetchedCourse;

    const { assignment: contextAssignment } = useContext(Context);
    const { assignment: fetchedAssignment, getAssignment } = useAssignment();
    const assignment = contextAssignment || fetchedAssignment;

    const [assignmentName, setAssignmentName] = useState<string>(assignment?.name || "");
    const [description, setDescription] = useState<string>(assignment?.description || "");
    const [points, setPoints] = useState<number>(assignment?.points_possible || 0);
    const [attempts, setAttempts] = useState<number>(assignment?.allowed_attempts || -1);
    const [gradingType, setGradingType] = useState<string>(assignment?.grading_type || "");
    const [isGroupAssignment, setIsGroupAssignment] = useState<boolean>(false);
    const [isCounted, setIsCounted] = useState<boolean>(assignment?.omit_from_final_grade || false);
    const [requirePeerReviews, setRequirePeerReviews] = useState<boolean>(assignment?.peer_reviews || false);
    const [isAnonymousGrading, setIsAnonymousGrading] = useState<boolean>(assignment?.anonymous_grading || false);

    const formatDueDateNormal = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${day}-${month}-${year}`;
    };
    const [dueAt, setDueAt] = useState<string>(formatDueDateNormal(assignment?.due_at) || '');

    useEffect(() => {
        if (courseId && assignmentId && token) {
            getCourse(parseInt(courseId.toString()), token);
            getAssignment(parseInt(courseId.toString()), parseInt(assignmentId.toString()), token);
        }
    }, [router.query]);

    useEffect(() => {
        if (assignment) {
            setAssignmentName(assignment.name);
            setDescription(assignment.description);
            setPoints(assignment.points_possible);
            setAttempts(assignment.allowed_attempts);
            setGradingType(assignment.grading_type);
            setIsCounted(assignment.omit_from_final_grade);
            setRequirePeerReviews(assignment.peer_reviews);
            setIsAnonymousGrading(assignment.anonymous_grading);
            setDueAt(new Date(assignment.due_at).toISOString().slice(0, -1));
        }
    }, [assignment]);

    const handleUpdateAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const assignment: Assignment | any = {
            name: assignmentName,
            description: description,
            points_possible: points,
            grading_type: gradingType,
            omit_from_final_grade: isCounted,
            peer_reviews: requirePeerReviews,
            anonymous_grading: isAnonymousGrading,
            allowed_attempts: attempts,
            due_at: (dueAt ? new Date(dueAt)?.toISOString().slice(0, -1) : null)
        };

        if (courseId && assignmentId) {
            await updateAssignment(parseInt(courseId.toString()), parseInt(assignmentId.toString()), assignment, token)
            router.back()
        }
    };

    const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || parseInt(value) < 0) {
            setPoints(0);
        } else {
            setPoints(parseInt(value));
        }
    };

    const handleAttemptsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || parseInt(value) < 0) {
            setAttempts(-1);
        } else {
            setAttempts(parseInt(value));
        }
    };

    const handleDueAtChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        setDueAt(inputValue);
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
                                placeholder={assignmentName}
                                required
                                value={assignmentName}
                                onChange={(e) => setAssignmentName(e.target.value)}
                            />
                        </div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={description}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label htmlFor="assignment_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment Type</label>
                        <select disabled id="assignment_type" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Written Assignment</option>
                        </select>
                        <label htmlFor="grading_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Grading Type
                        </label>
                        <select
                            value={gradingType || "points"}
                            id="grading_type"
                            className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setGradingType(e.target.value)}>
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
                                placeholder={points?.toString()}
                                required
                                value={points}
                                onChange={handlePointsChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="assignment-attempts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attempts</label>
                            <input
                                type="number"
                                id="assignment-attempts"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Unlimited"
                                value={attempts}
                                onChange={handleAttemptsChange}
                            />
                        </div>
                        <label htmlFor="assignment-deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </div>
                            <input
                                id="assignment-deadline"
                                type="datetime-local"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={dueAt}
                                value={dueAt}
                                onChange={handleDueAtChange} />
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="assignment-points-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    checked={isCounted}
                                    onChange={(e) => setIsCounted(e.target.checked)}
                                />
                            </div>
                            <label htmlFor="assignment-points-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Do not count this assignment towards the final grade
                            </label>
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    disabled={!isGroupAssignment}
                                    id="assignment-peer-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    checked={requirePeerReviews}
                                    onChange={(e) => setRequirePeerReviews(e.target.checked)}
                                />
                            </div>
                            <label htmlFor="assignment-peer-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Require peer reviews
                            </label>
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="assignment-anonymous-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    checked={isAnonymousGrading}
                                    onChange={(e) => setIsAnonymousGrading(e.target.checked)}
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