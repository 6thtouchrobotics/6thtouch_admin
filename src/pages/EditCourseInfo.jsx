import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useServer from "../hooks/useServer";
import CourseCard from "../components/CourseCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAlert from "../hooks/useAlert";
import usePrompt from "../hooks/usePrompt";
import Skeleton from "react-loading-skeleton";

const EditCourseInfo = () => {
  const nav = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fileInput = useRef();
  useEffect(() => {
    useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
  }, []);
  useEffect(() => {
    if (!course) return;
    if (!course.isPaid) setCourse({ ...course, price: 0 });
  }, [course?.isPaid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    axios
      .patch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/admin/courses/${course.id}`,
        {
          ...course,
          thumbnail: fileInput.current.files[0]
            ? fileInput.current.files[0]
            : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setSubmitted(false);

        if (response.status !== 200)
          return useAlert(response.data.message, "danger");
        nav(`/courses/${course.id}`);
      })
      .catch((err) => {
        setSubmitted(false);

        console.log(err);
        if (err.response && err.response.status === 401)
          return useAlert(err.response.data.message, "danger");

        useAlert(err.message, "danger");
      });
  };
  return course ? (
    <>
      <div className="container p-4">
        <div className="container-fluid bg-white rounded-3 mt-3">
          <div className="row py-2 px-3">
            <div className="col-12 ps-4">
              <h3 className="project--text--primary m-0">Edit course</h3>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-white p-0 mt-3 rounded-top-3">
          <div className="container-fluid border-bottom p-3 m-0">
            <h6>Courses Details</h6>
          </div>
        </div>
        <div className="container-fluid bg-white p-0 rounded-bottom-3">
          <div className="container py-4 px-5">
            <form className="row" onSubmit={handleSubmit}>
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    placeholder="Course Name"
                    name="courseName"
                    className="form-control"
                    required
                    value={course.title}
                    onChange={(e) =>
                      setCourse({ ...course, title: e.target.value })
                    }
                  />
                  <label htmlFor="courseName">Course Name</label>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <textarea
                    type="text"
                    placeholder="Course Details"
                    name="courseDetails"
                    className="form-control"
                    required
                    style={{ height: 200 }}
                    value={course.description}
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        description: e.target.value,
                      })
                    }
                    maxLength={500}
                  ></textarea>
                  <label htmlFor="courseDetails">
                    Course Details ({course.description.length} / 500)
                  </label>
                </div>
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="courseThumbnail" className="h6">
                  Course Thumbnail
                </label>
                <input
                  type="file"
                  name="courseThumbnail"
                  className="form-control"
                  ref={fileInput}
                />
              </div>
              <div className="col-6 mb-3 pt-2">
                <div className="form-floating">
                  <input
                    type="text"
                    placeholder="Course Duration"
                    name="courseDuration"
                    className="form-control"
                    required
                    value={course.duration}
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        duration: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="courseDuration">Course Duration</label>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <select
                    name="courseCategory"
                    value={course.category}
                    onChange={(e) =>
                      setCourse({ ...course, category: e.target.value })
                    }
                    className="form-select"
                  >
                    <option value="">Select category</option>
                    <option>Coding</option>
                    <option>Robotics</option>
                    <option>Biology</option>
                  </select>
                  <label htmlFor="courseCategory">Course Duration</label>
                </div>
              </div>

              <div className="col-6 mb-3">
                <h6>Payment before access</h6>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    checked={course.isPaid}
                    onClick={(e) =>
                      setCourse({
                        ...course,
                        isPaid: !course.isPaid,
                      })
                    }
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    User would have to pay to access this course
                  </label>
                </div>
              </div>
              {course.isPaid && (
                <div className="col-6 mb-3">
                  <div class="input-group mb-3 h-100">
                    <span class="input-group-text" id="price">
                      $
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      aria-label="Price"
                      aria-describedby="price"
                      min={1}
                      value={course.price}
                      onChange={(e) =>
                        setCourse({ ...course, price: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <div className="col-12 mb-3 d-flex">
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
                  {submitted ? "Editing" : "Edit"}
                </button>
                <button
                  onClick={() => {
                    usePrompt(
                      "Discard Changes",
                      "Are you sure you want to discard changes?",
                      "danger",
                      "Discard",
                      () => nav(-1)
                    );
                  }}
                  className="btn btn-danger ms-3"
                  type="button"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
          <div className="row" onSubmit={handleSubmit}>
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

export default EditCourseInfo;
