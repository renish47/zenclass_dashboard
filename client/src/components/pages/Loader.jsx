import { useEffect } from "react";
import toast from "react-hot-toast";

const Loader = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.loading("Please Wait! Server is Loading", { duration: 15000 });
    }, 20000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="w-screen h-screen bg-slate-950 flex justify-center items-center cursor-default">
      <h1 className=" text-center text-4xl sm:text-6xl text-white animate-bounce">
        Zenclass <span className="text-primary max-sm:block">Dashboard</span>
      </h1>
    </div>
  );
};
export default Loader;
