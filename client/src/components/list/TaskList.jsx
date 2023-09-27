import { useNavigate } from "react-router-dom";

import { AiOutlineClockCircle } from "react-icons/ai";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { MdDangerous } from "react-icons/md";

const TaskList = ({
  title = "Untitled Task",
  dueDate = "",
  submittedDate = "",
  submitted = false,
  graded = false,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex-col p-5 w-full border-b border-white/20 items-center md:hover:bg-primary/20 md:hover:cursor-pointer transition-colors"
      onClick={() => navigate(`/tasks/${id}`)}
    >
      <h4 className="text-lg font-semibold  whitespace-pre-line w-full">
        {title}
      </h4>
      <div className="text-gray-500 text-sm">
        {!submitted &&
          (dueDate < 1 ? (
            <span className="flex items-center gap-2">
              <MdDangerous className="text-xs" />
              Due has passed your deadline
            </span>
          ) : (
            dueDate > 0 && (
              <span className="flex items-center gap-2">
                <AiOutlineClockCircle className="text-xs" /> Due{" "}
                {dueDate === 1 ? "Today" : `in ${dueDate} days`}
              </span>
            )
          ))}
        {submitted && (
          <p className="flex-col">
            <span className="flex items-center gap-2">
              <BsCheckLg className="text-xs" />
              Submitted on {submittedDate}
            </span>
            {!graded && submitted ? (
              <span className="flex items-center gap-2">
                <AiOutlineClockCircle className="text-xs" /> Yet to be Graded
              </span>
            ) : (
              graded && (
                <span className="flex items-center gap-2">
                  <BiSolidBadgeCheck className="text-xs" />
                  Graded
                </span>
              )
            )}
          </p>
        )}
      </div>
    </div>
  );
};
export default TaskList;
