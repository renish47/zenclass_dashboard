import ChapterList from "../list/ChapterList";
import Card from "../ui/Card";

const ChapterCard = ({ chapters }) => {
  return (
    <div className=" flex-col lg:aspect-video h-[350px] lg:h-auto aspect-auto space-y-2 lg:w-[30%] w-full">
      <div className="overflow-hidden h-full rounded-2xl ">
        <Card
          lightRadius={500}
          className=" h-full max-h-full flex-col items-start "
        >
          <div className="h-full max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            {chapters?.map((chapter, index) => (
              <ChapterList
                chapNo={index}
                title={chapter.chapterName}
                key={index}
                isCompleted={chapter?.isCompleted || false}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ChapterCard;
