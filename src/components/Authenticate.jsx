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
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <LoadingAnimation addWhiteSpace={false} />
        <h6>Loading Dashboard</h6>
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
