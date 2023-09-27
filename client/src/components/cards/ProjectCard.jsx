import { useSelector } from "react-redux";

import { selectStudent } from "../../redux/store";

import ProjectList from "../list/ProjectList";
import Card from "../ui/Card";

const ProjectCard = () => {
  const { projects } = useSelector(selectStudent);
  return (
    <>
      <h4 className="font-semibold ms-1 text-white mb-2 inline-block cursor-default">
        My Projects
      </h4>
      <div className="overflow-hidden  h-full rounded-2xl max-h-[280px]">
        <Card
          lightRadius={600}
          className=" h-full max-h-full flex-col items-start"
        >
          <div className="h-full max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar flex-col text-white">
            {projects.map((project) => (
              <ProjectList
                title={project.projectName}
                desc={project.description}
                githubLink={project.githubLink}
                projectLink={project.deployedLink}
                imageLink={project.imageUrl}
                key={project._id}
                id={project._id}
              />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
export default ProjectCard;
