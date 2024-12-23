import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import {
  faSignOut,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const ReportInfo = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  useEffect(() => {
    useServer(`/admin/reports/${reportId}`, "get", (res) =>
      setReport(res.data)
    );
  }, []);
  return report ? (
    <>
      <div className="container p-4">
        <h1 className="text-center">
          {report.user.firstName} {report.user.lastName}'s Report
        </h1>
        <div className="row">
          <div className="col-12 bg-light rounded-3 p-3">
            <p class="text-secondary">{Date(report.createdAt)}</p>

            <h1>{report.title}</h1>
            <p className="lead">{report.message}</p>
            <div className="ms-auto w-25 d-flex align-items-center">
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
                <h6>
                  {report.user.firstName} {report.user.lastName}
                </h6>
              </div>
            </div>
            <div>
              <Link className="btn project--text--bg--primary" to={-1}>
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="container p-4">
      <div className="container text-center mb-3">
        <Skeleton className="" width={500} height={50} />
      </div>
      <div className="row">
        <div className="col-12 bg-light rounded-3 p-3">
          <Skeleton className="" width={400} height={20} />

          <Skeleton className="" width={500} height={50} />

          <Skeleton className="" width={"100%"} height={20} />
          <Skeleton className="" width={"100%"} height={20} />
          <Skeleton className="" width={500} height={20} />
          <Skeleton className="" width={"100%"} height={20} />
          <Skeleton className="" width={"100%"} height={20} />
          <Skeleton className="" width={400} height={20} />

          <div className="ms-auto w-25 d-flex align-items-center">
            <Skeleton className="me-2" circle width={50} height={50} />

            <div>
              <Skeleton className="" width={200} height={20} />
            </div>
          </div>
          <div>
            <Skeleton className="" width={100} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 *   {report.user.avatar ? (
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
 */
export default ReportInfo;
