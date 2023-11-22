import { useState, useContext } from "react";
import axiosInstance from "../configs/axiosConfig";
import { JobContext } from "../context/JobContext";

type CreateJobData = {
  company: string;
  position: string;
};

const JobForm = () => {
  const [jobForm, setJobForm] = useState<CreateJobData>({
    company: "",
    position: "",
  });
  const { refreshJobs } = useContext(JobContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/v1/jobs", jobForm);
      refreshJobs();
      clearForm();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const clearForm = () => {
    setJobForm({ company: "", position: "" });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl border rounded-md flex flex-col w-[400px] p-4 "
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          className="border shadow-inner"
          type="text"
          value={jobForm.company}
          onChange={handleChange}
        />
        <label htmlFor="position">Position</label>
        <input
          id="position"
          name="position"
          className="border shadow-inner"
          type="text"
          value={jobForm.position}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white rounded-md py-1 mt-3 shadow-lg">
          Submit
        </button>
      </form>
    </>
  );
};

export default JobForm;
