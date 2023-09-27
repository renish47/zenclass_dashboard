import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectStudent } from "../../redux/store";

import ProjectsTaskSection from "../sections/ProjectsTaskSection";
import { SummaryReport } from "../sections/SummaryReport";
import Lessons from "../sections/Lessons";
import CourseDetails from "../sections/CourseDetails";
import Loader from "./Loader";
// import Activities from "../sections/Activities";

const Dashboard = () => {
  const {
    firstName,
    studentActivity: { totalProgress },
  } = useSelector(selectStudent);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {!totalProgress ? (
        <Loader />
      ) : (
        <main className="flex-col space-y-14 p-5 sm:p-10 gap-14 bg-slate-950 ">
          <div className="col-span-full flex-col space-y-2 text-5xl text-white cursor-default">
            <motion.h2
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{
                duration: 0.5,
                opacity: [0, 0.7, 1],
                type: "tween",
              }}
            >
              Zen-class Dashboard
            </motion.h2>
            <motion.h3
              className="text-primary"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{
                duration: 0.5,
                opacity: [0, 0.7, 1],
                type: "tween",
              }}
            >
              Hi {firstName}!
            </motion.h3>
          </div>

          <div className="grid lg:gap-5 gap-10 grid-cols-4 ">
            <SummaryReport className={"col-span-4 lg:col-span-3"} />
            <Lessons
              className={
                "col-span-4 lg:col-span-1 row-span-2 max-lg:mb-7 max-h-[500px]"
              }
            />
            <ProjectsTaskSection className="col-span-4  lg:col-span-3" />
            <CourseDetails className={"col-span-4"} />
            {/* <Activities /> */}
          </div>
        </main>
      )}
    </>
  );
};
export default Dashboard;
