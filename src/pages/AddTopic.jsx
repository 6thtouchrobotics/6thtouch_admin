import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useServer from "../hooks/useServer";
import CourseCard from "../components/CourseCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAlert from "../hooks/useAlert";
import {
  put,
  generateClientTokenFromReadWriteToken,
  upload,
} from "@vercel/blob/client";

const AddTopic = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [topicData, setTopicData] = useState({
    title: "ihjk",
    description: "hj",
    note: "vgjhb",
  });
  const topicFileRef = useRef(null);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
  }, []);
  const handlePublish = () => {
    setIsChanging(true);
    useServer(
      `/admin/courses/${courseId}/publish`,
      "patch",
      (res) => {
        useAlert(res.data?.message);
        useServer(`/courses/${courseId}`, "get", (res) => {
          setCourse(res.data);
          setIsChanging(false);
        });
      },
      {}
    );
  };
  const handleUnpublish = () => {
    setIsChanging(true);

    useServer(
      `/admin/courses/${courseId}/unpublish`,
      "patch",
      (res) => {
        useAlert(res.data?.message);
        useServer(`/courses/${courseId}`, "get", (res) => {
          setCourse(res.data);
          setIsChanging(false);
        });
      },
      {}
    );
  };
  const handleTopicUpload = async (e) => {
    e.preventDefault();

    const file = topicFileRef.current?.files[0];
    console.log(file);
    if (!file) {
      useAlert("Please select a video.");
      return;
    }
    setSubmitted(true);
    useServer(
      `/admin/courses/${courseId}/topics/add`,
      "post",
      async (res) => {
        setSubmitted(false);
        if (res.status !== 201) return useAlert(res.data.message, "danger");

        alert(res.data.token);
        setStep(2);
        try {
          let { url } = await put(file.name, file, {
            access: "public",
            token: res.data.token,
            multipart: true,
            onUploadProgress: ({ percentage }) => setProgress(percentage || 0),
          });
          console.log(url);
        } catch (error) {
          console.error("Error during file upload:", error);
          if (error.response) {
            console.error("Server Response:", error.response.data);
          }
        }
      },
      topicData
    );
  };
  return course ? (
    <>
      <div className="container-fluid bg-white rounded-3 mt-3">
        <div className="row py-2 px-3">
          <div className="col-12 ps-4">
            <h3 className="project--text--primary m-0">Add Topic</h3>
          </div>
        </div>
      </div>
      <div className="row p-4">
        <div className="col-4 p-0">
          <div
            className="p-0 bg-white rounded-3"
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
          {step === 1 ? (
            <>
              <div className="container-fluid bg-white p-0 mt-3 rounded-top-3">
                <div className="container-fluid border-bottom p-3 m-0">
                  <h6>Topic Details</h6>
                </div>
              </div>
              <div className="container-fluid bg-white p-0 rounded-bottom-3">
                <div className="container py-4">
                  <form className="row" onSubmit={handleTopicUpload}>
                    <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          placeholder="Topic Title"
                          name="topicTitle"
                          className="form-control"
                          required
                          value={topicData.title}
                          onChange={(e) =>
                            setTopicData({
                              ...topicData,
                              title: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="topicTitle">Topic Title</label>
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
                          value={topicData.description}
                          onChange={(e) =>
                            setTopicData({
                              ...topicData,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                        <label htmlFor="courseDetails">Topic Description</label>
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
                          value={topicData.note}
                          onChange={(e) =>
                            setTopicData({
                              ...topicData,
                              note: e.target.value,
                            })
                          }
                        ></textarea>
                        <label htmlFor="courseDetails">Topic Notes</label>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="courseThumbnail" className="h6">
                        Topic Video
                      </label>
                      <input
                        type="file"
                        name="topicVideo"
                        className="form-control"
                        accept="video/*"
                        required
                        ref={topicFileRef}
                      />
                    </div>
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
                      <Link
                        to={-1}
                        className="btn btn-danger ms-3"
                        type="button"
                      >
                        Discard
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : progress < 100 ? (
            <>
              <div className="container-fluid bg-white p-0 rounded-3">
                <div className="container py-4">
                  <div class="progress mb-3">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${progress}%`,
                      }}
                    >
                      {progress}%
                    </div>
                  </div>
                  <h6 className="text-center">Uploading Video</h6>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="container-fluid bg-white p-0 rounded-3">
                <div className="container py-4">
                  <h3 className="text-center">Completing Upload</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <LoadingAnimation />
  );
};

export default AddTopic;
