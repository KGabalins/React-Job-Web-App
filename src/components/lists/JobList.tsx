import { useContext } from "react";
import { JobContext } from "../context/JobContext";
import JobItem from "../items/JobItem";

const JobList = () => {
  const { jobs } = useContext(JobContext);

  return (
    <div className="grid grid-cols-6 gap-4">
      {jobs.map((job) => {
        return <JobItem key={job._id} {...job} />;
      })}
    </div>
  );
};

export default JobList;
