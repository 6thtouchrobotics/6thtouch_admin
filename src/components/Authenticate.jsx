import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";
import useServer from "../hooks/useServer";
import axios from "axios";
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
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <LoadingAnimation addWhiteSpace={false} />
    </div>
  );
};

export default Authenticate;
