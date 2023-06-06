// pages/course-overview/[id].js
import { motion } from 'framer-motion';

const CourseOverview = ({ courseId }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Course overview content */}
      <h1>{courseId}</h1>
      {/* Rest of the course details */}
    </motion.div>
  );
};

export default CourseOverview;
