import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({ msg: "Error", active: false });

  const clearForm = () => {
    setRegisterForm({ name: "", email: "", password: "" });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/register", registerForm);
      clearForm();
      setErrorMsg({ ...errorMsg, active: false });
      console.log(data.token);
    } catch (error: any) {
      setErrorMsg({ msg: error.response.data.msg, active: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <span
        className={`${
          errorMsg.active ? "opacity-100" : "opacity-0"
        } mb-2 text-red-700 w-[350px] h-4 flex items-end`}
      >
        {errorMsg.msg}
      </span>
      <form
        onSubmit={submitHandler}
        className="bg-white p-5 w-[400px] flex flex-col rounded-xl shadow-xl"
      >
        <h3 className="text-center font-bold text-xl mb-2">Register Form</h3>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="border shadow-inner mb-2 px-2 py-1 bg-slate-100 rounded-sm"
          value={registerForm.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="border shadow-inner mb-2 px-2 py-1 bg-slate-100 rounded-sm"
          value={registerForm.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="border shadow-inner mb-2 px-2 py-1 bg-slate-100 rounded-sm"
          value={registerForm.password}
          onChange={handleChange}
        />
        <span>
          Already have an account? Go to{" "}
          <Link to="/login" className="text-blue-500 underline">
            login
          </Link>{" "}
          page
        </span>
        <button className="bg-blue-500 text-white rounded-md py-1 mt-3 shadow-lg">
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
