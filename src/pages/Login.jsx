import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAlert from "../hooks/useAlert";
const Login = () => {
  const [adminData, setAdminData] = useState({
    adminEmail: "rootadmin@6thtouch.com",
    adminPassword: "root",
  });
  const [submitted, setSubmitted] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    setSubmitted(true);
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/admin/auth/login`,
        adminData
      )
      .then((res) => {
        console.log(res);
        setSubmitted(false);
        if (res.status !== 200) return useAlert(res.data.message);
        let { adminToken } = res.data;
        localStorage.setItem("adminToken", adminToken);
        nav("/");
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
        if (err.response && err.response.status === 401)
          return useAlert(err.response.data.message, "danger");

        useAlert(err.message, "danger");
      });
  };
  return (
    <>
      <div className="container-fluid p-0 --login">
        <div className="up--square"></div>
        <div className="main--container">
          <div className="container form--container bg-white rounded-3 shadow">
            <div className="row p-5">
              <div className="col-6 border-end d-flex flex-column justify-content-center">
                <h3 className="project--text--primary">6thtouch</h3>
                <div className="container text-center">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    style={{
                      fontSize: 331,
                    }}
                    className="project--text--primary"
                  />
                  <p className="project--text--primary admin--text mt-3">
                    Aministrators Dashboard Limited Access
                  </p>
                </div>
              </div>
              <div className="col-6 flex-column d-flex justify-content-center">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-12 mb-3">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter admin email"
                        className="form-control"
                        value={adminData.adminEmail}
                        onChange={(e) =>
                          setAdminData({
                            ...adminData,
                            adminEmail: e.target.value,
                          })
                        }
                        required
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter admin email"
                        className="form-control"
                        value={adminData.adminPassword}
                        onChange={(e) =>
                          setAdminData({
                            ...adminData,
                            adminPassword: e.target.value,
                          })
                        }
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn project--text--bg--primary w-100 form-control d-flex align-items-center justify-content-center"
                      disabled={submitted}
                    >
                      {submitted && (
                        <div
                          className="spinner-border text-primary me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {submitted ? "Logging" : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
