import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";
import useServer from "../hooks/useServer";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Authenticate = ({ children, setUser }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myProfile, setMyProfile] = useState(null);

  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) nav("/auth/login");
    else {
      useServer("/admin/me", "get", (res) => {
        if (res.status === 200) {
          if (setUser) setUser(res.data);
          setIsAuthenticated(true);
        } else nav("/auth/login");
      });
    }
  }, []);

  return isAuthenticated ? (
    children
  ) : (
    <div>
      <div className="container-fluid p-0">
        <Skeleton width={"100%"} height={64} />

        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-2">
              <Skeleton
                style={{
                  height: "100vh",
                }}
                width={"100%"}
              />
            </div>
            <div className="col-10">
              <div className="container p-4">
                <Skeleton
                  // className="container-fluid rounded-3 mt-3"
                  width={"100%"}
                  height={134}
                />
              </div>
              <div className="container mt-5 px-5">
                <div className="d-flex">
                  <Skeleton
                    className="rounded-3 d-flex align-items-center justify-content-center py-3 px-5 me-3"
                    width={250}
                    height={168}
                  />
                  <Skeleton
                    className="rounded-3 d-flex align-items-center justify-content-center py-3 px-5 me-3"
                    width={250}
                    height={168}
                  />
                  <Skeleton
                    className="rounded-3 d-flex align-items-center justify-content-center py-3 px-5"
                    width={250}
                    height={168}
                  />

                  {/* className="bg-info rounded-3 text-white  d-flex align-items-center justify-content-center py-3 px-5 me-3" */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return isAuthenticated ? (
  //   children
  // ) : (
  //   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  //     <Skeleton circle width={50} height={50} />
  //     <div>
  //       <Skeleton width={200} />
  //       <Skeleton width={150} style={{ marginTop: "0.5rem" }} />
  //     </div>
  //   </div>
  // );
};

export default Authenticate;
