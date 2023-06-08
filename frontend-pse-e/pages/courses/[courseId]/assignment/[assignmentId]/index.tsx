import Head from "next/head";
import Image from "next/image";
import NavBar from "../../../../../components/NavBar";
import { useRouter } from "next/router";
import React from "react";
import Link from 'next/link';

interface AssignmentsProps {
  id: number;
}

const Assignments: React.FC<AssignmentsProps> = () => {
  const router = useRouter();
  const { courseId: courseId, assignmentId: assignmentId } = router.query;

  return (
    <>
      <Head>
        <title>Assignments - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className="bg-gray-50 min-h-screen py-10 mt-12">
        <div className="max-w-5xl mx-auto px-6"> {/* Increase the max width here */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Assignments</h1>
            <div className="space-x-4">
              <p className="mt-8 text-gray-600">Deadline: June 30, 2023</p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 p-4 bg-white rounded-lg shadow-lg mr-4">
              <p className="text-sm text-gray-500">Left Box</p>
            </div>

            <div className="flex-2 p-4 bg-white rounded-lg shadow-lg mx-2"> {/* Increase the width here */}
              <div className="flex space-x-4">
                <div className="w-1/4">
                  <p className="text-sm text-gray-500">Dummy Text</p>
                </div>
                <div className="w-3/4">
                  <p className="text-lg text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris consectetur dignissim metus, et rhoncus leo. Nulla
                    iaculis euismod quam, vitae euismod mi lacinia in.
                    Pellentesque rhoncus, massa a eleifend pellentesque, metus
                    ex congue est, a scelerisque nunc turpis nec sapien.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 bg-white rounded-lg shadow-lg ml-4">
              <div className="text-sm text-gray-500">Right Box</div>
              <div className="flex flex-col mt-4">
                <button className="block py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
                  Button 5
                </button>
                <Link href={`/courses/${courseId}/assignment/${assignmentId}/submission`}>
                  <button className="block py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors mt-2">
                    View submission
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignments;
