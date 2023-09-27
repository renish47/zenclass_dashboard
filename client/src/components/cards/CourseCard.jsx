import { useSelector } from "react-redux";
import React from "react";

import { selectStudent } from "../../redux/store";

import StaffList from "../list/StaffList";
import Card from "../ui/Card";

const CourseCard = () => {
  const { courseDetails, batchDetails } = useSelector(selectStudent);
  const about = {
    "Course Name": courseDetails.courseName,
    Batch: batchDetails.batchName,
    Duration: courseDetails.duration,
    Mode: batchDetails.type,
    Language: batchDetails.language,
    Syllabus: (
      <a
        target="_blank"
        download
        href={courseDetails.syllabusLink}
        className="md:hover:text-white cursor-pointer md:hover:underline underline-offset-4 "
      >
        Download Now
      </a>
    ),
  };
  return (
    <Card className={"col-span-4 w-full lg:h-[350px]"} lightRadius={1000}>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3   gap-y-20 gap-x-5 p-3 sm:py-3 sm:ps-10 text-white cursor-default">
        <div className="flex-col space-y-7 lg:border-r-2  border-white/20 md:col-span-2 lg:col-span-1 ">
          <h4 className="text-xl font-bold ">About</h4>
          <h5 className="grid grid-cols-2 gap-y-3">
            {Object.keys(about).map((key, index) => (
              <React.Fragment key={key}>
                <span className="text-gray-500">{key}</span>
                <span className="text-primary">{about[key]}</span>
              </React.Fragment>
            ))}
          </h5>
        </div>
        <div className="flex-col  space-y-7 md:border-r-2 border-white/20">
          <h4 className="text-xl font-bold">Teachers</h4>
          <div className="flex-col space-y-7">
            {batchDetails.staffs.map((staff, index) => (
              <StaffList
                name={staff.name}
                subtext={staff.subject}
                email={staff.email}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="flex-col space-y-7">
          <h4 className="text-xl font-bold">Co-ordinators</h4>
          <div className="flex-col items-center w-full space-y-7">
            {batchDetails.coordinators.map((coordinator, index) => (
              <StaffList
                key={index}
                name={coordinator.name}
                subtext={coordinator.desc}
                email={coordinator.email}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default CourseCard;
