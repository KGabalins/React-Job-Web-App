import { TUser, UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../configs/axiosConfig";

const UserContextProvider = () => {
  const [user, setUser] = useState<TUser | null>(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return { name: "loading", token: token.split(" ")[1] };
  });

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/auth`)
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("token", `Bearer ${data.token}`);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  if (user) localStorage.setItem("token", `Bearer ${user.token}`);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserContextProvider;
