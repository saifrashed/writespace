import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Course } from "../types";
import { useNotification } from "./useNotification";

function useCourse() {
    const [courseData, setCourseData] = useState<Course | any>();
    const { onSuccess, onError } = useNotification()

    const getCourse = async (courseId: Number, token: string) => {
        try {
            const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}`, { token: token });
            setCourseData(response.data)
        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }

    return { course: courseData, getCourse };
}

export default useCourse;
