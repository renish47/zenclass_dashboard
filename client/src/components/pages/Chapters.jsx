import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { selectApp, selectStudent } from "../../redux/store";
import {
  resetLessonOpened,
  setChapterPlaying,
  setLessonOpenedInfo,
} from "../../redux/features/appSlice";

import { IoChevronBackOutline, IoPlay } from "react-icons/io5";
import Loader from "./Loader";
import ChapterCard from "../cards/ChapterCard";
import IconWrapper from "../ui/IconWrapper";

const Chapters = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { chapterPlaying, lessonOpened } = useSelector(selectApp);
  const {
    lessons,
    firstName,
    lessonsProgress,
    studentActivity: { totalProgress },
  } = useSelector(selectStudent);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(setChapterPlaying(""));
      dispatch(resetLessonOpened());
    };
  }, []);

  useEffect(() => {
    if (firstName)
      dispatch(setLessonOpenedInfo({ lessons, id, lessonsProgress }));
  }, [firstName]);
  useParams;
  return (
    <>
      {totalProgress ? (
        <main className="p-5 sm:p-10 min-h-screen bg-slate-950">
          <div className="col-span-full flex-col space-y-8 text-white">
            <div className="flex sm:pe-10 justify-between gap-10 sm:gap-0 items-center">
              <div className="flex gap-5 justify-center ">
                <IconWrapper
                  title={"Back to Dashboard"}
                  onClickHandler={() => navigate("/dashboard")}
                >
                  <IoChevronBackOutline
                    className="w-7 h-7 md:hover:cursor-pointer text-white my-2"
                    title="Back to Dashboard"
                    onClick={() => navigate("/dashboard")}
                  />
                </IconWrapper>
                <div className="flex-col space-y-3 cursor-default">
                  <h2 className="sm:text-7xl text-5xl">
                    Module {lessonOpened.moduleNo}
                  </h2>
                  <h3 className="text-primary sm:text-3xl text-xl">
                    {lessonOpened.name}
                  </h3>
                </div>
              </div>
            </div>
            <div className="max-lg:flex-col flex gap-10 w-full mx-auto md:justify-around">
              <div className="lg:w-[60%] w-full">
                <div className="relative flex justify-center items-center aspect-video bg-black">
                  <span className="absolute  top-2 left-5 text-white/30 sm:text-xl text-base cursor-default">
                    {chapterPlaying}
                  </span>
                  <div
                    className="w-20 h-20 bg-white/10 rounded-full flex justify-center items-center md:hover:text-primary md:hover:cursor-pointer"
                    title="play"
                    onClick={() => {
                      toast(
                        "This is just a Placeholder, \nNot a functional video player"
                      );
                    }}
                  >
                    <IoPlay className="w-10 h-10 " />
                  </div>
                </div>
              </div>
              <ChapterCard chapters={lessonOpened.chapters} />
            </div>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Chapters;
