import { motion } from "framer-motion";

import CourseCard from "../cards/CourseCard";

const CourseDetails = ({ className }) => {
  return (
    <motion.section
      className={className}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ duration: 0.5, opacity: [0, 0.3, 1], type: "tween" }}
    >
      <div className="flex-col space-y-2">
        <span className="font-semibold ms-1 text-white">Course Details</span>
        <CourseCard />
      </div>
    </motion.section>
  );
};
export default CourseDetails;
