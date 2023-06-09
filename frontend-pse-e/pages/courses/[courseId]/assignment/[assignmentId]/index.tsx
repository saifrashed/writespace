import Head from "next/head";
import Image from "next/image";
import NavBar from "../../../../../components/NavBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import useAssignment from "@/lib/hooks/useAssignment";
import useAuthentication from "@/lib/hooks/useAuthentication";


const Assignments = () => {
  const router = useRouter();
  // Accessing query parameters from the router object
  const { courseId, assignmentId } = router.query;
  const { token } = useAuthentication();
  const { assignment, getAssignment } = useAssignment()

  useEffect(() => {
    if (courseId && assignmentId && token) {
      getAssignment(parseInt(courseId.toString()), parseInt(assignmentId.toString()), token)
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
            <div className="space-x-4">
              <p className="mt-8 text-gray-600">Deadline: {assignment?.due_at}</p>
            </div>
          </div>

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
                  <div key={assignment?.id} className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: assignment?.description }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-4 ">
              <div className="w-full p-4 bg-white rounded-lg shadow-lg">
                {/* <div className="text-sm text-gray-500">Right Box</div> */}
                <div className="flex flex-col mt-4">
                  {/* <button className="block w-full py-2 px-4 bg-yellow-500 text-white rounded-md">
                    Upload file
                  </button> */}
                  <Link
                    href={`/courses/${courseId}/assignment/${assignmentId}/submission`}
                  >
                    <button className="block w-full py-2 px-4 bg-yellow-500 text-white rounded-md mt-2">
                      View submission
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignments;
