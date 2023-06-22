import Head from "next/head";
import { useRouter } from "next/router";
import useAssignments from "../../../lib/hooks/useAssignments"
import useCourse from "@/lib/hooks/useCourse";
import Link from "next/link";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/Context';
import { Assignment, Course, Enrollment } from "@/lib/types";
import NavBar from "@/components/NavBar";
import { formatDate } from "@/lib/date";
import useAssignment from "@/lib/hooks/useAssignment";

const CourseOverview = () => {
  const router = useRouter();

  const { courseId } = router.query;
  const { token } = useAuthentication();
  const { setCourse } = useContext(Context);
  const { setAssignment } = useContext(Context);

  const { assignments, isLoading, getAssignments } = useAssignments(courseId?.toString(), token);
  // const { deleteAssignment } = useAssignment()

  const { course: contextCourse } = useContext(Context); // When pressing a course
  const { course: fetchedCourse, role, getCourse, getEnrollment } = useCourse(token, courseId?.toString()); // When navigating to a course via url
  const course = contextCourse || fetchedCourse;

  const calculateSubmittedPercentage = () => {
    if (assignments?.length > 0) {
      const submittedCount = assignments.filter((assignment) => assignment.has_submitted_submissions).length;
      const totalCount = assignments.length;
      const percentage = (submittedCount / totalCount) * 100 || 0;
      return `${percentage.toFixed(2)}%`
    }
  };

  const handleSetCourse = (course: Course, color: string) => {
    course.course_color = color;
    setCourse(course);
  };

  const handleSetAssignment = (assignment: Assignment) => {
    setAssignment(assignment);
  };

  const handleDeleteAssignment = async (assignmentId: number) => {
    if (courseId && token) {
      // deleteAssignment(parseInt(courseId.toString()), parseInt(assignmentId.toString()), token)
      getAssignments(parseInt(courseId.toString()), token)
    }
  };

  return (
    <>
      <Head>
        <title>{course?.name} - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
            {role === 'teacher' ? (
              <Link href={`/courses/${course?.id}/create-assignment`} key={course?.id} onClick={() => handleSetCourse(course, course?.course_color)}>
                <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-2xl text-sm px-2.5 py-2.5 text-center inline-flex items-center">
                  <svg className="h-5 w-5 me-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"></path>
                  </svg>
                  New Assignment
                </button>
              </Link>
            ) : (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div style={{ width: calculateSubmittedPercentage() }} className={`${course?.course_color || "bg-green-600"} opacity-60 saturate-150 h-2.5 rounded-full invert w-0 transition-[width] ease`}></div>
              </div>
            )}
          </motion.div>
        </div>
        <div className="w-full relative overflow-x-auto shadow-md sm:p-2 md:p-4 lg:p-8 md:w-4/5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Due At
                </th>
                {role === 'teacher' ? (
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  </th>
                ) : (
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Submission Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment: Assignment, index) => (
                assignment.published && (
                  <tr key={assignment?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <motion.th layoutId={assignment?.name} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link
                        href={`/courses/${courseId}/assignment/${assignment.id}${(role === 'teacher' ? "/students" : "")}`}
                        onClick={() => handleSetAssignment(assignment)}
                      >{assignment.name}</Link>
                    </motion.th>
                    <motion.td layoutId={assignment?.due_at?.toString()} className="px-6 py-4 whitespace-nowrap">
                      {assignment?.due_at ? formatDate(assignment?.due_at) : "No due date"}
                    </motion.td>
                    {role === 'teacher' ? (
                      <td className="flex items-center justify-end px-3 py-2 space-x-3">
                        <Link
                          href={`/courses/${courseId}/assignment/${assignment.id}/edit-assignment`}
                          onClick={() => handleSetAssignment(assignment)}
                        >
                          <button className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                              </path>
                            </svg>
                          </button>
                        </Link>
                        {/* <button onClick={() => { setShowModal(true) }} className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                          </svg>
                        </button>
                        <div tabIndex={-1} className={"fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full " + (showModal ? " " : " hidden")}>
                          <div className="relative w-full max-w-md max-h-full mx-auto">
                            <div className="relative bg-white rounded-lg shadow ">
                              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="popup-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" onClick={() => { setShowModal(false) }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                              <div className="p-6 text-center">
                                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this assignment?</h3>
                                <button data-modal-hide="popup-modal" onClick={() => { handleDeleteAssignment(assignment?.id); setShowModal(false) }} type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                  Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" onClick={() => { setShowModal(false) }} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </td>
                    )
                      : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`flex items-center ${assignment.has_submitted_submissions
                              ? ("text-emerald-400")
                              : new Date() < new Date(assignment.due_at)
                                ? ("text-orange-500")
                                : ("text-red-500")
                              } font-bold`}
                          >
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${assignment.has_submitted_submissions
                                ? ("bg-emerald-400")
                                : new Date() < new Date(assignment.due_at)
                                  ? ("bg-orange-500")
                                  : ("bg-red-500")
                                } mr-2`}
                            ></div>
                            {assignment.has_submitted_submissions
                              ? "Submitted"
                              : "Not Submitted"}
                          </div>
                        </td>
                      )
                    }
                  </tr>
                )
              ))}
            </tbody>
          </table>
          {isLoading && (
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
      </div >
    </>
  );
};

export default CourseOverview;
