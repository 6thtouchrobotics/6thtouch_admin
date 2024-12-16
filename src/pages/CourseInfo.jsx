import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useServer from "../hooks/useServer";
import CourseCard from "../components/CourseCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAlert from "../hooks/useAlert";
import Skeleton from "react-loading-skeleton";

const CourseInfo = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
  }, []);
  const handlePublish = () => {
    useServer(
      `/admin/courses/${courseId}/publish`,
      "patch",
      (res) => {
        useAlert(res.data?.message);
        useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
      },
      {}
    );
  };
  const handleUnpublish = () => {
    useServer(
      `/admin/courses/${courseId}/unpublish`,
      "patch",
      (res) => {
        useAlert(res.data?.message);
        useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
      },
      {}
    );
  };
  return course ? (
    <div className="row p-4">
      <div className="col-4 p-0 ">
        <div
          className="p-0 bg-white rounded-3 position-sticky top-0"
          style={{
            border:
              "5px solid rgba(var(--bs-secondary-bg-rgb),var(--bs-bg-opacity))!important",
          }}
        >
          <CourseCard
            course={course}
            handlePublish={handlePublish}
            handleUnpublish={handleUnpublish}
            courseView
          />
        </div>
      </div>

      <div className="col-8">
        <div className="container-fluid text-end my-3">
          <Link
            to={`/courses/${courseId}/topics/add`}
            className="btn project--text--bg--primary"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Topic
          </Link>
        </div>
        <div className="container bg-light rounded-3 p-4">
          <h3>{course.title}</h3>
          <img src={course.thumbnail} className="img-fluid" />
          <p className="lead">{course.description}</p>
          <div className="container p-0">
            <h3>Topics</h3>
            <hr />
            {course.topics.map((topic) => {
              return (
                <div
                  key={topic.id}
                  className="btn p-0 d-flex align-items-center justify-content-between"
                >
                  <h4>{topic.title}</h4>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="row p-4">
      <div className="col-4 p-0">
        <div
          className="p-0 rounded-3"
          style={{
            border:
              "5px solid rgba(var(--bs-secondary-bg-rgb),var(--bs-bg-opacity))!important",
          }}
        >
          <Skeleton
            className="rounded-3 d-flex align-items-center justify-content-center py-3 px-5 me-3"
            width={380}
            height={467}
          />
        </div>
      </div>

      <div className="col-8">
        <div className="container-fluid text-end my-3">
          <Skeleton width={172} height={45} />
        </div>
        <div className="container rounded-3 p-4">
          <Skeleton width={400} height={45} />

          <Skeleton width={"100%"} height={209} />

          <Skeleton width={"100%"} height={81} />
          <div className="container p-0">
            <Skeleton width={400} height={30} />

            <Skeleton width={"100%"} height={2} />

            <Skeleton width={"100%"} height={15} />
            <Skeleton width={"100%"} height={15} />
            <Skeleton width={"100%"} height={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
