import { useSelector } from "react-redux";

import { selectStudent } from "../../redux/store";
import formatDate from "../../lib/formatDate";

import TaskList from "../list/TaskList";
import Card from "../ui/Card";

const TaskCard = () => {
  const { tasks } = useSelector(selectStudent);
  return (
    <>
      <h4 className="font-semibold inline-block ms-1 text-white mb-2 cursor-default">
        Tasks
      </h4>
      <div className="overflow-hidden  h-full rounded-2xl max-h-[280px]">
        <Card
          lightRadius={400}
          className=" h-full max-h-full flex-col items-start "
        >
          <div className="h-full max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar flex-col text-white">
            {tasks.map((task) =>
              !task.answerLink ? (
                <TaskList
                  key={task.name}
                  id={task._id}
                  title={task.taskName}
                  dueDate={task.dueIn}
                  submitted={task.answerLink}
                  submittedDate={formatDate(task?.submittedOn)}
                  graded={task.grade}
                />
              ) : (
                <></>
              )
            )}
            {tasks.map((task) =>
              task.answerLink ? (
                <TaskList
                  key={task.name}
                  id={task._id}
                  title={task.taskName}
                  dueDate={task.dueIn}
                  submitted={task.answerLink}
                  submittedDate={formatDate(task?.submittedOn)}
                  graded={task.grade}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </Card>
      </div>
    </>
  );
};
export default TaskCard;
