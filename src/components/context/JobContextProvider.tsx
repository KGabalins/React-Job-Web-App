import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { JobContext, TJob } from "./JobContext";
import axiosInstance from "../configs/axiosConfig";

const JobContextProvider = () => {
  const [jobs, setJobs] = useState<TJob[]>([]);

  useEffect(() => {
    refreshJobs();
  }, []);

  const refreshJobs = () => {
    axiosInstance
      .get("/api/v1/jobs")
      .then(({ data }) => {
        setJobs(data.jobs);
      })
      .catch((err) => console.log(err));
  };

  return (
    <JobContext.Provider value={{ jobs, setJobs, refreshJobs }}>
      <Outlet />
    </JobContext.Provider>
  );
};

export default JobContextProvider;
