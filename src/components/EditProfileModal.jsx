import React, { useRef, useState } from "react";
import useServer from "../hooks/useServer";
import useAlert from "../hooks/useAlert";

const EditProfileModal = ({ myProfile, setMyProfile }) => {
  const [submitted, setSubmitted] = useState(false);
  const closeBtn = useRef(null);

  const [adminData, setAdminData] = useState({
    adminEmail: myProfile.email,
    adminFirstName: myProfile.firstName,
    adminLastName: myProfile.lastName,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    useServer(
      "/admin/me",
      "patch",
      (res) => {
        console.log(res);
        if (closeBtn) closeBtn.current.click();
        setSubmitted(false);
        useServer(
          "/admin/me",
          "get",
          (res) => res.status === 200 && setMyProfile(res.data)
        );
      },
      {
        firstName: adminData.adminFirstName,
        lastName: adminData.adminLastName,
        email: adminData.adminEmail,
      }
    );
  };
  return (
    <div
      class="modal fade"
      id="editProfileModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="editProfileModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModal">
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

export default EditProfileModal;
