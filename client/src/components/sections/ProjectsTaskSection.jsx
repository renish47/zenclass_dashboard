import { motion } from "framer-motion";

import ProjectCard from "../cards/ProjectCard";
import TaskCard from "../cards/TaskCard";

const ProjectsTaskSection = ({ className }) => {
  return (
    <section className={className}>
      <div className="grid md:grid-cols-7 grid-cols-1  gap-10 lg:gap-3 h-full">
        <motion.div
          className="md:col-span-3 col-span-1 h-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5, opacity: [0, 0.3, 1], type: "tween" }}
        >
          <TaskCard />
        </motion.div>
        <motion.div
          className="md:col-span-4 col-span-1 h-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          transition={{ duration: 0.5, opacity: [0, 0.3, 1], type: "tween" }}
        >
          <ProjectCard />
        </motion.div>
      </div>
    </section>
  );
};
export default ProjectsTaskSection;
