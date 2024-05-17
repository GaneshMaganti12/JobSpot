import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import ProtectedRoute1 from "./components/ProtectedRoute1";
import ResetPassword from "./components/Passwords/ResetPassword/ResetPassword";
import NewPassword from "./components/Passwords/NewPassword/NewPassword";
import Home from "./components/Home/Home";
import Jobs from "./components/Jobs/Jobs";
import Activity from "./components/Activity/Activity";
import ChangePassword from "./components/Passwords/ChangePassword/ChangePassword";
import Job from "./components/Jobs/Job/Job";
import ProtectedRoute2 from "./components/ProtectedRoute2";
import NotFound from "./components/NotFound/NotFound";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute1 />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset/:userId/:token" element={<NewPassword />} />
        </Route>

        <Route element={<ProtectedRoute2 />}>
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
