import { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = ({ children }) => {
    const [course, setCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    return (
        <Context.Provider value={{ course, setCourse, courses, setCourses }}>
            {children}
        </Context.Provider>
    );
};
