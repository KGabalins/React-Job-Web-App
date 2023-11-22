import axiosInstance from "../configs/axiosConfig";
import { JobContext, TJob } from "../context/JobContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const JobItem = (job: TJob) => {
  const normalDate = new Date(job.createdAt);

  const { refreshJobs } = useContext(JobContext);

  const handleDelete = () => {
    axiosInstance
      .delete(`/api/v1/jobs/${job._id}`)
      .then(() => refreshJobs())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        key={job._id}
        className="flex flex-col bg-white shadow-2xl p-4 gap-6 rounded-md"
      >
        <span className=" bg-indigo-600 text-white self-end p-2 text-xs rounded-xl">
          {normalDate.toLocaleString()}
        </span>
        <span className="text-xl">
          <span className="font-bold">Company: </span> {job.company}
        </span>
        <span className="text-xl">
          <span className="font-bold">Position: </span>
          {job.position}
        </span>
        <span className="text-xl">
          <span className="font-bold">Status: </span>
          <span>
            {job.status}
            {job.status === "pending" && "..."}
            {job.status === "declined" && (
              <p className="fa-solid fa-xmark ml-1"></p>
            )}
            {job.status === "interview" && (
              <p className="fa-solid fa-user ml-1"></p>
            )}
            {job.status === "hired" && (
              <p className="fa-solid fa-check ml-1"></p>
            )}
          </span>
        </span>
        <div className="flex gap-2">
          <Link
            to={`/job/${job._id}`}
            className="bg-blue-500 py-1 w-[80px] rounded-xl text-white shadow-xl text-center"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-blue-900 py-1 w-[80px] rounded-xl text-white shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default JobItem;
