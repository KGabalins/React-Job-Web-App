import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({ msg: "Error", active: false });
  const { setUser } = useContext(UserContext);

  const clearForm = () => {
    setLoginForm({ email: "", password: "" });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/login", loginForm);
      clearForm();
      setErrorMsg({ ...errorMsg, active: false });
      setUser(data);
    } catch (error: any) {
      setErrorMsg({ msg: error.response.data.msg, active: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <span
        className={`${
          errorMsg.active ? "opacity-100" : "opacity-0"
        } mb-2 text-red-700 w-[350px] h-10 flex items-end`}
      >
        {errorMsg.msg}
      </span>
      <form
        onSubmit={submitHandler}
        className="bg-white p-5 w-[400px] flex flex-col rounded-xl shadow-xl"
      >
        <h3 className="text-center font-bold text-xl mb-2">Login Form</h3>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="border shadow-inner mb-2 px-2 py-1 bg-slate-100 rounded-sm"
          value={loginForm.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="border shadow-inner mb-2 px-2 py-1 bg-slate-100 rounded-sm"
          value={loginForm.password}
          onChange={handleChange}
        />
        <span>
          Haven't registered? Go to{" "}
          <Link to="/register" className="text-blue-500 underline">
            register
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

export default LoginForm;
