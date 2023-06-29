import { useState, useEffect } from "react";
import axios from 'axios';
import config from "../config";
import { Course, User } from "../types";
import { useNotification } from "./useNotification";

// Custom React hook for managing course data
function useCourse(token = '', courseId = '') {
    const [courseData, setCourseData] = useState<Course>();
    const { onError } = useNotification();
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        // Fetch course and enrollment data when courseId and token change
        if (courseId && token) {
            getCourse(courseId, token);
            getEnrollment(courseId, token);
        }
    }, []);

    // Retrieves course data from the server
    const getCourse = async (courseId: String, token: string) => {
        try {
            const response = await axios.get(`${config.baseUrl}/course/${courseId}`, { headers: { bearer: token } });
            setCourseData(response.data)
        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }

    // Retrieves student data for a course from the server
    const getStudents = async (courseId: Number, token: string) => {
        try {
            const response = await axios.post(`${config.baseUrl}/course/students`, { courseId }, { headers: { bearer: token } });
            return response.data;
        } catch (error) {
            console.log(error)
            onError("Something went wrong")
        }
    }

    // Retrieves enrollment data for a course from the server
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

    // Retrieves all enrollments for a course from the server
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