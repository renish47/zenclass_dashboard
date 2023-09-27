import { motion } from "framer-motion";

import LessonCard from "../cards/LessonCard";

const Lessons = ({ className }) => {
  return (
    <motion.section
      className={className}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ duration: 0.5, opacity: [0, 0.3, 1], type: "tween" }}
    >
      <div className=" flex-col h-full space-y-2 ">
        <LessonCard />
      </div>
    </motion.section>
  );
};
export default Lessons;
