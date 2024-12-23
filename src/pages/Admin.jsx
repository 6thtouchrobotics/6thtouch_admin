import {
  faSignOut,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import AddAdminModal from "../components/AddAdminModal";
import usePrompt from "../hooks/usePrompt";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import EditProfileModal from "../components/EditProfileModal";
import ManageAdminAccessModal from "../components/ManageAdminAccessModal";
import Skeleton from "react-loading-skeleton";

const Admin = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [focusedAdmin, setFocusedAdmin] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    useServer(
      "/admin/me",
      "get",
      (res) => res.status === 200 && setMyProfile(res.data)
    );
    useServer(
      "/admin/all",
      "get",
      (res) => res.status === 200 && setAdmins(res.data)
    );
  }, []);

  const removeAdmin = (admin) => {
    usePrompt(
      "Remove Admin",
      `Are you sure you want to remove <span class="fw-bold">"${admin.firstName} ${admin.lastName}"</span> from the admin panel?`,
      "danger",
      "Remove",
      () => {
        useServer(
          `/admin/auth/removeAdmin/${admin.id}`,
          "delete",
          (res) => {
            useAlert(res.data?.message);
            useServer(
              "/admin/all",
              "get",
              (res) => res.status === 200 && setAdmins(res.data)
            );
          },
          {}
        );
      }
    );
  };
  const logOut = async () => {
    usePrompt(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      "danger",
      "Logout",
      () => {
        localStorage.clear();
        nav("/auth/login", { replace: true });
      }
    );
  };
  return myProfile && admins ? (
    <>
      <div className="container p-5">
        <div className="row py-3 px-3 align-items-center">
          <div className="col-1">
            <div className="project--text--primary">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 91 }} />
            </div>
          </div>
          <div className="col-7 ps-4">
            <h1>
              {myProfile.firstName} {myProfile.lastName}
            </h1>
            <p>{myProfile.email}</p>
          </div>
          <div className="col-4">
            <button
              className="btn project--text--bg--primary me-3"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>
            <button className="btn btn-danger" onClick={logOut}>
              <FontAwesomeIcon icon={faSignOut} className="me-2" /> Logout
            </button>
          </div>
        </div>
        {myProfile.adminAccess && (
          <>
            <div className="container">
              <button
                className="btn project--text--bg--primary"
                data-bs-toggle="modal"
                data-bs-target="#addAdminModal"
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Add Admin
              </button>
            </div>
            <div className="container mt-3">
              <h3>Admin Panel</h3>
              <hr />
              {admins
                .filter((admin) => admin.id !== myProfile.id)
                .map((admin) => {
                  return (
                    <div
                      className="row py-3 px-3 align-items-center"
                      key={admin.id}
                    >
                      <div className="col-1">
                        <div className="project--text--primary">
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ fontSize: 30 }}
                          />
                        </div>
                      </div>
                      <div className="col-7">
                        <h4>
                          {admin.firstName} {admin.lastName}
                        </h4>
                      </div>
                      <div className="col-4">
                        <button
                          className="btn project--text--bg--primary me-2"
                          onClick={() => setFocusedAdmin(admin)}
                          data-bs-toggle="modal"
                          data-bs-target="#manageAdminAccessModal"
                        >
                          Manage Access
                        </button>
                        <button
                          className="btn project--text--bg--primary"
                          onClick={() => removeAdmin(admin)}
                        >
                          Remove Admin
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>

      <AddAdminModal setAdmins={setAdmins} />
      <EditProfileModal myProfile={myProfile} setMyProfile={setMyProfile} />
      <ManageAdminAccessModal focusedAdmin={focusedAdmin} />
    </>
  ) : (
    <>
      <div className="container p-4">
        <div className="row py-3 px-3 align-items-center">
          <div className="col-1">
            <Skeleton circle width={91} height={91} />
          </div>
          <div className="col-7 ps-4">
            <Skeleton width={400} height={50} />
            <Skeleton width={200} height={25} />
          </div>
          <div className="col-4">
            <div className="d-flex">
              <Skeleton width={100} height={40} className="rounded-3 me-2" />
              <Skeleton width={100} height={40} className="rounded-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <Skeleton width={400} height={45} />
        <Skeleton width={"100%"} height={2} />

        <div className="row py-3 px-3 align-items-center">
          <div className="col-1">
            <Skeleton circle width={91} height={91} />
          </div>
          <div className="col-7 ps-4">
            <Skeleton width={400} height={50} />
            <Skeleton width={200} height={25} />
          </div>
          <div className="col-4">
            <div className="d-flex">
              <Skeleton width={100} height={40} className="rounded-3 me-2" />
            </div>
          </div>
        </div>
        <div className="row py-3 px-3 align-items-center">
          <div className="col-1">
            <Skeleton circle width={91} height={91} />
          </div>
          <div className="col-7 ps-4">
            <Skeleton width={400} height={50} />
            <Skeleton width={200} height={25} />
          </div>
          <div className="col-4">
            <div className="d-flex">
              <Skeleton width={100} height={40} className="rounded-3 me-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
