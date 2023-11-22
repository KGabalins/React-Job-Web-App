import JobForm from "../form/JobForm";
import JobList from "../lists/JobList";

const HomePage = () => {
  return (
    <>
      <div className="bg-blue-50 m-10 p-8 flex">
        <JobForm />
      </div>
      <div className="mx-10">
        <JobList />
      </div>
    </>
  );
};

export default HomePage;
