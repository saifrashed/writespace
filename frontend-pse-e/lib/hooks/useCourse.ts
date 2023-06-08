import { useEffect, useState } from "react";
import { Course, courses } from "./dummy"
import axios from 'axios';

function useCourse(courseId: Number) {
    const [courseData, setCourseData] = useState<Course>();

    // Start off making an API call
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // const response = await axios.post('https://writespace.onrender.com/assignments', { courseId: courseId });
                // const response = await axios.get('https://writespace.onrender.com/test/getAll');
                const course = courses.find((course) => course.id === courseId);

                setCourseData(course)
            } catch (error) {
                console.log(error)
            }
        };
        fetchCourse();
    }, [courseId]);

    return { course: courseData };
}

export default useCourse;
