import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import {
  faSignOut,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Report = () => {
  const [reports, setReports] = useState(null);
  useEffect(() => {
    useServer("/admin/reports", "get", (res) => setReports(res.data));
  }, []);
  return reports ? (
    <>
      {reports.message ? (
        <>
          <h1 className="text-center">reports.message</h1>
        </>
      ) : (
        <>
          <div className="container p-4">
            <h1 className="text-center">Reports</h1>
            <div className="row">
              {reports.map((report) => {
                return (
                  <div
                    key={report.id}
                    className="col-12 bg-light rounded-3 p-3 d-flex align-items-center"
                  >
                    {report.user.avatar ? (
                      <img
                        src={report.user.avatar}
                        width={50}
                        height={50}
                        className="rounded-circle me-2"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: 30 }}
                        className="me-2"
                      />
                    )}
                    <div>
                      <h4>{report.title}</h4>
                      <small>{report.message.substring(0, 100)}....</small>
                      <br />
                      <small className="text-secondary">
                        {Date(report.createdAt)}
                      </small>
                    </div>
                    <div className="ms-auto">
                      <Link
                        className="btn project--text--bg--primary"
                        to={`./${report.id}`}
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  ) : (
    <div className="container p-4">
      <Skeleton width={"100%"} height={50} />
      <div className="container-fluid p-0 mt-3 ">
        <div className="container-fluid">
          <Skeleton width={124} height={18} />
        </div>
      </div>
      <div className="container-fluid">
        <div className="container py-4 px-5">
          <div className="row">
            <div className="col-12 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-12 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3 pt-2">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
