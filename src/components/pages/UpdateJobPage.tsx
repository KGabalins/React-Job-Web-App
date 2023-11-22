import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../configs/axiosConfig";
import { TJob } from "../context/JobContext";
import UpdateJobForm from "../form/UpdateJobForm";

const UpdateJobPage = () => {
  const { id: jobId } = useParams();
  const [job, setJob] = useState<TJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/jobs/${jobId}`)
      .then(({ data }) => {
        setLoading(false);
        setJob(data.job);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [jobId]);

  return (
    <div className="flex flex-col h-screen items-center w-screen justify-center pb-20">
      <div>
        {loading ? "Loading..." : job ? <UpdateJobForm {...job} /> : "Failed"}
      </div>
      <Link
        to="/"
        className="bg-black text-white py-1 w-20 text-center my-4 rounded-xl"
      >
        Home
      </Link>
    </div>
  );
};

export default UpdateJobPage;
