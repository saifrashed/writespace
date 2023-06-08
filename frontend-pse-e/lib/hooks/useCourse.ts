import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Course } from "../types";
import { useNotification } from "./useNotification";

function useCourse(courseId: Number, token: string) {
    const [courseData, setCourseData] = useState<Course | any>();
    const { onSuccess, onError } = useNotification()

    // Start off making an API call
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}`, { token: token });
                setCourseData(response.data)
            } catch (error) {
                console.log(error)
                onError("Something went wrong")
            }
        };
        fetchCourse();
    }, [courseId]);

    return { course: courseData };
}

export default useCourse;
