import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useAssignment from "@/lib/hooks/useAssignment";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { formatDate } from "@/lib/date";
import useSubmission from "@/lib/hooks/useSubmission";
import Link from "next/link";
import { Context } from "@/Context";

/**
 * The students page component for teachers.
 *
 * @component
 * @returns {JSX.Element} The rendered courses page.
 */
const Students = () => {
    const router = useRouter();
    // Accessing query parameters from the router object
    const { assignmentId, courseId } = router.query;
    const { token } = useAuthentication();

    const { assignment: contextAssignment } = useContext(Context);
    const { assignment: fetchedAssignment } = useAssignment(token, courseId?.toString(), assignmentId?.toString()) // When navigating to an assignment via url
    const assignment = contextAssignment || fetchedAssignment;
    const { submission, submissions } = useSubmission(token, assignmentId?.toString())

    return (
        <>
            <Head>
                <title>Assignment - WriteSpace</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar />

            <div className="bg-gray-50 py-10 mt-16 min-h-screen">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">{assignment?.name}</h1>
                    <div>
                        <p className="mt-8 mb-8 text-gray-600">
                            <span className="font-bold">Deadline: </span> {assignment?.due_at ? formatDate(assignment?.due_at) : "No due date"}</p>
                    </div>
                    <Link href={`/courses/${courseId}/assignment/${assignmentId}`}
                        className="hover:bg-blue-600 text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center"
                    >
                        <i className="fa-solid fa-eye me-2"></i>
                        Student view
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="w-full relative overflow-x-auto shadow-md mt-4 ">
                        <table className="w-full text-sm text-left bg-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                        Submission Date
                                    </th>
                                    <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                        Grade Status
                                    </th>
                                </tr>
                            </thead>
                        <tbody>
                        {submissions && (
                            submissions.length > 0 ? (
                                submissions.map((submission, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            href={{
                                            pathname: `/courses/${courseId}/assignment/${assignmentId}/submission/grade`,
                                            query: { user: submission.userId },
                                            }}
                                        >
                                        {submission.userName ? submission.userName : "Anonymous"}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                                        {formatDate(submission.date)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {submission.status}
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                <td className="px-6 py-4 text-center" colSpan={3}>
                                    <span className="text-gray-400">No submissions available.</span>
                                </td>
                                </tr>
                            )
                            )}
                        </tbody>
                        </table>
                        {!submissions && (
                            <div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default Students;
