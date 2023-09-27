import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

import { setChapterPlaying } from "../../redux/features/appSlice";
import { selectApp, selectStudent } from "../../redux/store";
import { UPDATE_CHAPTER_LIST } from "../../utils/apiRoutes";
import { updateLocalLessonProgressList } from "../../redux/features/studentSlice";

const ChapterList = ({ title, chapNo, isCompleted }) => {
  const dispatch = useDispatch();
  const {
    chapterPlaying,
    lessonOpened: { id },
  } = useSelector(selectApp);
  const { id: studentId } = useSelector(selectStudent);
  const [isChapCompleted, setIsChapCompleted] = useState(isCompleted);
  function onChangehandler(e) {
    if (e.target.checked) {
      try {
        const res = axios.put(UPDATE_CHAPTER_LIST, {
          lessonId: id,
          studentId,
          chapterName: title,
        });
        dispatch(
          updateLocalLessonProgressList({
            id,
            chapDetail: { chapterName: title, chapterNo: chapNo + 1 },
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div
      className={`flex justify-start gap-7 p-4 w-full border-b border-white/20 items-center md:hover:bg-primary/20 md:hover:cursor-pointer transition-colors ${
        title === chapterPlaying.split(". ")[1] ? "bg-primary/10 " : ""
      }`}
      onClick={() => {
        dispatch(setChapterPlaying(`${chapNo + 1}. ${title}`));
      }}
    >
      <input
        className=" w-5 h-5 accent-primary"
        type="checkbox"
        name=""
        title={isCompleted ? "Chapter Completed" : "Mark as complete"}
        id=""
        checked={isChapCompleted}
        onClick={() => !isChapCompleted && setIsChapCompleted((prev) => !prev)}
        onChange={onChangehandler}
      />
      <div className="flex-col gap-4 text-white">
        <p className=" text-gray-500 text-sm">{`Chapter ${chapNo + 1}`}</p>
        <p className="font-semibold text-base whitespace-pre-line mt-1">
          {title}
        </p>
      </div>
    </div>
  );
};
export default ChapterList;
