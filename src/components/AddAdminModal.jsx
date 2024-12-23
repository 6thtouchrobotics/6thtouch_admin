import React, { useRef, useState } from "react";
import useServer from "../hooks/useServer";
import useAlert from "../hooks/useAlert";

const AddAdminModal = ({ setAdmins }) => {
  const [submitted, setSubmitted] = useState(false);
  const closeBtn = useRef(null);

  const [adminData, setAdminData] = useState({
    adminEmail: "",
    adminPassword: "",
    adminFirstName: "",
    adminLastName: "",
    courseAccess: true,
    adminAccess: false,
    reportAccess: true,
  });
  // /admin/auth/addAdmin

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    useServer(
      "/admin/auth/addAdmin",
      "post",
      (res) => {
        useAlert(res.data?.message);
        if (closeBtn) closeBtn.current.click();
        setSubmitted(false);
        useServer(
          "/admin/all",
          "get",
          (res) => res.status === 200 && setAdmins(res.data)
        );
      },
      {
        firstName: adminData.adminFirstName,
        lastName: adminData.adminLastName,
        email: adminData.adminEmail,
        password: adminData.adminPassword,
        courseAccess: adminData.courseAccess,
        adminAccess: adminData.adminAccess,
        reportAccess: adminData.reportAccess,
      }
    );
  };
  return (
    <div
      class="modal fade"
      id="addAdminModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="addAdminModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAdminModal">
              Add Admin
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeBtn}
            ></button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="adminFirstName"
                  placeholder="First name"
                  required
                  value={adminData.adminFirstName}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      adminFirstName: e.target.value,
                    })
                  }
                />
                <label htmlFor="adminFirstName">First name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="adminLastName"
                  placeholder="Last name"
                  required
                  value={adminData.adminLastName}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      adminLastName: e.target.value,
                    })
                  }
                />
                <label htmlFor="adminLastName">Last name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="adminEmail"
                  placeholder="Email"
                  required
                  value={adminData.adminEmail}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      adminEmail: e.target.value,
                    })
                  }
                />
                <label htmlFor="adminEmail">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="adminPassword"
                  placeholder="Passkey"
                  required
                  value={adminData.adminPassword}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      adminPassword: e.target.value,
                    })
                  }
                />
                <label htmlFor="adminPassword">Passkey</label>
              </div>
              <h6>Course Privilege</h6>
              <p>Give admin access to create/edit course and topics</p>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="courseAccess"
                  checked={adminData.courseAccess}
                  onClick={(e) => {
                    setAdminData({
                      ...adminData,
                      courseAccess: !adminData.courseAccess,
                    });
                  }}
                />
                <label class="form-check-label" for="courseAccess">
                  Allow Course Access
                </label>
              </div>
              <h6>Report Privilege</h6>
              <p>Give admin access to review reports made by users</p>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="reportAccess"
                  checked={adminData.reportAccess}
                  onClick={(e) => {
                    setAdminData({
                      ...adminData,
                      reportAccess: !adminData.reportAccess,
                    });
                  }}
                />
                <label class="form-check-label" for="reportAccess">
                  Allow Report Access
                </label>
              </div>
              <h6>Admin Privilege</h6>
              <p>Give admin access to add/remove/manage admin</p>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="adminAccess"
                  checked={adminData.adminAccess}
                  onClick={(e) => {
                    setAdminData({
                      ...adminData,
                      adminAccess: !adminData.adminAccess,
                    });
                  }}
                />
                <label class="form-check-label" for="adminAccess">
                  Allow Admin Access
                </label>
              </div>
              <div className="container p-0">
                <button
                  className="btn project--text--bg--primary d-flex align-items-center justify-content-center"
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
                  {submitted ? "Saving" : "Save"}
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
