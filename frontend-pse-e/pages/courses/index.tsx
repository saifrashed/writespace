import { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import useCourses from "@/lib/hooks/useCourses"
import { Course } from "@/lib/hooks/dummy"
import useAuthentication from "@/lib/hooks/useAuthentication";
import { Context } from '@/Context';

const Courses = () => {
  const { token } = useAuthentication();
  const { setCourse } = useContext(Context);

  const { courses: contextCourses } = useContext(Context);
  const { courses: fetchedCourses, getCourses } = useCourses();

  useEffect(() => {
    getCourses(token)
  }, [])

  const courses = contextCourses || fetchedCourses;

  const isLoading = courses.length === 0

  const handleClick = (course: Course) => {
    setCourse(course);
  };

  return (
    <>
      <Head>
        <title>Courses - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <section className="bg-gray-100 min-h-screen py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Select a Course</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">A course selection that we pulled from your Canvas account.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
            {courses.map((course: Course) => (
              <Link href={"/courses/" + course.id} key={course.id} onClick={() => handleClick(course)}>
                <motion.div
                  key={course?.id}
                  layoutId={course?.id.toString()}
                  className="flex flex-col justify-center items-center bg-yellow-500 bg-opacity-50 backdrop-blur hover:cursor-pointer shadow-sm hover:shadow-lg rounded-2xl h-64 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-white">
                    <title />
                    <g id="Complete">
                      <g id="browsers">
                        <g>
                          <rect fill="none" height="14" rx="2" ry="2" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="14" x="3" y="7" />
                          <path d="M8,3H19a2,2,0,0,1,2,2V16" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <h5
                    className="text-black mt-2 font-medium text-center select-none">{course.name}
                  </h5>
                  <span
                    className="mt-2 font-medium text-center select-none text-sm text-gray-500 dark:text-gray-400">{course.course_code}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse">
              <div className="h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
              <div className="h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
              <div className="h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
              <div className="h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
              <div className="h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
              <div className="h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
            </div>
          )}
        </div>
      </section >
    </>
  );
};

export default Courses;
