import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faBook,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import useServer from "../hooks/useServer";
import { useState, useEffect } from "react";
import LoadingAnimation from "../components/LoadingAnimation";

const Home = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [greeting, setGreeting] = useState("greeting");
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    useServer(
      "/admin/me",
      "get",
      (res) => res.status === 200 && setMyProfile(res.data)
    );
    useServer("/admin/courses", "get", (res) => setCourses(res.data));
  }, []);
  return myProfile && courses ? (
    <div className="container p-4">
      <h1>Analytics</h1>

      <div className="container-fluid bg-white rounded-3 mt-3">
        <div className="row py-3 px-3">
          <div className="col-1">
            <div className="project--text--primary">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 91 }} />
            </div>
          </div>
          <div className="col-11 ps-4">
            <h1>
              Good {greeting}, {myProfile.firstName} {myProfile.lastName}
            </h1>
            <p>Here is what's happening with your project today:</p>
          </div>
        </div>
      </div>
      <div className="container mt-5 px-5">
        <div className="d-flex">
          <div className="bg-info rounded-3 text-white  d-flex align-items-center justify-content-center py-3 px-5 me-3">
            <div className="me-4">
              <div className="bg-white text-info p-4 text-center rounded-circle">
                <FontAwesomeIcon icon={faUsers} style={{ fontSize: 20.21 }} />
              </div>
            </div>
            <div>
              <h6>TOTAL STUDENTS</h6>
              <h1>5000</h1>
              <div class="progress mb-3">
                <div
                  class="progress-bar bg-white text-dark w-50"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="fw-bold">75% Increase in the last 20days</p>
            </div>
          </div>
          <div className="project--bg--primary rounded-3 text-white  d-flex align-items-center justify-content-center py-3 px-5 me-3">
            <div className="me-4">
              <div className="bg-white project--text--primary p-4 text-center rounded-circle">
                <FontAwesomeIcon icon={faBook} style={{ fontSize: 20.21 }} />
              </div>
            </div>
            <div>
              <h6>TOTAL COURSES</h6>
              <h1>{courses.length || 0}</h1>
            </div>
          </div>
          <div className="bg-danger rounded-3 text-white  d-flex align-items-center justify-content-center py-3 px-5  ">
            <div className="me-4">
              <div className="bg-white text-danger p-4 text-center rounded-circle">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  style={{ fontSize: 20.21 }}
                />
              </div>
            </div>
            <div>
              <h6>TOTAL SOMETHING</h6>
              <h1>21</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingAnimation />
  );
};

export default Home;
