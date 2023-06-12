import Head from "next/head";
import Image from "next/image";
import NavBar from "../../../../../components/NavBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import useAssignment from "@/lib/hooks/useAssignment";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Button from "../../../../../components/stdButton";
import UploadPopup from "../../../../../components/uploadPopup";
import useSubmission from "@/lib/hooks/useSubmission";


const Assignments = () => {
  const router = useRouter();
  // Accessing query parameters from the router object
  const { courseId, assignmentId } = router.query;
  const { token } = useAuthentication();
  const { assignment, getAssignment } = useAssignment()
  const { submission, getSubmission } = useSubmission()

  // For the upload popup.
  const [showPopup, setShowPopup] = useState(false);

  const isTeacher = false;


  console.log(submission?.grade)

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric' as const, // Specify the type explicitly
      hour: 'numeric',
      minute: 'numeric',
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate
    // return formattedDate.replace('at', '');
  };

  useEffect(() => {
    if (courseId && assignmentId && token) {
      getAssignment(parseInt(courseId.toString()), parseInt(assignmentId.toString()), token)
      getSubmission(parseInt(courseId.toString()), parseInt(assignmentId.toString()), token)
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Assignment - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className="bg-gray-50 min-h-screen py-10 mt-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{assignment?.name}</h1>
          </div>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-5 ">
            <div className="col-span-1 p-4">
              {/* <div>
                <p className="mt-8 text-gray-600">
                <span className="font-bold">Deadline: </span> {assignment?.due_at ? formatDate(assignment?.due_at) : "No due date"}</p>
              </div> */}
            </div>
            <div className="col-span-3 p-4">
              <div>
                <p className="mt-8 text-gray-600">
                <span className="font-bold">Deadline: </span> {assignment?.due_at ? formatDate(assignment?.due_at) : "No due date"}</p>
              </div>
            </div>
            <div className="col-span-1 p-4 ">
              <div className="space-x-4">
                { !isTeacher ? (
                    <p className="mt-8 text-gray-600">
                    <span className="font-bold">Grade: </span> {submission?.grade ? submission.grade : " Waiting to be graded"}</p>) : null}
                    {/* <p className="mt-8 text-gray-600">Submitted at: {formatDate(submission?.submitted_at)}</p> */}
              </div>
            </div>
          </div>


        { !isTeacher ? (

          <div className="grid grid-cols-1 gap-0 md:grid-cols-5 ">
            <div className="col-span-1 p-4">
              <div className="w-full p-4 bg-white rounded-lg shadow-lg">
                <div key={assignment?.id}>
                  <button
                    className={`text-sm text-gray-500 underline cursor-pointer font-bold"}`}
                  >
                    Description
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-3 p-4">

              <div className="w-full p-4 bg-white rounded-lg shadow-lg ">
                <div className="flex space-x-4">
                  <div key={assignment?.id} className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: assignment?.description ? assignment?.description : "No description available" }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-4 ">
              <div className="w-full p-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col">

                  <button onClick={togglePopup} className="w-full bg-fuchsia-300 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 border-b-4 border-fuchsia-500 hover:border-fuchsia-500 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="ml-2">Submit</span>
                  </button>


                  <UploadPopup showPopup={showPopup} togglePopup={togglePopup} />


                  <Link
                    href={`/courses/${courseId}/assignment/${assignmentId}/submission/view`}
                  >
                    <button className="w-full mt-5 bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-500 hover:border-pink-500 rounded flex max-width items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>

                      <span className="ml-2">View</span>
                    </button>
                  </Link>
                  {/* <Link
                    href={`/courses/${courseId}/assignment/${assignmentId}/submission/grade`}
                  >
                    <button className="block w-full py-2 px-4 bg-yellow-500 text-white rounded-md mt-2">
                      Grade submission
                    </button>
                  </Link> */}
                </div>
              </div>
              <p className="mt-8 text-gray-600">
              <span className="font-bold">Submission date: </span>{submission?.submitted_at ? formatDate(submission?.submitted_at) : "No submission yet" }</p>
            </div>
          </div>
          ) : null}

        { isTeacher ?(
          <div className="w-full relative overflow-x-auto shadow-md sm:p-2 md:p-4 lg:p-8 md:w-4/5">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-white-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Submission Status
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Grade Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/courses/${courseId}/assignment/${assignmentId}/submission/grade`}
                    >
                      Student name
                    </Link>
                  </th>
                  <td scope="row" className="px-6 py-4 whitespace-nowrap">
                    submitted
                  </td>
                  <td scope="row" className="px-6 py-4 whitespace-nowrap">
                    Graded
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    Student name
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}



        </div>
      </div>
    </>
  );
};

export default Assignments;
