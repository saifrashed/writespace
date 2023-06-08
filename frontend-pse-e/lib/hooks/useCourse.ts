import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Course } from "../types";

function useCourse(courseId: Number) {
    const [courseData, setCourseData] = useState<Course | any>();

    // Start off making an API call
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // const response = await axios.post('https://writespace.onrender.com/assignments', { courseId: courseId });
                // const response = await axios.get('https://writespace.onrender.com/test/getAll');
                setCourseData({})
            } catch (error) {
                console.log(error)
            }
        };
        fetchCourse();
    }, [courseId]);

    return { course: courseData };
}

export default useCourse;
