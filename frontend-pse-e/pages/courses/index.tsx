import Head from "next/head";
import Image from "next/image";
import useCourses from "../../lib/hooks/useCourses"
import { useEffect } from "react";
import { Course } from "../../lib/hooks/dummy"
import Link from "next/link";

const Courses = () => {
  const { courses, updateCourse } = useCourses();

  return (
    <>
      <Head>
        <title>Courses - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="py-10 bg-gray-100 min-h-screen sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Select a Course</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">A course selection that we pulled from your Canvas account.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">


            {courses.map((course: Course, index) => (
              <Link href={"/courses/" + course.id}>
                <div className="flex flex-col justify-center items-center bg-yellow-500 bg-opacity-50 backdrop-blur hover:cursor-pointer shadow-sm hover:shadow-lg rounded-2xl h-64 hover:scale-110 p-2 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-white">
                    <title />
                    <g id="Complete">
                      <g id="browsers">
                        <g>
                          <rect fill="none" height="14" rx="2" ry="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="14" x="3" y="7" />
                          <path d="M8,3H19a2,2,0,0,1,2,2V16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span className="text-black mt-2 font-medium text-center select-none">{course.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section >
    </>
  );
};

export default Courses;
