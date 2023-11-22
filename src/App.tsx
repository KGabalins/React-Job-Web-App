import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import UserContextProvider from "./components/context/UserContextProvider";
import JobContextProvider from "./components/context/JobContextProvider";
import GuestRoutes from "./components/routes/GuestRoutes";
import UserRoutes from "./components/routes/UserRoutes";
import UpdateJobPage from "./components/pages/UpdateJobPage";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserContextProvider />}>
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<UserRoutes />}>
            <Route element={<JobContextProvider />}>
              <Route element={<NavBar />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/job/:id" element={<UpdateJobPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
