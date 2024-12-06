import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseCard from "../components/CourseCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import LoadingAnimation from "../components/LoadingAnimation";
const Courses = () => {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    useServer("/admin/courses", "get", (res) => setCourses(res.data));
  }, []);
  return courses ? (
    <>
      <div
        className=" position-fixed"
        style={{
          bottom: 50,
          right: 50,
        }}
      >
        <Link
          to="/courses/create"
          className="btn rounded-circle project--text--bg--primary"
          title="Create course"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <div className="container p-4">
        <div className="container-fluid bg-white rounded-3 mt-3">
          <div className="row py-2 px-3">
            <div className="col-12 ps-4">
              <h3 className="project--text--primary m-0">All courses</h3>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            {!courses.message ? (
              courses.map((course) => {
                return (
                  <div
                    className="col-4 p-0 bg-white rounded-3"
                    style={{
                      border:
                        "5px solid rgba(var(--bs-secondary-bg-rgb),var(--bs-bg-opacity))!important",
                    }}
                  >
                    <CourseCard course={course} />
                  </div>
                );
              })
            ) : (
              <>
                <h1 className="text-center">{courses.message}</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoadingAnimation />
  );
};

export default Courses;