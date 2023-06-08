import { useEffect, useState } from "react";
import { courses } from "./dummy"
// import axios from 'axios';

function useCourse(courseId) {
    const [courseData, setCourseData] = useState([]);

    // Start off making an API call
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // const response = await axios.post('https://writespace.onrender.com/assignments', { courseId: courseId });
                // const response = await axios.get('https://writespace.onrender.com/test/getAll');
                const course = courses.filter((course) => course.id == courseId)[0];
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
