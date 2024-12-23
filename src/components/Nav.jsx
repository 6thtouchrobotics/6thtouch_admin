import { Outlet, Link, useLocation } from "react-router-dom";
import Authenticate from "./Authenticate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGraduationCap,
  faUser,
  faAnglesDown,
  faAngleDown,
  faAngleUp,
  faPlus,
  faUserLock,
  faUserPlus,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Nav = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  return (
    <Authenticate setUser={setUser}>
      <div className="container-fluid p-0">
        <div className="container-fluid bg-white p-2 ps-3 shadow d-flex justify-content-between pe-5 align-items-center">
          <h4 className="project--text--primary">
            Welcome, {user?.firstName} {user?.lastName}
          </h4>
          <div>
            <Link
              className="btn-secondary rounded-circle btn"
              title={`${user?.firstName} ${user?.lastName}`}
              to="/admin"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="row">
            <div
              className="col-2 project--text--bg--primary"
              style={{
                height: "100vh",
              }}
            >
              <div className="container mt-4 ps-4">
                <div className="row">
                  <div
                    className={`col-12 mb-3 border-5 border-white ${
                      pathname === "/" && "border-start"
                    }`}
                    style={{
                      transition: "border 0.1s ease",
                    }}
                  >
                    <Link
                      to="/"
                      className="h6 text-decoration-none d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Dashboard
                      </div>
                    </Link>
                  </div>

                  {user?.courseAccess && (
                    <>
                      <div
                        className={`col-12 mb-3 border-5 border-white ${
                          pathname.includes("/courses") && "border-start"
                        }`}
                        style={{
                          transition: "border 0.1s ease",
                        }}
                      >
                        <Link
                          to="/courses"
                          className="h6 text-decoration-none d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faGraduationCap}
                              className="me-2"
                            />
                            Courses
                          </div>
                          <FontAwesomeIcon
                            icon={
                              pathname.includes("/courses")
                                ? faAngleUp
                                : faAngleDown
                            }
                            className="me-2"
                          />
                        </Link>
                      </div>
                      {pathname.includes("/courses") && (
                        <div className="col-12 mb-3 ps-4">
                          <Link
                            to="/courses/create"
                            className="h6 text-decoration-none d-flex align-items-center justify-content-between"
                          >
                            <div>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              Add Course
                            </div>
                          </Link>
                        </div>
                      )}
                    </>
                  )}

                  {user?.reportAccess && (
                    <div
                      className={`col-12 mb-3 border-5 border-white ${
                        pathname.includes("/reports") && "border-start"
                      }`}
                      style={{
                        transition: "border 0.1s ease",
                      }}
                    >
                      <Link
                        to="/reports"
                        className="h6 text-decoration-none d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <FontAwesomeIcon icon={faWarning} className="me-2" />
                          Reports
                        </div>
                      </Link>
                    </div>
                  )}
                  {user?.adminAccess && (
                    <div
                      className={`col-12 mb-3 border-5 border-white ${
                        pathname.includes("/admin") && "border-start"
                      }`}
                      style={{
                        transition: "border 0.1s ease",
                      }}
                    >
                      <Link
                        to="/admin"
                        className="h6 text-decoration-none d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <FontAwesomeIcon icon={faUserLock} className="me-2" />
                          Admin
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="col-10 overflow-y-scroll"
              style={{
                height: "90vh",
                overflowY: "scroll",
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Authenticate>
  );
};

export default Nav;
