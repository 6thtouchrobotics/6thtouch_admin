import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAlert from "../hooks/useAlert";
import usePrompt from "../hooks/usePrompt";

const CreateCourse = () => {
  const nav = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    duration: "",
    isPaid: true,
  });
  const fileInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/admin/courses/create`,
        {
          ...courseData,
          thumbnail: fileInput.current.files[0],
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

        if (response.status !== 201)
          return useAlert(response.data.message, "danger");
        nav("/courses");
      })
      .catch((err) => {
        setSubmitted(false);

        console.log(err);
        if (err.response && err.response.status === 401)
          return useAlert(err.response.data.message, "danger");

        useAlert(err.message, "danger");
      });
  };

  return (
    <>
      <div className="container p-4">
        <div className="container-fluid bg-white rounded-3 mt-3">
          <div className="row py-2 px-3">
            <div className="col-12 ps-4">
              <h3 className="project--text--primary m-0">Add course</h3>
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
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData({ ...courseData, title: e.target.value })
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
                    value={courseData.description}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        description: e.target.value,
                      })
                    }
                    maxLength={500}
                  ></textarea>
                  <label htmlFor="courseDetails">
                    Course Details ({courseData.description.length} / 500)
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
                  accept="image/*"
                  required
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
                    value={courseData.duration}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
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
                    value={courseData.category}
                    onChange={(e) =>
                      setCourseData({ ...courseData, category: e.target.value })
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
                    checked={courseData.isPaid}
                    onClick={(e) =>
                      setCourseData({
                        ...courseData,
                        isPaid: !courseData.isPaid,
                      })
                    }
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    User would have to pay to access this course
                  </label>
                </div>
              </div>
              {courseData.isPaid && (
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
                      value={courseData.price}
                      onChange={(e) =>
                        setCourseData({ ...courseData, price: e.target.value })
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
                  {submitted ? "Creating" : "Create"}
                </button>
                <button
                  onClick={() => {
                    usePrompt(
                      "Discard Course",
                      "Are you sure you want to discard this course?",
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
  );
};

export default CreateCourse;
