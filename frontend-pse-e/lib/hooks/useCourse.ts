import { useState, useEffect } from "react";
import axios from 'axios';
import config from "../config";
import { Course, User } from "../types";
import { useNotification } from "./useNotification";

function useCourse(token = '', courseId = '') {
    const [courseData, setCourseData] = useState<Course>();
    const { onError } = useNotification();
    const [role, setRole] = useState<String>('');

    useEffect(() => {
        if (courseId && token) {
            getCourse(courseId, token);
            getEnrollment(courseId, token);
        }
    });

    const getCourse = async (courseId: String, token: string) => {
        try {
            const response = await axios.get(`${config.baseUrl}/course/${courseId}`, { headers: { bearer: token } });
            setCourseData(response.data)

        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }

    const getStudents = async (courseId: Number, token: string) => {
        try {
            const response = await axios.post(`${config.baseUrl}/course/students`, { courseId }, { headers: { bearer: token } });
            return response.data;
        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }

    const getEnrollment = async (courseId: string, token: string) => {
        try {
            const response = await axios.post(`${config.baseUrl}/course/enrollment`, { courseId }, { headers: { bearer: token } });
            setRole(response.data.type);
            return response.data;
        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }

    const getEnrollments = async (courseId: string, token: string) => {
        try {
            const response = await axios.post(`${config.baseUrl}/course/enrollments`, { courseId }, { headers: { bearer: token } });
            return response.data;
        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }
    return { course: courseData, role, getCourse, getStudents, getEnrollment, getEnrollments };
}

export default useCourse;
