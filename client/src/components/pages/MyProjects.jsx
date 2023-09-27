import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectApp, selectStudent } from "../../redux/store";
import { setProjectOpenedInfo } from "../../redux/features/appSlice";
import formatDate from "../../lib/formatDate";
import PhotoPicker from "../ui/PhotoPicker";
import axios from "axios";
import { UPDATE_PROJECT_INFO } from "../../utils/apiRoutes";
import { updateLocalProjectList } from "../../redux/features/studentSlice";

import { FiSave, FiEdit2, FiEdit, FiLoader } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import IconWrapper from "../ui/IconWrapper";
import InputWithLabel from "../ui/InputWithLabel";
import Loader from "./Loader";

const MyProjects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projectOpened } = useSelector(selectApp);
  const {
    projects,
    firstName,
    id: studentId,
    studentActivity: { totalProgress },
  } = useSelector(selectStudent);

  useEffect(() => {
    if (firstName) dispatch(setProjectOpenedInfo({ projects, id }));
  }, [firstName]);
  useEffect(() => {
    setProjectName(projectOpened.name);
    setDeployedLink(projectOpened.deployedLink);
    setDescription(projectOpened.desc);
    setRepositoryLink(projectOpened.githubLink);
    setImageurl(projectOpened.imageUrl);
  }, [projectOpened]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deployedLink, setDeployedLink] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const [imageUrl, setImageurl] = useState("");
  const [editable, setEditable] = useState(true);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [loadPhoto, setLoadPhoto] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    imageInputRef.current?.click();
    const body = document.body;
    body.onfocus = () => setTimeout(() => setGrabPhoto(false), 1000);
  }, [grabPhoto]);

  async function photoPickerChange(event) {
    try {
      setLoadPhoto(true);
      const file = event.target.files[0];
      const reader = new FileReader();
      const imgBase64 = document.createElement("img");
      reader.onload = function (event) {
        imgBase64.src = event.target?.result;
        imgBase64.setAttribute("data-src", event.target?.result);
      };
      reader.readAsDataURL(file);
      setTimeout(async () => {
        setImageurl(imgBase64.src);
      }, 100);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadPhoto(false);
    }
  }

  async function saveProjectHandler() {
    setSubmitLoader(true);
    if (
      projectOpened.name === projectName &&
      projectOpened.desc === description &&
      projectOpened.deployedLink === deployedLink &&
      projectOpened.githubLink === repositoryLink &&
      projectOpened.imageUrl === imageUrl
    ) {
      setSubmitLoader(false);
      setEditable(true);
      return toast.error("Nothing edited to save");
    }
    try {
      const { data } = await axios.put(UPDATE_PROJECT_INFO, {
        projectInfo: {
          projectName,
          description,
          imageUrl,
          deployedLink,
          githubLink: repositoryLink,
        },
        studentId,
        projectId: id,
      });
      dispatch(updateLocalProjectList([...data.projects]));
      toast.success("Project Info Updated Successfully");
      setEditable(true);
    } catch (error) {
      setEditable(false);
      console.log(error);
      toast.error("Error Updating Project Info");
    }
    setSubmitLoader(false);
  }

  return (
    <>
      {totalProgress ? (
        <main className="p-10 min-h-screen bg-slate-950 cursor-default">
          <div className="col-span-full flex-col space-y-14  text-white">
            <div className="flex sm:pe-10 justify-between gap-10 sm:gap-0 items-center">
              <div className="flex gap-5 justify-center ">
                <IconWrapper
                  className={"max-sm:hidden"}
                  title={"Back to Dashboard"}
                  disabled={!editable || submitLoader}
                  onClickHandler={() => navigate("/dashboard")}
                >
                  <IoChevronBackOutline
                    className={`w-7 h-7 md:hover:cursor-pointer  my-2  ${
                      submitLoader
                        ? "text-gray-500 pointer-events-none"
                        : "text-white"
                    }`}
                    title="Back to Dashboard"
                    onClick={() => navigate("/dashboard")}
                  />
                </IconWrapper>
                <div className="flex-col space-y-3 cursor-default">
                  <h2 className="sm:text-7xl text-6xl">My Projects</h2>
                  <h3 className="text-primary sm:text-3xl text-2xl">
                    {`#${projectOpened.projectNo} ${projectName}`}
                  </h3>
                </div>
              </div>
              <div className="max-sm:flex-col">
                <IconWrapper
                  className={"sm:hidden"}
                  title={"Back to Dashboard"}
                  disabled={submitLoader}
                  onClickHandler={() => navigate("/dashboard")}
                >
                  <HiOutlineHome
                    className={`w-7 h-7 md:hover:cursor-pointer my-2 ${
                      submitLoader
                        ? "text-gray-500 pointer-events-none"
                        : "text-primary"
                    }`}
                    title="Back to Dashboard"
                    onClick={() => navigate("/dashboard")}
                  />
                </IconWrapper>
                {editable ? (
                  <IconWrapper
                    title={"Edit"}
                    disabled={!editable}
                    onClickHandler={() => setEditable(false)}
                  >
                    <FiEdit2
                      className="w-7 h-7 md:hover:cursor-pointer"
                      title="Edit"
                      onClick={() => setEditable(false)}
                    />
                  </IconWrapper>
                ) : (
                  <IconWrapper
                    title={"Save"}
                    disabled={editable || submitLoader}
                    onClickHandler={saveProjectHandler}
                  >
                    {submitLoader ? (
                      <FiLoader className=" w-7 h-7 pointer-events-none text-gray-500 animate-spin" />
                    ) : (
                      <FiSave
                        className="w-7 h-7 md:hover:cursor-pointer"
                        title="Save"
                      />
                    )}
                  </IconWrapper>
                )}
              </div>
            </div>
            <div className="flex-col space-y-7 w-full sm:w-[80%] mx-auto">
              <div className="relative  group lg:w-1/2 w-3/4 mx-auto">
                <div
                  className={`absolute sm:-bottom-3 sm:-right-3 -bottom-2 -right-2 bg-yellow-500 sm:w-11 sm:h-11 w-8 h-8  flex justify-center items-center rounded-full opacity-0 ${
                    !editable ? "max-md:opacity-100" : "  pointer-events-none "
                  }`}
                  title="Edit Image"
                  onClick={() => setGrabPhoto(true)}
                >
                  <FiEdit className=" sm:w-5 sm:h-5 w-4 h-4 sm:ms-1 ms-[2px] text-white" />
                </div>

                {loadPhoto ? (
                  <div className="border-2 border-white/10 w-full h-[310px] bg-gray-900 rounded-lg flex justify-center items-center">
                    <BiLoaderAlt className="w-10 h-10 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div
                      className={`absolute flex items-center gap-3 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-0 w-full justify-center ${
                        !editable ? "md:group-md:hover:opacity-100" : ""
                      }`}
                    >
                      <FiEdit className="inline" />
                      <span>Click to edit the image</span>
                    </div>
                    <img
                      onClick={() => setGrabPhoto(true)}
                      src={imageUrl}
                      className={`w-full rounded-lg ${
                        !editable
                          ? "md:group-md:hover:opacity-10 border-2 border-white/50 md:group-md:hover:cursor-pointer  transition-opacity duration-300"
                          : " pointer-events-none border-transparent border-2 "
                      }`}
                      alt=""
                    />
                  </>
                )}
              </div>
              <InputWithLabel
                label="Project Name"
                disabled={editable}
                value={projectName}
                onChangeHandler={(e) => {
                  setProjectName(e.target.value);
                }}
              />
              <InputWithLabel
                label="Description"
                disabled={editable}
                value={description}
                onChangeHandler={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <InputWithLabel
                label="Deployed Link"
                disabled={editable}
                value={deployedLink}
                onChangeHandler={(e) => {
                  setDeployedLink(e.target.value);
                }}
              />
              <InputWithLabel
                label="Repository Link"
                disabled={editable}
                value={repositoryLink}
                onChangeHandler={(e) => {
                  setRepositoryLink(e.target.value);
                }}
              />
              <InputWithLabel
                label="Subimtted On"
                value={formatDate(projectOpened.submittedOn)}
              />
              {grabPhoto && (
                <PhotoPicker
                  onChangeHandler={photoPickerChange}
                  ref={imageInputRef}
                />
              )}
            </div>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default MyProjects;
