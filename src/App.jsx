import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateCourse from "./pages/CreateCourse";
import Courses from "./pages/Courses";
import CoursesInfo from "./pages/CourseInfo";
import EditCourseInfo from "./pages/EditCourseInfo";
import AddTopic from "./pages/AddTopic";
import Admin from "./pages/Admin";
import AddAdmin from "./pages/AddAdmin";

export default function App() {
  return (
    <>
      <div id="modalContainer"></div>
      <div
        id="alertContainer"
        className="position-fixed text-center bottom-0 end-0 px-5"
      ></div>
      <main className="bg-body-secondary" style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Nav />}>
              <Route index element={<Home />} />
              <Route path="/courses" element={<Outlet />}>
                <Route index element={<Courses />} />
                <Route path="create" element={<CreateCourse />} />
                <Route path=":courseId" element={<Outlet />}>
                  <Route index element={<CoursesInfo />} />
                  <Route path="topics" element={<Outlet />}>
                    <Route path="add" element={<AddTopic />} />
                  </Route>
                </Route>
                <Route path="edit/:courseId" element={<EditCourseInfo />} />
              </Route>
              <Route path="/admin" element={<Outlet />}>
                <Route index element={<Admin />} />
                <Route path="add" element={<AddAdmin />} />
              </Route>
            </Route>
            <Route path="/auth" element={<Outlet />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
