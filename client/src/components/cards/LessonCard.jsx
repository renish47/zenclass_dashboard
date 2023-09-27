import { useSelector } from "react-redux";

import { selectStudent } from "../../redux/store";

import LessonList from "../list/LessonList";
import Card from "../ui/Card";

const LessonCard = () => {
  const { lessons, lessonsProgress } = useSelector(selectStudent);
  return (
    <>
      <h4 className="font-semibold ms-1 text-white cursor-default inline-block">
        Lessons
      </h4>
      <div className="overflow-hidden  h-full rounded-2xl ">
        <Card
          lightRadius={500}
          className=" h-full max-h-full flex-col items-start "
        >
          <div className="h-full max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            {lessons.map((lesson, i) => (
              <LessonList
                subTitle={`Module ${lesson.moduleNo}`}
                title={lesson.lessonName}
                progress={lessonsProgress[i].progress}
                key={lesson._id}
                id={lesson._id}
              />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
export default LessonCard;
