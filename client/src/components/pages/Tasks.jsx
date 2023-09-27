import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  resetTaskOpened,
  setTaskOpenedInfo,
  updateTaskOpenedInfo,
} from "../../redux/features/appSlice";
import { selectApp, selectStudent } from "../../redux/store";
import axios from "axios";
import { SUBMIT_TASK } from "../../utils/apiRoutes";
import { updateLocalTaskList } from "../../redux/features/studentSlice";
import formatDate from "../../lib/formatDate";

import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { MdDangerous } from "react-icons/md";
import IconWrapper from "../ui/IconWrapper";
import Card from "../ui/Card";
import InputWithLabel from "../ui/InputWithLabel";
import Loader from "./Loader";

const Tasks = () => {
  const navigate = useNavigate();
  const {
    tasks,
    firstName,
    id: studentId,
    studentActivity: { totalProgress },
  } = useSelector(selectStudent);
  const {
    taskOpened: {
      name,
      taskId,
      taskNo,
      question,
      dueIn,
      answerLink,
      grade,
      submittedOn,
    },
  } = useSelector(selectApp);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (firstName) dispatch(setTaskOpenedInfo({ tasks, id }));
    return () => dispatch(resetTaskOpened());
  }, [firstName]);

  useEffect(() => {
    if (answerLink) setAnswer(answerLink);
  }, [answerLink]);

  async function taskSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await axios.put(SUBMIT_TASK, {
        studentId,
        taskId,
        answerLink: e.target.Answer.value,
      });
      dispatch(updateTaskOpenedInfo(answer, id));
      dispatch(updateLocalTaskList(answer, id));
      toast.success("Task Submitted");
      setIsLoading(false);
    } catch (error) {}
  }
  return (
    <>
      {totalProgress ? (
        <main className="p-7 sm:p-10 min-h-screen bg-slate-950">
          <div className="col-span-full flex-col space-y-14  text-white">
            <div className="flex sm:pe-10 justify-between gap-10 sm:gap-0 items-center">
              <div className="flex sm:gap-5 gap-2 justify-center ">
                <IconWrapper
                  title={"Back to Dashboard"}
                  onClickHandler={() => navigate("/dashboard")}
                >
                  <IoChevronBackOutline
                    className="w-7 h-7 md:md:hover:cursor-pointer text-white my-2"
                    title="Back to Dashboard"
                    onClick={() => navigate("/dashboard")}
                  />
                </IconWrapper>
                <div className="flex-col space-y-3 cursor-default">
                  <h2 className="sm:text-7xl text-6xl">Tasks</h2>
                  <h3 className="text-primary sm:text-3xl text-2xl">
                    {`#${taskNo} ${name}`}
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex-col space-y-7 w-full sm:w-[80%] mx-auto">
              <div className="flex justify-end w-full">
                <Card
                  borderRadius="rounded-md"
                  className="px-4 py-1 w-full sm:w-fit flex-col"
                >
                  {!submittedOn && dueIn < 1 ? (
                    <span className="flex items-center gap-2 text-red-500 text-base py-1 ">
                      <MdDangerous />
                      Due has passed your deadline
                    </span>
                  ) : (
                    dueIn > 0 && (
                      <span className="flex items-center gap-2 text-yellow-400 text-base py-1 ">
                        <AiOutlineClockCircle /> Due{" "}
                        {dueIn === 1 ? "Today" : `in ${dueIn} days`}
                      </span>
                    )
                  )}
                  {submittedOn && (
                    <span className="flex items-center gap-2 text-green-400 text-base py-1 ">
                      <BsCheckLg />
                      Submitted on {formatDate(submittedOn)}
                    </span>
                  )}
                  {!grade && submittedOn ? (
                    <span className="flex items-center gap-2 text-gray-500 text-base py-1 ">
                      <AiOutlineClockCircle /> Yet to be Graded
                    </span>
                  ) : (
                    grade && (
                      <span className="flex items-center gap-2 text-green-400 text-base py-1 ">
                        <BiSolidBadgeCheck />
                        Graded
                      </span>
                    )
                  )}
                </Card>
              </div>
              <div className="flex-col space-y-3">
                <span className="text-gray-500 block text-xl">Question</span>
                <Card borderRadius="rounded-md">
                  <span className="flex items-center gap-2 text-xl p-2">
                    {question}
                  </span>
                </Card>
              </div>
              <form
                className="flex-col space-y-14 "
                onSubmit={taskSubmitHandler}
              >
                <InputWithLabel
                  label="Answer"
                  disabled={answerLink}
                  placeholder="Paste your github link here"
                  required={true}
                  value={answer}
                  onChangeHandler={(e) => setAnswer(e.target.value)}
                />
                <div className="flex justify-center w-full">
                  {!answerLink && (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="p-3 text-white rounded-md bg-primary md:w-[30%] w-full font-semibold text-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? "Submitting" : "Submit"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Tasks;
