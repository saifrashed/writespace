import { createContext, useState } from 'react';

export const ContextTeacher = createContext();

export const Provider = ({ children }) => {
    const isTeacher = course?.enrollments?.some(
        (enrollment) => enrollment?.type === "teacher"
      );
    return (
        <Context.Provider value={{ isTeacher }}>
            {children}
        </Context.Provider>
    );
};
