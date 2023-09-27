import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import MyProjects from "./components/pages/MyProjects";
import Tasks from "./components/pages/Tasks";
import Chapters from "./components/pages/Chapters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudentInfo } from "./redux/features/studentSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudentInfo("64fee882f2a1cccd4fb67058"));
  }, []);
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-projects/:id" element={<MyProjects />} />
      <Route path="/tasks/:id" element={<Tasks />} />
      <Route path="/lessons/:id" element={<Chapters />} />
      <Route path="*" element={<Navigate to={"/dashboard"} />} />
    </Routes>
  );
}

export default App;
