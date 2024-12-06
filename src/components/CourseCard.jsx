import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import courseTemp from "../assets/course-img.png";
import { faClock, faEye, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const CourseCard = ({
  course,
  courseView = false,
  handlePublish,
  handleUnpublish,
}) => {
  return (
    <>
      <div>
        <img
          src={course.thumbnail}
          alt="Course thumbnail"
          className="img-fluid w-100 border-bottom"
        />
        <div className="container py-3 px-4">
          <h5>{course.title}</h5>

          <div className="row mt-4">
            <div className="col-8">
              <p className="fw-bold project--text--primary">
                <FontAwesomeIcon className="me-2" icon={faEye} /> Reviews
              </p>
            </div>
            <div className="col-4">
              <p>{course.reviews}</p>
            </div>
            <div className="col-8">
              <p className="fw-bold project--text--primary">
                <FontAwesomeIcon className="me-2" icon={faClock} /> Duration
              </p>
            </div>
            <div className="col-4">
              <p>{course.duration}</p>
            </div>
            <div className="col-8">
              <p className="fw-bold project--text--primary">
                <FontAwesomeIcon className="me-2" icon={faUsers} /> Students
              </p>
            </div>
            <div className="col-4">
              <p>{course.subscribers.length}</p>
            </div>
            {courseView ? (
              <>
                <div className="col-12 mb-3">
                  <Link
                    to={`/courses/edit/${course.id}`}
                    className="btn project--border--primary project--text--primary w-100"
                  >
                    Edit course
                  </Link>
                </div>
                <div className="col-12">
                  <button
                    className="btn project--text--bg--primary w-100"
                    onClick={
                      course.isPublished ? handleUnpublish : handlePublish
                    }
                  >
                    {course.isPublished ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="col-7">
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn project--text--bg--primary w-100"
                  >
                    View
                  </Link>
                </div>
                <div className="col-5">
                  <Link
                    to={`/courses/edit/${course.id}`}
                    className="btn project--border--primary project--text--primary w-100"
                  >
                    Edit
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
