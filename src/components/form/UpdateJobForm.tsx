import axiosInstance from "../configs/axiosConfig";
import { JobContext, JobStatuses, TJob } from "../context/JobContext";
import { useState, useContext } from "react";

type UpdateJobData = {
  company: string;
  position: string;
  status: JobStatuses;
};

type TInfo = {
  type: "success" | "error";
  msg: string;
  active: boolean;
};

const UpdateJobForm = (job: TJob) => {
  const [updateJobForm, setUpdateJobForm] = useState<UpdateJobData>({
    company: job.company,
    position: job.position,
    status: job.status,
  });
  const [info, setInfo] = useState<TInfo>({
    type: "error",
    msg: "error",
    active: false,
  });

  const { refreshJobs } = useContext(JobContext);

  const normalDate = new Date(job.createdAt);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setUpdateJobForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .patch(`/api/v1/jobs/${job._id}`, updateJobForm)
      .then(() => {
        refreshJobs();
        setInfo({
          type: "success",
          msg: "Job updated successfully",
          active: true,
        });
      })
      .catch((err) => {
        setInfo({
          type: "error",
          msg: err.response.data.msg,
          active: true,
        });
      });
  };

  return (
    <>
      <span
        className={`${info.active ? "opacity-100" : "opacity-0"} ${
          info.type === "success" ? "text-green-600" : "text-red-600"
        } text-xl`}
      >
        {info.msg}
      </span>
      <form
        key={job._id}
        className="flex flex-col w-[400px] p-4 gap-6 bg-white rounded-md shadow-2xl"
        onSubmit={handleSubmit}
      >
        <span className=" bg-indigo-600 text-white self-end p-2 text-xs rounded-xl">
          {normalDate.toLocaleString()}
        </span>
        <div className="text-xl">
          <label className="font-bold">Company: </label>
          <input
            name="company"
            id="company"
            type="text"
            className="shadow-inner bg-slate-200 border px-1"
            value={updateJobForm.company}
            onChange={handleChange}
          />
        </div>
        <div className="text-xl">
          <label className="font-bold">Position: </label>
          <input
            id="position"
            name="position"
            type="text"
            className="shadow-inner bg-slate-200 border px-1"
            value={updateJobForm.position}
            onChange={handleChange}
          />
        </div>
        <div className="text-xl">
          <label className="font-bold">Status: </label>
          <select
            name="status"
            value={updateJobForm.status}
            onChange={handleChange}
            className="bg-slate-200 shadow-inner border"
          >
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
            <option value="hired">hired</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-500 py-1 w-[80px] rounded-xl text-white shadow-xl text-center">
            Update
          </button>
          <button className="bg-blue-900 py-1 w-[80px] rounded-xl text-white shadow-xl">
            Delete
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateJobForm;
