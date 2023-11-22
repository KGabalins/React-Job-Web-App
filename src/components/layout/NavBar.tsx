import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    Navigate({ to: "/login" });
  };

  return (
    <>
      {/* <div className="flex h-12 m-4 bg-blue-700 font-bold text-white rounded-3xl">
        <Link className="p-6 border-r-2" to="/">
          Home
        </Link>

        <button onClick={logout} className="p-6 ml-auto">
          Logout
        </button>
      </div> */}
      <nav className=" bg-blue-600 text-white flex">
        <Link className="p-4 text-center border-r-2" to="/">
          Home
        </Link>
        <button onClick={logout} className="p-4 ml-auto border-l-2">
          Logout
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
