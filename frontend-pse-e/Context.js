import { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = ({ children }) => {
    const [course, setCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [assignment, setAssignment] = useState(null);
    return (
        <Context.Provider value={{ course, setCourse, courses, setCourses, assignment, setAssignment }}>
            {children}
        </Context.Provider>
    );
};
