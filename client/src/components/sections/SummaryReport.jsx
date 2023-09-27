import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { selectStudent } from "../../redux/store";

import { IoStatsChart } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { PiMedalBold } from "react-icons/pi";
import SmallCards from "../cards/SmallCards";

export const SummaryReport = ({ className }) => {
  const {
    attendance: { noOfClassesAttended, totalNoOfClasses },
    studentActivity: { totalProgress },
  } = useSelector(selectStudent);
  return (
    <motion.section
      className={className}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ duration: 0.5, opacity: [0, 0.3, 1], type: "tween" }}
    >
      <div className="flex-col space-y-2">
        <span className="font-semibold ms-1 text-white cursor-default">
          Summary report
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-transparent">
          <SmallCards
            title={"Course Completion"}
            value={totalProgress + "%"}
            subtext={"based on lessons & tasks completion"}
            Icon={IoStatsChart}
          />
          <SmallCards
            title={"Attendance"}
            value={`${noOfClassesAttended}/${totalNoOfClasses}`}
            subtext={"classes"}
            Icon={SlCalender}
          />
          <SmallCards
            title={"Level"}
            value={
              totalProgress <= 35
                ? "Beginner"
                : totalProgress >= 80
                ? "Advanced"
                : "Intermediate"
            }
            subtext={"keep up the good work"}
            Icon={PiMedalBold}
          />
        </div>
      </div>
    </motion.section>
  );
};
