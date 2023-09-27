import { useNavigate } from "react-router-dom";

import { FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectList = ({
  title,
  desc,
  githubLink,
  projectLink,
  imageLink,
  id,
}) => {
  const navigate = useNavigate();
  function onClickHandler(e) {
    if (e.target.id !== "btn1" && e.target.id !== "btn2")
      navigate(`/my-projects/${id}`);
  }
  return (
    <div
      className="flex max-sm:flex-col  p-5 w-full border-b border-white/20 items-center md:hover:bg-primary/20 md:hover:cursor-pointer transition-colors"
      onClick={(e) => {
        onClickHandler(e);
      }}
    >
      <div className="flex max-sm:flex-col max-sm:text-center w-full space-x-4 sm:me-2 sm:gap-5">
        <img src={imageLink} alt="" className="h-16 w-32 sm:mx-0 mx-auto" />
        <div
          className="flex-col space-y-1  text-white"
          style={{ marginLeft: "0px" }}
        >
          <p className="font-semibold text-lg whitespace-pre-line mt-1">
            {title}
          </p>
          <p className=" text-gray-500 text-sm whitespace-pre-line">{desc}</p>
        </div>
      </div>
      <div className=" w-full sm:pt-0 pt-5  sm:w-20">
        <div className="flex sm:space-x-5 space-x-8  w-full sm:w-16 text-gray-500 sm:mx-0 justify-center">
          <a href={githubLink} target="_blank">
            <FiGithub
              id="btn1"
              size={25}
              className="md:hover:text-primary transition-all duration-200"
            />
          </a>
          <a href={projectLink} target="_blank">
            <FiExternalLink
              id="btn2"
              size={25}
              className="md:hover:text-primary transition-all duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export default ProjectList;
