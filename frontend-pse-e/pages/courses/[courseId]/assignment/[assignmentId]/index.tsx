import Head from "next/head";
import Image from "next/image";
import NavBar from "../../../../../components/NavBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import useAssignment from "@/lib/hooks/useAssignment";
import useAuthentication from "@/lib/hooks/useAuthentication";
import UploadPopup from "@/components/uploadPopup";
import { formatDate } from "@/lib/date";
import Quiz from "@/components/quiz"

const Assignments = () => {
  const router = useRouter();
  // Accessing query parameters from the router object
  const { courseId, assignmentId } = router.query;
  const { token } = useAuthentication();
  const { assignment, getAssignment, submission, getSubmission } = useAssignment(token, courseId?.toString(), assignmentId?.toString())

  // For the upload popup.
  const [showPopup, setShowPopup] = useState(false);

  console.log(submission);

  return (
    <>
      <Head>
        <title>Assignment - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className="bg-gray-50 min-h-screen py-10 mt-14">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold px-5">{assignment?.name}</h1>

          <div className="md:flex items-center justify-between mb-6 px-5">

              <p className="mt-8 text-gray-600">
                <span className="font-bold">Grade: </span> {submission?.grade ? <span> {Number(submission.grade).toFixed(1)} / {assignment?.points_possible} </span> : " Waiting to be graded"}

              </p>


            <p className="mt-8 text-gray-600">
              <span className="font-bold">Deadline: </span> {assignment?.due_at ? formatDate(assignment?.due_at) : "No due date"}
            </p>
          </div>


            <div className="grid grid-cols-1 gap-0 md:grid-cols-5 ">
              <div className="col-span-4 p-4">
                <div className="w-full p-4 bg-white rounded-lg border border-gray-200 ">
                  <div className="flex space-x-4">
                    <div key={assignment?.id} className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: assignment?.description ? assignment?.description : "No description available" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 p-4 ">
                <div className="w-full p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex flex-col">

                    <button onClick={() => { setShowPopup(!showPopup) }} className="bg-fuchsia-300 hover:bg-fuchsia-400 text-white w-full transition-all font-bold py-2 px-4 border-b-4 border-fuchsia-500 hover:border-fuchsia-500 rounded-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      <span className="ml-2">Submit</span>
                    </button>

                    <Link
                      href={`/courses/${courseId}/assignment/${assignmentId}/submission/view`}
                    >
                      <button className="mt-5 bg-pink-300 hover:bg-pink-400 text-white w-full transition-all font-bold py-2 px-4 border-b-4 border-pink-500 hover:border-pink-500 rounded-lg flex max-width items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <span className="ml-2">View</span>
                      </button>
                    </Link>
                  </div>
                </div>

                <p className="mt-8 text-gray-600">
                  {submission?.date ? (
                    <span className="flex items-center text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                        />
                      </svg>
                      <span className="ml-2">Submitted</span>
                    </span>
                  ) : (
                    <span className="flex items-center text-orange-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="ml-2">Not Submitted</span>
                    </span>
                  )}

                  <span className="font-bold">Submission date: </span>{submission?.date ? formatDate(submission?.date.toString()) : "-"}</p>
              </div>
            </div>

          <Quiz />
          <UploadPopup showPopup={showPopup} togglePopup={() => { setShowPopup(!showPopup) }} assignmentId={assignmentId} />

        </div>
      </div>
    </>
  );
};

export default Assignments;
