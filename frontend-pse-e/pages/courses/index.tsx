import { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import useCourses from "@/lib/hooks/useCourses"
// import { Course } from "@/lib/hooks/dummy"
import useAuthentication from "@/lib/hooks/useAuthentication";
import { Context } from '@/Context';
import { Course } from "@/lib/types";

const Courses = () => {
  const { token } = useAuthentication();
  const { setCourse } = useContext(Context);

  const { courses: contextCourses } = useContext(Context);
  const { courses: fetchedCourses } = useCourses(token);

  const courses = contextCourses || fetchedCourses;

  const isLoading = courses.length === 0

  const cardColors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    // "bg-indigo-500",
    // "bg-blue-500",
    // "bg-lightBlue-500",
    "bg-cyan-500",
    // "bg-teal-500",
    "bg-green-500",
    // "bg-lime-500",
    // "bg-yellow-500",
    "bg-amber-500",
    "bg-orange-500",
    "bg-red-600",
    "bg-pink-600",
    "bg-purple-600",
    "bg-indigo-600",
    "bg-blue-600",
    "bg-lightBlue-600",
  ];

  const handleClick = (course: Course, color: string) => {
    course.course_color = color;
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
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 ${isLoading && "animate-pulse"}`}>
            {isLoading ? (
              <>
                <div className="h-40 xs:h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
                <div className="h-40 xs:h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
                <div className="h-40 xs:h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
                <div className="h-40 xs:h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
                <div className="h-40 xs:h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
                <div className="h-40 xs:h-64 bg-gray-300 rounded-2xl dark:bg-gray-600 p-2"></div>
              </>
            ) : (
              <>
                {courses.map((course: Course, index: number) => (
                  <Link href={"/courses/" + course.id} key={course.id} onClick={() => handleClick(course, cardColors[index % cardColors.length])}>
                    <motion.div
                      key={course?.id}
                      layoutId={course?.id.toString()}
                      className={`flex flex-col justify-center items-center ${cardColors[index % cardColors.length]} bg-opacity-50 hover:cursor-pointer shadow-sm hover:shadow-lg rounded-2xl h-40 xs:h-64 p-2`}>
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
                      </svg>
                      <h5
                        className="text-white mt-2 font-medium text-center select-none">{course.name}
                      </h5>
                      <span
                        className="text-white opacity-60 mt-2 font-medium text-center select-none text-sm">{course.course_code}
                      </span>
                    </motion.div>
                  </Link>
                ))
                }
              </>
            )}
          </div>
        </div>
      </section >
    </>
  );
};

export default Courses;
