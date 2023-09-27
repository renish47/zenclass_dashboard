import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";

const LessonList = ({ subTitle, title, progress, id }) => {
  const navigate = useNavigate();
  function onClickHandler() {
    navigate(`/lessons/${id}`);
  }
  return (
    <div
      className="flex justify-between p-4 w-full border-b border-white/20 items-center md:hover:bg-primary/20 md:hover:cursor-pointer transition-colors "
      onClick={onClickHandler}
    >
      <div className="flex-col gap-4 text-white">
        <p className=" text-gray-500 text-sm">{subTitle}</p>
        <p className="font-semibold text-base whitespace-pre-line max-w-[30vh] mt-1">
          {title}
        </p>
      </div>
      <div className=" w-12">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: `#55c1d9`,
            textColor: "#fff",
            textSize: "27px",
          })}
        />
      </div>
    </div>
  );
};
export default LessonList;
